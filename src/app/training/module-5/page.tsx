import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Module 5 — Transparantie en kandidaatrechten",
  description:
    "Wanneer en hoe informeer je kandidaten over AI-gebruik? Transparantieplichten onder de EU AI Act voor uitzendbureaus. Module 5 van de Normelo training.",
};

export default function Module5() {
  return (
    <div className="max-w-2xl mx-auto px-6">
      <nav className="py-4 text-sm text-muted">
        <Link href="/training" className="hover:text-accent">Training</Link>
        <span className="mx-2">›</span>
        <span>Module 5</span>
      </nav>

      <article className="py-8">
        <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">
          Module 5 van 6
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-6">
          Transparantie en kandidaatrechten
        </h1>

        <div className="prose-custom space-y-6 text-foreground leading-relaxed">
          <p>
            De EU AI Act vereist dat mensen weten wanneer AI wordt gebruikt om
            beslissingen over hen te nemen. Voor de uitzendbranche betekent dit:
            kandidaten moeten worden geïnformeerd dat AI een rol speelt in het
            selectieproces. In deze module leer je wanneer je dat moet doen, hoe
            je dat doet, en hoe dit samenhangt met de AVG.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Wat de wet zegt</h2>
          <p>
            Artikel 26 van de EU AI Act verplicht deployers van hoog-risico AI-systemen
            om personen die aan het systeem worden onderworpen te informeren. In gewone
            taal: als je een AI-systeem gebruikt dat beslissingen neemt of beïnvloedt
            over kandidaten, moeten die kandidaten dat weten.
          </p>
          <p>
            Dit is niet alleen een verplichting onder de EU AI Act. De AVG (Algemene
            Verordening Gegevensbescherming) bevat al langere tijd vergelijkbare eisen
            rond geautomatiseerde besluitvorming. De EU AI Act versterkt en verbreedt
            deze verplichting.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Wanneer moet je informeren?
          </h2>
          <p>
            De informatieplicht geldt zodra AI een rol speelt in het proces dat de
            kandidaat raakt. Concreet:
          </p>
          <div className="my-4 space-y-2">
            <div className="p-3 bg-surface rounded text-sm">
              Wanneer cv&apos;s worden gescreend of gerankt door een AI-systeem
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              Wanneer een matchingtool bepaalt welke kandidaten worden voorgesteld
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              Wanneer een chatbot kandidaten screent als eerste selectieronde
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              Wanneer planning of toewijzing van werk wordt gedaan op basis van
              AI-analyse van profielen
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              Wanneer prestaties of gedrag van uitzendkrachten door AI worden gemonitord
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Hoe informeer je kandidaten?
          </h2>
          <p>
            De wet schrijft niet exact voor in welke bewoordingen je kandidaten moet
            informeren, maar het moet duidelijk, begrijpelijk en tijdig zijn. De
            kandidaat moet het weten voordat het systeem een beslissing over hem neemt
            — niet achteraf.
          </p>

          <p>Er zijn meerdere momenten waarop je dit kunt doen:</p>

          <div className="my-6 space-y-5">
            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">In de vacaturetekst</p>
              <p className="text-sm text-muted mb-3">
                Het meest voor de hand liggende moment. Voeg een transparante zin toe aan
                je vacatures die duidelijk maakt dat AI wordt ingezet.
              </p>
              <div className="p-4 bg-white rounded border border-border">
                <p className="text-xs text-muted mb-1 font-medium">Voorbeeldtekst:</p>
                <p className="text-sm italic">
                  &quot;Wij gebruiken AI-ondersteunde software bij de verwerking van
                  sollicitaties. Dit systeem helpt ons bij het beoordelen van cv&apos;s
                  en het matchen van kandidaten met vacatures. Alle AI-suggesties worden
                  beoordeeld door een recruiter voordat er een beslissing wordt genomen
                  over jouw sollicitatie.&quot;
                </p>
              </div>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">In de sollicitatiebevestiging</p>
              <p className="text-sm text-muted mb-3">
                Wanneer een kandidaat solliciteert, ontvang hij een bevestiging. Dit is
                een goed moment om te vermelden dat AI een rol speelt in het proces.
              </p>
              <div className="p-4 bg-white rounded border border-border">
                <p className="text-xs text-muted mb-1 font-medium">Voorbeeldtekst:</p>
                <p className="text-sm italic">
                  &quot;Bedankt voor je sollicitatie. We willen je laten weten dat we
                  AI-ondersteunde tools gebruiken om sollicitaties te verwerken. Een
                  recruiter beoordeelt altijd persoonlijk de uitkomsten voordat er een
                  beslissing over jouw kandidatuur wordt genomen.&quot;
                </p>
              </div>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">Op je website</p>
              <p className="text-sm text-muted mb-3">
                Voeg een paragraaf toe aan je privacyverklaring of maak een aparte pagina
                over je AI-gebruik.
              </p>
              <div className="p-4 bg-white rounded border border-border">
                <p className="text-xs text-muted mb-1 font-medium">Voorbeeldtekst:</p>
                <p className="text-sm italic">
                  &quot;[Bedrijfsnaam] maakt gebruik van AI-systemen bij het werven en
                  selecteren van kandidaten. Deze systemen ondersteunen onze recruiters
                  bij het beoordelen van cv&apos;s en het matchen van kandidaten met
                  vacatures. Wij garanderen dat een mens altijd de eindbeslissing neemt.
                  Vragen over ons AI-gebruik? Neem contact op via [contactgegevens].&quot;
                </p>
              </div>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">Bij inschrijving als uitzendkracht</p>
              <p className="text-sm text-muted mb-3">
                Wanneer iemand zich inschrijft bij je bureau, is dat het ideale moment
                om te informeren over je AI-gebruik — zeker als je planningssoftware
                of monitoring inzet.
              </p>
              <div className="p-4 bg-white rounded border border-border">
                <p className="text-xs text-muted mb-1 font-medium">Voorbeeldtekst:</p>
                <p className="text-sm italic">
                  &quot;Om je zo goed mogelijk te matchen met opdrachten gebruiken wij
                  AI-ondersteunde planningssoftware. Dit systeem houdt rekening met je
                  vaardigheden, beschikbaarheid en voorkeuren. Als je vragen hebt over
                  hoe we AI inzetten, licht je contactpersoon het graag toe.&quot;
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            EU AI Act en AVG — hoe ze samenhangen
          </h2>
          <p>
            De AVG bevat in Artikel 22 al het recht om niet onderworpen te worden aan
            een uitsluitend op geautomatiseerde verwerking gebaseerd besluit. Dat
            betekent: als een beslissing volledig door een computer wordt genomen
            zonder menselijke tussenkomst, heeft de persoon het recht om daar bezwaar
            tegen te maken.
          </p>
          <p>
            De EU AI Act gaat verder. Waar de AVG zich richt op gegevensbescherming,
            richt de EU AI Act zich op de veiligheid en eerlijkheid van het AI-systeem
            zelf. De twee wetten vullen elkaar aan:
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 pr-4 font-semibold">Onderwerp</th>
                  <th className="text-left py-3 pr-4 font-semibold">AVG</th>
                  <th className="text-left py-3 font-semibold">EU AI Act</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-foreground">Informatieplicht</td>
                  <td className="py-3 pr-4">Moet melden dat persoonsgegevens worden verwerkt</td>
                  <td className="py-3">Moet melden dat AI wordt ingezet voor beslissingen</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-foreground">Menselijke tussenkomst</td>
                  <td className="py-3 pr-4">Recht om niet onderworpen te worden aan volledig geautomatiseerd besluit</td>
                  <td className="py-3">Verplichting om menselijk toezicht te organiseren</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-foreground">Uitleg</td>
                  <td className="py-3 pr-4">Recht op uitleg over de logica achter geautomatiseerde beslissingen</td>
                  <td className="py-3">Systeem moet uitlegbaar en transparant zijn</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Gegevensverwerking</td>
                  <td className="py-3 pr-4">Rechtmatige grondslag nodig voor verwerking</td>
                  <td className="py-3">Inputdata moet relevant en representatief zijn</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            In de praktijk betekent dit: als je al AVG-compliant bent, heb je een deel
            van het werk al gedaan. Maar de EU AI Act voegt daar extra verplichtingen aan
            toe, met name op het gebied van menselijk toezicht en de kwaliteit van het
            AI-systeem zelf.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Wat als een kandidaat vraagt stelt?
          </h2>
          <p>
            Bereid je voor op vragen van kandidaten. Naarmate het bewustzijn over AI in
            werving groeit, zullen steeds meer kandidaten willen weten hoe AI hun
            sollicitatie beïnvloedt. Je team moet die vragen kunnen beantwoorden:
          </p>
          <div className="my-4 space-y-3">
            <div className="p-4 bg-surface rounded-lg">
              <p className="text-sm font-semibold mb-1">&quot;Wordt mijn cv door AI beoordeeld?&quot;</p>
              <p className="text-sm text-muted">
                Eerlijk antwoorden. Uitleggen welke rol AI speelt en benadrukken dat een
                recruiter altijd de eindbeslissing neemt.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <p className="text-sm font-semibold mb-1">&quot;Kan ik bezwaar maken tegen een AI-beslissing?&quot;</p>
              <p className="text-sm text-muted">
                Ja. Onder zowel de AVG als de EU AI Act heeft een kandidaat het recht
                om een beslissing aan te vechten. Zorg dat je een procedure hebt om dit
                af te handelen.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <p className="text-sm font-semibold mb-1">&quot;Waarom ben ik afgewezen?&quot;</p>
              <p className="text-sm text-muted">
                Als AI een rol heeft gespeeld in de afwijzing, moet je dat kunnen
                uitleggen. Niet in technische termen, maar op een manier die de kandidaat
                begrijpt.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Checklist: ben je transparant genoeg?
          </h2>
          <div className="my-4 space-y-2">
            {[
              "Vermelden je vacatureteksten dat AI wordt ingezet?",
              "Staat er informatie over AI-gebruik in je sollicitatiebevestigingen?",
              "Is je privacyverklaring bijgewerkt met informatie over AI?",
              "Worden uitzendkrachten bij inschrijving geïnformeerd over AI in planning?",
              "Kan je team vragen van kandidaten over AI-gebruik beantwoorden?",
              "Is er een procedure voor bezwaar tegen AI-beslissingen?",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-surface rounded text-sm">
                <span className="text-muted mt-0.5">☐</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">Samenvatting</h2>
          <div className="p-5 bg-surface rounded-lg">
            <p className="text-sm leading-relaxed mb-3">
              De EU AI Act verplicht je om kandidaten te informeren wanneer AI wordt
              ingezet in het selectieproces. Doe dit in vacatureteksten,
              sollicitatiebevestigingen, bij inschrijving, en in je privacyverklaring.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              De EU AI Act en de AVG vullen elkaar aan. Als je al AVG-compliant bent
              rond geautomatiseerde besluitvorming, heb je een voorsprong — maar de
              EU AI Act voegt extra verplichtingen toe.
            </p>
            <p className="text-sm leading-relaxed">
              Bereid je team voor op vragen van kandidaten. Eerlijkheid en transparantie
              zijn niet alleen wettelijk verplicht — ze bouwen vertrouwen op bij de
              mensen die je wilt plaatsen.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link href="/training/module-4" className="text-sm text-muted hover:text-accent transition-colors">
            ← Module 4
          </Link>
          <Link href="/training/module-6" className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors no-underline">
            Module 6: Toets →
          </Link>
        </div>
      </article>
    </div>
  );
}
