import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Module 1 — De EU AI Act: wat het is en waarom het er is",
  description:
    "Wat is de EU AI Act, waarom bestaat deze wet, en wat betekent het voor de uitzendbranche? Module 1 van de Normelo AI-geletterdheid training.",
};

export default function Module1() {
  return (
    <div className="max-w-2xl mx-auto px-6">
      <nav className="py-4 text-sm text-muted">
        <Link href="/training" className="hover:text-accent">
          Training
        </Link>
        <span className="mx-2">›</span>
        <span>Module 1</span>
      </nav>

      <article className="py-8">
        <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">
          Module 1 van 6
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-6">
          De EU AI Act — wat het is en waarom het er is
        </h1>

        <div className="prose-custom space-y-6 text-foreground leading-relaxed">
          <p>
            Op 1 augustus 2024 is de EU AI Act officieel in werking getreden. Het is de
            eerste wet ter wereld die het gebruik van kunstmatige intelligentie reguleert.
            Niet alleen voor de bedrijven die AI bouwen, maar ook voor de organisaties die
            AI-systemen gebruiken — en daar vallen uitzendbureaus onder.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Waarom deze wet er is</h2>
          <p>
            AI-systemen nemen steeds vaker beslissingen die directe gevolgen hebben voor
            mensen. Een algoritme dat bepaalt of je een lening krijgt. Een systeem dat
            beslist of je cv wordt doorgestuurd naar een recruiter. Software die inschat
            of je een verzekering krijgt aangeboden.
          </p>
          <p>
            Die beslissingen gebeuren snel, op grote schaal, en vaak zonder dat de persoon
            in kwestie weet dat AI eraan te pas komt. De EU AI Act is bedoeld om te zorgen
            dat die systemen veilig, transparant en eerlijk zijn — en dat er altijd een mens
            is die de eindverantwoordelijkheid draagt.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">Wat de wet regelt</h2>
          <p>
            De EU AI Act deelt AI-systemen in op basis van risico. Hoe groter het risico
            dat een systeem onjuiste of oneerlijke beslissingen neemt over mensen, hoe
            strenger de regels.
          </p>

          <div className="my-6 space-y-4">
            <div className="p-4 bg-surface rounded-lg border-l-3 border-red-500">
              <p className="font-semibold mb-1">Onaanvaardbaar risico — verboden</p>
              <p className="text-sm text-muted">
                AI-systemen die mensen manipuleren, social scoring toepassen, of emoties
                herkennen op de werkvloer. Deze zijn verboden binnen de EU.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg border-l-3 border-orange-500">
              <p className="font-semibold mb-1">Hoog risico — streng gereguleerd</p>
              <p className="text-sm text-muted">
                AI-systemen die beslissingen nemen over mensen op het gebied van werk,
                onderwijs, krediet, gezondheidszorg en justitie. Hier vallen
                ATS-systemen, matchingtools en CV-screening onder. Dit is de categorie
                die voor de uitzendbranche het meest relevant is.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg border-l-3 border-yellow-500">
              <p className="font-semibold mb-1">Beperkt risico — transparantieplicht</p>
              <p className="text-sm text-muted">
                AI-systemen zoals chatbots moeten duidelijk maken dat je met AI
                communiceert, niet met een mens.
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg border-l-3 border-green-500">
              <p className="font-semibold mb-1">Minimaal risico — geen extra regels</p>
              <p className="text-sm text-muted">
                De meeste AI-toepassingen, zoals spamfilters of spellingcontrole. Hiervoor
                gelden geen aanvullende verplichtingen.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Providers en deployers — twee rollen, twee verantwoordelijkheden
          </h2>
          <p>
            De wet maakt onderscheid tussen twee rollen. De <strong>provider</strong> is
            het bedrijf dat het AI-systeem bouwt of op de markt brengt — denk aan de
            leverancier van je ATS-systeem. De <strong>deployer</strong> is de organisatie
            die het systeem daadwerkelijk inzet — dat ben jij als uitzendbureau.
          </p>
          <p>
            Beide rollen hebben verplichtingen onder de EU AI Act. Als deployer van een
            hoog-risico systeem ben je verantwoordelijk voor het juiste gebruik ervan:
            menselijk toezicht, transparantie naar kandidaten, en het bijhouden van logs.
            Je kunt je niet verschuilen achter de leverancier.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">
            Wat dit voor de uitzendbranche betekent
          </h2>
          <p>
            De uitzendbranche is een van de sectoren die het hardst geraakt wordt door
            de EU AI Act. De reden is simpel: uitzendbureaus gebruiken dagelijks AI-systemen
            die beslissingen nemen over mensen en hun carrière.
          </p>
          <p>
            Een ATS-systeem dat cv&apos;s automatisch rankt, bepaalt welke kandidaat een
            recruiter te zien krijgt en welke niet. Een matchingtool die kandidaten koppelt
            aan vacatures, beïnvloedt wie er wordt uitgenodigd voor een gesprek. Dat zijn
            beslissingen met directe gevolgen voor individuen — en precies het type
            beslissingen dat de EU AI Act als hoog-risico aanmerkt.
          </p>
          <p>
            In de volgende module gaan we dieper in op welke specifieke systemen in de
            uitzendbranche als hoog-risico worden aangemerkt, en wat dat concreet voor
            jou betekent.
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">De belangrijkste deadlines</h2>
          <div className="my-4 space-y-3">
            <div className="flex gap-4 items-start">
              <div className="bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded whitespace-nowrap border border-red-200">
                Al van kracht
              </div>
              <p className="text-sm">
                <strong>2 februari 2025</strong> — Artikel 4: AI-geletterdheid. Alle
                organisaties die AI inzetten moeten zorgen dat medewerkers voldoende
                kennis hebben.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-orange-50 text-orange-700 text-xs font-bold px-2 py-1 rounded whitespace-nowrap border border-orange-200">
                Aankomend
              </div>
              <p className="text-sm">
                <strong>2 augustus 2025</strong> — Verbod op AI-systemen met onaanvaardbaar
                risico, zoals emotieherkenning op de werkvloer.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-orange-50 text-orange-700 text-xs font-bold px-2 py-1 rounded whitespace-nowrap border border-orange-200">
                Aankomend
              </div>
              <p className="text-sm">
                <strong>2 augustus 2026</strong> — Alle verplichtingen voor hoog-risico
                AI-systemen treden in werking. Dit is de deadline waarop uitzendbureaus
                volledig compliant moeten zijn.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-3">Samenvatting</h2>
          <div className="p-5 bg-surface rounded-lg">
            <p className="text-sm leading-relaxed mb-3">
              De EU AI Act is de eerste AI-wet ter wereld en geldt voor iedereen die
              AI-systemen bouwt óf gebruikt. De wet deelt systemen in op risico —
              van minimaal tot onaanvaardbaar.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              Uitzendbureaus zijn deployers van hoog-risico AI-systemen. De verplichting
              voor AI-geletterdheid geldt al sinds februari 2025. De volledige
              hoog-risico verplichtingen gelden vanaf augustus 2026.
            </p>
            <p className="text-sm leading-relaxed">
              De kernboodschap: je bent als uitzendbureau zelf verantwoordelijk voor het
              juiste gebruik van AI-systemen, ook als je ze niet zelf hebt gebouwd.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link
            href="/training"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← Overzicht
          </Link>
          <Link
            href="/training/module-2"
            className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors no-underline"
          >
            Module 2 →
          </Link>
        </div>
      </article>
    </div>
  );
}
