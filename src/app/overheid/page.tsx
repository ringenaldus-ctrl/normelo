import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EU AI Act & de Overheid",
  description:
    "Wat betekent de EU AI Act voor gemeenten, provincies en rijksoverheid? Uitleg over AI voor uitkeringen, handhaving, migratie en publieke dienstverlening als hoog-risico AI.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act & de Overheid",
  description:
    "Wat betekent de EU AI Act voor gemeenten, provincies en rijksoverheid? AI voor uitkeringen, handhaving en publieke dienstverlening onder de EU AI Act.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/overheid",
};

const faqItems = [
  {
    question: "Valt AI bij de overheid onder de EU AI Act?",
    answer:
      "Ja, en de overheid wordt zelfs extra hard geraakt. Meerdere categorieën uit Bijlage III zijn specifiek relevant voor overheidsorganen: AI voor de beoordeling van aanvragen voor essentiële publieke diensten (uitkeringen, toeslagen), AI voor rechtshandhaving, AI voor migratie en grenscontrole, en AI voor rechtsbedeling. Daarnaast heeft de overheid als deployer een extra verplichting: het uitvoeren van een effectbeoordeling voor fundamentele rechten vóór het in gebruik nemen van een hoog-risico AI-systeem.",
  },
  {
    question: "Is AI voor uitkeringen en toeslagen hoog-risico?",
    answer:
      "Ja. AI-systemen die worden ingezet bij het beoordelen van aanvragen voor essentiële publieke diensten en uitkeringen vallen onder de hoog-risico categorie van de EU AI Act (Bijlage III, categorie 5a). Dit omvat systemen die bepalen of iemand in aanmerking komt voor bijstand, toeslagen, WW of arbeidsongeschiktheidsuitkeringen. Ook systemen die het recht op een uitkering beoordelen, het bedrag vaststellen of fraude detecteren bij uitkeringen vallen hieronder.",
  },
  {
    question: "Valt AI voor handhaving en toezicht onder de EU AI Act?",
    answer:
      "Ja. AI-systemen die door rechtshandhavingsinstanties worden ingezet vallen onder Bijlage III, categorie 6. Dit omvat AI voor het beoordelen van het risico dat iemand een strafbaar feit pleegt (predictive policing op basis van persoonskenmerken is verboden), het beoordelen van bewijsmateriaal, het profileren van personen, en het gebruik van leugendetectoren. Nederland heeft na het toeslagenschandaal extra reden om zorgvuldig om te gaan met AI in handhaving en toezicht.",
  },
  {
    question: "Wat moet een gemeente regelen voor de EU AI Act?",
    answer:
      "Gemeenten die hoog-risico AI-systemen inzetten hebben als deployer de standaard verplichtingen (menselijk toezicht, transparantie, monitoring) plus een extra verplichting: het uitvoeren van een effectbeoordeling voor fundamentele rechten (FRIA) vóór het in gebruik nemen van het systeem. Dit geldt voor alle overheidsinstanties die hoog-risico AI inzetten. Daarnaast moeten gemeenten het gebruik van hoog-risico AI-systemen registreren in de openbare EU-database.",
  },
  {
    question: "Wat is een effectbeoordeling voor fundamentele rechten (FRIA)?",
    answer:
      "Een Fundamental Rights Impact Assessment (FRIA) is een beoordeling die overheidsinstanties en aanbieders van diensten van openbaar belang moeten uitvoeren voordat ze een hoog-risico AI-systeem in gebruik nemen. De FRIA moet in kaart brengen welke risico's het systeem vormt voor fundamentele rechten, welke groepen geraakt worden, welke maatregelen worden genomen om risico's te beperken, en hoe menselijk toezicht wordt georganiseerd. Het resultaat moet worden gemeld aan de nationale toezichthoudende autoriteit.",
  },
  {
    question: "Hoe verhoudt de EU AI Act zich tot het toeslagenschandaal?",
    answer:
      "Het toeslagenschandaal heeft pijnlijk duidelijk gemaakt wat er kan misgaan wanneer overheden algoritmes inzetten zonder adequate waarborgen: discriminatie, gebrek aan transparantie en het ontbreken van menselijk toezicht. De EU AI Act adresseert precies deze risico's. AI-systemen voor het beoordelen van aanvragen voor publieke diensten zijn hoog-risico, er moet menselijk toezicht zijn, betrokkenen moeten worden geïnformeerd, en overheidsinstanties moeten een effectbeoordeling uitvoeren. De wet biedt het juridische kader dat destijds ontbrak.",
  },
  {
    question: "Wanneer moet de overheid EU AI Act compliant zijn?",
    answer:
      "De verplichtingen voor hoog-risico AI-systemen uit Bijlage III worden van toepassing in augustus 2026. Overheidsinstanties moeten vanaf dat moment aan alle eisen voldoen, inclusief de effectbeoordeling voor fundamentele rechten. Gezien de politieke gevoeligheid van AI bij de overheid (mede door het toeslagenschandaal) en de complexiteit van overheidsprocessen is het sterk aan te raden om nu al te beginnen met de voorbereiding.",
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

export default function Overheid() {
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
            EU AI Act &amp; de Overheid
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Gemeenten, provincies en rijksoverheid gebruiken AI-systemen voor het beoordelen
            van uitkeringen, handhaving, migratie en publieke dienstverlening. De overheid
            wordt extra hard geraakt door de EU AI Act: meerdere hoog-risico categorieën
            zijn direct relevant, en er geldt een extra verplichting tot het uitvoeren van
            een effectbeoordeling voor fundamentele rechten.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Waarom raakt dit de overheid zo hard?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            De overheid neemt beslissingen die fundamentele rechten van burgers raken:
            wie krijgt een uitkering, wie wordt gecontroleerd, wie wordt toegelaten. Wanneer
            AI-systemen deze beslissingen beïnvloeden, is de impact groot. Het
            toeslagenschandaal in Nederland heeft laten zien wat er kan misgaan: een
            algoritmisch systeem dat gezinnen ten onrechte als fraudeur bestempelde, zonder
            transparantie en zonder effectief menselijk toezicht.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            De EU AI Act trekt hier duidelijke lijnen. AI-systemen die worden ingezet
            voor publieke dienstverlening, rechtshandhaving, migratie en rechtsbedeling
            zijn hoog-risico. En de overheid krijgt als deployer een zwaardere verplichting
            dan het bedrijfsleven: het uitvoeren van een effectbeoordeling voor fundamentele
            rechten (FRIA) is verplicht, niet optioneel.
          </p>
          <p className="text-foreground leading-relaxed">
            Dit raakt alle lagen van de overheid. Van het UWV dat AI inzet bij de beoordeling
            van arbeidsongeschiktheid, tot de gemeente die AI gebruikt voor het detecteren
            van bijstandsfraude, tot de IND die AI toepast bij het verwerken van
            asielaanvragen.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Welke overheidssystemen vallen hieronder?</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor uitkeringen en toeslagen</h3>
              <p className="text-foreground leading-relaxed">
                Systemen die bepalen of iemand in aanmerking komt voor bijstand, toeslagen,
                WW, WIA of andere publieke voorzieningen. Ook systemen die het bedrag
                vaststellen of die fraude detecteren bij uitkeringen. De EU AI Act
                classificeert dit als hoog-risico vanwege de directe impact op de
                bestaanszekerheid van burgers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor rechtshandhaving</h3>
              <p className="text-foreground leading-relaxed">
                Systemen voor predictive policing, het beoordelen van bewijsmateriaal,
                het profileren van personen en het inschatten van recidiverisico. Predictive
                policing op basis van persoonskenmerken is verboden onder de EU AI Act.
                Andere vormen van AI in rechtshandhaving zijn hoog-risico en vereisen
                strikte waarborgen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor migratie en asiel</h3>
              <p className="text-foreground leading-relaxed">
                Systemen voor het verwerken van visa- en asielaanvragen, het beoordelen
                van risico&apos;s met betrekking tot irreguliere migratie, en het detecteren
                of herkennen van personen aan de grens. De IND en Koninklijke Marechaussee
                gebruiken dergelijke systemen in Nederland.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor nooddiensten</h3>
              <p className="text-foreground leading-relaxed">
                Systemen die bepalen welke nooddiensten worden ingezet en met welke
                prioriteit. AI die bij de meldkamer bepaalt of een ambulance met spoed
                of zonder spoed wordt gestuurd, beïnvloedt direct de toegang tot
                spoedeisende zorg en is hoog-risico.
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
            <Link href="/onderwijs" className="text-accent hover:underline">
              Onderwijs &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
