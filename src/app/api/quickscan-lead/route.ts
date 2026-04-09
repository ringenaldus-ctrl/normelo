import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

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

    const { email, sector, risico_niveau, hoog_risico_systemen, antwoorden } =
      body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { error } = await supabase.from("quickscan_leads").insert({
      email: email.trim().toLowerCase(),
      sector: sector || null,
      risico_niveau: risico_niveau || null,
      hoog_risico_systemen: hoog_risico_systemen || [],
      antwoorden: antwoorden || {},
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Er ging iets mis bij het opslaan." },
        { status: 500 }
      );
    }

    // Send email via Resend
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const risicoLabel =
        risico_niveau === "hoog"
          ? "Hoog risico"
          : risico_niveau === "middel"
            ? "Aandacht nodig"
            : "Laag risico";

      const risicoKleur =
        risico_niveau === "hoog"
          ? "#dc2626"
          : risico_niveau === "middel"
            ? "#d97706"
            : "#16a34a";

      const systemenLijst =
        hoog_risico_systemen && hoog_risico_systemen.length > 0
          ? hoog_risico_systemen
              .map((s: string) => {
                const labels: Record<string, string> = {
                  "cv-screening": "CV-screening / ATS met AI-ranking",
                  matching: "Matchingtool (kandidaat-vacature koppeling)",
                  "chatbot-hr": "Chatbot voor kandidaat-screening",
                  monitoring:
                    "Monitoring van prestaties/gedrag uitzendkrachten",
                  planning:
                    "Planningssoftware op basis van medewerker-profiel",
                };
                return labels[s] || s;
              })
              .map(
                (label: string) =>
                  `<tr><td style="padding:6px 12px;font-size:14px;color:#dc2626;">⚠</td><td style="padding:6px 12px;font-size:14px;">${label}</td></tr>`
              )
              .join("")
          : "";

      const aandachtspunten: string[] = [];

      if (antwoorden?.shadow === "ja") {
        aandachtspunten.push(
          "Shadow AI — medewerkers gebruiken eigen AI-tools voor recruitmenttaken"
        );
      } else if (antwoorden?.shadow === "weet-niet") {
        aandachtspunten.push(
          "Shadow AI — geen zicht op of medewerkers eigen AI-tools gebruiken"
        );
      }
      if (
        antwoorden?.beslissingen === "zelfstandig" ||
        antwoorden?.beslissingen === "weet-niet"
      ) {
        aandachtspunten.push(
          "Autonome besluitvorming — systemen nemen mogelijk zelfstandig beslissingen over kandidaten"
        );
      }
      if (
        antwoorden?.toezicht === "nee" ||
        antwoorden?.toezicht === "weet-niet"
      ) {
        aandachtspunten.push(
          "Menselijk toezicht — er is mogelijk niemand die AI-beslissingen kan overrulen"
        );
      }
      if (
        antwoorden?.transparantie === "nee" ||
        antwoorden?.transparantie === "weet-niet"
      ) {
        aandachtspunten.push(
          "Transparantie — kandidaten worden mogelijk niet geïnformeerd over AI-gebruik"
        );
      }

      const aandachtspuntenHtml =
        aandachtspunten.length > 0
          ? `<h3 style="font-size:18px;color:#1e2a3a;margin:24px 0 12px;">Aandachtspunten</h3>
           <ul style="padding-left:20px;margin:0;">${aandachtspunten.map((p) => `<li style="font-size:14px;color:#4a5568;margin-bottom:8px;">${p}</li>`).join("")}</ul>`
          : "";

      try {
        await resend.emails.send({
          from: "Normelo <scan@normelo.com>",
          to: [email.trim().toLowerCase()],
          subject: `Jouw EU AI Act Quick Scan resultaat: ${risicoLabel}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1e2a3a;">

  <div style="text-align:center;padding:24px 0;border-bottom:2px solid #f0f0f0;">
    <h1 style="font-size:22px;margin:0;color:#1e2a3a;">🛡️ Normelo</h1>
    <p style="font-size:13px;color:#6b7280;margin:4px 0 0;">EU AI Act Quick Scan — Uitzendbranche</p>
  </div>

  <div style="padding:24px 0;">
    <h2 style="font-size:20px;margin:0 0 16px;">Jouw Quick Scan resultaat</h2>

    <div style="background:${risico_niveau === "hoog" ? "#fef2f2" : risico_niveau === "middel" ? "#fffbeb" : "#f0fdf4"};border:2px solid ${risicoKleur};border-radius:8px;padding:20px;margin-bottom:24px;">
      <p style="font-size:22px;font-weight:bold;color:${risicoKleur};margin:0 0 8px;">${risicoLabel}</p>
      ${risico_niveau !== "laag" ? `<p style="font-size:14px;color:#4a5568;margin:0;">De deadline voor hoog-risico AI-systemen is <strong>augustus 2026</strong>. AI-geletterdheid (Art. 4) is al verplicht sinds februari 2025.</p>` : `<p style="font-size:14px;color:#4a5568;margin:0;">Op basis van je antwoorden lijkt jouw uitzendbureau geen hoog-risico AI-systemen te gebruiken. Houd de ontwikkelingen in de gaten.</p>`}
    </div>

    ${systemenLijst ? `<h3 style="font-size:18px;color:#1e2a3a;margin:0 0 12px;">Hoog-risico systemen</h3><table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${systemenLijst}</table>` : ""}

    ${aandachtspuntenHtml}
  </div>

  <div style="border-top:2px solid #f0f0f0;padding:24px 0;text-align:center;">
    <a href="https://normelo.com/uitzendbranche" style="display:inline-block;background:#e8612d;color:white;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">Lees de volledige analyse →</a>
  </div>

  <div style="padding:20px 0;border-top:1px solid #f0f0f0;text-align:center;">
    <p style="font-size:12px;color:#9ca3af;margin:0;">Je ontvangt deze e-mail omdat je de EU AI Act Quick Scan hebt ingevuld op normelo.com. We sturen je geen verdere e-mails.</p>
    <p style="font-size:12px;color:#9ca3af;margin:8px 0 0;">© ${new Date().getFullYear()} Normelo</p>
  </div>

</body>
</html>`,
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
        // Don't fail the whole request if email fails — lead is already saved
      }
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Ongeldig verzoek" }, { status: 400 });
  }
}
