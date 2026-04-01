import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EU AI Act & Industrie en Manufacturing",
  description:
    "Wat betekent de EU AI Act voor fabrikanten en industriële bedrijven? Uitleg over AI in machines, robotica, quality control en productveiligheid als hoog-risico AI.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act & Industrie en Manufacturing",
  description:
    "Wat betekent de EU AI Act voor fabrikanten en industriële bedrijven? AI in machines, robotica en productveiligheid onder de EU AI Act.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/industrie",
};

const faqItems = [
  {
    question: "Valt AI in de industrie onder de EU AI Act?",
    answer:
      "Ja, op twee manieren. Ten eerste via Bijlage I: AI-systemen die als veiligheidscomponent worden ingebouwd in industriële producten die al onder bestaande EU-productveiligheidsregulering vallen, zoals machines (Machinerichtlijn/Machineverordening), drukapparatuur, liften en persoonlijke beschermingsmiddelen. Ten tweede via Bijlage III: AI-systemen die worden ingezet voor personeelsbeoordeling of -monitoring in de fabrieksomgeving. De impact voor de industrie is groter dan veel bedrijven verwachten.",
  },
  {
    question: "Is AI in machines en robots hoog-risico?",
    answer:
      "Ja, wanneer de AI fungeert als veiligheidscomponent. De EU AI Act classificeert AI-systemen die als veiligheidscomponent worden ingebouwd in producten waarvoor al een conformiteitsbeoordeling verplicht is (Bijlage I) als hoog-risico. Dit omvat industriële robots met AI-gestuurde bewegingen, CNC-machines met AI-optimalisatie die de veiligheid beïnvloedt, geautomatiseerde productielijnen met AI-componenten, en cobots (collaboratieve robots) die naast mensen werken. De fabrikant moet als provider een conformiteitsbeoordeling uitvoeren; de fabriek die de machine inzet is deployer.",
  },
  {
    question: "Valt AI voor quality control onder de EU AI Act?",
    answer:
      "AI voor quality control (zoals visuele inspectie van producten) is niet standaard hoog-risico als het alleen productfouten detecteert. Maar als het quality control systeem onderdeel is van de veiligheidsborging van een gereguleerd product — bijvoorbeeld het controleren van medische hulpmiddelen, auto-onderdelen of vliegtuigcomponenten — kan het indirect als hoog-risico kwalificeren via de productveiligheidsregulering. En als de output van het QC-systeem wordt gebruikt om medewerkers te beoordelen (wie maakt de meeste fouten), verschuift het naar categorie 4 van Bijlage III.",
  },
  {
    question: "Wat moet een fabrikant regelen als provider?",
    answer:
      "Fabrikanten die AI-componenten inbouwen in hun producten zijn providers onder de EU AI Act. Hun verplichtingen zijn zwaar: een volledig risicobeheersysteem, data governance voor trainingsdata, uitgebreide technische documentatie, automatische logging, transparantie-eisen, en een conformiteitsbeoordeling gevolgd door CE-markering en registratie in de EU-database. De conformiteitsbeoordeling voor AI wordt zoveel mogelijk geïntegreerd in de bestaande CE-procedure voor het product.",
  },
  {
    question: "Wat moet een fabriek regelen als deployer?",
    answer:
      "Fabrieken die AI-systemen inzetten in hun productieproces (maar ze niet zelf ontwikkelen) zijn deployers. Hun verplichtingen zijn: het systeem gebruiken volgens de instructies van de provider, menselijk toezicht door gekwalificeerd personeel, monitoring van de werking en het melden van incidenten, en transparantie naar medewerkers als AI wordt ingezet voor monitoring of beoordeling. Als de fabriek een AI-systeem significant aanpast of voor een ander doel inzet dan beoogd, kan zij als provider worden beschouwd.",
  },
  {
    question: "Hoe verhoudt de EU AI Act zich tot de Machineverordening?",
    answer:
      "De EU AI Act en de nieuwe Machineverordening (die de Machinerichtlijn vervangt) zijn op elkaar afgestemd. Machines met AI-componenten die de veiligheid beïnvloeden moeten aan beide regelgevingen voldoen. De Machineverordening regelt de algehele machineveiligheid, inclusief risicobeoordeling en CE-markering. De EU AI Act voegt specifieke eisen toe aan het AI-component: trainingsdata moet representatief zijn, er moet logging zijn, het systeem moet transparant en uitlegbaar zijn, en er moet menselijk toezicht mogelijk zijn. De conformiteitsbeoordelingen worden gecombineerd.",
  },
  {
    question: "Wanneer moet de industrie EU AI Act compliant zijn?",
    answer:
      "AI-systemen die als veiligheidscomponent in gereguleerde producten zitten (Bijlage I, waaronder machines en robots) krijgen een overgangsperiode tot augustus 2027. AI-systemen voor personeelsbeoordeling en -monitoring (Bijlage III) moeten al in augustus 2026 compliant zijn. Fabrikanten die AI in hun producten inbouwen doen er goed aan nu al te beginnen, omdat de conformiteitsbeoordeling voor AI-componenten tijd kost en geïntegreerd moet worden in het bestaande CE-proces.",
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

export default function Industrie() {
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
            EU AI Act &amp; Industrie en Manufacturing
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Fabrikanten en industriële bedrijven worden op twee fronten geraakt door de
            EU AI Act: AI in machines en robots die de veiligheid van mensen raken, en AI
            die medewerkers in de fabrieksomgeving monitort of beoordeelt. De impact is
            groter dan de sector verwacht.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Waarom raakt dit de industrie?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            De industriële sector staat aan de vooravond van een AI-transformatie. Slimme
            machines, predictive maintenance, AI-gestuurde kwaliteitscontrole en collaborative
            robots veranderen de fabrieksomgeving fundamenteel. Maar met de EU AI Act komen
            daar nieuwe verplichtingen bij.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            De eerste route loopt via Bijlage I van de EU AI Act. AI-systemen die als
            veiligheidscomponent worden ingebouwd in producten waarvoor al EU-regulering
            bestaat — machines, drukapparatuur, liften, persoonlijke beschermingsmiddelen —
            zijn automatisch hoog-risico. Dit raakt fabrikanten die AI in hun producten
            inbouwen (providers) én bedrijven die deze producten inzetten (deployers).
          </p>
          <p className="text-foreground leading-relaxed">
            De tweede route loopt via Bijlage III. AI-systemen die worden ingezet voor het
            monitoren of beoordelen van fabrieksmedewerkers vallen onder categorie 4
            (werkgelegenheid en personeelsbeheer). Denk aan AI die productiviteit meet,
            aanwezigheid analyseert of taken toewijst op basis van prestatiedata.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Welke industriële systemen vallen hieronder?</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">AI in industriële robots en cobots</h3>
              <p className="text-foreground leading-relaxed">
                Robots met AI-gestuurde bewegingen die in de buurt van mensen opereren vormen
                een direct veiligheidsrisico. Collaborative robots (cobots) die naast
                medewerkers werken en hun gedrag aanpassen op basis van AI, industriële
                robotarmen met AI-visie voor grijpbewegingen, en autonome mobiele robots
                (AMR&apos;s) in magazijnen en fabrieken — ze bevatten allemaal AI-componenten
                die de fysieke veiligheid van mensen raken.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI in productieapparatuur</h3>
              <p className="text-foreground leading-relaxed">
                CNC-machines met AI-optimalisatie, 3D-printers met AI-gestuurde procescontrole,
                en geautomatiseerde productielijnen met AI-componenten die het productieproces
                aansturen. Wanneer de AI de werking van de machine beïnvloedt op een manier
                die de veiligheid raakt — bijvoorbeeld door snelheden, krachten of temperaturen
                aan te passen — is het een veiligheidscomponent en daarmee hoog-risico.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Predictive maintenance</h3>
              <p className="text-foreground leading-relaxed">
                AI voor voorspellend onderhoud — systemen die op basis van sensordata
                voorspellen wanneer een machine onderhoud nodig heeft — is een grensgebied.
                Als het systeem alleen een onderhoudsadvies geeft is het doorgaans geen
                hoog-risico. Maar als het systeem automatisch beslissingen neemt over het
                al dan niet stilleggen van machines, en een fout daarin tot een
                veiligheidssituatie kan leiden, kan het als veiligheidscomponent worden
                beschouwd.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI voor visuele kwaliteitscontrole</h3>
              <p className="text-foreground leading-relaxed">
                AI-camera&apos;s die producten inspecteren op defecten zijn wijdverspreid in
                de industrie. Op zichzelf is dit geen hoog-risico — het systeem beoordeelt
                producten, geen mensen. Maar twee uitzonderingen: als de QC-output wordt
                gebruikt om medewerkers te beoordelen (wie produceert de meeste afkeur),
                en als het geïnspecteerde product zelf een gereguleerd product is waarvan
                de veiligheid afhangt van de inspectie.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Wat is wél en wat is géén hoog-risico?</h2>
          <div className="my-6 border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left p-4 font-semibold">AI-toepassing</th>
                  <th className="text-left p-4 font-semibold">Hoog-risico?</th>
                  <th className="text-left p-4 font-semibold">Toelichting</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-4">Cobots naast medewerkers</td>
                  <td className="p-4 text-red-700 font-semibold">Ja</td>
                  <td className="p-4 text-muted">Veiligheidscomponent (Bijlage I)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Autonome mobiele robots (AMR)</td>
                  <td className="p-4 text-red-700 font-semibold">Ja</td>
                  <td className="p-4 text-muted">Veiligheidscomponent (Bijlage I)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">AI-productiviteitsmeting medewerkers</td>
                  <td className="p-4 text-red-700 font-semibold">Ja</td>
                  <td className="p-4 text-muted">Personeelsbeoordeling (Bijlage III)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Predictive maintenance (adviserend)</td>
                  <td className="p-4 text-green-700">Nee</td>
                  <td className="p-4 text-muted">Geeft advies, neemt geen veiligheidsbeslissing</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Predictive maintenance (autonoom)</td>
                  <td className="p-4 text-amber-600">Mogelijk</td>
                  <td className="p-4 text-muted">Als het machine autonoom stillegt/doorlaat</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">QC visuele inspectie (producten)</td>
                  <td className="p-4 text-green-700">Nee</td>
                  <td className="p-4 text-muted">Beoordeelt producten, geen personen</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">QC gekoppeld aan personeelsbeoordeling</td>
                  <td className="p-4 text-red-700 font-semibold">Ja</td>
                  <td className="p-4 text-muted">Beïnvloedt beoordeling medewerkers</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Energieoptimalisatie productie</td>
                  <td className="p-4 text-green-700">Nee</td>
                  <td className="p-4 text-muted">Operationeel, geen impact op personen</td>
                </tr>
              </tbody>
            </table>
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
            <Link href="/financiele-dienstverlening" className="text-accent hover:underline">
              &larr; Financiële dienstverlening
            </Link>
            <Link href="/" className="text-accent hover:underline">
              Homepage
            </Link>
            <Link href="/logistiek" className="text-accent hover:underline">
              Logistiek &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
