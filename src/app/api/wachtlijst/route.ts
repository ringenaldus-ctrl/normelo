import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const ROL_LABELS: Record<string, string> = {
  intercedent: "Recruiter / Intercedent",
  hiringManager: "Accountmanager",
  hrCompliance: "HR / Compliance",
  directie: "Directie / Eigenaar",
};

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

    const { error } = await supabase.from("training_wachtlijst").insert({
      email: email.trim().toLowerCase(),
      bron: bron || "website",
      naam: naam || null,
      organisatie: organisatie || null,
      telefoon: telefoon || null,
      rol: rol || null,
    });

    if (error) {
      // Duplicate email — treat as success for user
      if (error.code === "23505") {
        return Response.json({ success: true, already_registered: true });
      }
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Er ging iets mis." },
        { status: 500 }
      );
    }

    // Send notification email
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
