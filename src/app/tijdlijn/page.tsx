import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { BIJLAGE_I_ZIN, HOOG_RISICO_ZIN } from "@/content/ai-act";

export const metadata: Metadata = {
  title: "EU AI Act tijdlijn — alle deadlines op een rij",
  description:
    "Wanneer gaat de EU AI Act in? Overzicht van de data, inclusief het uitstel van de hoog-risico-verplichtingen tot 2 december 2027.",
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
    label: "Algemene toepassing",
    description:
      "De AI-verordening is in het algemeen van toepassing. De verplichtingen voor hoog-risico AI-systemen uit hoofdstuk III vallen hier niet onder. Die zijn uitgesteld door de Digital Omnibus, Verordening (EU) 2026/1744.",
    status: "passed" as const,
  },
  {
    date: "2 december 2027",
    label: "Hoog-risico AI-systemen (Bijlage III)",
    description:
      "Vanaf deze datum gelden de verplichtingen voor hoog-risico AI-systemen uit Bijlage III, zoals AI voor werving en selectie, kredietbeoordeling, onderwijs, rechtshandhaving en migratie. Zowel providers als deployers moeten dan voldoen aan de eisen voor risicobeheer, data governance, technische documentatie, menselijk toezicht, transparantie, conformiteitsbeoordeling en registratie in de EU-database. De oorspronkelijke datum was 2 augustus 2026.",
    status: "upcoming" as const,
  },
  {
    date: "2 augustus 2028",
    label: "Hoog-risico AI in gereguleerde producten (Bijlage I)",
    description:
      "De verplichtingen voor hoog-risico AI die als veiligheidscomponent in gereguleerde producten zit (Bijlage I) worden van toepassing. Dit betreft producten die al onder bestaande EU-wetgeving vallen, zoals medische hulpmiddelen, machines, speelgoed, liften en luchtvaartapparatuur. De oorspronkelijke datum was 2 augustus 2027.",
    status: "upcoming" as const,
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act tijdlijn — alle deadlines op een rij",
  description:
    "Wanneer gaat de EU AI Act in? Overzicht van de data tot en met 2028, inclusief het uitstel van de hoog-risico-verplichtingen.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.nl" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.nl" },
  datePublished: "2026-04-01",
  dateModified: "2026-10-30",
  mainEntityOfPage: "https://normelo.nl/tijdlijn",
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
        text: "De EU AI Act is op 1 augustus 2024 in werking getreden. De verplichtingen worden stapsgewijs van toepassing: verboden AI-praktijken en artikel 4 sinds februari 2025, general-purpose AI vanaf augustus 2025, algemene toepassing vanaf 2 augustus 2026. Hoog-risico AI-systemen (Bijlage III) gelden vanaf 2 december 2027, en hoog-risico AI in gereguleerde producten (Bijlage I) vanaf 2 augustus 2028.",
      },
    },
    {
      "@type": "Question",
      name: "Wanneer moet mijn organisatie EU AI Act compliant zijn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voor organisaties die AI-systemen gebruiken voor werving, selectie, kredietbeoordeling of vergelijkbare toepassingen geldt Bijlage III vanaf 2 december 2027. Vanaf dat moment moeten de verplichtingen voor die hoog-risico AI-systemen zijn geïmplementeerd, inclusief menselijk toezicht, transparantie en risicobeheer. Artikel 4 over AI-geletterdheid geldt al sinds 2 februari 2025, in de versoepelde tekst van 27 juli 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Wat zijn de EU AI Act deadlines voor 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Op 2 februari 2026 moest de governance-structuur operationeel zijn. Op 2 augustus 2026 werd de verordening in het algemeen van toepassing. De hoog-risico-verplichtingen voor Bijlage III, waaronder werving, selectie, kredietbeoordeling en onderwijs, gelden pas vanaf 2 december 2027.",
      },
    },
  ],
};

function StatusBadge({ status }: { status: "passed" | "upcoming" }) {
  const styles = {
    passed: "bg-gray-100 text-gray-600",
    upcoming: "bg-blue-50 text-blue-700",
  };
  const labels = {
    passed: "Verstreken",
    upcoming: "Aankomend",
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
            toepassing. Voor organisaties die AI inzetten voor werving, selectie of beoordeling
            gelden de hoog-risico-verplichtingen vanaf 2 december 2027. Hieronder de data.
          </p>
        </section>

        {/* Timeline */}
        <section className="py-12 border-b border-border">
          <div className="space-y-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex gap-6 items-start"
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
            Gebruik je AI voor werving en selectie, personeelsbeoordeling, kredietbeoordeling
            of een vergelijkbare toepassing, dan is 2 december 2027 de datum voor de
            hoog-risico-verplichtingen uit Bijlage III. {HOOG_RISICO_ZIN} {BIJLAGE_I_ZIN}{" "}
            De voorbereiding kost tijd: inventarisatie van je AI-systemen, gesprekken met
            leveranciers, menselijk toezicht, en het informeren van de mensen die het raakt.
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
