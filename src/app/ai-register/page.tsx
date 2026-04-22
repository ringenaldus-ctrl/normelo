import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-register voor uitzendbureaus — Normelo",
  description:
    "Het Normelo AI-register: registreer je AI-systemen, genereer compliance-documentatie en blijf automatisch actueel wanneer de EU AI Act verandert. Vanaf €99/maand.",
};

export default function AIRegister() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <h1 className="text-4xl font-bold leading-tight mb-4">Het Normelo AI-register</h1>
        <p className="text-lg text-muted leading-relaxed mb-4">
          Je weet wat de EU AI Act van je bureau vraagt. Nu moet je het regelen. Het Normelo
          AI-register is de tool waarmee je dat doet — al je AI-systemen geregistreerd,
          gedocumenteerd en bijgehouden op één plek.
        </p>
        <p className="text-sm text-accent font-medium">
          Het enige register dat niet veroudert. Wanneer de wet verandert, beweegt je dossier mee.
        </p>
      </section>

      {/* Wat het regelt — 6 blokken */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">Wat het AI-register voor je regelt</h2>
        <p className="text-muted mb-8">Alles wat de EU AI Act van je als uitzendbureau vraagt — op één plek, altijd actueel.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">AI-inventarisatie</p>
            <p className="text-sm text-muted leading-relaxed">
              Elk AI-systeem dat je bureau gebruikt — van Carerix en Bullhorn tot ChatGPT
              en Copilot — vastgelegd met leverancier, doel, gebruikers, risiconiveau en
              toezichthouder. Eén plek, altijd actueel.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Automatische documentgeneratie</p>
            <p className="text-sm text-muted leading-relaxed">
              AI-beleid, transparantieteksten voor kandidaten, procedures voor menselijk
              toezicht, informatie voor werknemers en OR. Gegenereerd op basis van jouw
              register — klaar om te delen met opdrachtgevers en toezichthouders.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Risicobeoordeling en FRIA</p>
            <p className="text-sm text-muted leading-relaxed">
              Per systeem een classificatie volgens Annex III. Voor hoog-risico systemen een
              Fundamental Rights Impact Assessment volgens Artikel 27 — met template en
              begeleiding.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Menselijk toezicht in de praktijk</p>
            <p className="text-sm text-muted leading-relaxed">
              Leg vast wie welke AI-output beoordeelt, overruled of goedkeurt. Het
              oversight-log is je bewijs richting toezichthouders dat Artikel 14
              wordt nageleefd.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Incident-register en review-ritme</p>
            <p className="text-sm text-muted leading-relaxed">
              Registreer incidenten, stel meldingsprocedures in, en krijg herinneringen
              voor periodieke reviews. Compliance is geen moment — het is een ritme.
            </p>
          </div>
          <div className="p-5 border-2 border-accent rounded-lg bg-surface">
            <p className="font-semibold mb-1 text-accent">Levende wiki, ingebouwd</p>
            <p className="text-sm text-muted leading-relaxed">
              De EU AI Act verandert bijna wekelijks: nieuwe guidance, delegated acts,
              handhavingsbesluiten. Normelo volgt het allemaal. Wanneer iets in de wet
              verandert dat jouw register raakt, krijg je een melding met de concrete
              actie die je moet ondernemen.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">Wat kost het?</h2>
        <p className="text-muted mb-8">Jaarabonnement. Gratis training inbegrepen bij elk plan.</p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Starter */}
          <div className="p-6 border border-border rounded-xl flex flex-col">
            <p className="text-sm font-medium text-muted mb-1 tracking-wide uppercase">Starter</p>
            <p className="text-xs text-muted mb-4">Tot 25 medewerkers</p>
            <div className="mb-4">
              <span className="text-3xl font-bold">€99</span>
              <span className="text-muted text-sm">/maand</span>
            </div>
            <p className="text-xs text-muted mb-6">€1.188 per jaar</p>
            <ul className="space-y-2 text-sm mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>AI-register voor al je systemen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Basis compliance-documenten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Gratis training voor heel je team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Levende wiki — altijd actueel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>1–2 vestigingen</span>
              </li>
            </ul>
            <Link
              href="mailto:info@normelo.com?subject=AI-register%20Starter&body=Ik%20wil%20graag%20starten%20met%20het%20Starter-plan."
              className="block text-center px-5 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors no-underline"
            >
              Neem contact op →
            </Link>
          </div>

          {/* Groei */}
          <div className="p-6 border-2 border-accent rounded-xl flex flex-col bg-surface">
            <p className="text-sm font-medium text-accent mb-1 tracking-wide uppercase">Groei</p>
            <p className="text-xs text-muted mb-4">Tot 100 medewerkers</p>
            <div className="mb-4">
              <span className="text-3xl font-bold">€249</span>
              <span className="text-muted text-sm">/maand</span>
            </div>
            <p className="text-xs text-muted mb-6">€2.988 per jaar</p>
            <ul className="space-y-2 text-sm mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Alles van Starter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Volledige document-generatie</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Menselijk toezicht-logs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Incident-register</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>FRIA-templates en begeleiding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Kwartaal compliance-update</span>
              </li>
            </ul>
            <Link
              href="mailto:info@normelo.com?subject=AI-register%20Groei&body=Ik%20wil%20graag%20starten%20met%20het%20Groei-plan."
              className="block text-center px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors no-underline"
            >
              Neem contact op →
            </Link>
          </div>

          {/* Enterprise */}
          <div className="p-6 border border-border rounded-xl flex flex-col">
            <p className="text-sm font-medium text-muted mb-1 tracking-wide uppercase">Enterprise</p>
            <p className="text-xs text-muted mb-4">100+ medewerkers, multi-vestiging</p>
            <div className="mb-4">
              <span className="text-3xl font-bold">€599</span>
              <span className="text-muted text-sm">/maand</span>
            </div>
            <p className="text-xs text-muted mb-6">€7.188 per jaar</p>
            <ul className="space-y-2 text-sm mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Alles van Groei</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Concierge onboarding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Direct contact voor vragen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Audit-support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Onbeperkt vestigingen</span>
              </li>
            </ul>
            <Link
              href="mailto:info@normelo.com?subject=Enterprise%20AI-register"
              className="block text-center px-5 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors no-underline"
            >
              Plan een gesprek →
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted text-center mt-6">
          Alle prijzen excl. btw. Jaarcontract, maandelijks factureerbaar.
        </p>
      </section>

      {/* Waarom geen Excel */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Waarom geen Excel?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Je kunt een AI-register in Excel bijhouden. Veel bureaus beginnen daar ook mee.
          Maar een spreadsheet vertelt je niet of je iets mist, genereert geen beleidsdocumenten,
          herinnert je niet aan deadlines, en beweegt niet mee wanneer de wet verandert.
          Het is een lijst, geen systeem.
        </p>
        <p className="text-foreground leading-relaxed">
          Het Normelo AI-register is gebouwd voor uitzendbureaus die hun compliance
          serieus willen regelen — zonder er een dagtaak van te maken.
        </p>
      </section>

      {/* Over Normelo */}
      <section className="py-12 border-b border-border">
        <p className="text-sm text-muted leading-relaxed">
          Normelo wordt gebouwd en ondersteund door Gérard Ringenaldus, specialist EU AI Act
          en oprichter. Directe lijn met de ontwikkelaar — geen callcenter.
        </p>
      </section>

      {/* Training als instap */}
      <section className="py-12">
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Nog niet klaar om te starten?</p>
          <h3 className="text-xl font-bold mb-3">Begin met de gratis training</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            Voordat je het AI-register gaat gebruiken, is het slim om eerst te begrijpen wat
            de EU AI Act precies van je vraagt. Doe de gratis training — daarna weet je
            precies wat je moet registreren en waarom.
          </p>
          <Link
            href="/aanvragen"
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors no-underline"
          >
            Start de gratis training →
          </Link>
        </div>
      </section>
    </div>
  );
}
