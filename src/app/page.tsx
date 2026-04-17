import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Normelo — Klaar voor de EU AI Act. Register, beleid, training en dossier.",
  description:
    "Normelo bereidt uitzendbureaus voor op de EU AI Act. Eén pakket: AI-register, AI-beleid, teamtraining en deelnamebewijs AI-geletterdheid.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "Normelo bereidt uitzendbureaus voor op de EU AI Act. AI-register, AI-beleid, teamtraining en deelnamebewijs AI-geletterdheid in één pakket. Normelo is geen aangemelde instantie (notified body) onder de EU AI Act.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "Voorbereiding op de EU AI Act voor uitzendbureaus. Normelo levert register, beleid, training en dossier — jij houdt de regie.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Normelo EU AI Act Voorbereidingspakket",
  provider: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  description:
    "Voorbereidingstraject op de EU AI Act voor uitzendbureaus: AI-register, AI-beleid op maat, teamtraining en deelnamebewijs AI-geletterdheid. Inspanningsverbintenis; Normelo is geen aangemelde instantie onder de EU AI Act.",
  areaServed: "NL",
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
          Jouw uitzendbureau klaar voor de EU AI Act.<br className="hidden md:block" />
          Zonder dat je er zelf in hoeft te duiken.
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mb-6">
          Normelo levert je AI-register, schrijft je AI-beleid, traint je team
          en bouwt je auditklaar dossier. Jij houdt de regie — wij doen het werk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/aanvragen"
            className="btn-accent inline-block px-8 py-4 bg-accent hover:bg-accent-hover rounded-lg font-semibold text-lg no-underline transition-colors text-center"
          >
            Plan een kennismaking →
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
          De EU AI Act kent boetes tot €35 miljoen of 7% van de wereldwijde jaaromzet. Maar het
          meest directe risico zit dichterbij: een kandidaat die ontdekt dat AI zonder waarborg
          over zijn sollicitatie heeft beslist. Dat is geen theoretisch scenario — het is een
          kwestie van tijd.
        </p>
      </section>

      {/* Leverancier vs. gebruiker — bezwaarweerlegging */}
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
            <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Normelo levert</p>
            <p className="font-semibold mb-2">Jouw deployer-dossier</p>
            <p className="text-sm text-muted leading-relaxed">
              AI-register, AI-beleid op maat, teamtraining met deelnamebewijs,
              en werkinstructies voor menselijk toezicht en transparantie naar
              kandidaten.
            </p>
          </div>
        </div>
      </section>

      {/* Wat je krijgt */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">Eén pakket. Vier concrete deliverables.</h2>
        <p className="text-muted mb-8">Normelo levert de documenten, training en dossieropbouw — niet alleen de kennis.</p>

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
            <p className="font-bold text-lg mb-2">Deelnamebewijs AI-geletterdheid</p>
            <p className="text-sm text-muted leading-relaxed mb-3">
              Elke medewerker die de training afrondt en de toets haalt, ontvangt een
              deelnamebewijs van Normelo. Daarmee kun je aantonen dat je invulling geeft
              aan de AI-geletterdheidsplicht uit artikel 4 van de EU AI Act, richting
              opdrachtgevers, kandidaten en — indien gevraagd — de toezichthouder.
            </p>
            <p className="text-xs text-muted leading-relaxed italic">
              Normelo is geen aangemelde instantie (notified body) onder de EU AI Act.
              Het deelnamebewijs is een privaat attest, geen EU-conformiteitscertificering.
            </p>
          </div>
        </div>
      </section>

      {/* Kennismaking — geen prijs tot we meer klantdata hebben */}
      <section className="py-12 border-b border-border">
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Kennismakingsgesprek</p>
          <h3 className="text-2xl font-bold mb-3">Wat past bij jouw bureau?</h3>
          <p className="text-gray-300 leading-relaxed mb-4 max-w-xl">
            Elke uitzendorganisatie is anders: aantal vestigingen, teamgrootte, welke
            AI-systemen er draaien en hoeveel shadow AI er rondloopt. In een vrijblijvend
            gesprek van 30 minuten brengen we dat in kaart en bespreken we een scope en
            richtprijs die past. Geen verplichtingen.
          </p>
          <p className="text-sm text-orange-200/80 mb-6">
            Op tijd klaar zijn opent deuren: grotere opdrachtgevers, aanbestedingen en
            het vertrouwen van kandidaten die weten dat je zorgvuldig met hun data omgaat.
          </p>
          <Link
            href="/aanvragen"
            className="inline-block px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors no-underline"
          >
            Plan een kennismaking →
          </Link>
        </div>
      </section>

      {/* Voor wie niet */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Voor wie is dit niet?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Niet elk uitzendbureau heeft het volledige pakket nodig. Gebruik je geen ATS met
          ranking, matchingtool of AI-tools zoals ChatGPT bij werving en selectie, dan val je
          waarschijnlijk niet onder de hoog-risico categorie van de EU AI Act. De zwaardere
          verplichtingen rond menselijk toezicht, risicobeheer en registratie gelden dan niet.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Let op: de AI-geletterdheidsplicht (art. 4) geldt wél voor elke organisatie die AI
          inzet, ook low-risk. Voor die groep is een lichtere variant van de training beschikbaar.
        </p>
        <p className="text-foreground leading-relaxed">
          Twijfel je? Doe de Quick Scan — binnen 2 minuten weet je of jouw bureau te maken
          heeft met hoog-risico AI.
        </p>
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
