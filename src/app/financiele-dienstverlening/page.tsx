import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EU AI Act & Financiële Dienstverlening",
  description:
    "Wat betekent de EU AI Act voor banken en financiële instellingen? Uitleg over AI voor kredietbeoordeling, fraude-detectie en klantacceptatie als hoog-risico AI.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act & Financiële Dienstverlening",
  description:
    "Wat betekent de EU AI Act voor banken en financiële instellingen? AI voor kredietbeoordeling en fraude-detectie onder de EU AI Act.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/financiele-dienstverlening",
};

const faqItems = [
  {
    question: "Valt AI bij banken onder de EU AI Act?",
    answer:
      "Ja. AI-systemen die worden ingezet voor het beoordelen van de kredietwaardigheid van natuurlijke personen vallen expliciet onder de hoog-risico categorie van de EU AI Act (Bijlage III, categorie 5b). Dit geldt ook voor AI die wordt gebruikt bij klantacceptatie (KYC/AML), het beoordelen van leningaanvragen en het vaststellen van kredietlimieten. Banken die deze systemen inzetten zijn deployers met eigen wettelijke verplichtingen.",
  },
  {
    question: "Is AI voor kredietbeoordeling hoog-risico onder de EU AI Act?",
    answer:
      "Ja. De EU AI Act classificeert AI-systemen voor het beoordelen van de kredietwaardigheid van natuurlijke personen expliciet als hoog-risico (Bijlage III, categorie 5b). Dit omvat credit scoring modellen, geautomatiseerde leningbeoordeling en AI die bepaalt of iemand in aanmerking komt voor een hypotheek, persoonlijke lening of creditcard. Micro-ondernemingen die AI gebruiken voor eigen gebruik zijn hiervan uitgezonderd.",
  },
  {
    question: "Valt fraude-detectie onder de hoog-risico categorie?",
    answer:
      "Niet automatisch. AI-systemen voor fraude-detectie vallen niet standaard onder de hoog-risico categorieën van Bijlage III. Maar als een fraude-detectiesysteem direct leidt tot het blokkeren van transacties, het bevriezen van rekeningen of het weigeren van dienstverlening aan individuele klanten, kan het indirect effect hebben op de toegang tot essentiële financiële diensten. In dat geval moet de bank beoordelen of het systeem toch als hoog-risico kwalificeert. Fraude-detectie die alleen alerts genereert voor menselijke review is doorgaans geen hoog-risico.",
  },
  {
    question: "Wat moet een bank regelen voor de EU AI Act?",
    answer:
      "Als deployer van hoog-risico AI-systemen moet een bank zorgen voor: menselijk toezicht door gekwalificeerde medewerkers die AI-beslissingen kunnen beoordelen en overrulen, transparantie naar klanten over het gebruik van AI bij kredietbeoordelingen, monitoring van de werking en het signaleren van bias of fouten, en het bewaren van logs. Daarnaast moeten banken een effectbeoordeling voor fundamentele rechten uitvoeren voor hoog-risico systemen die essentiële diensten raken.",
  },
  {
    question: "Hoe verhoudt de EU AI Act zich tot bestaande financiële regelgeving?",
    answer:
      "De EU AI Act komt bovenop bestaande financiële regelgeving zoals de Capital Requirements Regulation (CRR), MiFID II, de Anti-Money Laundering Directive (AMLD) en DORA (Digital Operational Resilience Act). Financiële instellingen moeten aan alle van toepassing zijnde regelgeving voldoen. De EU AI Act voegt specifieke eisen toe aan het AI-component: trainingsdata moet representatief en bias-vrij zijn, er moet menselijk toezicht zijn, en het systeem moet transparant zijn. De conformiteitsbeoordeling voor hoog-risico AI in de financiële sector wordt waar mogelijk geïntegreerd in bestaande toezichtkaders.",
  },
  {
    question: "Wanneer moet de financiële sector EU AI Act compliant zijn?",
    answer:
      "De verplichtingen voor hoog-risico AI-systemen uit Bijlage III, waaronder AI voor kredietbeoordeling, worden van toepassing in augustus 2026. Financiële instellingen moeten vanaf dat moment aantoonbaar voldoen aan alle eisen rond risicobeheer, data governance, menselijk toezicht en transparantie. Gegeven de complexiteit van financiële AI-systemen en de overlap met bestaande regelgeving is het aan te raden om nu al met de voorbereiding te beginnen.",
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

export default function FinancieleDienstverlening() {
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
            EU AI Act &amp; Financiële Dienstverlening
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Banken en financiële instellingen gebruiken AI-systemen voor kredietbeoordeling,
            fraude-detectie, klantacceptatie en risicobeheer. AI voor kredietbeoordeling van
            natuurlijke personen valt expliciet onder de hoog-risico categorie van de EU AI Act.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Waarom raakt dit de financiële sector?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            De financiële sector is een van de sectoren die het meest intensief gebruik maakt
            van AI. Credit scoring, geautomatiseerde leningbeoordeling, algoritmische handel,
            fraude-detectie en Know Your Customer (KYC)-processen draaien steeds vaker op
            AI-modellen. De EU AI Act stelt expliciet dat AI-systemen die de kredietwaardigheid
            van natuurlijke personen beoordelen hoog-risico zijn.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Dit raakt niet alleen de grote banken. Elke financiële instelling die AI inzet
            om te bepalen of iemand in aanmerking komt voor een lening, hypotheek of creditcard
            heeft te maken met de hoog-risico verplichtingen. En het gaat verder dan alleen
            krediet: AI-systemen die de toegang tot essentiële financiële diensten beïnvloeden
            — zoals het openen van een bankrekening — kunnen ook onder de hoog-risico categorie
            vallen.
          </p>
          <p className="text-foreground leading-relaxed">
            De reden is duidelijk: een AI-systeem dat bepaalt of iemand geld kan lenen heeft
            directe impact op het leven van die persoon. Fouten of bias in zo&apos;n systeem
            kunnen leiden tot discriminatie en financiële uitsluiting.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Welke financiële AI-systemen vallen hieronder?</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Credit scoring en kredietbeoordeling</h3>
              <p className="text-foreground leading-relaxed">
                AI-modellen die de kredietwaardigheid van natuurlijke personen beoordelen zijn
                expliciet hoog-risico onder Bijlage III. Dit omvat traditionele credit scoring
                modellen die AI-componenten bevatten, maar ook nieuwere modellen die alternatieve
                data gebruiken (zoals gedragsdata of sociale media) om kredietrisico in te schatten.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Geautomatiseerde leningbeoordeling</h3>
              <p className="text-foreground leading-relaxed">
                Systemen die automatisch bepalen of een leningaanvraag wordt goedgekeurd of
                afgewezen, welk bedrag wordt aangeboden, en tegen welke voorwaarden. Zodra
                AI een rol speelt in deze beslissing — ook als het alleen een aanbeveling
                doet aan een menselijke beoordelaar — kwalificeert het als hoog-risico.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">KYC en klantacceptatie</h3>
              <p className="text-foreground leading-relaxed">
                AI-systemen voor Know Your Customer (KYC) en Customer Due Diligence (CDD)
                die bepalen of een klant wordt geaccepteerd of geweigerd. Wanneer het systeem
                direct invloed heeft op de toegang tot bankdiensten, kan het onder de
                hoog-risico categorie vallen. AI die alleen documenten verifieert zonder
                een acceptatiebeslissing te beïnvloeden is doorgaans geen hoog-risico.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Fraude-detectie</h3>
              <p className="text-foreground leading-relaxed">
                Fraude-detectie valt niet standaard onder de hoog-risico categorie. Maar
                als het systeem automatisch transacties blokkeert, rekeningen bevriest of
                dienstverlening weigert zonder menselijke tussenkomst, kan het indirect de
                toegang tot essentiële financiële diensten beïnvloeden. In dat geval is een
                zorgvuldige beoordeling noodzakelijk.
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
            <Link href="/zorg" className="text-accent hover:underline">
              &larr; Zorg
            </Link>
            <Link href="/" className="text-accent hover:underline">
              Homepage
            </Link>
            <Link href="/industrie" className="text-accent hover:underline">
              Industrie &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
