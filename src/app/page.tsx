import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Normelo — EU AI Act uitleg voor organisaties",
  description:
    "Wat is de EU AI Act en wat betekent het voor jouw organisatie? Normelo legt het uit in begrijpelijke taal.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "Normelo is een informatief kennisplatform over de EU AI Act. Duidelijke uitleg voor organisaties over hoog-risico AI-systemen, deadlines en verplichtingen.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Normelo",
  url: "https://normelo.com",
  description:
    "EU AI Act uitleg voor organisaties. Begrijpelijk, compleet en gratis.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "De EU AI Act, begrijpelijk uitgelegd",
  description:
    "Wat is de EU AI Act en wat betekent het voor jouw organisatie? Uitleg over de wet, de risicocategorieën en wie er aan moet voldoen.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com",
};

export default function Home() {
  return (
    <>
    <Script
      id="org-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
    <section className="bg-dark">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
          De EU AI Act, <br className="hidden md:block" />
          begrijpelijk uitgelegd
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
          Europa heeft de eerste wet ter wereld aangenomen die kunstmatige intelligentie reguleert.
          De EU AI Act raakt elke organisatie die AI-systemen ontwikkelt, inkoopt of gebruikt.
          Op deze site leggen we uit wat de wet inhoudt en wat dit voor jou betekent.
        </p>
      </div>
    </section>

    <div className="max-w-4xl mx-auto px-6">

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

      {/* Quick Scan CTA */}
      <section className="py-12 border-b border-border">
        <div className="rounded-lg p-8 bg-surface">
          <h2 className="text-2xl font-bold mb-3">Valt jouw AI-gebruik onder de wet?</h2>
          <p className="text-foreground leading-relaxed mb-5 max-w-2xl">
            Doe de gratis Quick Scan en ontdek in 2 minuten of jouw organisatie te maken
            heeft met hoog-risico AI volgens de EU AI Act. Geen registratie nodig.
          </p>
          <Link
            href="/quick-scan"
            className="btn-accent inline-block px-6 py-3 bg-accent hover:bg-accent-hover rounded-lg font-medium no-underline transition-colors"
          >
            Start de Quick Scan →
          </Link>
        </div>
      </section>

      {/* Sectorpagina's */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">EU AI Act per sector</h2>
        <p className="text-muted mb-6">Wat betekent de wet voor jouw branche?</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/uitzendbranche" className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group">
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Uitzendbranche</h3>
            <p className="text-sm text-muted leading-relaxed">ATS-systemen, CV-screening en matchingtools</p>
          </Link>
          <Link href="/zorg" className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group">
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Zorg</h3>
            <p className="text-sm text-muted leading-relaxed">Diagnose, triage en medische beeldvorming</p>
          </Link>
          <Link href="/financiele-dienstverlening" className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group">
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Financiële dienstverlening</h3>
            <p className="text-sm text-muted leading-relaxed">Kredietbeoordeling, fraude-detectie en KYC</p>
          </Link>
          <Link href="/verzekeringen" className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group">
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Verzekeringen</h3>
            <p className="text-sm text-muted leading-relaxed">Risico-inschatting en premieberekening</p>
          </Link>
          <Link href="/onderwijs" className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group">
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Onderwijs</h3>
            <p className="text-sm text-muted leading-relaxed">Toelating, examenbeoordeling en proctoring</p>
          </Link>
          <Link href="/overheid" className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group">
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Overheid</h3>
            <p className="text-sm text-muted leading-relaxed">Uitkeringen, handhaving en publieke diensten</p>
          </Link>
          <Link href="/logistiek" className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group">
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Logistiek &amp; Transport</h3>
            <p className="text-sm text-muted leading-relaxed">Workforce monitoring, autonome voertuigen en routing</p>
          </Link>
          <Link href="/industrie" className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group">
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Industrie &amp; Manufacturing</h3>
            <p className="text-sm text-muted leading-relaxed">Robots, machines, quality control en productveiligheid</p>
          </Link>
        </div>
      </section>

      {/* Verder lezen */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Verder lezen</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/hoog-risico"
            className="block p-6 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              Hoog-risico AI-systemen
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Alle acht categorieën en de verplichtingen voor providers en deployers.
            </p>
          </Link>
          <Link
            href="/tijdlijn"
            className="block p-6 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              Tijdlijn &amp; deadlines
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Alle belangrijke data van 2024 tot 2027 op een rij.
            </p>
          </Link>
          <Link
            href="/faq"
            className="block p-6 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent">
              Veelgestelde vragen
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              De 12 meest gestelde vragen over de EU AI Act, helder beantwoord.
            </p>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
