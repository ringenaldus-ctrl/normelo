import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EU AI Act & Onderwijs",
  description:
    "Wat betekent de EU AI Act voor scholen, universiteiten en onderwijsinstellingen? Uitleg over AI voor toelating, examenbeoordeling en studentmonitoring als hoog-risico AI.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act & Onderwijs",
  description:
    "Wat betekent de EU AI Act voor scholen, universiteiten en onderwijsinstellingen? AI voor toelating en examenbeoordeling onder de EU AI Act.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/onderwijs",
};

const faqItems = [
  {
    question: "Valt AI in het onderwijs onder de EU AI Act?",
    answer:
      "Ja. AI-systemen die worden ingezet voor de toelating tot onderwijsinstellingen, het beoordelen van leerresultaten wanneer die beoordeling bepalend is voor de opleiding, het vaststellen van het onderwijsniveau, en het monitoren van studenten tijdens toetsen vallen onder de hoog-risico categorie van de EU AI Act (Bijlage III, categorie 3). Dit geldt voor zowel primair, voortgezet als hoger onderwijs en beroepsopleidingen.",
  },
  {
    question: "Is AI voor examenbeoordeling hoog-risico?",
    answer:
      "Ja, wanneer de AI-beoordeling bepalend is voor de opleiding van de student. Een AI-systeem dat automatisch tentamens beoordeelt en op basis daarvan bepaalt of een student slaagt of zakt, kwalificeert als hoog-risico. Een AI-tool die een docent assisteert bij het nakijken maar waarbij de docent de eindbeslissing neemt, valt in een grijs gebied. Het criterium is of de AI-output significant invloed heeft op de onderwijsuitkomst van de persoon.",
  },
  {
    question: "Valt plagiaatdetectie onder de EU AI Act?",
    answer:
      "Plagiaatdetectie en AI-detectietools (tools die beoordelen of tekst door AI is geschreven) vallen niet automatisch onder de hoog-risico categorie. Maar als de output van zo'n tool direct leidt tot sancties — zoals het ongeldig verklaren van een examen of het uitsluiten van een student — kan het systeem indirect bepalend zijn voor de opleiding. In dat geval is een zorgvuldige beoordeling nodig. De meeste onderwijsinstellingen gebruiken deze tools als hulpmiddel voor docenten, niet als autonome beslisser, en dat is de veiligste aanpak.",
  },
  {
    question: "Wat moet een school of universiteit regelen voor de EU AI Act?",
    answer:
      "Als onderwijsinstelling die hoog-risico AI-systemen inzet (deployer) moet je zorgen voor: menselijk toezicht door gekwalificeerde docenten of beoordelaars, transparantie naar studenten en leerlingen over het gebruik van AI, monitoring van het systeem op fouten en bias, en het bewaren van logs. Studenten moeten weten wanneer AI wordt ingezet bij hun toelating of beoordeling. De onderwijsinstelling moet ook garanderen dat AI-beslissingen kunnen worden aangevochten.",
  },
  {
    question: "Valt proctoring software onder de EU AI Act?",
    answer:
      "Online proctoring software die studenten monitort tijdens toetsen kan onder de hoog-risico categorie vallen. De EU AI Act noemt specifiek AI-systemen voor het monitoren van het gedrag van studenten tijdens toetsen. Als de proctoring software AI gebruikt om verdacht gedrag te detecteren en dit direct gevolgen heeft voor de student (zoals het ongeldig verklaren van de toets), is het hoog-risico. Proctoring die alleen een opname maakt voor latere menselijke review is minder problematisch, maar verdient wel aandacht vanuit privacy-oogpunt (AVG).",
  },
  {
    question: "Wanneer moet het onderwijs EU AI Act compliant zijn?",
    answer:
      "De verplichtingen voor hoog-risico AI-systemen uit Bijlage III worden van toepassing in augustus 2026. Onderwijsinstellingen die AI inzetten voor toelating, beoordeling of monitoring moeten vanaf dat moment aan alle eisen voldoen. Het is verstandig om nu al te inventariseren welke AI-tools worden gebruikt en te beoordelen of ze als hoog-risico kwalificeren.",
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

export default function Onderwijs() {
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
            EU AI Act &amp; Onderwijs
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Scholen, universiteiten en onderwijsinstellingen gebruiken steeds meer AI-systemen
            voor toelating, beoordeling en monitoring. AI-systemen die bepalend zijn voor de
            opleiding van een persoon vallen onder de hoog-risico categorie van de EU AI Act.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Waarom raakt dit het onderwijs?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Onderwijs bepaalt de toekomst van mensen. Wie wordt toegelaten tot een opleiding,
            hoe prestaties worden beoordeeld, en welk niveau iemand wordt toegekend — deze
            beslissingen hebben langdurige gevolgen. De EU AI Act erkent dit en classificeert
            AI-systemen die deze beslissingen beïnvloeden als hoog-risico.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            De digitalisering van het onderwijs is in de afgelopen jaren versneld. AI wordt
            ingezet voor geautomatiseerde toetsing, adaptief leren, plagiaatdetectie,
            online proctoring en toelatingsprocessen. Veel van deze toepassingen vallen
            nu onder de strengste categorie van de EU AI Act.
          </p>
          <p className="text-foreground leading-relaxed">
            Het gaat niet alleen om universiteiten. Ook mbo-instellingen, scholen voor
            voortgezet onderwijs en beroepsopleidingen die AI-tools inzetten voor beoordeling
            of toelating krijgen met de verplichtingen te maken.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Welke onderwijssystemen vallen hieronder?</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor toelating en selectie</h3>
              <p className="text-foreground leading-relaxed">
                Systemen die automatisch bepalen wie wordt toegelaten tot een opleiding,
                die aanmeldingen ranken of filteren, of die op basis van profielen bepalen
                welke studenten worden uitgenodigd voor een selectieprocedure. Dit is
                expliciet hoog-risico onder de EU AI Act.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor examenbeoordeling</h3>
              <p className="text-foreground leading-relaxed">
                Software die automatisch tentamens, essays of opdrachten beoordeelt wanneer
                die beoordeling bepalend is voor het slagen of zakken van de student. Het
                gaat om AI die een cijfer of beoordeling toekent die direct doorwerkt in
                de studievoortgang.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor niveaubepaling</h3>
              <p className="text-foreground leading-relaxed">
                Systemen die het onderwijsniveau van een persoon vaststellen, bijvoorbeeld
                bij instaptoetsen of diagnostische toetsen die bepalen in welke klas of
                op welk niveau een leerling wordt geplaatst. Wanneer de AI-uitkomst direct
                bepalend is voor het onderwijstraject, is het hoog-risico.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Online proctoring</h3>
              <p className="text-foreground leading-relaxed">
                Software die studenten monitort tijdens online toetsen met behulp van AI,
                bijvoorbeeld door oogbewegingen te analyseren, achtergrondgeluiden te
                detecteren of verdacht gedrag te signaleren. Wanneer de AI-output direct
                gevolgen heeft voor de student (zoals het ongeldig verklaren van de toets)
                kwalificeert het als hoog-risico.
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
            <Link href="/logistiek" className="text-accent hover:underline">
              &larr; Logistiek
            </Link>
            <Link href="/" className="text-accent hover:underline">
              Homepage
            </Link>
            <Link href="/overheid" className="text-accent hover:underline">
              Overheid &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
