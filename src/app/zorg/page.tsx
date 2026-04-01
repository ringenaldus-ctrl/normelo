import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EU AI Act & de Zorgsector",
  description:
    "Wat betekent de EU AI Act voor ziekenhuizen, huisartsenpraktijken en zorginstellingen? Uitleg over AI voor diagnose, triage en medische beeldvorming als hoog-risico AI.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act & de Zorgsector",
  description:
    "Wat betekent de EU AI Act voor ziekenhuizen, huisartsenpraktijken en zorginstellingen? AI voor diagnose, triage en medische beeldvorming onder de EU AI Act.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/zorg",
};

const faqItems = [
  {
    question: "Valt AI in de zorg onder de EU AI Act?",
    answer:
      "Ja. AI-systemen die worden ingezet als veiligheidscomponent in medische hulpmiddelen vallen onder de hoog-risico categorie van de EU AI Act via Bijlage I (koppeling met de Verordening Medische Hulpmiddelen). Daarnaast vallen AI-systemen voor triage in de spoedeisende hulp, toegang tot zorgverzekeringen en prioritering van nooddiensten onder Bijlage III. Dit betekent dat zowel de fabrikant van het AI-systeem (provider) als het ziekenhuis of de zorginstelling die het inzet (deployer) verplichtingen hebben.",
  },
  {
    question: "Is AI voor medische diagnose hoog-risico?",
    answer:
      "Ja, in de meeste gevallen. AI-systemen die artsen ondersteunen bij het stellen van diagnoses — zoals AI voor het analyseren van röntgenfoto's, CT-scans, pathologiebeelden of ECG's — worden doorgaans geclassificeerd als medisch hulpmiddel. Als zo'n systeem een AI-component bevat, valt het onder de hoog-risico categorie van de EU AI Act via Bijlage I. De fabrikant moet een conformiteitsbeoordeling uitvoeren en het ziekenhuis dat het systeem inzet moet zorgen voor menselijk toezicht door gekwalificeerde artsen.",
  },
  {
    question: "Wat moet een ziekenhuis regelen voor de EU AI Act?",
    answer:
      "Als ziekenhuis ben je deployer van hoog-risico AI-systemen. Je verplichtingen zijn: het systeem gebruiken volgens de instructies van de fabrikant, menselijk toezicht door gekwalificeerde zorgprofessionals, patiënten informeren dat AI wordt ingezet bij hun diagnose of behandeling, monitoring van de werking en het melden van incidenten aan de fabrikant en de bevoegde autoriteiten. Daarnaast moet je als zorginstelling een effectbeoordeling voor fundamentele rechten overwegen.",
  },
  {
    question: "Valt een AI-chatbot voor patiënten onder de EU AI Act?",
    answer:
      "Dat hangt af van de functie. Een chatbot die alleen administratieve vragen beantwoordt (openingstijden, afspraken plannen) is geen hoog-risico AI. Maar een chatbot die symptomen beoordeelt en op basis daarvan medisch advies geeft of triageert, beïnvloedt beslissingen over iemands gezondheid. Als zo'n systeem kwalificeert als medisch hulpmiddel, valt het onder de hoog-risico categorie. De grens ligt bij de vraag of de output van het systeem invloed heeft op medische beslissingen.",
  },
  {
    question: "Wanneer moet de zorgsector EU AI Act compliant zijn?",
    answer:
      "AI-systemen in medische hulpmiddelen (Bijlage I) krijgen een langere overgangsperiode: de volledige verplichtingen gelden vanaf augustus 2027. AI-systemen die onder Bijlage III vallen (zoals AI voor triage bij nooddiensten of toegang tot zorgverzekeringen) moeten al vanaf augustus 2026 compliant zijn. Het is aan te raden om nu al te inventariseren welke AI-systemen je gebruikt en onder welke categorie ze vallen.",
  },
  {
    question: "Hoe verhoudt de EU AI Act zich tot de Verordening Medische Hulpmiddelen (MDR)?",
    answer:
      "De EU AI Act en de MDR vullen elkaar aan. Medische hulpmiddelen met een AI-component moeten aan beide regelgevingen voldoen. De MDR regelt de veiligheid en werkzaamheid van het medisch hulpmiddel als geheel, inclusief klinische evaluatie en CE-markering. De EU AI Act voegt daar extra eisen aan toe die specifiek op het AI-component gericht zijn, zoals eisen aan de trainingsdata, transparantie en menselijk toezicht. De conformiteitsbeoordeling onder de EU AI Act wordt zoveel mogelijk geïntegreerd in de bestaande MDR-procedure.",
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

export default function Zorg() {
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
            EU AI Act &amp; de Zorgsector
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Ziekenhuizen, huisartsenpraktijken en zorginstellingen gebruiken steeds vaker
            AI-systemen voor diagnose, triage en medische beeldvorming. Veel van deze systemen
            vallen onder de hoog-risico categorie van de EU AI Act — via de koppeling met de
            Verordening Medische Hulpmiddelen én via Bijlage III.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Waarom raakt dit de zorgsector zo direct?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            De zorgsector wordt op twee manieren geraakt door de EU AI Act. Ten eerste via
            Bijlage I: AI-systemen die als veiligheidscomponent worden ingebouwd in medische
            hulpmiddelen. Dit omvat AI voor beeldanalyse (röntgen, CT, MRI, pathologie),
            AI-gestuurde diagnostische software, en AI in chirurgische robots of
            monitoringsystemen.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Ten tweede via Bijlage III: AI-systemen die worden ingezet voor triage bij
            spoedeisende hulp, voor het prioriteren van nooddiensten (ambulance, brandweer),
            en voor het beoordelen van aanvragen voor zorgverzekeringen of essentiële
            gezondheidsdiensten.
          </p>
          <p className="text-foreground leading-relaxed">
            De impact is breed. Van het academisch ziekenhuis dat AI inzet voor het detecteren
            van tumoren op CT-scans, tot de huisartsenpraktijk die een AI-triage tool gebruikt
            om de urgentie van klachten in te schatten — ze krijgen allemaal te maken met de
            verplichtingen van de EU AI Act.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Welke zorgsystemen vallen hieronder?</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor medische beeldvorming</h3>
              <p className="text-foreground leading-relaxed">
                Software die automatisch afwijkingen detecteert op röntgenfoto&apos;s, CT-scans,
                MRI-beelden of pathologische coupes. Denk aan AI die longembolen signaleert,
                borstkanker opspoort in mammografieën, of fracturen detecteert op röntgenbeelden.
                Deze systemen kwalificeren vrijwel altijd als medisch hulpmiddel met een
                AI-component en zijn daarmee hoog-risico onder de EU AI Act.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor klinische beslisondersteuning</h3>
              <p className="text-foreground leading-relaxed">
                Systemen die artsen adviseren over diagnoses, behandelopties of medicatie op
                basis van patiëntdata. Wanneer de output van zo&apos;n systeem direct invloed
                heeft op klinische beslissingen, kwalificeert het als hoog-risico. Een systeem
                dat alleen informatie presenteert zonder aanbeveling (zoals een digitaal
                naslagwerk) valt hier doorgaans niet onder.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor triage en urgentiebepaling</h3>
              <p className="text-foreground leading-relaxed">
                Software die de urgentie van patiënten inschat op de spoedeisende hulp, of
                die bij een huisartsenpost bepaalt welke patiënten voorrang moeten krijgen.
                Deze systemen beïnvloeden direct de toegang tot zorg en vallen onder
                Bijlage III van de EU AI Act.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI in chirurgische robots</h3>
              <p className="text-foreground leading-relaxed">
                Robotchirurgische systemen met AI-componenten die de chirurg assisteren
                bij het uitvoeren van operaties. Als het AI-component autonome beslissingen
                neemt of de chirurg actief stuurt, kwalificeert het als hoog-risico.
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
            <Link href="/verzekeringen" className="text-accent hover:underline">
              &larr; Verzekeringen
            </Link>
            <Link href="/" className="text-accent hover:underline">
              Homepage
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
