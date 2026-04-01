import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Normelo — EU AI Act uitleg voor organisaties",
  description:
    "Wat is de EU AI Act en wat betekent het voor jouw organisatie? Normelo legt het uit in begrijpelijke taal.",
};

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          De EU AI Act, <br className="hidden md:block" />
          begrijpelijk uitgelegd
        </h1>
        <p className="text-lg text-muted max-w-2xl leading-relaxed">
          Europa heeft de eerste wet ter wereld aangenomen die kunstmatige intelligentie reguleert.
          De EU AI Act raakt elke organisatie die AI-systemen ontwikkelt, inkoopt of gebruikt.
          Op deze site leggen we uit wat de wet inhoudt en wat dit voor jou betekent.
        </p>
      </section>

      {/* Wat is de EU AI Act */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wat is de EU AI Act?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          De EU AI Act (officieel: de Verordening Artificiële Intelligentie) is een Europese wet
          die eisen stelt aan AI-systemen op basis van het risico dat ze vormen. De wet is op
          1 augustus 2024 in werking getreden en wordt stapsgewijs van toepassing. Het doel is
          helder: AI die fundamentele rechten raakt — denk aan werving, kredietbeoordeling of
          medische diagnoses — moet aan strenge eisen voldoen.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          De wet geldt niet alleen voor ontwikkelaars van AI. Ook organisaties die AI-systemen
          inkopen en inzetten — de wet noemt hen &ldquo;deployers&rdquo; — krijgen verplichtingen.
          Als je een ATS-systeem gebruikt dat automatisch cv&apos;s rankt, dan valt dat onder de
          EU AI Act. Ook als je het systeem niet zelf hebt gebouwd.
        </p>
        <p className="text-foreground leading-relaxed">
          De kern van de wet is een risicogebaseerde aanpak. AI-systemen worden ingedeeld in vier
          categorieën: onaanvaardbaar risico (verboden), hoog risico (streng gereguleerd), beperkt
          risico (transparantieverplichtingen) en minimaal risico (geen extra eisen). De meeste
          verplichtingen gelden voor de hoog-risico categorie.
        </p>
      </section>

      {/* Voor wie */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Voor wie geldt dit?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Kort gezegd: voor vrijwel elke organisatie die AI-systemen gebruikt in een context die
          mensen raakt. De EU AI Act maakt geen onderscheid tussen grote en kleine organisaties.
          Het gaat om wat het AI-systeem doet, niet om hoe groot het bedrijf is dat het gebruikt.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Concreet betekent dit dat als jouw organisatie software gebruikt die automatisch
          kandidaten selecteert, medewerkers beoordeelt, kredietaanvragen verwerkt of
          verzekeringsrisico&apos;s inschat, je waarschijnlijk te maken hebt met hoog-risico
          AI volgens de EU AI Act.
        </p>
        <p className="text-foreground leading-relaxed">
          Veel directeuren en HR-managers realiseren zich nog niet dat de systemen die ze dagelijks
          gebruiken onder deze wet vallen. Een ATS dat cv&apos;s rankt is niet zomaar software — het is
          een hoog-risico AI-systeem met bijbehorende wettelijke verplichtingen.
        </p>
      </section>

      {/* Overzicht pagina's */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Verder lezen</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/uitzendbranche"
            className="block p-6 border border-border rounded-lg hover:border-accent transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              EU AI Act &amp; de Uitzendbranche
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              ATS-systemen, CV-screening en matchingtools — wat de EU AI Act betekent
              voor uitzendbureaus en hun dagelijkse processen.
            </p>
          </Link>
          <Link
            href="/hoog-risico"
            className="block p-6 border border-border rounded-lg hover:border-accent transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              Hoog-risico AI-systemen
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Welke AI-systemen vallen in de hoog-risico categorie? En welke
              verplichtingen horen daarbij?
            </p>
          </Link>
          <Link
            href="/tijdlijn"
            className="block p-6 border border-border rounded-lg hover:border-accent transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              Tijdlijn &amp; deadlines
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              De EU AI Act wordt stapsgewijs van toepassing. Overzicht van alle
              belangrijke data en wat er wanneer geldt.
            </p>
          </Link>
          <Link
            href="/faq"
            className="block p-6 border border-border rounded-lg hover:border-accent transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              Veelgestelde vragen
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Antwoorden op de vragen die HR-managers en bestuurders het vaakst
              stellen over de EU AI Act.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
