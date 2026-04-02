import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EU AI Act tijdlijn — alle deadlines op een rij",
  description:
    "Wanneer gaat de EU AI Act in? Overzicht van alle belangrijke deadlines: van de inwerkingtreding in 2024 tot de volledige toepassing in 2027.",
};

const events = [
  {
    date: "1 augustus 2024",
    label: "Inwerkingtreding",
    description:
      "De EU AI Act treedt officieel in werking. De wet is gepubliceerd in het Publicatieblad van de Europese Unie op 12 juli 2024 en wordt 20 dagen later van kracht. Vanaf dit moment begint de klok te lopen voor alle overgangstermijnen.",
    status: "passed" as const,
  },
  {
    date: "2 februari 2025",
    label: "Verboden AI-praktijken",
    description:
      "Zes maanden na inwerkingtreding worden AI-systemen met een onaanvaardbaar risico verboden. Dit omvat sociale scoring door overheden, het exploiteren van kwetsbaarheden van specifieke groepen, subliminale manipulatietechnieken, real-time biometrische identificatie op afstand in openbare ruimtes (met beperkte uitzonderingen voor rechtshandhaving), emotieherkenning op de werkplek en in het onderwijs, en het ongerichte scrapen van gezichtsafbeeldingen van internet voor gezichtsherkenningsdatabases.",
    status: "passed" as const,
  },
  {
    date: "2 augustus 2025",
    label: "General-purpose AI-modellen",
    description:
      "Twaalf maanden na inwerkingtreding worden de verplichtingen voor aanbieders van general-purpose AI-modellen (GPAI) van toepassing. Dit raakt bedrijven als OpenAI, Google, Anthropic en Meta. Zij moeten technische documentatie opstellen, informatie publiceren over trainingsdata, en samenwerken met downstream-providers. Modellen met systemisch risico (zoals zeer krachtige frontier-modellen) krijgen extra verplichtingen rond red teaming en cyberveiligheid.",
    status: "passed" as const,
  },
  {
    date: "2 februari 2026",
    label: "Governance-structuur operationeel",
    description:
      "De governance-structuur van de EU AI Act moet volledig operationeel zijn. Dit omvat het AI Office (onderdeel van de Europese Commissie), het AI Board (vertegenwoordigers van lidstaten), het wetenschappelijk panel van onafhankelijke experts, en het adviesforum met vertegenwoordigers van het bedrijfsleven en het maatschappelijk middenveld. Lidstaten moeten ook hun nationale toezichthoudende autoriteiten hebben aangewezen.",
    status: "passed" as const,
  },
  {
    date: "2 augustus 2026",
    label: "Hoog-risico AI-systemen (Bijlage III)",
    description:
      "Dit is de belangrijkste deadline voor de meeste organisaties. De volledige verplichtingen voor hoog-risico AI-systemen uit Bijlage III worden van toepassing. Dit betreft AI voor werving en selectie, kredietbeoordeling, onderwijs, rechtshandhaving, migratie en meer. Zowel providers als deployers moeten vanaf dit moment aan alle eisen voldoen: risicobeheer, data governance, technische documentatie, menselijk toezicht, transparantie, conformiteitsbeoordeling en registratie in de EU-database.",
    status: "critical" as const,
  },
  {
    date: "2 augustus 2027",
    label: "Hoog-risico AI in gereguleerde producten (Bijlage I)",
    description:
      "De verplichtingen voor hoog-risico AI-systemen die als veiligheidscomponent in gereguleerde producten worden ingebouwd (Bijlage I) worden van toepassing. Dit betreft producten die al onder bestaande EU-wetgeving vallen, zoals medische hulpmiddelen, machines, speelgoed, liften, auto's en luchtvaartapparatuur. Deze langere overgangstermijn geeft fabrikanten extra tijd om hun producten en conformiteitsprocessen aan te passen.",
    status: "upcoming" as const,
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act tijdlijn — alle deadlines op een rij",
  description:
    "Wanneer gaat de EU AI Act in? Overzicht van alle belangrijke deadlines van 2024 tot 2027.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/tijdlijn",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wanneer gaat de EU AI Act in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De EU AI Act is op 1 augustus 2024 in werking getreden. De verplichtingen worden stapsgewijs van toepassing: verboden AI-praktijken sinds februari 2025, general-purpose AI vanaf augustus 2025, hoog-risico AI-systemen (Bijlage III) vanaf augustus 2026, en hoog-risico AI in gereguleerde producten (Bijlage I) vanaf augustus 2027.",
      },
    },
    {
      "@type": "Question",
      name: "Wanneer moet mijn organisatie EU AI Act compliant zijn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voor de meeste organisaties die AI-systemen gebruiken voor werving, selectie, kredietbeoordeling of vergelijkbare toepassingen is de deadline augustus 2026. Vanaf dat moment moeten alle verplichtingen voor hoog-risico AI-systemen uit Bijlage III zijn geïmplementeerd, inclusief menselijk toezicht, transparantie en risicobeheer.",
      },
    },
    {
      "@type": "Question",
      name: "Wat zijn de EU AI Act deadlines voor 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In 2026 zijn er twee belangrijke deadlines. Op 2 februari 2026 moet de governance-structuur operationeel zijn, inclusief nationale toezichthouders. Op 2 augustus 2026 worden de volledige verplichtingen voor hoog-risico AI-systemen (Bijlage III) van toepassing, waaronder AI voor werving en selectie, kredietbeoordeling en onderwijs.",
      },
    },
  ],
};

function StatusBadge({ status }: { status: "passed" | "upcoming" | "critical" }) {
  const styles = {
    passed: "bg-gray-100 text-gray-600",
    upcoming: "bg-blue-50 text-blue-700",
    critical: "bg-red-50 text-red-700 font-semibold",
  };
  const labels = {
    passed: "Verstreken",
    upcoming: "Aankomend",
    critical: "Belangrijke deadline",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function Tijdlijn() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 border-b border-border">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            EU AI Act tijdlijn &amp; deadlines
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            De EU AI Act is op 1 augustus 2024 in werking getreden en wordt stapsgewijs van
            toepassing. De belangrijkste deadline voor organisaties die AI-systemen inzetten
            voor werving, selectie of beoordeling is augustus 2026. Hieronder alle data op een rij.
          </p>
        </section>

        {/* Timeline */}
        <section className="py-12 border-b border-border">
          <div className="space-y-8">
            {events.map((event, index) => (
              <div
                key={index}
                className={`flex gap-6 items-start ${event.status === "critical" ? "bg-red-50/50 -mx-4 px-4 py-4 rounded-lg border border-red-100" : ""}`}
              >
                <div className="flex-shrink-0 w-36">
                  <p className="text-sm font-mono text-accent">{event.date}</p>
                  <StatusBadge status={event.status} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{event.label}</h2>
                  <p className="text-foreground leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Samenvatting */}
        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Wat betekent dit voor jou?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Als je AI-systemen gebruikt voor werving en selectie, personeelsbeoordeling,
            kredietbeoordeling of vergelijkbare toepassingen, is augustus 2026 jouw deadline.
            Dat is over minder dan vijf maanden. De voorbereidingen kosten tijd:
            inventarisatie van je AI-systemen, gesprekken met leveranciers, het opzetten
            van interne processen voor menselijk toezicht, en het informeren van kandidaten
            en medewerkers.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Organisaties die nu beginnen met de voorbereiding hebben een duidelijk voordeel.
            Niet alleen omdat ze op tijd klaar zijn, maar ook omdat ze het proces beheerst
            kunnen doorlopen in plaats van op het laatste moment alles tegelijk te moeten
            regelen.
          </p>
          <p className="text-foreground leading-relaxed">
            Begin met het in kaart brengen van welke AI-systemen je gebruikt en welke daarvan
            als hoog-risico kwalificeren. Ga daarna het gesprek aan met je leveranciers over
            hun EU AI Act-roadmap. En informeer intern de mensen die met deze systemen werken.
          </p>
        </section>

        {/* Terug */}
        <section className="py-12">
          <div className="flex gap-6">
            <Link href="/" className="text-accent hover:underline">
              &larr; Homepage
            </Link>
            <Link href="/hoog-risico" className="text-accent hover:underline">
              Hoog-risico AI-systemen &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
