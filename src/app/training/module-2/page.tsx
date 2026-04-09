import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Module 2 — Hoog-risico AI in de uitzendbranche",
  description:
    "Welke AI-systemen in de uitzendbranche als hoog-risico worden aangemerkt: ATS, matchingtools, CV-screening en planningssoftware. Module 2 van de Normelo training.",
};

export default function Module2() {
  return (
    <div className="max-w-2xl mx-auto px-6">
      <nav className="py-4 text-sm text-muted">
        <Link href="/training" className="hover:text-accent">Training</Link>
        <span className="mx-2">›</span>
        <span>Module 2</span>
      </nav>

      <article className="py-8">
        <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">
          Module 2 van 6
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-6">
          Hoog-risico AI in de uitzendbranche
        </h1>

        <div className="prose-custom space-y-6 text-foreground leading-relaxed">
          <p>
            In module 1 heb je geleerd dat de EU AI Act AI-systemen indeelt op basis van
            risico. Voor de uitzendbranche is één categorie bijzonder relevant: hoog-risico.
            In deze module leer je precies welke systemen daaronder vallen en waarom.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Bijlage III, categorie 4: werkgelegenheid</h2>
          <p>
            De EU AI Act bevat een bijlage (Annex III) die precies opsomt welke toepassingen
            als hoog-risico worden aangemerkt. Categorie 4 gaat over werkgelegenheid,
            personeelsbeheer en toegang tot zelfstandige arbeid. Dit is de categorie die
            de uitzendbranche direct raakt.
          </p>
          <p>
            Onder deze categorie vallen AI-systemen die worden ingezet voor:
          </p>
          <div className="my-4 space-y-2">
            <div className="p-3 bg-red-50 rounded border-l-3 border-red-400 text-sm">
              Het werven of selecteren van kandidaten — met name het plaatsen van gerichte
              vacatureadvertenties, het screenen of filteren van sollicitaties, en het
              beoordelen van kandidaten
            </div>
            <div className="p-3 bg-red-50 rounded border-l-3 border-red-400 text-sm">
              Het nemen van beslissingen over arbeidsvoorwaarden, promotie of beëindiging
              van arbeidsrelaties
            </div>
            <div className="p-3 bg-red-50 rounded border-l-3 border-red-400 text-sm">
              Het toewijzen van taken op basis van individueel gedrag of persoonlijke
              kenmerken
            </div>
            <div className="p-3 bg-red-50 rounded border-l-3 border-red-400 text-sm">
              Het monitoren en beoordelen van prestaties en gedrag van werknemers
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Welke systemen in jouw uitzendbureau hoog-risico zijn
          </h2>

          <p>
            Laten we concreet worden. Dit zijn de systemen die uitzendbureaus dagelijks
            gebruiken en die onder de hoog-risico categorie vallen:
          </p>

          <div className="my-6 space-y-5">
            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold text-base mb-2">ATS met AI-ranking</p>
              <p className="text-sm text-muted mb-3">
                Een Applicant Tracking System dat cv&apos;s automatisch rankt of scoort
                op basis van vacature-eisen. Het systeem bepaalt welke kandidaten bovenaan
                verschijnen en welke onderaan — of helemaal niet zichtbaar zijn voor de
                recruiter.
              </p>
              <p className="text-sm">
                <strong>Waarom hoog-risico:</strong> het systeem beslist wie een kans
                krijgt en wie niet. Een kandidaat die onderaan de lijst belandt of
                automatisch wordt weggefilterd, weet niet dat AI die beslissing heeft
                genomen.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold text-base mb-2">Matchingtools</p>
              <p className="text-sm text-muted mb-3">
                Software die kandidaten automatisch koppelt aan vacatures op basis van
                vaardigheden, ervaring, locatie of andere criteria. De tool bepaalt welke
                matches een recruiter te zien krijgt.
              </p>
              <p className="text-sm">
                <strong>Waarom hoog-risico:</strong> de matching beïnvloedt direct welke
                kandidaten worden voorgesteld voor een functie. Wie niet gematcht wordt,
                komt niet in beeld — ongeacht of die persoon geschikt zou zijn.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold text-base mb-2">CV-screening met AI</p>
              <p className="text-sm text-muted mb-3">
                Systemen die cv&apos;s automatisch analyseren en filteren. Ze zoeken
                naar keywords, beoordelen werkervaring, of scoren kandidaten op basis
                van het profiel.
              </p>
              <p className="text-sm">
                <strong>Waarom hoog-risico:</strong> kandidaten worden beoordeeld door
                een algoritme voordat een mens hun cv ooit ziet. Fouten in het algoritme
                — zoals bias tegen bepaalde achternamen, opleidingen of gaten in een
                cv — raken echte mensen.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold text-base mb-2">Chatbots voor kandidaat-screening</p>
              <p className="text-sm text-muted mb-3">
                AI-chatbots die kandidaten vragen stellen als eerste stap in het
                selectieproces. Op basis van de antwoorden wordt bepaald of een kandidaat
                doorgaat naar de volgende ronde.
              </p>
              <p className="text-sm">
                <strong>Waarom hoog-risico:</strong> de chatbot neemt een selectiebeslissing.
                Kandidaten die niet de &quot;juiste&quot; antwoorden geven worden
                uitgefilterd zonder dat een recruiter eraan te pas komt.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold text-base mb-2">Planningssoftware op basis van profiel</p>
              <p className="text-sm text-muted mb-3">
                Software die uitzendkrachten toewijst aan opdrachten op basis van hun
                profiel, beschikbaarheid, beoordelingen of eerdere prestaties.
              </p>
              <p className="text-sm">
                <strong>Waarom hoog-risico:</strong> het systeem bepaalt wie welke
                opdrachten krijgt. Uitzendkrachten met een lagere score krijgen minder
                of slechtere opdrachten — een directe impact op hun inkomen.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold text-base mb-2">Monitoring van uitzendkrachten</p>
              <p className="text-sm text-muted mb-3">
                Systemen die prestaties, aanwezigheid of gedrag van uitzendkrachten
                bijhouden en scoren. Denk aan productiviteitsscores, afwezigheidspatronen,
                of beoordelingen door opdrachtgevers.
              </p>
              <p className="text-sm">
                <strong>Waarom hoog-risico:</strong> monitoring die leidt tot besluiten
                over contractverlenging, beëindiging of toewijzing van werk valt onder
                de hoog-risico categorie.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Jij bent de deployer — wat betekent dat?
          </h2>
          <p>
            Als uitzendbureau ben je een <strong>deployer</strong>: je zet het AI-systeem
            in, ook al heb je het niet gebouwd. De leverancier (provider) heeft zijn eigen
            verplichtingen, maar die ontslaan jou niet van de jouwe.
          </p>
          <p>Als deployer van een hoog-risico systeem moet je:</p>
          <div className="my-4 space-y-2">
            <div className="p-3 bg-surface rounded text-sm">
              <strong>Menselijk toezicht</strong> organiseren — iemand moet AI-beslissingen
              kunnen beoordelen en overrulen
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              <strong>Transparant</strong> zijn naar kandidaten — zij moeten weten dat AI
              wordt ingezet in het selectieproces
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              <strong>Logs bijhouden</strong> — je moet kunnen aantonen hoe het systeem
              is gebruikt en welke beslissingen zijn genomen
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              <strong>Datakwaliteit</strong> bewaken — de data die je in het systeem stopt
              moet relevant en representatief zijn
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              <strong>AI-geletterdheid</strong> waarborgen — je medewerkers moeten begrijpen
              hoe het systeem werkt (Artikel 4)
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Veelgemaakte fout: &quot;onze leverancier regelt dat toch?&quot;
          </h2>
          <p>
            Dit is het grootste misverstand in de uitzendbranche. Veel bureaus denken dat
            compliance de verantwoordelijkheid is van de softwareleverancier. Dat klopt
            niet.
          </p>
          <p>
            De leverancier moet ervoor zorgen dat het systeem technisch voldoet aan de
            eisen — dat het eerlijk, transparant en uitlegbaar is. Maar hoe je het systeem
            gebruikt, wie er toezicht op houdt, en of kandidaten worden geïnformeerd — dat
            is jouw verantwoordelijkheid als deployer.
          </p>
          <p>
            Een vergelijking: een autofabrikant moet een veilige auto bouwen. Maar als jij
            te hard rijdt, is dat jouw verantwoordelijkheid. De EU AI Act werkt op dezelfde
            manier.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Samenvatting</h2>
          <div className="p-5 bg-surface rounded-lg">
            <p className="text-sm leading-relaxed mb-3">
              ATS-systemen, matchingtools, CV-screening, chatbots voor screening,
              planningssoftware en monitoring van uitzendkrachten vallen allemaal onder
              de hoog-risico categorie van de EU AI Act (Bijlage III, categorie 4).
            </p>
            <p className="text-sm leading-relaxed mb-3">
              Als uitzendbureau ben je deployer: je bent zelf verantwoordelijk voor
              het juiste gebruik van deze systemen, los van wat de leverancier doet.
            </p>
            <p className="text-sm leading-relaxed">
              De verplichtingen voor hoog-risico systemen treden volledig in werking op
              2 augustus 2026. AI-geletterdheid (Artikel 4) geldt al sinds februari 2025.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link href="/training/module-1" className="text-sm text-muted hover:text-accent transition-colors">
            ← Module 1
          </Link>
          <Link href="/training/module-3" className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors no-underline">
            Module 3 →
          </Link>
        </div>
      </article>
    </div>
  );
}
