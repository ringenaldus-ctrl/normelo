import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-register voor uitzendbureaus — Normelo",
  description:
    "Het Normelo AI-register: registreer je AI-systemen, bouw je compliance-documentatie op en houd alles bij in één platform. Vanaf €99/maand.",
};

export default function AIRegister() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <h1 className="text-4xl font-bold leading-tight mb-4">Het Normelo AI-register</h1>
        <p className="text-lg text-muted leading-relaxed">
          Je weet wat de EU AI Act van je bureau vraagt. Nu moet je het regelen. Het Normelo
          AI-register is de tool waarmee je dat doet — al je AI-systemen geregistreerd,
          gedocumenteerd en bijgehouden op één plek.
        </p>
      </section>

      {/* Wat het doet */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-6">Wat het AI-register voor je doet</h2>
        <div className="space-y-4">
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">AI-systemen registreren</p>
            <p className="text-sm text-muted leading-relaxed">
              Elk AI-systeem dat je bureau gebruikt — van Carerix en Bullhorn tot ChatGPT
              en Copilot — vastgelegd met leverancier, doel, risiconiveau en toezichthouder.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Risicobeoordeling per systeem</p>
            <p className="text-sm text-muted leading-relaxed">
              Per tool beoordeel je het risiconiveau volgens de EU AI Act. Het register
              helpt je bepalen of een systeem hoog-risico is en wat dat voor verplichtingen meebrengt.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Compliance-documentatie</p>
            <p className="text-sm text-muted leading-relaxed">
              Het register genereert de documentatie die je nodig hebt: AI-beleid,
              transparantieteksten, toezichtprocedures. Klaar om te delen met
              opdrachtgevers en toezichthouders.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Actueel houden</p>
            <p className="text-sm text-muted leading-relaxed">
              Compliance is geen eenmalig project. Het register herinnert je aan reviews,
              houdt wijzigingen bij en zorgt dat je documentatie up-to-date blijft.
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
                <span>1–2 vestigingen</span>
              </li>
            </ul>
            <Link
              href="/aanvragen"
              className="block text-center px-5 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors no-underline"
            >
              Start met Starter →
            </Link>
          </div>

          {/* Groei — primary */}
          <div className="p-6 border-2 border-accent rounded-xl flex flex-col relative bg-surface">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-accent text-white text-xs font-semibold rounded-full">Meest gekozen</span>
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
                <span>Kwartaal compliance-update</span>
              </li>
            </ul>
            <Link
              href="/aanvragen"
              className="block text-center px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors no-underline"
            >
              Start met Groei →
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
          en herinnert je niet aan deadlines. Het is een lijst, geen systeem.
        </p>
        <p className="text-foreground leading-relaxed">
          Het Normelo AI-register is gebouwd voor uitzendbureaus die hun compliance
          serieus willen regelen — zonder er een dagtaak van te maken.
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
