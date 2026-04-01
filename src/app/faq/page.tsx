import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Veelgestelde vragen over de EU AI Act",
  description:
    "Antwoorden op de meest gestelde vragen over de EU AI Act. Voor HR-managers, directeuren en bestuurders die willen weten wat de wet betekent voor hun organisatie.",
};

const faqs = [
  {
    question: "Wat is de EU AI Act?",
    answer:
      "De EU AI Act (officieel: de Verordening Artificiële Intelligentie) is de eerste wet ter wereld die kunstmatige intelligentie reguleert. De wet is aangenomen door het Europees Parlement en de Raad van de Europese Unie en is op 1 augustus 2024 in werking getreden. De wet stelt eisen aan AI-systemen op basis van het risico dat ze vormen voor fundamentele rechten, veiligheid en gezondheid. AI-systemen die worden ingezet voor werving en selectie, kredietbeoordeling of medische diagnoses vallen onder de strengste categorie: hoog-risico.",
  },
  {
    question: "Wanneer gaat de EU AI Act in?",
    answer:
      "De EU AI Act is op 1 augustus 2024 in werking getreden, maar wordt stapsgewijs van toepassing. Sinds februari 2025 zijn AI-systemen met een onaanvaardbaar risico verboden, zoals sociale scoring. Vanaf augustus 2025 gelden verplichtingen voor aanbieders van general-purpose AI-modellen. De belangrijkste deadline voor de meeste organisaties is augustus 2026: dan worden de volledige verplichtingen voor hoog-risico AI-systemen van toepassing, inclusief de eisen rond menselijk toezicht, transparantie en risicobeheer.",
  },
  {
    question: "Geldt de EU AI Act ook voor mijn organisatie?",
    answer:
      "Waarschijnlijk wel. De EU AI Act geldt voor elke organisatie die AI-systemen ontwikkelt, aanbiedt of inzet binnen de Europese Unie, ongeacht de grootte van de organisatie. Het maakt niet uit of je het AI-systeem zelf hebt gebouwd of het van een leverancier afneemt. Als je software gebruikt die automatisch kandidaten selecteert, medewerkers beoordeelt, kredietaanvragen verwerkt of verzekeringsrisico's inschat, heb je vrijwel zeker te maken met hoog-risico AI volgens de EU AI Act.",
  },
  {
    question: "Wat is een hoog-risico AI-systeem?",
    answer:
      "Een hoog-risico AI-systeem is een AI-systeem dat wordt ingezet in een context die significante gevolgen kan hebben voor de fundamentele rechten, veiligheid of gezondheid van mensen. De EU AI Act definieert in Bijlage III specifieke categorieën, waaronder: AI voor werving en selectie van personeel, AI voor toegang tot onderwijs, AI voor kredietbeoordeling, AI voor rechtshandhaving, en AI voor migratiebeheer. In de praktijk betekent dit dat een ATS-systeem dat cv's automatisch rankt, een matchingtool die kandidaten aan vacatures koppelt, of een screeningstool die sollicitanten filtert, allemaal als hoog-risico worden aangemerkt.",
  },
  {
    question: "Is mijn ATS-systeem een hoog-risico AI-systeem?",
    answer:
      "Dat hangt af van wat het systeem doet. Een ATS dat alleen sollicitaties ontvangt en organiseert is op zichzelf geen hoog-risico AI. Maar zodra het systeem kandidaten automatisch rankt, filtert, scoort of prioriteert op basis van hun profiel, kwalificeert het als een AI-systeem dat beslissingen beïnvloedt over toegang tot werk. En dat valt expliciet onder de hoog-risico categorie van de EU AI Act (Bijlage III, categorie 4). De meeste moderne ATS-systemen hebben dit soort functionaliteit ingebouwd, vaak onder namen als 'best match', 'AI-ranking' of 'slimme screening'.",
  },
  {
    question: "Wat moet ik als werkgever regelen voor de EU AI Act?",
    answer:
      "Als je hoog-risico AI-systemen inzet (de wet noemt je dan een 'deployer'), heb je een aantal verplichtingen. Ten eerste: menselijk toezicht. Er moet altijd iemand zijn die de output van het AI-systeem kan beoordelen en overrulen. Ten tweede: transparantie. Medewerkers en kandidaten moeten weten dat er AI wordt ingezet. Ten derde: risicobeheer. Je moet de werking van het systeem monitoren en signaleren als er fouten of bias optreden. Ten vierde: data governance. De data die je invoert moet relevant en representatief zijn. Tot slot moet je bepaalde hoog-risico AI-systemen registreren in een openbare EU-database.",
  },
  {
    question: "Wat is het verschil tussen een provider en een deployer?",
    answer:
      "De EU AI Act maakt onderscheid tussen providers (aanbieders) en deployers (gebruikers). De provider is de partij die het AI-systeem ontwikkelt en op de markt brengt. De deployer is de organisatie die het AI-systeem in de praktijk inzet. Als je bijvoorbeeld een ATS-systeem van een softwareleverancier gebruikt, dan is de leverancier de provider en ben jij de deployer. Beide partijen hebben verplichtingen onder de EU AI Act, maar die zijn verschillend. De provider is verantwoordelijk voor de technische conformiteit, documentatie en CE-markering. De deployer is verantwoordelijk voor het correct en verantwoord inzetten van het systeem, inclusief menselijk toezicht en transparantie naar betrokkenen.",
  },
  {
    question: "Wat zijn de boetes voor het overtreden van de EU AI Act?",
    answer:
      "De EU AI Act kent drie niveaus van boetes. Het gebruik van verboden AI-systemen (zoals sociale scoring of manipulatieve systemen) kan leiden tot boetes tot 35 miljoen euro of 7% van de wereldwijde jaaromzet, afhankelijk van welk bedrag hoger is. Het niet naleven van de verplichtingen voor hoog-risico AI-systemen kan leiden tot boetes tot 15 miljoen euro of 3% van de jaaromzet. Het verstrekken van onjuiste informatie aan toezichthouders kan leiden tot boetes tot 7,5 miljoen euro of 1,5% van de jaaromzet. Voor het mkb en startups gelden de lagere van deze bedragen.",
  },
  {
    question: "Moet ik kandidaten vertellen dat ik AI gebruik bij werving?",
    answer:
      "Ja. De EU AI Act verplicht deployers van hoog-risico AI-systemen om transparant te zijn naar de personen die door het systeem worden geraakt. Bij werving en selectie betekent dit dat kandidaten moeten weten dat er AI wordt ingezet in het selectieproces, en op welke manier het systeem een rol speelt in de beoordeling van hun sollicitatie. Dit gaat verder dan een vermelding in de privacyverklaring. Je moet helder en begrijpelijk communiceren, voordat de AI-beoordeling plaatsvindt. Daarnaast hebben kandidaten op grond van de AVG al het recht om niet onderworpen te worden aan volledig geautomatiseerde besluitvorming.",
  },
  {
    question: "Hoe verhoudt de EU AI Act zich tot de AVG?",
    answer:
      "De EU AI Act en de AVG (Algemene Verordening Gegevensbescherming) vullen elkaar aan. De AVG reguleert de verwerking van persoonsgegevens en geldt al sinds 2018. De EU AI Act reguleert specifiek AI-systemen en voegt daar extra eisen aan toe. Waar de AVG zich richt op databescherming en privacy, richt de EU AI Act zich breder op de veiligheid, transparantie en betrouwbaarheid van AI-systemen. In de praktijk betekent dit dat je aan beide wetten moet voldoen. Een concreet voorbeeld: de AVG geeft mensen het recht op uitleg bij geautomatiseerde besluitvorming, de EU AI Act eist daarbovenop dat er menselijk toezicht is en dat het AI-systeem aantoonbaar veilig en eerlijk werkt.",
  },
  {
    question: "Valt ChatGPT onder de EU AI Act?",
    answer:
      "Ja, maar op een specifieke manier. ChatGPT is gebaseerd op een general-purpose AI-model (GPT). De EU AI Act stelt aparte eisen aan aanbieders van zulke modellen, zoals transparantieverplichtingen en het publiceren van informatie over trainingsdata. Deze eisen gelden vanaf augustus 2025 en zijn gericht op de aanbieder (OpenAI), niet op de eindgebruiker. Maar als je ChatGPT of een vergelijkbaar model inzet als onderdeel van een hoog-risico toepassing, bijvoorbeeld om automatisch cv's te beoordelen, dan vallen de verplichtingen voor hoog-risico AI wél op jou als deployer.",
  },
  {
    question: "Wat moet ik nu al doen om me voor te bereiden?",
    answer:
      "Begin met een inventarisatie. Breng in kaart welke software in je organisatie AI-componenten bevat, vooral in processen die mensen raken: werving, beoordeling, krediet, verzekeringen. Vraag je leveranciers expliciet of hun systemen als hoog-risico kwalificeren onder de EU AI Act. Beoordeel per systeem of er menselijk toezicht is en of betrokkenen geïnformeerd worden. Ga het gesprek aan met je leveranciers over hun planning voor EU AI Act-compliance, zij zijn als provider verantwoordelijk voor de technische kant. En begin met het opzetten van interne processen zodat recruiters en managers weten hoe ze met AI-beslissingen moeten omgaan. De deadline voor hoog-risico verplichtingen is augustus 2026.",
  },
];

// JSON-LD FAQ Schema for Answer Engine Optimization
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 border-b border-border">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Veelgestelde vragen over de EU AI Act
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            De vragen die HR-managers, directeuren en bestuurders het vaakst stellen
            over de EU AI Act — helder beantwoord.
          </p>
        </section>

        {/* FAQ items */}
        <section className="py-12">
          <div className="space-y-10">
            {faqs.map((faq, index) => (
              <article key={index} className="border-b border-border pb-10 last:border-b-0">
                <h2 className="text-xl font-semibold mb-3">{faq.question}</h2>
                <p className="text-foreground leading-relaxed">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Terug naar home */}
        <section className="py-12 border-t border-border">
          <Link href="/" className="text-accent hover:underline">
            &larr; Terug naar de homepage
          </Link>
        </section>
      </div>
    </>
  );
}
