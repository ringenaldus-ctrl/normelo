import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { randomUUID } from "crypto";

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

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json(
        { error: "Server configuratie onvolledig." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
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

    if (error && error.code !== "23505") {
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Er ging iets mis." },
        { status: 500 }
      );
    }

    // 2. Create employee in training-app (if not exists)
    const trainingRoleId = rol ? (ROL_TO_TRAINING_ROLE[rol as string] || "recruiter") : "recruiter";

    // Check if employee already exists
    const { data: existingEmployee } = await supabase
      .from("employees")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (!existingEmployee) {
      // Ensure self-registration org exists
      const { data: existingOrg } = await supabase
        .from("organizations")
        .select("id")
        .eq("id", SELF_REG_ORG_ID)
        .maybeSingle();

      if (!existingOrg) {
        await supabase.from("organizations").insert({
          id: SELF_REG_ORG_ID,
          name: "Normelo — Zelfregistratie",
          type: "Zelfregistratie",
          contactName: null,
          contactRole: null,
          updatedAt: new Date().toISOString(),
        });
      }

      // Determine organization: use self-reg org, or create named org if provided
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
      const employeeId = `normelo-${randomUUID().slice(0, 12)}`;
      await supabase.from("employees").insert({
        id: employeeId,
        name: naam || cleanEmail.split("@")[0],
        email: cleanEmail,
        roleId: trainingRoleId,
        organizationId: orgId,
        assignedBy: "Normelo registratie",
        assignedOn: new Date().toISOString(),
        actief: true,
      });
    }

    // 3. Send notification email
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const rolLabel = rol ? (ROL_LABELS[rol as string] || rol) : "—";
      try {
        await resend.emails.send({
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
  </table>
  <p style="font-size:12px;color:#9ca3af;margin:24px 0 0;">Deze persoon is doorgestuurd naar de training.</p>
</body></html>`,
        });
      } catch (emailError) {
        console.error("Notification email error:", emailError);
      }
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Ongeldig verzoek" }, { status: 400 });
  }
}
