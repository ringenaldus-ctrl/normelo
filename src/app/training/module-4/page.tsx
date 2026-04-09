import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Module 4 — Shadow AI: het onzichtbare risico",
  description:
    "Wat is shadow AI, waarom is het een risico voor uitzendbureaus, en hoe stel je een AI-beleid op? Module 4 van de Normelo AI-geletterdheid training.",
};

export default function Module4() {
  return (
    <div className="max-w-2xl mx-auto px-6">
      <nav className="py-4 text-sm text-muted">
        <Link href="/training" className="hover:text-accent">Training</Link>
        <span className="mx-2">›</span>
        <span>Module 4</span>
      </nav>

      <article className="py-8">
        <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">
          Module 4 van 6
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-6">
          Shadow AI — het onzichtbare risico
        </h1>

        <div className="prose-custom space-y-6 text-foreground leading-relaxed">
          <p>
            In de vorige modules ging het over de AI-systemen die je als organisatie
            bewust inzet — je ATS, je matchingtool, je planningssoftware. Maar er is
            een tweede categorie AI-gebruik die minstens zo belangrijk is en waar de
            meeste uitzendbureaus geen zicht op hebben: shadow AI.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Wat is shadow AI?</h2>
          <p>
            Shadow AI is het gebruik van AI-tools door medewerkers zonder dat de
            organisatie hier weet van heeft of toestemming voor heeft gegeven. Denk
            aan een recruiter die ChatGPT gebruikt om cv&apos;s samen te vatten. Of een
            intercedent die Copilot inzet om kandidaatprofielen te beoordelen. Of iemand
            die een AI-tool gebruikt om vacatureteksten te schrijven op basis van
            kandidaatgegevens.
          </p>
          <p>
            Het is geen kwade opzet. Medewerkers willen hun werk goed en efficiënt doen.
            AI-tools zijn gratis beschikbaar en ongelooflijk handig. Het probleem is dat
            niemand bijhoudt dat het gebeurt — en niemand beoordeelt of het veilig en
            compliant is.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Waarom is dit een risico?</h2>

          <div className="my-6 space-y-5">
            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">Ongeregistreerd hoog-risico AI-gebruik</p>
              <p className="text-sm text-muted">
                Wanneer een recruiter ChatGPT vraagt om cv&apos;s te ranken of te
                beoordelen, gebruikt die recruiter in feite een hoog-risico AI-systeem.
                Het maakt niet uit dat het een gratis online tool is — het effect is
                hetzelfde: AI neemt een beslissing over een kandidaat. Zonder menselijk
                toezicht, zonder logging, zonder dat de kandidaat het weet.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">Privacy en gegevensbescherming</p>
              <p className="text-sm text-muted">
                Medewerkers die kandidaatgegevens invoeren in ChatGPT, Claude of andere
                AI-tools delen persoonsgegevens met een externe partij. Dat is een
                AVG-risico. Cv&apos;s bevatten namen, adressen, werkgeschiedenis,
                opleidingen — allemaal persoonsgegevens die je niet zomaar mag delen
                met een AI-dienst.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">Geen controle op kwaliteit en bias</p>
              <p className="text-sm text-muted">
                AI-tools kunnen bevooroordeeld zijn. Als een recruiter ChatGPT vraagt
                om de &quot;beste kandidaat&quot; te selecteren, weet niemand op welke
                criteria die keuze is gebaseerd. Is er bias tegen bepaalde achternamen?
                Tegen gaten in een cv die veroorzaakt zijn door ziekte of mantelzorg?
                Bij officiële systemen kun je dit controleren. Bij shadow AI niet.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">Geen audit trail</p>
              <p className="text-sm text-muted">
                De EU AI Act vereist dat je kunt aantonen hoe AI-beslissingen tot stand
                zijn gekomen. Als een medewerker een beslissing neemt op basis van
                ChatGPT-output, is er geen log, geen documentatie, en geen manier om
                achteraf te reconstrueren wat er is gebeurd.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Hoe groot is het probleem?
          </h2>
          <p>
            Groter dan de meeste organisaties denken. Internationaal onderzoek laat zien
            dat meer dan de helft van werknemers AI-tools gebruikt zonder toestemming van
            hun werkgever. In de uitzendbranche is de kans extra groot: recruiters staan
            onder tijdsdruk, verwerken grote aantallen cv&apos;s, en hebben directe
            toegang tot tools die het werk sneller maken.
          </p>
          <p>
            Het is geen kwestie van óf het bij jouw bureau gebeurt. Het is een kwestie
            van hoeveel.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Voorbeelden uit de praktijk
          </h2>

          <div className="my-6 space-y-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="text-sm">
                <strong>Voorbeeld 1:</strong> Een recruiter plakt 20 cv&apos;s in
                ChatGPT met de vraag: &quot;Rank deze kandidaten op geschiktheid voor
                een logistiek medewerker.&quot; ChatGPT geeft een ranking. De recruiter
                nodigt de top-5 uit.
              </p>
              <p className="text-xs text-red-600 mt-2 font-medium">
                → Hoog-risico AI-gebruik zonder toezicht, zonder logging, met
                persoonsgegevens in een externe tool.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="text-sm">
                <strong>Voorbeeld 2:</strong> Een intercedent gebruikt een AI-tool om
                een kandidaatprofiel samen te vatten voor een opdrachtgever. De tool
                laat bepaalde informatie weg of benadrukt andere informatie, waardoor
                een vertekend beeld ontstaat.
              </p>
              <p className="text-xs text-orange-600 mt-2 font-medium">
                → De opdrachtgever neemt een beslissing op basis van door AI
                beïnvloede informatie, zonder dit te weten.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="text-sm">
                <strong>Voorbeeld 3:</strong> Een medewerker gebruikt Copilot in Outlook
                om een afwijzingsmail te genereren voor een kandidaat. De AI bedenkt een
                reden die niet overeenkomt met de werkelijke reden van afwijzing.
              </p>
              <p className="text-xs text-orange-600 mt-2 font-medium">
                → De kandidaat ontvangt onjuiste informatie over waarom hij is
                afgewezen. Dit kan juridische gevolgen hebben.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Wat je eraan doet: een AI-beleid
          </h2>
          <p>
            De oplossing is niet om alles te verbieden. Dat werkt niet — medewerkers
            gaan het dan stiekem doen. De oplossing is een helder AI-beleid dat duidelijk
            maakt wat wel en niet mag, en waarom.
          </p>

          <p>Een goed AI-beleid voor een uitzendbureau bevat minimaal:</p>

          <div className="my-6 space-y-4">
            <div className="p-4 bg-surface rounded-lg">
              <p className="font-semibold mb-1">1. Welke tools zijn toegestaan</p>
              <p className="text-sm text-muted">
                Maak een lijst van AI-tools die medewerkers mogen gebruiken. Maak
                onderscheid tussen tools voor algemeen gebruik (vacatureteksten schrijven,
                e-mails formuleren) en tools die niet mogen worden ingezet voor
                kandidaat-gerelateerde beslissingen.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <p className="font-semibold mb-1">2. Wat er nooit in een AI-tool mag</p>
              <p className="text-sm text-muted">
                Persoonsgegevens van kandidaten — namen, cv&apos;s, contactgegevens,
                BSN-nummers — mogen nooit worden ingevoerd in externe AI-tools
                zonder expliciete toestemming en een verwerkersovereenkomst.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <p className="font-semibold mb-1">3. Geen AI-beslissingen over kandidaten</p>
              <p className="text-sm text-muted">
                Maak duidelijk dat AI-tools niet mogen worden gebruikt om kandidaten te
                selecteren, ranken, afwijzen of beoordelen — tenzij het een officieel
                goedgekeurd systeem is met de juiste waarborgen.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <p className="font-semibold mb-1">4. Meldplicht</p>
              <p className="text-sm text-muted">
                Vraag medewerkers om aan te geven welke AI-tools ze gebruiken. Maak dit
                laagdrempelig — het doel is niet straffen maar inventariseren. Je kunt
                niet managen wat je niet weet.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <p className="font-semibold mb-1">5. Periodieke evaluatie</p>
              <p className="text-sm text-muted">
                AI-tools veranderen snel. Evalueer het beleid minstens elk halfjaar. Zijn
                er nieuwe tools bijgekomen? Worden de regels nageleefd? Zijn er incidenten
                geweest?
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Hoe je het gesprek voert
          </h2>
          <p>
            Het invoeren van een AI-beleid werkt alleen als je het goed communiceert.
            Medewerkers moeten begrijpen waarom de regels er zijn — niet als beperking,
            maar als bescherming. Voor de kandidaten, voor het bureau, en voor henzelf.
          </p>
          <p>
            Begin met inventariseren. Vraag je team: welke AI-tools gebruik je? Waarvoor?
            Hoe vaak? Reageer niet veroordelend — je wilt eerlijke antwoorden. Gebruik
            die informatie om het beleid te maken. En leg uit dat Artikel 4 van de EU AI
            Act vereist dat iedereen die met AI werkt begrijpt wat de risico&apos;s zijn.
            Dat is precies wat deze training doet.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Samenvatting</h2>
          <div className="p-5 bg-surface rounded-lg">
            <p className="text-sm leading-relaxed mb-3">
              Shadow AI is het ongecontroleerd gebruik van AI-tools door medewerkers.
              In de uitzendbranche creëert dit hoog-risico situaties zonder dat de
              organisatie het weet: AI-beslissingen over kandidaten zonder toezicht,
              persoonsgegevens in externe tools, en geen audit trail.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              De oplossing is niet verbieden maar reguleren: stel een AI-beleid op dat
              duidelijk maakt welke tools zijn toegestaan, wat er nooit in een AI-tool
              mag, en hoe medewerkers gebruik moeten melden.
            </p>
            <p className="text-sm leading-relaxed">
              Shadow AI is waarschijnlijk het snelst te adresseren compliancerisico in
              jouw bureau. Je hebt er geen nieuwe software voor nodig — alleen een beleid
              en een goed gesprek met je team.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link href="/training/module-3" className="text-sm text-muted hover:text-accent transition-colors">
            ← Module 3
          </Link>
          <Link href="/training/module-5" className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors no-underline">
            Module 5 →
          </Link>
        </div>
      </article>
    </div>
  );
}
