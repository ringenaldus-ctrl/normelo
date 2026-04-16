import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Normelo — Wij maken jouw uitzendbureau EU AI Act compliant",
  description:
    "Normelo ontzorgt uitzendbureaus bij de EU AI Act. Eén pakket: AI-register, AI-beleid, teamtraining en certificaat. Vast tarief €3.500.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "Normelo maakt uitzendbureaus EU AI Act compliant. AI-register, AI-beleid, teamtraining en certificering in één pakket.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "EU AI Act compliance voor uitzendbureaus. Normelo regelt het — jij kunt door met ondernemen.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Normelo EU AI Act Compliance Pakket",
  provider: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  description:
    "Compleet ontzorgpakket voor EU AI Act compliance: AI-register, AI-beleid op maat, teamtraining en certificering.",
  offers: {
    "@type": "Offer",
    price: "3500",
    priceCurrency: "EUR",
    description: "Vast tarief per bureau, ongeacht teamgrootte",
  },
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
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />

    {/* Hero */}
    <section className="bg-dark">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
          Wij maken jouw uitzendbureau<br className="hidden md:block" />
          EU AI Act compliant.
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mb-6">
          Geen cursussen om zelf uit te zoeken. Geen templates om zelf in te vullen.
          Normelo regelt je AI-register, schrijft je AI-beleid, traint je team en
          levert het certificaat. Jij kunt door met ondernemen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/aanvragen"
            className="btn-accent inline-block px-8 py-4 bg-accent hover:bg-accent-hover rounded-lg font-semibold text-lg no-underline transition-colors text-center"
          >
            Vraag het pakket aan →
          </Link>
          <Link
            href="/quick-scan"
            className="inline-block px-8 py-4 border border-gray-500 text-gray-300 hover:border-gray-300 hover:text-white rounded-lg font-medium text-lg no-underline transition-colors text-center"
          >
            Doe eerst de Quick Scan
          </Link>
        </div>
      </div>
    </section>

    <div className="max-w-4xl mx-auto px-6">

      {/* Het probleem */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">De wet geldt al. De meeste bureaus zijn nog niet klaar.</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Sinds augustus 2024 is de EU AI Act van kracht. Uitzendbureaus die ATS-systemen,
          matchingtools of CV-screening gebruiken, werken met hoog-risico AI. Dat betekent
          wettelijke verplichtingen: een AI-register, AI-beleid, menselijk toezicht, transparantie
          naar kandidaten en een AI-geletterd team.
        </p>
        <p className="text-foreground leading-relaxed">
          De meeste bureaus weten dit niet. Of ze denken dat hun softwareleverancier het regelt.
          Dat klopt niet — je leverancier zorgt voor het product, maar als gebruiker heb je
          eigen verplichtingen. Vergelijk het met een auto: de fabrikant levert een veilig voertuig,
          maar jij moet nog steeds een rijbewijs hebben.
        </p>
      </section>

      {/* Wat je krijgt */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">Eén pakket. Alles geregeld.</h2>
        <p className="text-muted mb-8">Normelo levert het resultaat — niet alleen de kennis.</p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border border-border rounded-lg">
            <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Stap 1</p>
            <p className="font-bold text-lg mb-2">AI-register</p>
            <p className="text-sm text-muted leading-relaxed">
              Wij inventariseren welke AI-systemen jouw bureau gebruikt en vullen het
              AI-register voor je in. Carerix, Bullhorn, ChatGPT, Copilot — alles gedocumenteerd
              zoals de wet het vereist.
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg">
            <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Stap 2</p>
            <p className="font-bold text-lg mb-2">AI-beleid op maat</p>
            <p className="text-sm text-muted leading-relaxed">
              Geen standaard template, maar een beleidsdocument afgestemd op jouw bureau.
              Wat mag wel, wat mag niet, wie houdt toezicht, en hoe je kandidaten informeert.
              Klaar om te delen met je team.
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg">
            <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Stap 3</p>
            <p className="font-bold text-lg mb-2">Teamtraining</p>
            <p className="text-sm text-muted leading-relaxed">
              Elke recruiter, intercedent en teamleider krijgt een praktische training
              over de AI-systemen die jullie dagelijks gebruiken. Geen juridische taal —
              concrete kennis die ze direct kunnen toepassen.
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg">
            <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Stap 4</p>
            <p className="font-bold text-lg mb-2">Certificaat</p>
            <p className="text-sm text-muted leading-relaxed">
              Elke medewerker die de training afrondt, ontvangt een Normelo AI-geletterdheid
              certificaat. Jouw bewijs richting toezichthouders, opdrachtgevers en kandidaten
              dat je compliance serieus neemt.
            </p>
          </div>
        </div>
      </section>

      {/* Prijs */}
      <section className="py-12 border-b border-border">
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Vast tarief</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold">€3.500</span>
            <span className="text-gray-400">per bureau</span>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-xl">
            Eén prijs, alles inbegrepen. Ongeacht het aantal medewerkers. Je krijgt een
            ingevuld AI-register, AI-beleid op maat, teamtraining voor al je medewerkers
            en een certificaat per persoon.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Inclusief: inventarisatie, register, beleid, training, toets, certificaten en compliance-dossier.
          </p>
          <Link
            href="/aanvragen"
            className="inline-block px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors no-underline"
          >
            Vraag het pakket aan →
          </Link>
        </div>
      </section>

      {/* Waarom Normelo */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">&ldquo;Maar mijn softwareleverancier regelt dit toch?&rdquo;</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Dat is de meest gehoorde misvatting. Je leverancier — Carerix, Bullhorn, Mysolution —
          zorgt dat het product voldoet aan de technische eisen. CE-markering, conformiteitsverklaring,
          productdocumentatie. Dat is hun verantwoordelijkheid.
        </p>
        <p className="text-foreground leading-relaxed mb-6">
          Maar als gebruiker van die software heb je eigen verplichtingen. Je moet menselijk
          toezicht inrichten, kandidaten informeren, een AI-register bijhouden en je team
          AI-geletterd maken. Dat regelt geen leverancier voor je. Dat regelt Normelo.
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
            <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Normelo regelt</p>
            <p className="font-semibold mb-2">Jouw compliance</p>
            <p className="text-sm text-muted leading-relaxed">
              AI-register, AI-beleid, teamtraining, certificering, menselijk toezicht
              en transparantie naar kandidaten.
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
