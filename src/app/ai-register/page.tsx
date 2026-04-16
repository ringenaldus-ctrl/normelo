import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-register & AI-beleid — Normelo",
  description:
    "Een AI-register en AI-beleid zijn verplicht onder de EU AI Act. Normelo vult ze voor je in — als onderdeel van het compliance-pakket.",
};

export default function AIRegister() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <h1 className="text-4xl font-bold leading-tight mb-4">AI-register & AI-beleid</h1>
        <p className="text-lg text-muted leading-relaxed">
          De EU AI Act verplicht organisaties om te documenteren welke AI-systemen zij gebruiken
          en hoe het toezicht geregeld is. Een AI-register en AI-beleid zijn de basis — maar
          ze zelf invullen kost tijd en vereist kennis die de meeste bureaus niet in huis hebben.
        </p>
      </section>

      {/* Wat is het */}
      <section className="py-10 border-b border-border">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">AI-register</h2>
            <p className="text-muted leading-relaxed text-sm">
              Per AI-systeem leg je vast: de naam, leverancier, waarvoor het gebruikt wordt, het
              risiconiveau, wie het gebruikt, wie toezicht houdt en of kandidaten geïnformeerd worden.
              Voor uitzendbureaus gaat het om systemen als Carerix, Bullhorn, ChatGPT en Copilot.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">AI-beleid</h2>
            <p className="text-muted leading-relaxed text-sm">
              Een beleidsdocument dat beschrijft wat wel en niet mag met AI, wie toezicht houdt,
              hoe je kandidaten informeert en wat de regels zijn rondom shadow AI. Het beleid
              moet passen bij jouw specifieke situatie — een standaard template is niet genoeg.
            </p>
          </div>
        </div>
      </section>

      {/* Waarom */}
      <section className="py-10 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Waarom heb je dit nodig?</h2>
        <p className="text-muted leading-relaxed mb-4">
          Artikel 26 van de EU AI Act verplicht organisaties die hoog-risico AI inzetten om te
          documenteren welke systemen zij gebruiken en hoe het toezicht is geregeld. Artikel 4
          verplicht AI-geletterdheid voor iedereen die met AI werkt — dat geldt al sinds februari 2025.
        </p>
        <p className="text-muted leading-relaxed">
          Zelf een register invullen en beleid schrijven is mogelijk, maar kost tijd en leidt vaak
          tot documenten die niet aan de wettelijke eisen voldoen. Je wilt het in één keer goed doen.
        </p>
      </section>

      {/* Normelo regelt het */}
      <section className="py-10 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Normelo vult het voor je in</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Als onderdeel van het Normelo compliance-pakket inventariseren wij welke AI-systemen
          jouw bureau gebruikt en vullen we het AI-register voor je in. Geen leeg template dat
          je zelf moet uitzoeken — een ingevuld document dat klaar is voor een audit.
        </p>
        <p className="text-foreground leading-relaxed">
          Hetzelfde geldt voor het AI-beleid. Wij schrijven een beleidsdocument op maat:
          afgestemd op jouw systemen, jouw processen en jouw team. Inclusief transparantie-tekst
          voor je vacatures en een shadow AI-beleid.
        </p>
      </section>

      {/* CTA */}
      <section className="py-10">
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Onderdeel van het pakket</p>
          <h3 className="text-xl font-bold mb-3">AI-register, AI-beleid én meer</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Het AI-register en AI-beleid zijn onderdeel van het Normelo compliance-pakket
            (vanaf €3.500). Inclusief inventarisatie, teamtraining en certificering.
          </p>
          <Link
            href="/aanvragen"
            className="inline-block px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors no-underline"
          >
            Plan een kennismaking →
          </Link>
        </div>
      </section>
    </div>
  );
}
