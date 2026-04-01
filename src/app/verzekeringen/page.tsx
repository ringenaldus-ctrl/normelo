import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EU AI Act & Verzekeringen",
  description:
    "Wat betekent de EU AI Act voor verzekeraars? Uitleg over AI voor risico-inschatting, premieberekening en schadeafhandeling als hoog-risico AI.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act & Verzekeringen",
  description:
    "Wat betekent de EU AI Act voor verzekeraars? AI voor risico-inschatting en premieberekening onder de EU AI Act.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/verzekeringen",
};

const faqItems = [
  {
    question: "Valt AI bij verzekeraars onder de EU AI Act?",
    answer:
      "Ja. AI-systemen die worden ingezet voor het beoordelen van risico's en het vaststellen van premies voor levens- en ziektekostenverzekeringen van natuurlijke personen vallen expliciet onder de hoog-risico categorie van de EU AI Act (Bijlage III, categorie 5c). Dit geldt voor verzekeraars die deze systemen inzetten als deployer, en voor de softwareleveranciers die ze ontwikkelen als provider.",
  },
  {
    question: "Is AI voor premieberekening hoog-risico?",
    answer:
      "Ja, wanneer het gaat om levens- en ziektekostenverzekeringen van natuurlijke personen. De EU AI Act classificeert AI-systemen die worden gebruikt om het risico te beoordelen en de premie vast te stellen voor deze verzekeringen expliciet als hoog-risico. Voor schadeverzekeringen (auto, inboedel, opstal) geldt deze classificatie niet standaard, maar als de AI-beoordeling indirect invloed heeft op de toegang tot essentiële diensten kan het alsnog als hoog-risico kwalificeren.",
  },
  {
    question: "Valt AI voor schadeafhandeling onder de EU AI Act?",
    answer:
      "AI-systemen voor schadeafhandeling vallen niet standaard onder de hoog-risico categorie van Bijlage III. Maar als het systeem automatisch claims afwijst of het uitkeringsbedrag vaststelt zonder menselijke tussenkomst, en dit de toegang tot essentiële verzekeringsdiensten beïnvloedt, kan het indirect als hoog-risico kwalificeren. Een systeem dat alleen schade-foto's analyseert om de omvang van de schade in te schatten (als input voor een menselijke beoordelaar) is doorgaans geen hoog-risico.",
  },
  {
    question: "Wat moet een verzekeraar regelen voor de EU AI Act?",
    answer:
      "Als deployer van hoog-risico AI-systemen moet een verzekeraar zorgen voor: menselijk toezicht door gekwalificeerde acceptanten die AI-beslissingen kunnen beoordelen en overrulen, transparantie naar verzekerden over het gebruik van AI bij risicobeoordeling en premievaststelling, monitoring van het systeem op bias en fouten, en het bewaren van logs. Bijzondere aandacht is nodig voor het voorkomen van discriminatie op basis van gezondheidsgegevens of beschermde persoonskenmerken.",
  },
  {
    question: "Hoe verhoudt de EU AI Act zich tot Solvency II?",
    answer:
      "De EU AI Act komt bovenop het bestaande Solvency II-raamwerk. Solvency II regelt de prudentiële eisen voor verzekeraars, waaronder governance en risicobeheer. De EU AI Act voegt specifieke eisen toe aan het AI-component: de trainingsdata moet representatief en bias-vrij zijn, er moet menselijk toezicht zijn op AI-beslissingen, en het systeem moet transparant en uitlegbaar zijn. Verzekeraars moeten aan beide kaders voldoen.",
  },
  {
    question: "Wanneer moeten verzekeraars EU AI Act compliant zijn?",
    answer:
      "De verplichtingen voor hoog-risico AI-systemen uit Bijlage III worden van toepassing in augustus 2026. Verzekeraars moeten vanaf dat moment aantoonbaar voldoen aan alle eisen. Gezien de complexiteit van actuariële AI-modellen en de gevoeligheid van gezondheidsdata is het sterk aan te raden om nu al te beginnen met de inventarisatie en voorbereiding.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Verzekeringen() {
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
        <section className="py-16 border-b border-border">
          <p className="text-sm text-muted mb-3 uppercase tracking-wide">Sectorpagina</p>
          <h1 className="text-4xl font-bold leading-tight mb-6">
            EU AI Act &amp; Verzekeringen
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Verzekeraars gebruiken AI-systemen voor risico-inschatting, premieberekening,
            acceptatie en schadeafhandeling. AI voor het beoordelen van risico&apos;s en
            premies bij levens- en ziektekostenverzekeringen valt expliciet onder de
            hoog-risico categorie van de EU AI Act.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Waarom raakt dit verzekeraars?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Verzekeraars maken van oudsher gebruik van modellen om risico&apos;s in te
            schatten en premies vast te stellen. Met de opkomst van AI worden deze modellen
            steeds geavanceerder — ze verwerken meer data, identificeren complexere patronen
            en nemen snellere beslissingen. Maar die kracht brengt ook risico&apos;s mee:
            bias in de data kan leiden tot discriminerende premies, en ondoorzichtige modellen
            maken het lastig om beslissingen uit te leggen aan verzekerden.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            De EU AI Act pakt dit aan door AI-systemen voor risicobeoordeling en
            premievaststelling bij levens- en ziektekostenverzekeringen als hoog-risico
            te classificeren. De reden is helder: de toegang tot een betaalbare
            ziektekostenverzekering of levensverzekering is essentieel. Een AI-systeem
            dat bepaalt hoeveel premie iemand betaalt of iemand wordt geweigerd, heeft
            directe impact op het leven van die persoon.
          </p>
          <p className="text-foreground leading-relaxed">
            Het gaat niet alleen om de grote verzekeraars. Elke partij in de keten die
            AI inzet voor deze beoordelingen krijgt verplichtingen: de softwareleverancier
            als provider, de verzekeraar als deployer, en in sommige gevallen ook de
            tussenpersoon of gevolmachtigd agent.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Welke verzekeringssystemen vallen hieronder?</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor risicobeoordeling en acceptatie</h3>
              <p className="text-foreground leading-relaxed">
                Modellen die het risicoprofiel van een aanvrager beoordelen op basis van
                persoonlijke gegevens, gezondheidsdata, gedragsdata of andere bronnen. Dit
                omvat zowel traditionele actuariële modellen met AI-componenten als nieuwere
                machine learning modellen. Hoog-risico wanneer het levens- of
                ziektekostenverzekeringen betreft.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor premieberekening</h3>
              <p className="text-foreground leading-relaxed">
                Systemen die op basis van het risicoprofiel de individuele premie vaststellen.
                Wanneer AI-componenten bepalen welke premie een individuele verzekerde betaalt
                voor een levens- of ziektekostenverzekering, is dit hoog-risico. Dynamische
                premiemodellen die realtime data gebruiken (zoals wearables of rijgedrag)
                verdienen bijzondere aandacht.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor schadeafhandeling</h3>
              <p className="text-foreground leading-relaxed">
                Niet standaard hoog-risico, maar wel aandachtspunt. AI die schade-foto&apos;s
                analyseert als input voor een menselijke beoordelaar is doorgaans geen
                hoog-risico. AI die zelfstandig claims afwijst of uitkeringsbedragen vaststelt
                zonder menselijke review kan dat wel zijn, afhankelijk van de impact op de
                verzekerde.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Veelgestelde vragen</h2>
          <div className="space-y-8">
            {faqItems.map((item, index) => (
              <article key={index} className="border-b border-border pb-8 last:border-b-0">
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-foreground leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="flex gap-6">
            <Link href="/" className="text-accent hover:underline">
              &larr; Homepage
            </Link>
            <Link href="/financiele-dienstverlening" className="text-accent hover:underline">
              Financiële dienstverlening &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
