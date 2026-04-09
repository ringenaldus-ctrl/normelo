import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EU AI Act & de Uitzendbranche",
  description:
    "Wat betekent de EU AI Act voor uitzendbureaus? Uitleg over ATS-systemen, CV-screening en matchingtools als hoog-risico AI.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act & de Uitzendbranche",
  description:
    "Wat betekent de EU AI Act voor uitzendbureaus? Uitleg over ATS-systemen, CV-screening en matchingtools als hoog-risico AI.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/uitzendbranche",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Valt mijn ATS-systeem onder de EU AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een ATS dat alleen sollicitaties ontvangt en organiseert is geen hoog-risico AI. Maar zodra het systeem kandidaten automatisch rankt, filtert of prioriteert op basis van hun profiel, kwalificeert het als hoog-risico AI-systeem onder de EU AI Act (Bijlage III, categorie 4). De meeste moderne ATS-systemen hebben deze functionaliteit ingebouwd.",
      },
    },
    {
      "@type": "Question",
      name: "Wat moet een uitzendbureau regelen voor de EU AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Als uitzendbureau ben je een 'deployer' van hoog-risico AI. Je verplichtingen zijn: menselijk toezicht op AI-beslissingen (recruiters moeten kunnen overrulen), transparantie naar kandidaten (zij moeten weten dat AI wordt ingezet), risicobeheer en monitoring van de AI-systemen, data governance (relevante en representatieve data), en medewerking aan registratie in de EU-database.",
      },
    },
    {
      "@type": "Question",
      name: "Wanneer moet een uitzendbureau EU AI Act compliant zijn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De volledige verplichtingen voor hoog-risico AI-systemen worden van toepassing in augustus 2026. Uitzendbureaus moeten vanaf dat moment aan alle eisen rond menselijk toezicht, transparantie, risicobeheer en data governance voldoen.",
      },
    },
    {
      "@type": "Question",
      name: "Valt CV-screening software onder de EU AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, als de software niet alleen data uit cv's extraheert maar ook een waardeoordeel geeft door kandidaten te scoren of te categoriseren. Een parser die namen en werkervaring uit een cv haalt is geen hoog-risico AI. Een parser die bepaalt dat kandidaat A 'beter' is dan kandidaat B, is dat wel.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is shadow AI en waarom is het een risico voor uitzendbureaus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shadow AI is het gebruik van AI-tools door medewerkers zonder medeweten of toestemming van de organisatie. Denk aan een recruiter die ChatGPT gebruikt om cv's te vergelijken of kandidaten te ranken. Dit is hoog-risico AI-gebruik onder de EU AI Act, maar dan zonder documentatie, toezicht of transparantie. Uit onderzoek blijkt dat 50% van werknemers ongeautoriseerde AI-tools gebruikt. Alleen je officiële systemen compliant maken is daarom niet genoeg.",
      },
    },
  ],
};

export default function Uitzendbranche() {
  return (
    <>
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <section className="bg-dark">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-sm text-accent mb-3 uppercase tracking-wide font-medium">De meest geraakt sector</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
          EU AI Act &amp; de Uitzendbranche
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
          Uitzendbureaus gebruiken dagelijks AI-systemen voor het vinden, selecteren en matchen
          van kandidaten. Veel van deze systemen vallen onder de hoog-risico categorie van de
          EU AI Act. En dan is er nog shadow AI — medewerkers die zelfstandig AI-tools inzetten
          buiten het zicht van de organisatie.
        </p>
      </div>
    </section>

    <div className="max-w-4xl mx-auto px-6">

      {/* Waarom de uitzendbranche */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Waarom raakt dit de uitzendbranche zo direct?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          De EU AI Act bestempelt AI-systemen die worden ingezet voor werving en selectie expliciet
          als hoog-risico. Dit staat in Bijlage III van de verordening, onder categorie 4:
          &ldquo;Werkgelegenheid, personeelsbeheer en toegang tot zelfstandige arbeid.&rdquo;
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Voor de uitzendbranche is dit bijzonder relevant. Het kernproces van een uitzendbureau
          — kandidaten vinden, beoordelen en koppelen aan opdrachtgevers — draait steeds vaker op
          AI-gestuurde systemen. En precies die systemen vallen nu onder de strengste categorie
          van de wet.
        </p>
        <p className="text-foreground leading-relaxed">
          Het maakt daarbij niet uit of je het systeem zelf hebt ontwikkeld. Als je een ATS of
          matchingtool van een leverancier gebruikt, ben je als uitzendbureau een
          &ldquo;deployer&rdquo; in de zin van de wet — en daarmee heb je eigen wettelijke
          verplichtingen.
        </p>
      </section>

      {/* Welke systemen */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Welke systemen vallen hieronder?</h2>
        <p className="text-foreground leading-relaxed mb-6">
          De volgende typen systemen die in de uitzendbranche gangbaar zijn, kwalificeren
          waarschijnlijk als hoog-risico AI:
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">ATS-systemen (Applicant Tracking Systems)</h3>
            <p className="text-foreground leading-relaxed mb-2">
              Een ATS dat sollicitaties ontvangt en organiseert is op zichzelf geen hoog-risico
              AI. Maar zodra het systeem kandidaten automatisch rankt, filtert of prioriteert op
              basis van hun profiel, wordt het een AI-systeem dat beslissingen beïnvloedt over
              toegang tot werk. En dat is precies wat de EU AI Act als hoog-risico classificeert.
            </p>
            <p className="text-foreground leading-relaxed">
              In de praktijk hebben de meeste moderne ATS-systemen deze functionaliteit ingebouwd.
              Denk aan automatisch scoren van cv&apos;s, &ldquo;best match&rdquo;-lijsten, of
              AI-gestuurde aanbevelingen over welke kandidaat het beste past bij een vacature.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">CV-screening en parsingsoftware</h3>
            <p className="text-foreground leading-relaxed mb-2">
              Software die cv&apos;s automatisch uitleest, structureert en beoordeelt is een
              kernonderdeel van veel uitzendprocessen. Wanneer deze software niet alleen data
              extraheert maar ook een waardeoordeel geeft — bijvoorbeeld door kandidaten te
              scoren of te categoriseren — valt het onder de hoog-risico definitie.
            </p>
            <p className="text-foreground leading-relaxed">
              Het onderscheid is subtiel maar belangrijk: een parser die namen en werkervaring
              uit een cv haalt is geen hoog-risico AI. Een parser die vervolgens bepaalt dat
              kandidaat A &ldquo;beter&rdquo; is dan kandidaat B, wél.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Matchingtools en AI-gestuurde aanbevelingen</h3>
            <p className="text-foreground leading-relaxed mb-2">
              Matchingsoftware die kandidaten automatisch koppelt aan vacatures of opdrachtgevers
              op basis van profielen, vaardigheden en voorkeuren is een van de meest gebruikte
              AI-toepassingen in de uitzendbranche. Deze systemen maken beslissingen die direct
              invloed hebben op iemands toegang tot werk.
            </p>
            <p className="text-foreground leading-relaxed">
              De EU AI Act is hier expliciet over: AI-systemen die worden ingezet om
              &ldquo;natuurlijke personen te werven of te selecteren, met name om gerichte
              vacaturemededelingen te plaatsen, sollicitaties te analyseren of te filteren, en
              kandidaten te beoordelen&rdquo; zijn hoog-risico.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Chatbots en geautomatiseerde interviews</h3>
            <p className="text-foreground leading-relaxed">
              Steeds meer uitzendbureaus zetten chatbots of geautomatiseerde interviewtools in
              voor de eerste screening van kandidaten. Wanneer de output van zo&apos;n systeem
              wordt gebruikt om kandidaten te selecteren of af te wijzen, valt het onder de
              hoog-risico categorie. Een chatbot die alleen administratieve vragen beantwoordt
              (&ldquo;hoe laat is mijn gesprek?&rdquo;) valt hier niet onder.
            </p>
          </div>
        </div>
      </section>

      {/* Shadow AI */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Het onzichtbare risico: shadow AI</h2>
        <p className="text-foreground leading-relaxed mb-4">
          De bovenstaande systemen zijn de officiële tools die een uitzendbureau inkoopt en beheert.
          Maar er is een groeiend probleem dat de meeste organisaties over het hoofd zien:
          medewerkers die zelfstandig AI-tools inzetten, buiten het zicht van IT en compliance. Dit
          wordt shadow AI genoemd.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Uit onderzoek blijkt dat 50% van de werknemers ongeautoriseerde AI-tools gebruikt op het
          werk. In de uitzendbranche ziet dat er concreet zo uit: een recruiter die ChatGPT of
          Claude gebruikt om cv&apos;s samen te vatten of te vergelijken. Een vestigingsmanager die
          kandidaatprofielen door een AI-tool haalt om een shortlist te maken. Een intercedent die
          een AI-chatbot gebruikt om sollicitatiegesprekken voor te bereiden met suggesties over
          welke kandidaat het beste past.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Het probleem: dit is hoog-risico AI-gebruik onder de EU AI Act — zonder documentatie,
          zonder menselijk toezicht, zonder transparantie naar de kandidaat, en zonder dat de
          organisatie ervan weet. De wet maakt geen onderscheid tussen een officieel ATS en een
          recruiter die zelfstandig een AI-tool gebruikt voor selectiebeslissingen.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          De financiële impact is aanzienlijk. Organisaties met veel shadow AI betalen gemiddeld
          $670.000 meer per datalek. En 46% van de medewerkers geeft aan door te gaan met
          ongeautoriseerde AI-tools, zelfs als het expliciet verboden wordt.
        </p>
        <p className="text-foreground leading-relaxed">
          Alleen je officiële systemen compliant maken is daarom niet genoeg. Echte compliance
          vereist dat medewerkers begrijpen welk AI-gebruik wel en niet mag, en waarom. Dat
          begint bij AI-geletterdheid — een verplichting die overigens nu al geldt onder artikel 4
          van de EU AI Act.
        </p>
      </section>

      {/* Verplichtingen */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wat moet je als uitzendbureau regelen?</h2>
        <p className="text-foreground leading-relaxed mb-6">
          Als deployer van hoog-risico AI-systemen krijg je op grond van de EU AI Act een aantal
          concrete verplichtingen. De belangrijkste voor uitzendbureaus:
        </p>

        <div className="space-y-6">
          <div className="pl-4 border-l-2 border-accent">
            <h3 className="font-semibold mb-1">Menselijk toezicht</h3>
            <p className="text-foreground leading-relaxed">
              Je moet waarborgen dat er altijd menselijk toezicht is op de output van het
              AI-systeem. Een recruiter moet de mogelijkheid hebben om AI-beslissingen te
              overrulen. Volledig geautomatiseerde afwijzingen zonder menselijke tussenkomst
              zijn problematisch.
            </p>
          </div>

          <div className="pl-4 border-l-2 border-accent">
            <h3 className="font-semibold mb-1">Transparantie naar kandidaten</h3>
            <p className="text-foreground leading-relaxed">
              Kandidaten moeten weten dat er AI wordt ingezet in het selectieproces. Dit gaat
              verder dan een regel in de privacy policy. Je moet helder communiceren dat en hoe
              AI-systemen een rol spelen in de beoordeling van hun sollicitatie.
            </p>
          </div>

          <div className="pl-4 border-l-2 border-accent">
            <h3 className="font-semibold mb-1">Risicobeheer en monitoring</h3>
            <p className="text-foreground leading-relaxed">
              Je moet een risicobeheerproces hebben voor de AI-systemen die je inzet. Dit
              omvat het monitoren van de werking, het signaleren van fouten of bias, en het
              bijhouden van logs. Je hoeft het systeem niet zelf technisch te doorgronden,
              maar je moet wel aantoonbaar grip hebben op de risico&apos;s.
            </p>
          </div>

          <div className="pl-4 border-l-2 border-accent">
            <h3 className="font-semibold mb-1">Data governance</h3>
            <p className="text-foreground leading-relaxed">
              De data die je in het AI-systeem invoert moet relevant, representatief en zo
              veel mogelijk vrij van fouten zijn. Als je trainingsdata of inputdata van
              kandidaten bevat die structureel bepaalde groepen benadeelt, ben je
              medeverantwoordelijk.
            </p>
          </div>

          <div className="pl-4 border-l-2 border-accent">
            <h3 className="font-semibold mb-1">Registratie in de EU-database</h3>
            <p className="text-foreground leading-relaxed">
              Bepaalde hoog-risico AI-systemen moeten worden geregistreerd in een openbare
              EU-database. Als deployer moet je hier aan meewerken. De exacte vereisten
              worden momenteel verder uitgewerkt.
            </p>
          </div>
        </div>
      </section>

      {/* Tijdlijn specifiek voor uitzendbranche */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wanneer moet dit geregeld zijn?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          De EU AI Act is op 1 augustus 2024 in werking getreden, maar de verplichtingen worden
          stapsgewijs van toepassing. Voor uitzendbureaus zijn de volgende data relevant:
        </p>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <span className="text-sm font-mono text-accent whitespace-nowrap mt-0.5">feb 2025</span>
            <p className="text-foreground leading-relaxed">
              Verbod op AI-systemen met onaanvaardbaar risico (zoals sociale scoring en
              manipulatieve systemen). Niet direct relevant voor standaard uitzendprocessen,
              maar wel goed om te weten.
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-sm font-mono text-accent whitespace-nowrap mt-0.5">aug 2025</span>
            <p className="text-foreground leading-relaxed">
              Verplichtingen voor aanbieders van general-purpose AI-modellen (denk aan grote
              taalmodellen). Relevant als je leverancier zo&apos;n model inzet.
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-sm font-mono text-accent whitespace-nowrap mt-0.5">aug 2026</span>
            <p className="text-foreground leading-relaxed font-semibold">
              De volledige verplichtingen voor hoog-risico AI-systemen worden van toepassing.
              Dit is de deadline waar uitzendbureaus naartoe moeten werken. Vanaf dit moment
              moeten alle eisen rond menselijk toezicht, transparantie, risicobeheer en
              data governance operationeel zijn.
            </p>
          </div>
        </div>
      </section>

      {/* Praktische stappen */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wat kun je nu al doen?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Augustus 2026 lijkt ver weg, maar de voorbereidingen kosten tijd. Een aantal stappen
          die je nu al kunt zetten:
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Breng in kaart welke AI-systemen je gebruikt. Maak een inventarisatie van alle software
          in je wervings- en selectieproces die enige vorm van automatische besluitvorming bevat.
          Vraag je leveranciers expliciet of hun systemen AI-componenten bevatten en zo ja, welke.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Beoordeel per systeem of het als hoog-risico kwalificeert. Niet elk systeem dat het
          woord &ldquo;AI&rdquo; in de marketingtekst heeft staan, is automatisch hoog-risico.
          Het gaat om systemen die daadwerkelijk invloed hebben op selectiebeslissingen.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Ga het gesprek aan met je leveranciers. Zij zijn als &ldquo;provider&rdquo; onder de
          EU AI Act verantwoordelijk voor de technische kant — conformiteitsbeoordelingen,
          technische documentatie, CE-markering. Maar jij moet als deployer wel kunnen aantonen
          dat je het systeem correct en verantwoord inzet.
        </p>
        <p className="text-foreground leading-relaxed">
          Begin met het opzetten van interne processen voor menselijk toezicht en transparantie.
          Zorg dat recruiters weten welke systemen AI bevatten en hoe ze AI-beslissingen moeten
          beoordelen. En zorg dat kandidaten geïnformeerd worden.
        </p>
      </section>

      {/* Quick Scan CTA */}
      <section className="py-12 border-b border-border">
        <div className="rounded-lg p-8 bg-surface">
          <h2 className="text-2xl font-bold mb-3">Hoe compliant is jouw uitzendbureau?</h2>
          <p className="text-foreground leading-relaxed mb-5 max-w-2xl">
            Doe de gratis Quick Scan en ontdek in 2 minuten welke van jouw systemen als
            hoog-risico kwalificeren onder de EU AI Act. Inclusief shadow AI-risico&apos;s.
          </p>
          <Link
            href="/quick-scan"
            className="btn-accent inline-block px-6 py-3 bg-accent hover:bg-accent-hover rounded-lg font-medium no-underline transition-colors"
          >
            Start de Quick Scan →
          </Link>
        </div>
      </section>

      {/* Certificering hint */}
      <section className="py-12 border-b border-border">
        <p className="text-muted leading-relaxed italic">
          Normelo werkt aan een certificeringsprogramma specifiek voor de uitzendbranche.
          AI-geletterdheid voor recruiters, intercedenten en hiring managers — zodat niet
          alleen je systemen, maar ook je mensen compliant zijn. Meer informatie volgt.
        </p>
      </section>

      {/* Bottom navigation */}
      <section className="py-12">
        <div className="flex gap-6">
          <Link href="/hoog-risico" className="text-accent hover:underline">
            &larr; Hoog-risico AI
          </Link>
          <Link href="/" className="text-accent hover:underline">
            Homepage
          </Link>
          <Link href="/tijdlijn" className="text-accent hover:underline">
            Tijdlijn &amp; deadlines &rarr;
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
