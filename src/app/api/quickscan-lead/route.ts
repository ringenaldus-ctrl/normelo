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

    const { email, sector, risico_niveau, hoog_risico_systemen, ats_systeem, antwoorden } =
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
      ats_systeem: ats_systeem || null,
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

      // Build personalized advice blocks
      const adviesBlokken: string[] = [];

      if (antwoorden?.shadow === "ja") {
        adviesBlokken.push(`
          <div style="padding:16px;border-left:3px solid #dc2626;background:#fef2f2;margin-bottom:16px;border-radius:0 6px 6px 0;">
            <p style="font-weight:600;font-size:15px;margin:0 0 8px;color:#1e2a3a;">Shadow AI: ongecontroleerd AI-gebruik</p>
            <p style="font-size:14px;color:#4a5568;margin:0 0 8px;">Medewerkers gebruiken eigen AI-tools (zoals ChatGPT of Copilot) voor recruitmenttaken. Dit valt ook onder de EU AI Act. Als een recruiter ChatGPT gebruikt om cv's te beoordelen of kandidaten te ranken, is dat in feite een ongeregistreerd hoog-risico AI-systeem.</p>
            <p style="font-size:13px;color:#e8612d;font-weight:600;margin:0;">Wat te doen: Breng in kaart welke AI-tools medewerkers gebruiken. Stel een AI-beleid op. Artikel 4 van de EU AI Act verplicht AI-geletterdheid voor iedereen die AI inzet — dit geldt sinds februari 2025.</p>
          </div>`);
      } else if (antwoorden?.shadow === "weet-niet") {
        adviesBlokken.push(`
          <div style="padding:16px;border-left:3px solid #d97706;background:#fffbeb;margin-bottom:16px;border-radius:0 6px 6px 0;">
            <p style="font-weight:600;font-size:15px;margin:0 0 8px;color:#1e2a3a;">Shadow AI: geen zicht op AI-gebruik</p>
            <p style="font-size:14px;color:#4a5568;margin:0 0 8px;">Je hebt aangegeven geen zicht te hebben op of medewerkers eigen AI-tools gebruiken. Onderzoek toont dat meer dan de helft van werknemers dit doet zonder toestemming. Bij uitzendbureaus is het risico extra groot: recruiters die ChatGPT gebruiken voor cv-screening creëren onbewust hoog-risico AI-situaties.</p>
            <p style="font-size:13px;color:#e8612d;font-weight:600;margin:0;">Wat te doen: Voer een interne inventarisatie uit. Vraag teams welke AI-tools ze gebruiken. Stel vervolgens een beleid op dat bepaalt welke tools wel en niet zijn toegestaan.</p>
          </div>`);
      }

      if (antwoorden?.beslissingen === "zelfstandig") {
        adviesBlokken.push(`
          <div style="padding:16px;border-left:3px solid #dc2626;background:#fef2f2;margin-bottom:16px;border-radius:0 6px 6px 0;">
            <p style="font-weight:600;font-size:15px;margin:0 0 8px;color:#1e2a3a;">Autonome besluitvorming</p>
            <p style="font-size:14px;color:#4a5568;margin:0 0 8px;">Je systemen nemen zelfstandig beslissingen over kandidaten — bijvoorbeeld door cv's automatisch af te wijzen of te ranken zonder dat een recruiter meekijkt. De EU AI Act vereist bij hoog-risico systemen dat er altijd menselijk toezicht is op beslissingen die individuen raken.</p>
            <p style="font-size:13px;color:#e8612d;font-weight:600;margin:0;">Wat te doen: Configureer je ATS/matchingtool zo dat geen enkele kandidaat automatisch wordt afgewezen. Zorg dat een recruiter altijd de eindbeslissing neemt.</p>
          </div>`);
      } else if (antwoorden?.beslissingen === "weet-niet") {
        adviesBlokken.push(`
          <div style="padding:16px;border-left:3px solid #d97706;background:#fffbeb;margin-bottom:16px;border-radius:0 6px 6px 0;">
            <p style="font-weight:600;font-size:15px;margin:0 0 8px;color:#1e2a3a;">Autonome besluitvorming: onduidelijk</p>
            <p style="font-size:14px;color:#4a5568;margin:0 0 8px;">Je weet niet of je systemen zelfstandig beslissingen nemen over kandidaten. Dit is een veelvoorkomend probleem — veel ATS-systemen en matchingtools wijzen kandidaten af of ranken ze zonder dat de gebruiker dit doorheeft.</p>
            <p style="font-size:13px;color:#e8612d;font-weight:600;margin:0;">Wat te doen: Vraag je softwareleverancier hoe het systeem beslissingen neemt. Wordt er automatisch gefilterd? Worden kandidaten onzichtbaar gemaakt? Documenteer dit.</p>
          </div>`);
      }

      if (antwoorden?.toezicht === "nee") {
        adviesBlokken.push(`
          <div style="padding:16px;border-left:3px solid #dc2626;background:#fef2f2;margin-bottom:16px;border-radius:0 6px 6px 0;">
            <p style="font-weight:600;font-size:15px;margin:0 0 8px;color:#1e2a3a;">Menselijk toezicht ontbreekt</p>
            <p style="font-size:14px;color:#4a5568;margin:0 0 8px;">Er is niemand aangewezen die AI-beslissingen over kandidaten kan overrulen. Dit is een van de kernvereisten van de EU AI Act voor hoog-risico systemen (Art. 14). Zonder menselijk toezicht ben je niet compliant.</p>
            <p style="font-size:13px;color:#e8612d;font-weight:600;margin:0;">Wat te doen: Wijs per systeem iemand aan die verantwoordelijk is voor het beoordelen van AI-output. Deze persoon moet de bevoegdheid én de kennis hebben om beslissingen te overrulen.</p>
          </div>`);
      } else if (antwoorden?.toezicht === "weet-niet") {
        adviesBlokken.push(`
          <div style="padding:16px;border-left:3px solid #d97706;background:#fffbeb;margin-bottom:16px;border-radius:0 6px 6px 0;">
            <p style="font-weight:600;font-size:15px;margin:0 0 8px;color:#1e2a3a;">Menselijk toezicht: onduidelijk</p>
            <p style="font-size:14px;color:#4a5568;margin:0 0 8px;">Je weet niet of er iemand is die AI-beslissingen kan overrulen. Stel dit zo snel mogelijk vast — menselijk toezicht is een van de belangrijkste verplichtingen onder de EU AI Act.</p>
            <p style="font-size:13px;color:#e8612d;font-weight:600;margin:0;">Wat te doen: Inventariseer per AI-systeem wie de output beoordeelt. Als niemand dit doet, wijs iemand aan en documenteer de procedure.</p>
          </div>`);
      }

      if (antwoorden?.transparantie === "nee") {
        adviesBlokken.push(`
          <div style="padding:16px;border-left:3px solid #d97706;background:#fffbeb;margin-bottom:16px;border-radius:0 6px 6px 0;">
            <p style="font-weight:600;font-size:15px;margin:0 0 8px;color:#1e2a3a;">Transparantie ontbreekt</p>
            <p style="font-size:14px;color:#4a5568;margin:0 0 8px;">Kandidaten worden niet geïnformeerd dat AI wordt gebruikt in het selectieproces. De EU AI Act verplicht dit bij hoog-risico systemen. Kandidaten hebben het recht om te weten dat hun cv door AI wordt beoordeeld.</p>
            <p style="font-size:13px;color:#e8612d;font-weight:600;margin:0;">Wat te doen: Voeg aan je vacatureteksten en het sollicitatieproces een mededeling toe dat AI wordt ingezet. Bijvoorbeeld: "Wij gebruiken AI-ondersteunde software bij de selectie van kandidaten."</p>
          </div>`);
      } else if (antwoorden?.transparantie === "weet-niet") {
        adviesBlokken.push(`
          <div style="padding:16px;border-left:3px solid #d97706;background:#fffbeb;margin-bottom:16px;border-radius:0 6px 6px 0;">
            <p style="font-weight:600;font-size:15px;margin:0 0 8px;color:#1e2a3a;">Transparantie: onduidelijk</p>
            <p style="font-size:14px;color:#4a5568;margin:0 0 8px;">Je weet niet of kandidaten geïnformeerd worden over het gebruik van AI. Controleer dit — transparantie is verplicht bij hoog-risico AI-systemen.</p>
            <p style="font-size:13px;color:#e8612d;font-weight:600;margin:0;">Wat te doen: Controleer je vacatureteksten, sollicitatiebevestigingen en privacyverklaring. Staat er een melding over AI-gebruik? Zo niet, voeg deze toe.</p>
          </div>`);
      }

      if (antwoorden?.beslissingen === "adviserend" && antwoorden?.toezicht === "ja" && antwoorden?.transparantie === "ja") {
        adviesBlokken.push(`
          <div style="padding:16px;border-left:3px solid #16a34a;background:#f0fdf4;margin-bottom:16px;border-radius:0 6px 6px 0;">
            <p style="font-weight:600;font-size:15px;margin:0 0 8px;color:#1e2a3a;">Goede basis</p>
            <p style="font-size:14px;color:#4a5568;margin:0 0 8px;">Je hebt menselijk toezicht, systemen werken adviserend, en kandidaten worden geïnformeerd. Dat is een sterke uitgangspositie.</p>
            <p style="font-size:13px;color:#16a34a;font-weight:600;margin:0;">Volgende stap: Zorg ervoor dat dit ook aantoonbaar en gedocumenteerd is. De EU AI Act vereist niet alleen dat je compliant bent, maar ook dat je het kunt bewijzen.</p>
          </div>`);
      }

      const adviesHtml = adviesBlokken.length > 0
        ? `<h3 style="font-size:18px;color:#1e2a3a;margin:24px 0 12px;">Jouw aandachtspunten en advies</h3>${adviesBlokken.join("")}`
        : "";

      // Build next steps
      const vervolgstappen: string[] = [];
      if (hoog_risico_systemen && hoog_risico_systemen.length > 0) {
        vervolgstappen.push("Maak een overzicht van alle AI-systemen die je uitzendbureau gebruikt en wie de leverancier is");
        vervolgstappen.push("Vraag je leveranciers om documentatie over hoe hun systeem beslissingen neemt (Art. 13: transparantie)");
        vervolgstappen.push("Wijs per systeem een verantwoordelijke aan voor menselijk toezicht (Art. 14)");
      }
      if (antwoorden?.shadow === "ja" || antwoorden?.shadow === "weet-niet") {
        vervolgstappen.push("Inventariseer welke AI-tools medewerkers zelfstandig gebruiken");
        vervolgstappen.push("Stel een AI-beleid op: welke tools zijn toegestaan, welke niet");
      }
      vervolgstappen.push("Zorg dat alle medewerkers die met AI werken een basistraining AI-geletterdheid volgen (Art. 4 — verplicht sinds feb 2025)");

      const vervolgstappenHtml = `
        <h3 style="font-size:18px;color:#1e2a3a;margin:24px 0 12px;">Concrete vervolgstappen</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${vervolgstappen.map((stap, i) => `<tr><td style="padding:8px 12px 8px 0;font-size:14px;color:#e8612d;font-weight:bold;vertical-align:top;width:28px;">${i + 1}.</td><td style="padding:8px 0;font-size:14px;color:#4a5568;">${stap}</td></tr>`).join("")}
        </table>`;

      // Notificatie naar Gérard
      try {
        const shadowLabel = antwoorden?.shadow === "ja" ? "Ja" : antwoorden?.shadow === "weet-niet" ? "Weet niet" : "Nee";
        const beslissingenLabel = antwoorden?.beslissingen === "zelfstandig" ? "Zelfstandig" : antwoorden?.beslissingen === "adviserend" ? "Adviserend" : antwoorden?.beslissingen === "weet-niet" ? "Weet niet" : "-";
        const toezichtLabel = antwoorden?.toezicht === "ja" ? "Ja" : antwoorden?.toezicht === "nee" ? "Nee" : antwoorden?.toezicht === "weet-niet" ? "Weet niet" : "-";
        const transparantieLabel = antwoorden?.transparantie === "ja" ? "Ja" : antwoorden?.transparantie === "nee" ? "Nee" : antwoorden?.transparantie === "weet-niet" ? "Weet niet" : "-";

        const hoogRisicoLabels: Record<string, string> = {
          "cv-screening": "CV-screening / ATS met AI-ranking",
          matching: "Matchingtool",
          "chatbot-hr": "Chatbot voor screening",
          monitoring: "Prestatie-/gedragsmonitoring",
          planning: "Planningssoftware",
        };
        const systemenTekst = hoog_risico_systemen && hoog_risico_systemen.length > 0
          ? hoog_risico_systemen.map((s: string) => hoogRisicoLabels[s] || s).join(", ")
          : "Geen";

        const atsLookup: Record<string, string> = { carerix: "Carerix", mysolution: "Mysolution", bullhorn: "Bullhorn / Connexys", byner: "Byner", anders: "Ander systeem", "weet-niet": "Weet niet", "geen-ats": "Geen ATS" };
        const atsLabel = ats_systeem
          ? (atsLookup[ats_systeem as string] || ats_systeem)
          : "-";

        await resend.emails.send({
          from: "Normelo <scan@normelo.com>",
          to: ["ringenaldus@gmail.com"],
          subject: `Nieuwe Quick Scan lead: ${email.trim().toLowerCase()} (${risicoLabel})`,
          html: `
<div style="font-family:sans-serif;max-width:500px;padding:20px;">
  <h2 style="margin:0 0 16px;">Nieuwe Quick Scan lead</h2>
  <table style="border-collapse:collapse;width:100%;">
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;font-size:14px;">E-mail</td><td style="padding:6px 0;font-size:14px;">${email.trim().toLowerCase()}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;font-size:14px;">Resultaat</td><td style="padding:6px 0;font-size:14px;color:${risicoKleur};font-weight:bold;">${risicoLabel}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;font-size:14px;">ATS-systeem</td><td style="padding:6px 0;font-size:14px;">${atsLabel}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;font-size:14px;">Hoog-risico systemen</td><td style="padding:6px 0;font-size:14px;">${systemenTekst}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;font-size:14px;">Shadow AI</td><td style="padding:6px 0;font-size:14px;">${shadowLabel}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;font-size:14px;">Beslissingen</td><td style="padding:6px 0;font-size:14px;">${beslissingenLabel}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;font-size:14px;">Toezicht</td><td style="padding:6px 0;font-size:14px;">${toezichtLabel}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;font-weight:bold;font-size:14px;">Transparantie</td><td style="padding:6px 0;font-size:14px;">${transparantieLabel}</td></tr>
  </table>
</div>`,
        });
      } catch (notifError) {
        console.error("Notification email error:", notifError);
      }

      // Resultaat-mail naar de bezoeker
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
      ${risico_niveau === "hoog" ? `<p style="font-size:14px;color:#4a5568;margin:0;">Jouw uitzendbureau heeft directe aandachtspunten op het gebied van EU AI Act compliance. Hieronder vind je een persoonlijke analyse op basis van jouw antwoorden.</p>` : risico_niveau === "middel" ? `<p style="font-size:14px;color:#4a5568;margin:0;">Er zijn aandachtspunten bij jouw uitzendbureau. Hieronder vind je een persoonlijke analyse en concrete stappen die je kunt nemen.</p>` : `<p style="font-size:14px;color:#4a5568;margin:0;">Op basis van je antwoorden lijkt jouw uitzendbureau geen hoog-risico AI-systemen te gebruiken. Hieronder vind je toch enkele aanbevelingen om voorbereid te blijven.</p>`}
    </div>

    ${systemenLijst ? `<h3 style="font-size:18px;color:#1e2a3a;margin:0 0 12px;">Jouw hoog-risico systemen</h3><table style="width:100%;border-collapse:collapse;margin-bottom:16px;">${systemenLijst}</table><p style="font-size:13px;color:#6b7280;margin:0 0 24px;">Deze systemen vallen onder Bijlage III, categorie 4 van de EU AI Act: "Werkgelegenheid, personeelsbeheer en toegang tot zelfstandige arbeid." Als deployer heb je eigen wettelijke verplichtingen — ook als je het systeem niet zelf hebt gebouwd.</p>` : ""}

    ${adviesHtml}

    ${vervolgstappenHtml}

    <div style="background:#f8f6f3;border-radius:8px;padding:20px;margin-top:24px;">
      <p style="font-size:14px;color:#4a5568;margin:0 0 4px;"><strong>Belangrijke deadlines:</strong></p>
      <p style="font-size:13px;color:#6b7280;margin:0;">AI-geletterdheid (Art. 4): <strong>verplicht sinds 2 februari 2025</strong></p>
      <p style="font-size:13px;color:#6b7280;margin:4px 0 0;">Hoog-risico verplichtingen: <strong>augustus 2026</strong></p>
    </div>
  </div>

  <div style="border-top:2px solid #f0f0f0;padding:24px 0;">
    <div style="background:#1e2a3a;border-radius:8px;padding:24px;text-align:center;">
      <p style="font-size:16px;font-weight:bold;color:white;margin:0 0 8px;">Artikel 4 verplicht AI-geletterdheid — sinds februari 2025</p>
      <p style="font-size:13px;color:#94a3b8;margin:0 0 16px;">Normelo biedt een compleet compliance-traject voor uitzendbureaus: online training, toets, certificering en documentatie. Specifiek voor recruiters, intercedenten en hiring managers.</p>
      <a href="https://normelo.com/training" style="display:inline-block;background:#e8612d;color:white;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">Bekijk het traject →</a>
    </div>
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
