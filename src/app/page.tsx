import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Normelo — EU AI Act compliance voor uitzendbureaus",
  description:
    "Ontdek in 2 minuten of jouw uitzendbureau werkt met hoog-risico AI. Gratis Quick Scan, gratis training, en het Normelo AI-register om compliance concreet te regelen.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "Normelo helpt uitzendbureaus met de EU AI Act: Quick Scan, gratis training en een AI-register om compliance te regelen.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "EU AI Act compliance voor uitzendbureaus. Quick Scan, gratis training en het Normelo AI-register.",
};

export default function Home() {
  return (
    <>
    <Script
      id="org-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />

    {/* Hero — Quick Scan als primaire CTA */}
    <section className="bg-dark">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
          Gebruikt jouw bureau hoog-risico AI?<br className="hidden md:block" />
          Ontdek het in 2 minuten.
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mb-8">
          De meeste uitzendbureaus werken dagelijks met AI die onder de EU AI Act als
          hoog-risico wordt geclassificeerd — zonder het te weten. De Quick Scan laat
          zien waar jouw bureau staat.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/quick-scan"
            className="inline-block px-8 py-4 bg-accent hover:bg-accent-hover rounded-lg font-semibold text-lg no-underline transition-colors text-center text-white"
          >
            Start de Quick Scan →
          </Link>
          <Link
            href="/ai-register"
            className="inline-block px-8 py-4 border border-gray-500 text-gray-300 hover:border-gray-300 hover:text-white rounded-lg font-medium text-lg no-underline transition-colors text-center"
          >
            Bekijk het AI-register
          </Link>
        </div>
      </div>
    </section>

    <div className="max-w-4xl mx-auto px-6">

      {/* Weten ≠ geregeld — de commerciële bridge */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Weten wat je moet doen is niet hetzelfde als het geregeld hebben.</h2>
        <p className="text-foreground leading-relaxed mb-4">
          De meeste bureaus weten inmiddels dat de EU AI Act eraan komt. Sommige hebben een
          training gevolgd, een webinar gekeken, of een artikel gelezen. Maar weten dat je een
          AI-register nodig hebt is niet hetzelfde als er een hebben. Weten dat je team
          AI-geletterd moet zijn is niet hetzelfde als het kunnen aantonen.
        </p>
        <p className="text-foreground leading-relaxed">
          Normelo overbrugt dat gat. De Quick Scan laat zien waar je staat. De gratis training
          maakt je team AI-geletterd. En het AI-register zorgt dat je compliance concreet geregeld
          en aantoonbaar is.
        </p>
      </section>

      {/* AI-register — het betaalde product */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">Het Normelo AI-register</h2>
        <p className="text-muted mb-6">Compliance regelen en bijhouden — op één plek.</p>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-2">AI-systemen registreren</p>
            <p className="text-sm text-muted leading-relaxed">
              Carerix, Bullhorn, ChatGPT, Copilot — elk systeem vastgelegd met leverancier,
              doel, risiconiveau en wie toezicht houdt.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-2">Risicobeoordeling per tool</p>
            <p className="text-sm text-muted leading-relaxed">
              Per systeem beoordeel je het risiconiveau. Het register helpt bepalen wat
              hoog-risico is en welke verplichtingen daarbij horen.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-2">Documentatie genereren</p>
            <p className="text-sm text-muted leading-relaxed">
              AI-beleid, transparantieteksten, toezichtprocedures — klaar om te
              delen met opdrachtgevers en toezichthouders.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-2">Actueel houden</p>
            <p className="text-sm text-muted leading-relaxed">
              Compliance is geen eenmalig project. Het register houdt wijzigingen bij
              en zorgt dat je documentatie up-to-date blijft.
            </p>
          </div>
        </div>
        <Link
          href="/ai-register"
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors no-underline"
        >
          Meer over het AI-register →
        </Link>
      </section>

      {/* Leverancier vs. gebruiker vs. Normelo — drie kolommen */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">&ldquo;Maar mijn softwareleverancier regelt dit toch?&rdquo;</h2>
        <p className="text-foreground leading-relaxed mb-6">
          Je leverancier — Carerix, Bullhorn, Mysolution — zorgt dat het product voldoet aan
          de technische eisen. Maar als gebruiker heb je eigen verplichtingen. Vergelijk het
          met een auto: de fabrikant levert een veilig voertuig, maar jij moet nog steeds een
          rijbewijs hebben.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-5 border border-border rounded-lg bg-surface">
            <p className="text-sm font-medium text-muted mb-2 tracking-wide uppercase">De leverancier</p>
            <p className="font-semibold mb-2">Regelt het product</p>
            <p className="text-sm text-muted leading-relaxed">
              Technische documentatie, risicomanagement van het systeem, CE-markering
              en conformiteitsverklaring.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg bg-surface">
            <p className="text-sm font-medium text-muted mb-2 tracking-wide uppercase">Jouw bureau</p>
            <p className="font-semibold mb-2">Moet het gebruik regelen</p>
            <p className="text-sm text-muted leading-relaxed">
              AI-register, AI-beleid, getraind team, menselijk toezicht en transparantie
              naar kandidaten.
            </p>
          </div>
          <div className="p-5 border-2 border-accent rounded-lg bg-surface">
            <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Normelo</p>
            <p className="font-semibold mb-2">Regelt het voor je</p>
            <p className="text-sm text-muted leading-relaxed">
              Gratis training voor AI-geletterdheid. Het AI-register voor documentatie,
              risicobeoordeling en een auditklaar dossier.
            </p>
          </div>
        </div>
      </section>

      {/* Training als fallback */}
      <section className="py-12 border-b border-border">
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Nog niet klaar om te starten?</p>
          <h3 className="text-xl font-bold mb-3">Begin met de gratis training</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-5 max-w-xl">
            Wil je eerst begrijpen wat de EU AI Act precies van jouw bureau vraagt?
            De Normelo training maakt je team AI-geletterd — gratis, in eigen tempo,
            specifiek voor recruiters en intercedenten.
          </p>
          <Link
            href="/aanvragen"
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors no-underline"
          >
            Start de gratis training →
          </Link>
        </div>
      </section>

      {/* Uitgelichte sector */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">Uitgelicht: de uitzendbranche</h2>
        <p className="text-muted mb-6">De meest direct geraakte sector onder de EU AI Act.</p>
        <Link href="/uitzendbranche" className="block p-6 border-2 border-accent rounded-lg hover:shadow-md transition-all no-underline group bg-surface">
          <h3 className="text-lg font-bold mb-2 text-accent">EU AI Act &amp; de Uitzendbranche</h3>
          <p className="text-foreground leading-relaxed mb-2">
            ATS-systemen, CV-screening, matchingtools en shadow AI — waarom de uitzendbranche
            als eerste moet handelen. Inclusief concrete verplichtingen en tijdlijn.
          </p>
          <span className="text-accent font-medium text-sm">Lees de volledige analyse →</span>
        </Link>
      </section>

      {/* Verder lezen */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Verder lezen</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/hoog-risico"
            className="block p-6 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              Hoog-risico AI-systemen
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Alle acht categorieën en de verplichtingen voor providers en deployers.
            </p>
          </Link>
          <Link
            href="/tijdlijn"
            className="block p-6 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              Tijdlijn &amp; deadlines
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Alle belangrijke data van 2024 tot 2027 op een rij.
            </p>
          </Link>
          <Link
            href="/faq"
            className="block p-6 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              Veelgestelde vragen
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              De 12 meest gestelde vragen over de EU AI Act, helder beantwoord.
            </p>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
