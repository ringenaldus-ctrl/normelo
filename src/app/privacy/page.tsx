import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe Normelo omgaat met persoonsgegevens van bezoekers en contactaanvragen. Grondslagen, bewaartermijnen, verwerkers en jouw rechten onder de AVG.",
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">Privacyverklaring</h1>
      <p className="text-sm text-muted mb-10">Laatst bijgewerkt: 17 april 2026</p>

      <div className="space-y-10 text-foreground leading-relaxed">
        <section>
          <p>
            Normelo respecteert je privacy en verwerkt persoonsgegevens in overeenstemming met
            de Algemene verordening gegevensbescherming (AVG). Deze verklaring beschrijft welke
            gegevens we verzamelen via normelo.com, waarom we dat doen, hoe lang we ze bewaren,
            met wie we ze delen en welke rechten je hebt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">1. Wie is verantwoordelijk?</h2>
          <p className="mb-2">
            Verwerkingsverantwoordelijke voor de gegevens die via deze website worden verzameld
            is Normelo, gevestigd in Nederland. Voor privacyvragen, inzageverzoeken of klachten
            kun je contact opnemen via{" "}
            <a href="mailto:info@normelo.com" className="text-accent hover:underline">
              info@normelo.com
            </a>
            .
          </p>
          <p className="text-sm text-muted italic">
            KvK-nummer, vestigingsadres en exacte rechtsvorm volgen zodra de onderneming formeel
            is ingeschreven. Tot die tijd kun je ons rechtstreeks per e-mail bereiken.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. Welke gegevens verwerken we?</h2>
          <p className="mb-4">
            We verzamelen alleen gegevens die je zelf aan ons verstrekt via een formulier op
            de website, plus een beperkte set technische gegevens die nodig is om de website
            te laten functioneren.
          </p>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Via het aanvraagformulier (kennismaking)</p>
              <p className="text-sm text-muted">
                Naam, naam van de organisatie, e-mailadres, telefoonnummer, teamgrootte, welke
                AI-tools je gebruikt en eventuele opmerkingen die je zelf toevoegt.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Via de Quick Scan</p>
              <p className="text-sm text-muted">
                E-mailadres, sector, je antwoorden op de scanvragen en de geautomatiseerde
                risico-inschatting die daaruit volgt.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Via websitebezoek</p>
              <p className="text-sm text-muted">
                Geanonimiseerde bezoekstatistieken via Vercel Analytics (geen cookies, geen
                persoonsgegevens die tot jou te herleiden zijn), plus standaard technische
                logs van de hostingomgeving (IP-adres, tijdstip, user agent) voor beveiliging
                en beschikbaarheid.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. Waarom verwerken we ze?</h2>
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Contactverzoeken beantwoorden en offertes uitbrengen.</span>{" "}
              Grondslag: uitvoering van of voorafgaand aan een overeenkomst (art. 6 lid 1 sub b AVG).
            </p>
            <p>
              <span className="font-semibold">Je Quick Scan-resultaat toesturen.</span>{" "}
              Grondslag: jouw toestemming, door bewust je e-mailadres in te voeren (art. 6 lid 1 sub a AVG).
              Je kunt deze toestemming op elk moment intrekken.
            </p>
            <p>
              <span className="font-semibold">Inzicht in websitegebruik en beveiliging.</span>{" "}
              Grondslag: ons gerechtvaardigd belang om de site te laten werken en misbruik
              tegen te gaan (art. 6 lid 1 sub f AVG).
            </p>
            <p>
              <span className="font-semibold">Wettelijke verplichtingen.</span> Zoals een
              administratie voeren voor de Belastingdienst als er een overeenkomst tot stand
              komt (art. 6 lid 1 sub c AVG).
            </p>
          </div>
          <p className="mt-4 text-sm text-muted">
            We gebruiken je gegevens niet voor geautomatiseerde besluitvorming en verkopen ze
            niet door aan derden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. Hoe lang bewaren we ze?</h2>
          <p className="mb-3">
            We bewaren gegevens niet langer dan nodig voor het doel waarvoor ze zijn verzameld.
          </p>
          <p className="mb-2">
            Komt er geen overeenkomst tot stand, dan verwijderen we aanvragen en
            Quick Scan-gegevens uiterlijk 24 maanden na het laatste contactmoment. Komt er wél
            een overeenkomst tot stand, dan bewaren we de gegevens zolang de relatie loopt en
            daarna tot 7 jaar na afloop — voor zover de Belastingdienst dat vereist.
            Technische logs worden doorgaans binnen 30 dagen overschreven.
          </p>
          <p>
            Je kunt altijd vragen om eerdere verwijdering; zie verderop &ldquo;Jouw rechten&rdquo;.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. Met wie delen we ze?</h2>
          <p className="mb-4">
            We schakelen enkele verwerkers in die ons helpen de dienst te leveren. Met deze
            partijen hebben we verwerkersovereenkomsten. Zij mogen de gegevens uitsluitend
            verwerken in opdracht van Normelo.
          </p>
          <div className="space-y-3">
            <div>
              <p className="font-semibold">Vercel Inc.</p>
              <p className="text-sm text-muted">
                Hosting van de website en geanonimiseerde bezoekstatistieken (Vercel Analytics).
                Vercel is gevestigd in de Verenigde Staten; doorgifte gebeurt onder de
                EU-standaardcontractbepalingen en het EU–US Data Privacy Framework.
              </p>
            </div>
            <div>
              <p className="font-semibold">Supabase Inc.</p>
              <p className="text-sm text-muted">
                Database waarin aanvragen en Quick Scan-resultaten worden opgeslagen. Wij
                gebruiken zoveel mogelijk de EU-regio.
              </p>
            </div>
            <div>
              <p className="font-semibold">Resend Inc.</p>
              <p className="text-sm text-muted">
                Versturen van transactionele e-mails (bevestiging Quick Scan-resultaat,
                notificatie van een aanvraag).
              </p>
            </div>
            <div>
              <p className="font-semibold">Google (webfont)</p>
              <p className="text-sm text-muted">
                De website laadt het lettertype Inter via Google Fonts. Google kan daarbij
                kortstondig je IP-adres zien. Er worden geen cookies door Google Fonts geplaatst.
              </p>
            </div>
          </div>
          <p className="mt-4">
            Daarnaast delen we gegevens alleen als we daartoe wettelijk verplicht zijn,
            bijvoorbeeld op bevel van een bevoegde autoriteit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. Cookies</h2>
          <p>
            Normelo plaatst geen tracking- of advertentiecookies. De statistieken via Vercel
            Analytics werken zonder cookies en zonder persoonlijk identificeerbare gegevens.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">7. Beveiliging</h2>
          <p>
            We nemen passende technische en organisatorische maatregelen om je gegevens te
            beschermen tegen verlies, ongeautoriseerde toegang of wijziging. Verkeer naar en
            van de website loopt via HTTPS; de database en e-mailinfrastructuur zijn afgeschermd
            via moderne authenticatie. Mocht er onverhoopt toch iets misgaan, dan houden we ons
            aan de meldplicht datalekken.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">8. Jouw rechten</h2>
          <p className="mb-3">
            Onder de AVG heb je recht op inzage, rectificatie en verwijdering van jouw gegevens,
            beperking van de verwerking, dataportabiliteit en bezwaar tegen verwerking. Is de
            verwerking gebaseerd op toestemming, dan kun je die op elk moment intrekken — dat
            doet geen afbreuk aan de rechtmatigheid van verwerking vóór de intrekking.
          </p>
          <p className="mb-3">
            Stuur je verzoek naar{" "}
            <a href="mailto:info@normelo.com" className="text-accent hover:underline">
              info@normelo.com
            </a>
            . We reageren uiterlijk binnen vier weken. Om je identiteit te verifiëren kunnen we
            om aanvullende gegevens vragen.
          </p>
          <p>
            Ben je het niet eens met hoe we met je gegevens omgaan, dan kun je een klacht
            indienen bij de Autoriteit Persoonsgegevens via{" "}
            <a
              href="https://autoriteitpersoonsgegevens.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              autoriteitpersoonsgegevens.nl
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">9. Wijzigingen</h2>
          <p>
            We kunnen deze privacyverklaring aanpassen wanneer de dienst of de regelgeving dat
            nodig maakt. De meest recente versie staat altijd op deze pagina met daaronder de
            datum van laatste wijziging. Bij substantiële wijzigingen informeren we bestaande
            contacten actief per e-mail.
          </p>
        </section>

        <div className="pt-6">
          <Link href="/" className="text-accent hover:underline">
            ← Terug naar de homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
