import type { Metadata } from "next";
import Link from "next/link";
import RegistratieForm from "../components/RegistratieForm";

export const metadata: Metadata = {
  title: "Gratis EU AI Act training voor uitzendbureaus",
  description:
    "Gratis training over de EU AI Act, specifiek voor recruiters en intercedenten. Leer welke AI-systemen onder de wet vallen en wat je bureau moet regelen.",
};

export default function Training() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div>
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-green-50 text-green-700 rounded-md border border-green-200">
              Gratis — geen account nodig
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              EU AI Act training voor recruiters en intercedenten
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Sinds februari 2025 moeten medewerkers die met AI werken AI-geletterd zijn
              (art. 4 EU AI Act). Deze training legt uit wat dat concreet betekent voor
              de uitzendbranche — in je eigen tempo, zonder kosten.
            </p>
          </div>
          <div className="md:mt-8">
            <RegistratieForm />
          </div>
        </div>
      </section>

      {/* Wat je leert */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
        <p className="text-foreground leading-relaxed mb-6">
          De training is specifiek gemaakt voor mensen die dagelijks werken met ATS-systemen,
          matchingtools en AI-assistenten in de uitzendbranche.
        </p>
        <div className="space-y-4">
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">De EU AI Act in begrijpelijke taal</p>
            <p className="text-sm text-muted leading-relaxed">
              Wat de wet inhoudt, welke categorieën er zijn, en waarom uitzendbureaus
              als een van de eerste sectoren geraakt worden.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Welke systemen hoog-risico zijn</p>
            <p className="text-sm text-muted leading-relaxed">
              ATS met ranking, CV-screening, matchingtools — je leert herkennen welke
              tools onder de hoog-risico categorie vallen en waarom.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Jouw verplichtingen als gebruiker</p>
            <p className="text-sm text-muted leading-relaxed">
              Menselijk toezicht, transparantie naar kandidaten, documentatie. Concreet
              uitgelegd voor jouw dagelijkse werkzaamheden.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Shadow AI en wat je ermee moet</p>
            <p className="text-sm text-muted leading-relaxed">
              ChatGPT, Copilot en andere tools die medewerkers op eigen initiatief gebruiken.
              Wat mag wel, wat niet, en hoe regel je dat.
            </p>
          </div>
        </div>
      </section>

      {/* Na de training */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Na de training</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Na de training weet je wat de EU AI Act van jouw bureau vraagt. De volgende stap
          is het ook daadwerkelijk regelen: je AI-systemen registreren, documentatie opbouwen
          en compliance bijhouden.
        </p>
        <p className="text-foreground leading-relaxed mb-6">
          Daar is het Normelo AI-register voor. Één plek waar je al je AI-systemen registreert
          en je compliance-documentatie beheert.
        </p>
        <Link
          href="/ai-register"
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors no-underline"
        >
          Meer over het AI-register →
        </Link>
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
