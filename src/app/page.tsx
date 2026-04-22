import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import RegistratieForm from "./components/RegistratieForm";

export const metadata: Metadata = {
  title: "Normelo — Gratis EU AI Act training voor uitzendbureaus",
  description:
    "Leer gratis wat de EU AI Act voor jouw uitzendbureau betekent. Gebruik daarna het Normelo AI-register om je compliance concreet te regelen.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "Normelo helpt uitzendbureaus met de EU AI Act: gratis training voor AI-geletterdheid en een AI-register om compliance te regelen.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "Gratis EU AI Act training voor uitzendbureaus. Na de training: het Normelo AI-register voor compliance.",
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

    {/* Hero met registratieformulier */}
    <section className="bg-dark">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
              Leer gratis wat de EU AI Act voor jouw bureau betekent.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Sinds februari 2025 moeten medewerkers die met AI werken AI-geletterd zijn.
              De Normelo training legt uit wat dat betekent voor recruiters en intercedenten
              — gratis, in je eigen tempo.
            </p>
          </div>
          <div>
            <RegistratieForm />
          </div>
        </div>
      </div>
    </section>

    <div className="max-w-4xl mx-auto px-6">

      {/* Wat je leert */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wat je leert in de training</h2>
        <p className="text-foreground leading-relaxed mb-6">
          De training is specifiek gemaakt voor de uitzendbranche. Geen juridische taal,
          maar concrete kennis die je direct kunt toepassen.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-2">Welke AI je al gebruikt</p>
            <p className="text-sm text-muted leading-relaxed">
              ATS-systemen, matchingtools, ChatGPT, Copilot — je leert welke tools
              onder de EU AI Act vallen en waarom.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-2">Wat de wet van jou vraagt</p>
            <p className="text-sm text-muted leading-relaxed">
              Hoog-risico classificatie, menselijk toezicht, transparantie naar kandidaten.
              Concreet uitgelegd voor jouw dagelijkse praktijk.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-2">Waar de risico&apos;s zitten</p>
            <p className="text-sm text-muted leading-relaxed">
              Shadow AI, onbewuste discriminatie door ranking-algoritmes, en waarom
              je softwareleverancier het niet voor je oplost.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-2">Wat je concreet moet doen</p>
            <p className="text-sm text-muted leading-relaxed">
              Na de training weet je precies welke documenten je nodig hebt en welke
              stappen je bureau moet zetten.
            </p>
          </div>
        </div>
      </section>

      {/* Van kennis naar actie — AI-register */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Kennis opgedaan. En nu?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Na de training weet je wat je moet doen. Maar weten is niet hetzelfde als geregeld
          hebben. Je hebt een AI-register nodig waar je al je systemen registreert, een
          risicobeoordeling per tool, documentatie die je kunt overleggen aan opdrachtgevers
          en toezichthouders.
        </p>
        <p className="text-foreground leading-relaxed mb-6">
          Daar bouwt Normelo de tooling voor. Het Normelo AI-register helpt je om je
          compliance concreet te regelen en bij te houden — geen Excels, geen losse
          documenten, maar één plek waar alles samenkomt.
        </p>
        <Link
          href="/ai-register"
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors no-underline"
        >
          Meer over het AI-register →
        </Link>
      </section>

      {/* Leverancier vs. gebruiker */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">&ldquo;Maar mijn softwareleverancier regelt dit toch?&rdquo;</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Dat is de meest gehoorde misvatting. Je leverancier — Carerix, Bullhorn, Mysolution —
          zorgt dat het product voldoet aan de technische eisen. CE-markering, conformiteitsverklaring,
          productdocumentatie. Dat is hun verantwoordelijkheid.
        </p>
        <p className="text-foreground leading-relaxed mb-6">
          Maar als gebruiker van die software heb je eigen verplichtingen. Vergelijk het met een
          auto: de fabrikant levert een veilig voertuig, maar jij moet nog steeds een rijbewijs
          hebben. Zonder getrainde medewerkers is de CE-markering van je leverancier niet genoeg.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 border border-border rounded-lg bg-surface">
            <p className="text-sm font-medium text-muted mb-2 tracking-wide uppercase">De leverancier regelt</p>
            <p className="font-semibold mb-2">Het product</p>
            <p className="text-sm text-muted leading-relaxed">
              Technische documentatie, risicomanagement van het systeem, CE-markering
              en conformiteitsverklaring.
            </p>
          </div>
          <div className="p-5 border-2 border-accent rounded-lg bg-surface">
            <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Jij regelt</p>
            <p className="font-semibold mb-2">Het gebruik</p>
            <p className="text-sm text-muted leading-relaxed">
              AI-register, AI-beleid, getraind team, menselijk toezicht en transparantie
              naar kandidaten. De training en het AI-register helpen je daarbij.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Scan CTA */}
      <section className="py-12 border-b border-border">
        <div className="rounded-lg p-8 bg-surface">
          <h2 className="text-2xl font-bold mb-3">Niet zeker of dit voor jou geldt?</h2>
          <p className="text-foreground leading-relaxed mb-5 max-w-2xl">
            Doe de Quick Scan en ontdek in 2 minuten of jouw bureau werkt met
            hoog-risico AI volgens de EU AI Act.
          </p>
          <Link
            href="/quick-scan"
            className="btn-accent inline-block px-6 py-3 bg-accent hover:bg-accent-hover rounded-lg font-medium no-underline transition-colors"
          >
            Start de Quick Scan →
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
