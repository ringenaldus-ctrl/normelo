import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Module 3 — Menselijk toezicht en besluitvorming",
  description:
    "Wanneer mag AI adviseren en wanneer moet een mens beslissen? Artikel 14 van de EU AI Act uitgelegd voor de uitzendbranche. Module 3 van de Normelo training.",
};

export default function Module3() {
  return (
    <div className="max-w-2xl mx-auto px-6">
      <nav className="py-4 text-sm text-muted">
        <Link href="/training" className="hover:text-accent">Training</Link>
        <span className="mx-2">›</span>
        <span>Module 3</span>
      </nav>

      <article className="py-8">
        <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">
          Module 3 van 6
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-6">
          Menselijk toezicht en besluitvorming
        </h1>

        <div className="prose-custom space-y-6 text-foreground leading-relaxed">
          <p>
            De EU AI Act draait niet om het verbieden van AI. Het draait om ervoor zorgen
            dat er altijd een mens is die de controle heeft. Artikel 14 van de wet schrijft
            voor dat hoog-risico AI-systemen zo moeten worden ingezet dat er effectief
            menselijk toezicht is. Maar wat betekent dat in de dagelijkse praktijk van een
            uitzendbureau?
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Wat de wet zegt</h2>
          <p>
            Artikel 14 eist dat hoog-risico AI-systemen zodanig worden ontworpen en
            ingezet dat er menselijk toezicht mogelijk is gedurende de hele periode dat
            het systeem in gebruik is. Concreet betekent dit drie dingen:
          </p>
          <div className="my-4 space-y-3">
            <div className="p-4 bg-surface rounded-lg">
              <p className="font-semibold mb-1">1. Een mens moet de output kunnen begrijpen</p>
              <p className="text-sm text-muted">
                De persoon die toezicht houdt, moet kunnen begrijpen wat het systeem doet
                en waarom. Als je ATS een kandidaat op plek 1 zet, moet de recruiter
                kunnen achterhalen waarom.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <p className="font-semibold mb-1">2. Een mens moet kunnen ingrijpen</p>
              <p className="text-sm text-muted">
                Er moet altijd de mogelijkheid zijn om een AI-beslissing te overrulen.
                Als het systeem een kandidaat afwijst, moet een recruiter die beslissing
                ongedaan kunnen maken.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <p className="font-semibold mb-1">3. Een mens moet kunnen stoppen</p>
              <p className="text-sm text-muted">
                Als het systeem structureel onjuiste of oneerlijke beslissingen neemt,
                moet iemand het systeem kunnen uitschakelen of de werking ervan kunnen
                aanpassen.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Adviserend vs. autonoom — het cruciale verschil
          </h2>
          <p>
            Het verschil tussen een systeem dat <strong>adviseert</strong> en een systeem
            dat <strong>autonoom beslist</strong> is cruciaal onder de EU AI Act.
          </p>

          <div className="my-6 grid gap-4 md:grid-cols-2">
            <div className="p-5 rounded-lg border-2 border-green-300 bg-green-50">
              <p className="font-bold text-green-800 mb-2">Adviserend</p>
              <p className="text-sm text-green-900">
                Het systeem geeft een suggestie, ranking of score. Een recruiter bekijkt
                de output en neemt zelf de beslissing. De mens heeft het laatste woord.
              </p>
              <p className="text-xs text-green-700 mt-3 font-medium">
                Voorbeeld: je ATS toont een gerankte lijst, maar de recruiter bekijkt
                alle cv&apos;s en kiest zelf wie wordt uitgenodigd.
              </p>
            </div>
            <div className="p-5 rounded-lg border-2 border-red-300 bg-red-50">
              <p className="font-bold text-red-800 mb-2">Autonoom</p>
              <p className="text-sm text-red-900">
                Het systeem neemt zelfstandig een beslissing zonder dat een mens meekijkt.
                Kandidaten worden automatisch afgewezen, weggefilterd of onzichtbaar
                gemaakt.
              </p>
              <p className="text-xs text-red-700 mt-3 font-medium">
                Voorbeeld: je ATS wijst cv&apos;s automatisch af die niet aan bepaalde
                criteria voldoen. De recruiter ziet deze kandidaten nooit.
              </p>
            </div>
          </div>

          <p>
            Een adviserend systeem is niet per definitie compliant — je moet nog steeds
            voldoen aan alle hoog-risico verplichtingen. Maar een systeem dat autonoom
            beslist zonder menselijke tussenkomst is een direct compliancerisico.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Praktijksituaties in de uitzendbranche
          </h2>

          <div className="my-6 space-y-5">
            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">Situatie 1: automatisch filteren van cv&apos;s</p>
              <p className="text-sm text-muted mb-2">
                Je ATS filtert cv&apos;s op basis van keywords. Kandidaten zonder
                bepaalde termen worden automatisch uit de lijst verwijderd.
              </p>
              <div className="p-3 bg-red-50 rounded text-sm border-l-3 border-red-400">
                <strong>Probleem:</strong> de recruiter ziet deze kandidaten nooit. Er is
                geen menselijk toezicht op de filterbeslissing. Een geschikte kandidaat die
                andere woorden gebruikt voor dezelfde vaardigheden wordt onzichtbaar.
              </div>
              <div className="p-3 bg-green-50 rounded text-sm mt-2 border-l-3 border-green-400">
                <strong>Oplossing:</strong> configureer het systeem zodat gefilterde
                kandidaten zichtbaar blijven in een aparte lijst. Laat de recruiter
                periodiek door de gefilterde kandidaten kijken.
              </div>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">Situatie 2: automatische matching</p>
              <p className="text-sm text-muted mb-2">
                Je matchingtool koppelt kandidaten aan vacatures. De recruiter ziet alleen
                de top-5 matches en werkt daar mee verder.
              </p>
              <div className="p-3 bg-orange-50 rounded text-sm border-l-3 border-orange-400">
                <strong>Aandachtspunt:</strong> als de recruiter altijd alleen de
                top-5 bekijkt, worden kandidaten lager in de lijst structureel
                genegeerd. In de praktijk functioneert dit als een autonome beslissing.
              </div>
              <div className="p-3 bg-green-50 rounded text-sm mt-2 border-l-3 border-green-400">
                <strong>Oplossing:</strong> spreek af dat recruiters niet alleen de
                top-matches bekijken maar ook steekproefsgewijs kandidaten lager in de
                lijst beoordelen. Documenteer dit als procedure.
              </div>
            </div>

            <div className="p-5 bg-surface rounded-lg">
              <p className="font-bold mb-2">Situatie 3: chatbot als eerste screening</p>
              <p className="text-sm text-muted mb-2">
                Een chatbot stelt kandidaten vragen en beoordeelt of ze doorgaan naar
                de volgende ronde. Kandidaten die niet door de chatbot komen, worden
                niet doorgestuurd naar een recruiter.
              </p>
              <div className="p-3 bg-red-50 rounded text-sm border-l-3 border-red-400">
                <strong>Probleem:</strong> de chatbot neemt een selectiebeslissing die
                directe gevolgen heeft voor de kandidaat. Als er geen mens meekijkt bij
                afwijzingen, is er geen menselijk toezicht.
              </div>
              <div className="p-3 bg-green-50 rounded text-sm mt-2 border-l-3 border-green-400">
                <strong>Oplossing:</strong> laat een recruiter wekelijks de chatbot-
                afwijzingen controleren. Of configureer de chatbot zodat twijfelgevallen
                altijd worden doorgestuurd naar een mens.
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Hoe je menselijk toezicht organiseert
          </h2>
          <p>
            Menselijk toezicht is niet iets dat vanzelf ontstaat. Je moet het organiseren.
            Dat betekent concreet:
          </p>
          <div className="my-4 space-y-3">
            <div className="p-3 bg-surface rounded text-sm">
              <strong>Wijs per systeem iemand aan</strong> die verantwoordelijk is voor
              het beoordelen van de AI-output. Dit hoeft niet de directeur te zijn — het
              kan een senior recruiter zijn die het systeem goed kent.
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              <strong>Geef die persoon de bevoegdheid</strong> om beslissingen te
              overrulen. Een recruiter die ziet dat het systeem een fout maakt maar het
              niet mag aanpassen, is geen effectief toezicht.
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              <strong>Zorg voor kennis</strong> — de persoon moet begrijpen hoe het
              systeem werkt, welke criteria het hanteert, en waar het kan falen. Zonder
              die kennis is toezicht een formaliteit.
            </div>
            <div className="p-3 bg-surface rounded text-sm">
              <strong>Documenteer de procedure</strong> — leg vast wie er toezicht houdt,
              hoe vaak de output wordt beoordeeld, en hoe wordt gehandeld als er iets
              misgaat. Dit is het bewijs dat je toezicht serieus neemt.
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Automation bias — de onzichtbare valkuil
          </h2>
          <p>
            Er is een psychologisch fenomeen dat &quot;automation bias&quot; heet: de
            neiging om de output van een systeem klakkeloos te vertrouwen omdat het van
            een computer komt. Als je ATS zegt dat een kandidaat een score van 92% heeft,
            is de neiging groot om dat als waarheid aan te nemen.
          </p>
          <p>
            De EU AI Act erkent dit risico expliciet. Effectief menselijk toezicht
            betekent niet alleen dat een mens er technisch naar kan kijken — het betekent
            dat die mens ook daadwerkelijk kritisch is. Dat vergt training, bewustzijn en
            een cultuur waarin het normaal is om een AI-systeem te corrigeren.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Samenvatting</h2>
          <div className="p-5 bg-surface rounded-lg">
            <p className="text-sm leading-relaxed mb-3">
              Artikel 14 vereist dat er altijd een mens is die de output van een
              hoog-risico AI-systeem kan begrijpen, beoordelen en overrulen.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              Het verschil tussen adviserend en autonoom is cruciaal. Een systeem dat
              kandidaten automatisch afwijst zonder menselijke tussenkomst is een direct
              compliancerisico.
            </p>
            <p className="text-sm leading-relaxed">
              Menselijk toezicht moet je organiseren: wijs iemand aan, geef bevoegdheid,
              zorg voor kennis, en documenteer de procedure. Wees je bewust van automation
              bias — de neiging om AI-output klakkeloos te vertrouwen.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link href="/training/module-2" className="text-sm text-muted hover:text-accent transition-colors">
            ← Module 2
          </Link>
          <Link href="/training/module-4" className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors no-underline">
            Module 4 →
          </Link>
        </div>
      </article>
    </div>
  );
}
