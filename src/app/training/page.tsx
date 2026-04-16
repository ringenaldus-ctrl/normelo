import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EU AI Act compliance pakket voor uitzendbureaus — Normelo",
  description:
    "Normelo maakt jouw uitzendbureau EU AI Act compliant. AI-register, AI-beleid, teamtraining en certificaat. Vast tarief €3.500.",
};

export default function Training() {
  return (
    <div className="max-w-2xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <div className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-red-50 text-red-700 rounded-md border border-red-200">
          Artikel 4 — verplicht sinds 2 februari 2025
        </div>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          EU AI Act compliance voor de uitzendbranche
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-4">
          De EU AI Act verplicht uitzendbureaus om hun AI-gebruik te documenteren, beleid
          op te stellen, menselijk toezicht in te richten en hun team AI-geletterd te maken.
          Dat is veel om zelf uit te zoeken. Normelo doet het voor je.
        </p>
        <p className="text-lg text-foreground leading-relaxed font-medium">
          Eén pakket. Vast tarief. Alles geregeld — van inventarisatie tot certificaat.
        </p>
      </section>

      {/* Het probleem */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Waarom dit niet kan wachten</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Sinds 2 februari 2025 geldt Artikel 4 van de EU AI Act. Elke organisatie die
          AI-systemen inzet, moet zorgen dat medewerkers voldoende kennis hebben van AI.
          Dit is geen richtlijn — het is wet.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Uitzendbureaus lopen extra risico. Jullie werken dagelijks met AI-systemen die
          onder de hoog-risico categorie vallen: ATS-systemen die cv&apos;s ranken,
          matchingtools die kandidaten koppelen aan vacatures, chatbots die
          kandidaat-screening doen.
        </p>
        <p className="text-foreground leading-relaxed">
          De boetes bij het niet naleven van de EU AI Act lopen op tot €35 miljoen
          of 7% van de wereldwijde jaaromzet. Maar het echte risico is reputatieschade
          wanneer een kandidaat ontdekt dat AI zonder waarborg over zijn toekomst beslist.
        </p>
      </section>

      {/* Wat je krijgt */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-6">Wat Normelo voor je regelt</h2>

        <div className="space-y-6">
          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">1. Inventarisatie</p>
            <p className="text-muted text-sm leading-relaxed">
              Wij brengen in kaart welke AI-systemen jouw bureau gebruikt. ATS, matching,
              chatbots, ChatGPT, Copilot — alles. Per systeem bepalen we het risiconiveau
              en de verplichtingen die erbij horen.
            </p>
          </div>

          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">2. AI-register</p>
            <p className="text-muted text-sm leading-relaxed">
              Wij vullen het AI-register voor je in — het wettelijk verplichte overzicht
              van al je AI-systemen. Geen leeg template, maar een ingevuld document dat
              klaar is voor een audit.
            </p>
          </div>

          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">3. AI-beleid op maat</p>
            <p className="text-muted text-sm leading-relaxed">
              Een beleidsdocument specifiek voor jouw bureau. Wat mag wel, wat mag niet,
              wie houdt toezicht, hoe informeer je kandidaten. Inclusief transparantie-tekst
              voor je vacatures en een shadow AI-beleid.
            </p>
          </div>

          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">4. Teamtraining</p>
            <p className="text-muted text-sm leading-relaxed">
              Elke recruiter, intercedent en teamleider krijgt een praktische training
              over de AI-systemen die jullie dagelijks gebruiken. Geen juridische taal —
              concrete kennis die ze direct kunnen toepassen.
            </p>
          </div>

          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">5. Toets en certificering</p>
            <p className="text-muted text-sm leading-relaxed">
              Elke medewerker sluit af met een toets. Bij een voldoende ontvang je het
              Normelo AI-geletterdheid certificaat — het bewijs richting toezichthouders
              en opdrachtgevers dat jouw team compliant werkt.
            </p>
          </div>

          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">6. Compliance-dossier</p>
            <p className="text-muted text-sm leading-relaxed">
              Je ontvangt een compleet dossier: AI-register, AI-beleid, trainingsoverzicht
              en certificaten. Alles wat je nodig hebt als een toezichthouder of opdrachtgever
              vraagt hoe je compliance hebt geborgd.
            </p>
          </div>
        </div>
      </section>

      {/* Prijs + CTA */}
      <section className="py-12 border-b border-border">
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Vast tarief</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold">€3.500</span>
            <span className="text-gray-400">per bureau</span>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">
            Eén prijs, alles inbegrepen. Ongeacht het aantal medewerkers. Van inventarisatie
            tot certificaat — Normelo regelt het.
          </p>
          <Link
            href="/aanvragen"
            className="inline-block px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors no-underline"
          >
            Vraag het pakket aan →
          </Link>
        </div>
      </section>

      {/* Voor wie */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Voor wie</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Het pakket is ontwikkeld voor uitzendbureaus — van kleine bureaus met 5
          medewerkers tot organisaties met tientallen vestigingen. De training is gemaakt
          voor de mensen die dagelijks met AI-systemen werken: recruiters, intercedenten,
          hiring managers, teamleiders en directieleden.
        </p>
        <p className="text-foreground leading-relaxed">
          Er is geen technische voorkennis nodig. Normelo legt alles uit in begrijpelijke
          taal en regelt de documentatie. Jij hoeft alleen je team beschikbaar te maken
          voor de training.
        </p>
      </section>

      {/* Verder lezen */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Meer over de EU AI Act</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/uitzendbranche"
            className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">EU AI Act &amp; de Uitzendbranche</h3>
            <p className="text-sm text-muted leading-relaxed">Hoog-risico systemen, shadow AI en wat dit betekent voor jouw bureau</p>
          </Link>
          <Link
            href="/quick-scan"
            className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Quick Scan</h3>
            <p className="text-sm text-muted leading-relaxed">Ontdek in 2 minuten of jouw bureau werkt met hoog-risico AI</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
