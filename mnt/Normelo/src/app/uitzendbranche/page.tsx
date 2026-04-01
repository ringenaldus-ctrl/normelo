import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EU AI Act & de Uitzendbranche",
  description:
    "Wat betekent de EU AI Act voor uitzendbureaus? Uitleg over ATS-systemen, CV-screening en matchingtools als hoog-risico AI.",
};

export default function Uitzendbranche() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <p className="text-sm text-muted mb-3 uppercase tracking-wide">Sectorpagina</p>
        <h1 className="text-4xl font-bold leading-tight mb-6">
          EU AI Act &amp; de Uitzendbranche
        </h1>
        <p className="text-lg text-muted max-w-2xl leading-relaxed">
          Uitzendbureaus gebruiken dagelijks AI-systemen voor het vinden, selecteren en matchen
          van kandidaten. Veel van deze systemen vallen onder de hoog-risico categorie van de
          EU AI Act. Dit is wat je moet weten.
        </p>
      </section>

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

      {/* Terug naar home */}
      <section className="py-12">
        <Link
          href="/"
          className="text-accent hover:underline"
        >
          &larr; Terug naar de homepage
        </Link>
      </section>
    </div>
  );
}
