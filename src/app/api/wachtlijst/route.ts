import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { randomUUID, randomBytes } from "crypto";

const ROL_LABELS: Record<string, string> = {
  intercedent: "Recruiter / Intercedent",
  hiringManager: "Accountmanager",
  hrCompliance: "HR / Compliance",
  directie: "Directie / Eigenaar",
};

// Map Normelo rol naar training-app roleId
const ROL_TO_TRAINING_ROLE: Record<string, string> = {
  intercedent: "intercedent",
  hiringManager: "accountmanager",
  hrCompliance: "backoffice_admin",
  directie: "directie",
};

const SELF_REG_ORG_ID = "normelo-self-reg";
const TRAINING_APP_URL = "https://hireai-certified.vercel.app";

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !anonKey) {
      return Response.json(
        { error: "Server configuratie onvolledig." },
        { status: 500 }
      );
    }

    // Use service key for everything (bypasses RLS)
    const supabase = createClient(supabaseUrl, serviceKey || anonKey);

    // Log last 10 chars of key to verify which key is being used (safe to log partial)
    const keyEnd = (serviceKey || anonKey || "").slice(-10);
    console.log("Using service key:", !!serviceKey, "key ends with:", keyEnd);
    const body = await request.json();
    const { email, bron, naam, organisatie, telefoon, rol } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Save to wachtlijst (lead tracking)
    const { error } = await supabase.from("training_wachtlijst").insert({
      email: cleanEmail,
      bron: bron || "website",
      naam: naam || null,
      organisatie: organisatie || null,
      telefoon: telefoon || null,
      rol: rol || null,
    });

    console.log("Wachtlijst insert result - error:", error ? JSON.stringify(error) : "none");

    if (error && error.code !== "23505") {
      console.error("Supabase insert error:", JSON.stringify(error));
      return Response.json(
        { error: "Er ging iets mis." },
        { status: 500 }
      );
    }

    console.log("Proceeding to employee check");

    // 2. Create employee in training-app (if not exists)
    const trainingRoleId = rol ? (ROL_TO_TRAINING_ROLE[rol as string] || "recruiter") : "recruiter";

    let employeeId: string | null = null;
    let debugInfo = "";

    // Check if employee already exists
    const { data: existingEmployee, error: empLookupError } = await supabase
      .from("employees")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (empLookupError) {
      debugInfo += `Lookup error: ${JSON.stringify(empLookupError)}. `;
      console.error("Employee lookup error:", JSON.stringify(empLookupError));
    }

    if (existingEmployee) {
      employeeId = existingEmployee.id;
      console.log("Existing employee found:", employeeId);
    } else {
      console.log("No existing employee, creating new one for:", cleanEmail);
      // Ensure self-registration org exists
      const { data: existingOrg, error: orgLookupError } = await supabase
        .from("organizations")
        .select("id")
        .eq("id", SELF_REG_ORG_ID)
        .maybeSingle();

      if (orgLookupError) console.error("Org lookup error:", JSON.stringify(orgLookupError));

      if (!existingOrg) {
        const { error: orgInsertError } = await supabase.from("organizations").insert({
          id: SELF_REG_ORG_ID,
          name: "Normelo — Zelfregistratie",
          type: "Zelfregistratie",
          contactName: null,
          contactRole: null,
          updatedAt: new Date().toISOString(),
        });
        if (orgInsertError) console.error("Org insert error:", JSON.stringify(orgInsertError));
      }

      // Determine organization
      let orgId = SELF_REG_ORG_ID;
      if (organisatie && organisatie.trim()) {
        const customOrgId = `normelo-${organisatie.trim().toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40)}`;
        const { data: namedOrg } = await supabase
          .from("organizations")
          .select("id")
          .eq("id", customOrgId)
          .maybeSingle();

        if (!namedOrg) {
          await supabase.from("organizations").insert({
            id: customOrgId,
            name: organisatie.trim(),
            type: "Uitzendbureau",
            contactName: naam || null,
            contactRole: ROL_LABELS[rol as string] || null,
            updatedAt: new Date().toISOString(),
          });
        }
        orgId = customOrgId;
      }

      // Create employee
      employeeId = `normelo-${randomUUID().slice(0, 12)}`;
      const { error: empError } = await supabase.from("employees").insert({
        id: employeeId,
        name: naam || cleanEmail.split("@")[0],
        email: cleanEmail,
        roleId: trainingRoleId,
        organizationId: orgId,
        assignedBy: "Normelo registratie",
        assignedOn: new Date().toISOString(),
        actief: true,
      });
      if (empError) {
        debugInfo += `Insert error: ${JSON.stringify(empError)}. `;
        console.error("Employee insert error:", JSON.stringify(empError));
        employeeId = null;
      }
    }

    // 3. Create magic link token and send to user
    console.log("Step 3 - resendApiKey:", !!resendApiKey, "employeeId:", employeeId);
    if (resendApiKey && employeeId) {
      console.log("Creating magic link for employee:", employeeId);
      const resend = new Resend(resendApiKey);

      // Clean up expired unused tokens for this employee
      await supabase
        .from("magic_link_tokens")
        .delete()
        .eq("employeeId", employeeId)
        .is("usedAt", null)
        .lt("expiresAt", new Date().toISOString());

      // Generate magic link token (32 bytes = 64 hex chars, same as training app)
      const token = randomBytes(32).toString("hex");
      const tokenId = randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

      const { error: tokenError } = await supabase.from("magic_link_tokens").insert({
        id: tokenId,
        token,
        employeeId,
        expiresAt: expiresAt.toISOString(),
      });
      if (tokenError) console.error("Magic link token insert error:", JSON.stringify(tokenError));

      const magicLinkUrl = `${TRAINING_APP_URL}/api/auth/magic-link/verify?token=${encodeURIComponent(token)}`;
      const displayName = naam || cleanEmail.split("@")[0];

      // Send magic link email to user
      console.log("Sending magic link email to:", cleanEmail);
      try {
        const magicEmailResult = await resend.emails.send({
          from: "Normelo <scan@normelo.com>",
          to: [cleanEmail],
          subject: "Start je EU AI Act training — Normelo",
          html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:500px;margin:0 auto;padding:40px 20px;color:#1e2a3a;">
  <p style="font-size:16px;margin:0 0 24px;">Hoi ${displayName},</p>
  <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">
    Je hebt je aangemeld voor de gratis EU AI Act training. Klik op de knop hieronder om direct te starten.
  </p>
  <a href="${magicLinkUrl}" style="display:inline-block;padding:14px 28px;background:#e8590c;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">
    Start de training →
  </a>
  <p style="font-size:13px;color:#9ca3af;margin:32px 0 0;line-height:1.5;">
    Deze link is 7 dagen geldig. Als je de link niet meer kunt gebruiken, kun je een nieuwe aanvragen op <a href="https://normelo.com/aanvragen" style="color:#e8590c;">normelo.com/aanvragen</a>.
  </p>
  <p style="font-size:12px;color:#d1d5db;margin:24px 0 0;">Normelo — EU AI Act compliance voor uitzendbureaus</p>
</body></html>`,
        });
        console.log("Magic link email sent:", JSON.stringify(magicEmailResult));
      } catch (emailError) {
        console.error("Magic link email error:", emailError);
      }

    }

    // 4. Send notification email to Normelo (always, regardless of employee/magic link status)
    if (resendApiKey) {
      const resendNotify = new Resend(resendApiKey);
      const rolLabel = rol ? (ROL_LABELS[rol as string] || rol) : "—";
      console.log("Sending notification email to info@normelo.com");
      try {
        await resendNotify.emails.send({
          from: "Normelo <scan@normelo.com>",
          to: ["info@normelo.com"],
          subject: `Nieuwe registratie: ${naam || email} — ${organisatie || "onbekend bureau"}`,
          html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:500px;padding:20px;color:#1e2a3a;">
  <h2 style="margin:0 0 16px;">Nieuwe training-registratie</h2>
  <table style="border-collapse:collapse;width:100%;">
    <tr><td style="padding:8px 12px 8px 0;font-weight:600;font-size:14px;vertical-align:top;width:120px;">Naam</td><td style="padding:8px 0;font-size:14px;">${naam || "—"}</td></tr>
    <tr><td style="padding:8px 12px 8px 0;font-weight:600;font-size:14px;vertical-align:top;">E-mail</td><td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}">${email}</a></td></tr>
    <tr><td style="padding:8px 12px 8px 0;font-weight:600;font-size:14px;vertical-align:top;">Organisatie</td><td style="padding:8px 0;font-size:14px;">${organisatie || "—"}</td></tr>
    <tr><td style="padding:8px 12px 8px 0;font-weight:600;font-size:14px;vertical-align:top;">Rol</td><td style="padding:8px 0;font-size:14px;">${rolLabel}</td></tr>
    <tr><td style="padding:8px 12px 8px 0;font-weight:600;font-size:14px;vertical-align:top;">Bron</td><td style="padding:8px 0;font-size:14px;">${bron || "website"}</td></tr>
    <tr><td style="padding:8px 12px 8px 0;font-weight:600;font-size:14px;vertical-align:top;">Employee</td><td style="padding:8px 0;font-size:14px;">${employeeId || "NIET AANGEMAAKT"}</td></tr>
    <tr><td style="padding:8px 12px 8px 0;font-weight:600;font-size:14px;vertical-align:top;">Debug</td><td style="padding:8px 0;font-size:12px;color:#9ca3af;word-break:break-all;">${debugInfo || "geen errors"} | Key ends: ${keyEnd}</td></tr>
  </table>
</body></html>`,
        });
        console.log("Notification email sent");
      } catch (emailError) {
        console.error("Notification email error:", emailError);
      }
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Ongeldig verzoek" }, { status: 400 });
  }
}
