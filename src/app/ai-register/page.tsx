import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-register voor uitzendbureaus — Normelo",
  description:
    "Het Normelo AI-register: registreer je AI-systemen, bouw je compliance-documentatie op en houd alles bij in één platform.",
};

export default function AIRegister() {
  return (
    <div className="max-w-3xl mx-auto px-6">
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

      {/* Eerste stap */}
      <section className="py-12">
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Begin bij het begin</p>
          <h3 className="text-xl font-bold mb-3">Eerst leren, dan regelen</h3>
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
