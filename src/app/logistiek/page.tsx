import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "EU AI Act & Logistiek en Transport",
  description:
    "Wat betekent de EU AI Act voor logistieke bedrijven en transportondernemingen? Uitleg over AI voor routing, planning, workforce monitoring en voertuigveiligheid.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act & Logistiek en Transport",
  description:
    "Wat betekent de EU AI Act voor logistieke bedrijven en transportondernemingen? AI voor routing, planning en workforce monitoring onder de EU AI Act.",
  author: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  publisher: { "@type": "Organization", name: "Normelo", url: "https://normelo.com" },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  mainEntityOfPage: "https://normelo.com/logistiek",
};

const faqItems = [
  {
    question: "Valt AI in de logistiek onder de EU AI Act?",
    answer:
      "Dat hangt af van het type toepassing. AI voor routeoptimalisatie of voorraadplanning is doorgaans geen hoog-risico. Maar AI die medewerkers monitort (bijvoorbeeld camerasystemen die magazijnpersoneel in de gaten houden of software die de prestaties van chauffeurs volgt), AI die beslissingen neemt over personeel (roostering, beoordeling, taakverdeling op basis van profielen), of AI die als veiligheidscomponent in voertuigen of machines zit, kan wel degelijk als hoog-risico kwalificeren. Veel logistieke bedrijven onderschatten dit.",
  },
  {
    question: "Is AI voor workforce monitoring hoog-risico?",
    answer:
      "Ja, in veel gevallen. AI-systemen die werknemers monitoren en op basis daarvan beslissingen beïnvloeden over hun functioneren, productiviteit of arbeidsrelatie vallen onder Bijlage III, categorie 4 (werkgelegenheid en personeelsbeheer). Denk aan camera's met AI in magazijnen die de productiviteit van pickers meten, software die het rijgedrag van chauffeurs analyseert en op basis daarvan beoordelingen maakt, of planningssystemen die taken toewijzen op basis van persoonlijke prestatiedata. Het gaat erom of de AI-output invloed heeft op beslissingen over medewerkers.",
  },
  {
    question: "Valt AI in autonome voertuigen onder de EU AI Act?",
    answer:
      "Ja. AI-systemen die als veiligheidscomponent fungeren in voertuigen vallen onder de hoog-risico categorie via Bijlage I (koppeling met bestaande voertuigveiligheidsregulering). Dit omvat AI in zelfrijdende vrachtwagens, autonome heftrucks in magazijnen, en geavanceerde rijhulpsystemen (ADAS). De verplichtingen gelden primair voor de fabrikant (provider), maar de logistieke onderneming die deze voertuigen inzet (deployer) heeft ook verantwoordelijkheden rond toezicht en monitoring.",
  },
  {
    question: "Is AI voor routeplanning hoog-risico?",
    answer:
      "Nee, niet standaard. AI-systemen voor routeoptimalisatie, leveringsplanning of voorraadbeheersing die puur operationele beslissingen nemen zonder directe impact op de rechten of veiligheid van personen, vallen doorgaans niet onder de hoog-risico categorie. Maar als het systeem ook de werkdruk, pauzetijden of prestatiebeoordeling van chauffeurs beïnvloedt, verschuift de classificatie. Een routeplanner die tegelijkertijd de productiviteit van chauffeurs meet en daarop beoordeelt, combineert operationele logistiek met personeelsbeoordeling — en dat laatste is wél hoog-risico.",
  },
  {
    question: "Wat moet een logistiek bedrijf regelen voor de EU AI Act?",
    answer:
      "Begin met een inventarisatie van alle AI-systemen in je operatie. Veel logistieke bedrijven weten niet precies welke software AI-componenten bevat. Focus op drie gebieden: (1) personeelsmonitoring en -beoordeling — elke AI die invloed heeft op beslissingen over medewerkers is potentieel hoog-risico, (2) veiligheidscomponenten — AI in voertuigen, heftrucks, robots of machines die de fysieke veiligheid van mensen raakt, (3) klantbeslissingen — AI die bepaalt welke klanten welke service krijgen. Bespreek met je leveranciers of hun systemen als hoog-risico kwalificeren en welke documentatie zij leveren.",
  },
  {
    question: "Wanneer moet de logistieke sector EU AI Act compliant zijn?",
    answer:
      "De deadline hangt af van het type AI-systeem. AI-systemen voor personeelsmonitoring en -beoordeling (Bijlage III) moeten compliant zijn in augustus 2026. AI-systemen die als veiligheidscomponent in voertuigen of machines zitten (Bijlage I) krijgen een langere termijn tot augustus 2027. Het is aan te raden om nu al te beginnen met de inventarisatie, omdat veel logistieke bedrijven nog niet goed in kaart hebben welke systemen AI bevatten.",
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

export default function Logistiek() {
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
            EU AI Act &amp; Logistiek en Transport
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Logistieke bedrijven en transportondernemingen denken vaak dat de EU AI Act hen
            niet raakt. Routeplanning en voorraadoptimalisatie zijn inderdaad geen hoog-risico.
            Maar AI die medewerkers monitort, personeel beoordeelt of als veiligheidscomponent
            in voertuigen zit, valt wél onder de strengste categorie van de wet.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Waarom de logistiek dit onderschat</h2>
          <p className="text-foreground leading-relaxed mb-4">
            De logistieke sector ziet zichzelf zelden als een sector die door AI-wetgeving
            geraakt wordt. De meeste AI-toepassingen in de logistiek — routeoptimalisatie,
            vraagvoorspelling, voorraadplanning — zijn inderdaad geen hoog-risico. Ze nemen
            operationele beslissingen zonder directe impact op de rechten van personen.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Maar de logistiek is ook een sector met intensieve inzet van personeel, en steeds
            meer bedrijven zetten AI in om dat personeel te monitoren en te beoordelen.
            Camerasystemen met AI in distributiecentra die de productiviteit van pickers meten.
            Software die het rijgedrag van chauffeurs analyseert. Planningsalgoritmes die
            taken toewijzen op basis van prestatiedata. Dit zijn stuk voor stuk toepassingen
            die onder de hoog-risico categorie vallen.
          </p>
          <p className="text-foreground leading-relaxed">
            Daarnaast groeit het gebruik van autonome systemen: zelfrijdende heftrucks,
            drones voor inventarisatie, en in de toekomst autonome vrachtwagens. AI die
            als veiligheidscomponent in dit soort systemen zit, is hoog-risico via Bijlage I
            van de EU AI Act.
          </p>
        </section>

        <section className="py-12 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Welke logistieke systemen vallen hieronder?</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Workforce monitoring en prestatiemeting</h3>
              <p className="text-foreground leading-relaxed">
                AI-systemen die de prestaties van magazijnmedewerkers, chauffeurs of
                bezorgers meten en op basis daarvan beoordelingen maken of beslissingen
                beïnvloeden. Denk aan pick-rate monitoring in distributiecentra, rijgedrag-analyse
                voor chauffeurs, en GPS-tracking die wordt gebruikt voor prestatiebeoordeling.
                Zodra de output invloed heeft op arbeidsvoorwaarden, roostering of
                beoordelingsgesprekken is het hoog-risico.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI-gestuurde personeelsplanning</h3>
              <p className="text-foreground leading-relaxed">
                Planningsoftware die AI gebruikt om medewerkers in te roosteren op basis
                van hun persoonlijke kenmerken, prestatiehistorie of beschikbaarheidspatronen.
                Als het systeem bepaalt wie wanneer werkt op basis van persoonsgebonden data
                en dit de arbeidsomstandigheden beïnvloedt, kwalificeert het als
                hoog-risico onder categorie 4 van Bijlage III.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Autonome voertuigen en robots</h3>
              <p className="text-foreground leading-relaxed">
                AI in zelfrijdende heftrucks, autonome magazijnrobots, drones en
                (in de toekomst) autonome vrachtwagens. Deze systemen bevatten
                AI-componenten die de fysieke veiligheid van mensen raken en vallen
                onder de hoog-risico categorie via Bijlage I. De verplichtingen gelden
                primair voor de fabrikant, maar ook de logistieke onderneming die ze
                inzet heeft verantwoordelijkheden.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Camerasystemen met AI</h3>
              <p className="text-foreground leading-relaxed">
                AI-camera&apos;s in magazijnen en distributiecentra die worden ingezet voor
                veiligheid (detectie van onveilige situaties) zijn niet per definitie
                hoog-risico. Maar zodra dezelfde camera&apos;s worden gebruikt om
                medewerkers te identificeren, hun gedrag te analyseren of hun productiviteit
                te meten, verschuift de classificatie. Emotieherkenning op de werkplek is
                onder de EU AI Act zelfs verboden.
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
                  <td className="p-4">Routeoptimalisatie</td>
                  <td className="p-4 text-green-700">Nee</td>
                  <td className="p-4 text-muted">Operationele beslissing, geen impact op personen</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Vraagvoorspelling</td>
                  <td className="p-4 text-green-700">Nee</td>
                  <td className="p-4 text-muted">Geen directe impact op rechten of veiligheid</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Pick-rate monitoring</td>
                  <td className="p-4 text-red-700 font-semibold">Ja</td>
                  <td className="p-4 text-muted">Beïnvloedt beoordeling van medewerkers</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Rijgedrag-analyse chauffeurs</td>
                  <td className="p-4 text-red-700 font-semibold">Ja</td>
                  <td className="p-4 text-muted">Als output invloed heeft op arbeidsrelatie</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">AI-roostering op basis van prestatiedata</td>
                  <td className="p-4 text-red-700 font-semibold">Ja</td>
                  <td className="p-4 text-muted">Taakverdeling op basis van persoonlijke kenmerken</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Autonome heftrucks/robots</td>
                  <td className="p-4 text-red-700 font-semibold">Ja</td>
                  <td className="p-4 text-muted">Veiligheidscomponent (Bijlage I)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Camera&apos;s voor veiligheidsdetectie</td>
                  <td className="p-4 text-amber-600">Mogelijk</td>
                  <td className="p-4 text-muted">Hangt af van of het personeel identificeert</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Emotieherkenning op werkplek</td>
                  <td className="p-4 text-red-900 font-bold">Verboden</td>
                  <td className="p-4 text-muted">Expliciet verboden onder de EU AI Act</td>
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
            <Link href="/industrie" className="text-accent hover:underline">
              &larr; Industrie
            </Link>
            <Link href="/" className="text-accent hover:underline">
              Homepage
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
