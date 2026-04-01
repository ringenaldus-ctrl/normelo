import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Hoog-risico AI-systemen volgens de EU AI Act",
  description:
    "Welke AI-systemen zijn hoog-risico onder de EU AI Act? Volledig overzicht van alle categorieën, verplichtingen en voorbeelden.",
};

const faqItems = [
  {
    question: "Welke AI-systemen zijn hoog-risico onder de EU AI Act?",
    answer:
      "De EU AI Act definieert hoog-risico AI-systemen in Bijlage III. Dit omvat AI voor werving en selectie, onderwijs, kredietbeoordeling, rechtshandhaving, migratie, toegang tot essentiële diensten, en biometrische identificatie. Daarnaast zijn AI-systemen die als veiligheidscomponent in gereguleerde producten worden ingebouwd (Bijlage I) ook hoog-risico.",
  },
  {
    question: "Wat zijn de verplichtingen voor hoog-risico AI-systemen?",
    answer:
      "Hoog-risico AI-systemen moeten voldoen aan eisen op het gebied van risicobeheer, data governance, technische documentatie, logging, transparantie, menselijk toezicht, nauwkeurigheid, robuustheid en cyberveiligheid. Providers moeten een conformiteitsbeoordeling uitvoeren en het systeem registreren in de EU-database. Deployers moeten zorgen voor menselijk toezicht, transparantie naar betrokkenen en monitoring van de werking.",
  },
  {
    question: "Wanneer gelden de verplichtingen voor hoog-risico AI?",
    answer:
      "De volledige verplichtingen voor hoog-risico AI-systemen worden van toepassing in augustus 2026. Vanaf dat moment moeten zowel providers als deployers aan alle eisen voldoen.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hoog-risico AI-systemen volgens de EU AI Act",
  description:
    "Welke AI-systemen zijn hoog-risico onder de EU AI Act? Volledig overzicht van alle categorieën, verplichtingen en voorbeelden.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/hoog-risico",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HoogRisico() {
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
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 border-b border-border">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Hoog-risico AI-systemen volgens de EU AI Act
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Hoog-risico AI-systemen zijn AI-systemen die significante gevolgen kunnen hebben voor
            de fundamentele rechten, veiligheid of gezondheid van mensen. De EU AI Act stelt de
            strengste eisen aan deze categorie. Hieronder een volledig overzicht van welke
            systemen hieronder vallen en wat de verplichtingen zijn.
          </p>
        </section>

        {/* Definitie */}
        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Wat maakt een AI-systeem hoog-risico?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            De EU AI Act kent twee routes waardoor een AI-systeem als hoog-risico wordt
            geclassificeerd. De eerste route (Bijlage I) betreft AI-systemen die als
            veiligheidscomponent worden ingebouwd in producten die al onder bestaande EU-wetgeving
            vallen, zoals medische hulpmiddelen, machines, speelgoed en liften. Deze producten
            moeten al een conformiteitsbeoordeling ondergaan; als er een AI-component in zit,
            gelden de extra eisen van de AI Act.
          </p>
          <p className="text-foreground leading-relaxed">
            De tweede route (Bijlage III) betreft AI-systemen die worden ingezet in specifieke
            maatschappelijke domeinen. Dit is de route die voor de meeste organisaties relevant
            is. De wet noemt acht categorieën.
          </p>
        </section>

        {/* De acht categorieën */}
        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-6">De acht categorieën van Bijlage III</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                1. Biometrische identificatie en categorisatie
              </h3>
              <p className="text-foreground leading-relaxed">
                AI-systemen voor biometrische identificatie op afstand, zowel real-time als
                achteraf. Dit omvat gezichtsherkenning in openbare ruimtes, biometrische
                categorisatie op basis van gevoelige kenmerken zoals etniciteit of politieke
                overtuiging, en emotieherkenning op de werkplek en in het onderwijs. Real-time
                biometrische identificatie in openbare ruimtes is in principe verboden, met
                beperkte uitzonderingen voor rechtshandhaving.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                2. Kritieke infrastructuur
              </h3>
              <p className="text-foreground leading-relaxed">
                AI-systemen die als veiligheidscomponent worden ingezet bij het beheer en de
                exploitatie van kritieke infrastructuur. Denk aan AI die het verkeer op snelwegen
                aanstuurt, energienetwerken beheert, of watersystemen monitort. Een storing in
                zo&apos;n systeem kan directe gevolgen hebben voor de fysieke veiligheid van
                grote groepen mensen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                3. Onderwijs en beroepsopleiding
              </h3>
              <p className="text-foreground leading-relaxed">
                AI-systemen die bepalen wie wordt toegelaten tot onderwijsinstellingen, die
                leerresultaten beoordelen wanneer die beoordeling bepalend is voor de
                opleiding van de persoon, die het onderwijsniveau van een persoon vaststellen,
                of die het niveau monitoren van studenten tijdens toetsen. Een AI-gestuurd
                toelatingssysteem voor een universiteit valt hieronder, net als geautomatiseerde
                examenbeoordeling.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                4. Werkgelegenheid en personeelsbeheer
              </h3>
              <p className="text-foreground leading-relaxed mb-2">
                Dit is de categorie die de meeste organisaties raakt. Hoog-risico zijn
                AI-systemen die worden ingezet om kandidaten te werven of te selecteren,
                met name om vacatures gericht te publiceren, sollicitaties te analyseren of
                filteren, en kandidaten te beoordelen tijdens interviews of assessments. Maar
                ook AI-systemen die beslissingen nemen over arbeidsvoorwaarden, promotie,
                beëindiging van arbeidsrelaties, of de toewijzing van taken op basis van
                persoonlijke kenmerken.
              </p>
              <p className="text-foreground leading-relaxed">
                Concreet: een ATS dat cv&apos;s automatisch rankt, een matchingtool die
                kandidaten aan vacatures koppelt, een screeningstool die sollicitanten filtert,
                een tool die medewerkers beoordeelt voor promotie, en een planningssysteem dat
                taken toewijst op basis van profielen — het valt allemaal onder deze categorie.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                5. Toegang tot essentiële diensten
              </h3>
              <p className="text-foreground leading-relaxed">
                AI-systemen die de kredietwaardigheid van personen beoordelen, die
                verzekeringsrisico&apos;s en premies vaststellen, die worden ingezet bij
                de beoordeling van aanvragen voor essentiële publieke diensten (zoals
                bijstand of ziektekostenverzekering), of die prioriteit geven aan nooddiensten
                (zoals brandweer en ambulance). Een AI-model dat bepaalt of je in aanmerking
                komt voor een lening of welke verzekeringspremie je betaalt is hoog-risico.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                6. Rechtshandhaving
              </h3>
              <p className="text-foreground leading-relaxed">
                AI-systemen die door rechtshandhavingsinstanties worden ingezet voor het
                beoordelen van het risico dat iemand slachtoffer wordt van een misdrijf,
                als leugendetector, voor het beoordelen van bewijsmateriaal, het voorspellen
                van criminaliteit (predictive policing op basis van persoonlijke kenmerken
                is verboden), of het profileren van personen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                7. Migratie, asiel en grenscontrole
              </h3>
              <p className="text-foreground leading-relaxed">
                AI-systemen voor het beoordelen van risico&apos;s met betrekking tot irreguliere
                migratie, het verwerken van visa- en asielaanvragen, en het detecteren of
                herkennen van personen aan de grens. Leugendetectors bij grenscontroles vallen
                hier ook onder.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                8. Rechtsbedeling en democratische processen
              </h3>
              <p className="text-foreground leading-relaxed">
                AI-systemen die rechterlijke instanties assisteren bij het onderzoeken en
                interpreteren van feiten en wet, en bij het toepassen van het recht op
                concrete feiten. Ook AI-systemen die worden ingezet om verkiezingsuitslagen
                of stemgedrag te beïnvloeden vallen hieronder (met uitzondering van
                organisatorische hulpmiddelen).
              </p>
            </div>
          </div>
        </section>

        {/* Verplichtingen voor providers */}
        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Verplichtingen voor providers (aanbieders)</h2>
          <p className="text-foreground leading-relaxed mb-6">
            De provider — de partij die het AI-systeem ontwikkelt en op de markt brengt — draagt
            de zwaarste verplichtingen. Dit zijn de kernvereisten:
          </p>
          <div className="space-y-6">
            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Risicobeheersysteem</h3>
              <p className="text-foreground leading-relaxed">
                Een doorlopend proces voor het identificeren, analyseren en mitigeren van
                risico&apos;s gedurende de hele levenscyclus van het AI-systeem. Dit omvat
                het testen van het systeem op bekende en voorzienbare risico&apos;s, het
                vaststellen van acceptatiecriteria, en het nemen van maatregelen om
                geïdentificeerde risico&apos;s te beheersen.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Data governance</h3>
              <p className="text-foreground leading-relaxed">
                Trainings-, validatie- en testdata moeten relevant, representatief, vrij van
                fouten en zo volledig mogelijk zijn. De provider moet specifieke aandacht
                besteden aan mogelijke bias in de data, met name bias die kan leiden tot
                discriminatie van beschermde groepen.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Technische documentatie</h3>
              <p className="text-foreground leading-relaxed">
                Uitgebreide documentatie over het ontwerp, de ontwikkeling en de werking van
                het systeem. Deze documentatie moet aantonen dat het systeem aan alle
                vereisten voldoet en moet beschikbaar zijn voor toezichthouders.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Automatische logging</h3>
              <p className="text-foreground leading-relaxed">
                Het systeem moet automatisch gebeurtenissen registreren (logs) gedurende de
                operationele levensduur. Deze logs moeten traceerbaarheid mogelijk maken
                en moeten worden bewaard voor een passende periode.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Conformiteitsbeoordeling en CE-markering</h3>
              <p className="text-foreground leading-relaxed">
                Voordat het systeem op de markt wordt gebracht, moet de provider een
                conformiteitsbeoordeling uitvoeren die aantoont dat het systeem aan alle
                vereisten voldoet. Na succesvolle beoordeling krijgt het systeem een
                CE-markering en wordt het geregistreerd in de openbare EU-database.
              </p>
            </div>
          </div>
        </section>

        {/* Verplichtingen voor deployers */}
        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Verplichtingen voor deployers (gebruikers)</h2>
          <p className="text-foreground leading-relaxed mb-6">
            Als je een hoog-risico AI-systeem inzet in je organisatie, ben je een deployer. Je
            verplichtingen zijn minder zwaar dan die van de provider, maar ze zijn er wel degelijk:
          </p>
          <div className="space-y-6">
            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Gebruik volgens de instructies</h3>
              <p className="text-foreground leading-relaxed">
                Je moet het systeem gebruiken conform de gebruiksaanwijzing van de provider.
                Gebruik je het voor een ander doel, dan word je mogelijk zelf als provider
                beschouwd — met alle bijbehorende verplichtingen.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Menselijk toezicht</h3>
              <p className="text-foreground leading-relaxed">
                Je moet ervoor zorgen dat de personen die toezicht houden op het systeem
                de juiste competenties, opleiding en autoriteit hebben. Zij moeten de output
                van het systeem kunnen beoordelen en de mogelijkheid hebben om AI-beslissingen
                te overrulen of het systeem te stoppen.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Transparantie en informatieplicht</h3>
              <p className="text-foreground leading-relaxed">
                Personen die door het AI-systeem worden geraakt moeten worden geïnformeerd.
                Bij werkgelegenheid en personeelsbeheer betekent dit dat werknemers en
                kandidaten moeten weten dat er AI wordt ingezet. Bij werknemersvertegenwoordiging
                moeten ook de vakbonden of ondernemingsraad worden geïnformeerd.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Monitoring en incidentmelding</h3>
              <p className="text-foreground leading-relaxed">
                Je moet de werking van het systeem monitoren en bij ernstige incidenten
                (zoals discriminerende output of veiligheidsrisico&apos;s) de provider en
                de bevoegde autoriteiten informeren.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-accent">
              <h3 className="font-semibold mb-1">Effectbeoordeling voor fundamentele rechten</h3>
              <p className="text-foreground leading-relaxed">
                Deployers die overheidsinstanties zijn of die diensten van openbaar belang
                verlenen moeten vóór het in gebruik nemen van een hoog-risico AI-systeem een
                effectbeoordeling voor fundamentele rechten uitvoeren. Voor andere deployers
                wordt dit sterk aanbevolen.
              </p>
            </div>
          </div>
        </section>

        {/* Uitzonderingen */}
        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Wanneer is een AI-systeem géén hoog-risico?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Niet elk AI-systeem dat in een van de acht categorieën wordt ingezet is automatisch
            hoog-risico. De EU AI Act bevat een belangrijke uitzondering: een AI-systeem dat
            in Bijlage III wordt genoemd is niet hoog-risico als het geen significant risico
            vormt voor de gezondheid, veiligheid of fundamentele rechten van personen.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Dit geldt specifiek als het systeem is bedoeld om een beperkte procedurele taak
            uit te voeren, als het bedoeld is om de uitkomst van een eerder genomen menselijke
            beslissing te verbeteren, als het een voorbereidende taak uitvoert, of als het
            patronen detecteert zonder beslissingen te beïnvloeden.
          </p>
          <p className="text-foreground leading-relaxed">
            Maar let op: de provider moet zelf beoordelen of deze uitzondering van toepassing
            is en moet dit documenteren. Als de uitzondering onterecht wordt ingeroepen, gelden
            alsnog alle hoog-risico verplichtingen — plus mogelijke sancties.
          </p>
        </section>

        {/* Terug */}
        <section className="py-12">
          <div className="flex gap-6">
            <Link href="/" className="text-accent hover:underline">
              &larr; Homepage
            </Link>
            <Link href="/uitzendbranche" className="text-accent hover:underline">
              EU AI Act &amp; de Uitzendbranche &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
