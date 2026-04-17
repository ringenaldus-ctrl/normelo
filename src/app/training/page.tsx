import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-geletterdheid training voor uitzendbureaus — art. 4 EU AI Act",
  description:
    "Sinds 2 februari 2025 moeten medewerkers die met AI werken AI-geletterd zijn (art. 4 EU AI Act). Wat dat betekent voor recruiters en intercedenten, en hoe Normelo het regelt als onderdeel van het voorbereidingspakket.",
};

export default function Training() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <div className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-red-50 text-red-700 rounded-md border border-red-200">
          Artikel 4 — verplicht sinds 2 februari 2025
        </div>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          AI-geletterdheid voor recruiters en intercedenten
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Artikel 4 van de EU AI Act verplicht elke organisatie die AI inzet om medewerkers
          voldoende kennis van AI te geven. Voor uitzendbureaus raakt dat direct de mensen
          die elke dag met ATS-systemen, matchingtools en ChatGPT werken.
        </p>
      </section>

      {/* Wat zegt art. 4 */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wat zegt artikel 4 precies?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Aanbieders én gebruikers van AI-systemen moeten &ldquo;de beste inspanningen leveren
          om een voldoende niveau van AI-geletterdheid van hun personeel en andere personen die
          namens hen AI-systemen exploiteren en gebruiken, te waarborgen.&rdquo; Daarbij moet
          rekening gehouden worden met hun technische kennis, ervaring, opleiding en de context
          waarin de AI wordt ingezet.
        </p>
        <p className="text-foreground leading-relaxed">
          Voor een uitzendbureau betekent dat concreet: een recruiter die een ATS met
          ranking-functionaliteit gebruikt, moet begrijpen hoe die ranking tot stand komt,
          welke risico&apos;s daar voor kandidaten aan zitten, en wanneer hij of zij moet
          ingrijpen. Een intercedent die ChatGPT inzet om cv&apos;s samen te vatten, moet
          weten wat wel en niet mag volgens het AI-beleid van de organisatie.
        </p>
      </section>

      {/* Waarom dit niet op te lossen met een generieke cursus */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Waarom een generieke AI-cursus niet voldoet</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Art. 4 vraagt om &ldquo;voldoende&rdquo; geletterdheid gegeven de context. Een
          half uur introductie over prompt engineering is niet genoeg voor iemand die
          selectiebeslissingen neemt op basis van AI-output. De training moet afgestemd
          zijn op de systemen die jullie daadwerkelijk gebruiken, op de kandidaatprocessen
          die jullie draaien, en op het AI-beleid dat bij die systemen hoort.
        </p>
        <p className="text-foreground leading-relaxed">
          Ook moet je aantoonbaar kunnen maken dat je deze inspanning hebt geleverd. Dat
          betekent: wie heeft wanneer welke training gevolgd, met welk resultaat, en tegen
          welke versie van het beleid.
        </p>
      </section>

      {/* Hoe Normelo het aanpakt */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Hoe Normelo het aanpakt</h2>
        <p className="text-foreground leading-relaxed mb-4">
          AI-geletterdheid is bij ons geen losse cursus, maar één van de vier pijlers van het
          voorbereidingspakket. De training sluit aan op jouw AI-register en AI-beleid, zodat
          medewerkers niet alleen &ldquo;iets over AI&rdquo; leren, maar precies weten hoe ze
          de systemen in jullie bureau moeten gebruiken — en wat ze niet mogen.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Elke deelnemer sluit af met een toets en ontvangt bij een voldoende een Normelo
          deelnamebewijs AI-geletterdheid, zodat je per medewerker en per datum kunt laten
          zien dat je invulling hebt gegeven aan art. 4.
        </p>
        <p className="text-xs text-muted italic">
          Normelo is geen aangemelde instantie (notified body) onder de EU AI Act. Het
          deelnamebewijs is een privaat attest, geen EU-conformiteitscertificering.
        </p>
      </section>

      {/* CTA naar het pakket */}
      <section className="py-12 border-b border-border">
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Onderdeel van het voorbereidingspakket</p>
          <h3 className="text-xl font-bold mb-3">Van register tot getraind team — in één traject</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            AI-geletterdheidstraining komt bij Normelo samen met inventarisatie, AI-register,
            AI-beleid en een auditklaar dossier. In een kennismakingsgesprek brengen we je
            situatie in kaart en bespreken we scope en richtprijs.
          </p>
          <Link
            href="/aanvragen"
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors no-underline"
          >
            Plan een kennismaking →
          </Link>
        </div>
      </section>

      {/* Verder lezen */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Meer over de EU AI Act</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/uitzendbranche"
            className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">EU AI Act &amp; de Uitzendbranche</h3>
            <p className="text-sm text-muted leading-relaxed">Hoog-risico systemen, shadow AI en wat dit betekent voor jouw bureau</p>
          </Link>
          <Link
            href="/quick-scan"
            className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Quick Scan</h3>
            <p className="text-sm text-muted leading-relaxed">Ontdek in 2 minuten of jouw bureau werkt met hoog-risico AI</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
