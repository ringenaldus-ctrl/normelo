import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gratis AI-register & AI-beleid template",
  description:
    "Download een kant-en-klaar AI-register (Excel) en AI-beleid (PDF) voor de uitzendbranche. Voldoe aan de EU AI Act met deze gratis templates.",
};

export default function AIRegister() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Gratis templates</p>
        <h1 className="text-4xl font-bold leading-tight mb-4">AI-register & AI-beleid voor de uitzendbranche</h1>
        <p className="text-lg text-muted leading-relaxed">
          De EU AI Act verplicht organisaties om te documenteren welke AI-systemen zij gebruiken en hoe
          het toezicht geregeld is. Hieronder vind je twee gratis templates om vandaag mee te beginnen.
        </p>
      </section>

      {/* Downloads */}
      <section className="py-10 border-b border-border">
        <div className="grid gap-6 md:grid-cols-2">
          {/* AI-register */}
          <div className="p-6 border-2 border-accent rounded-lg bg-surface">
            <p className="text-sm font-medium text-accent mb-1 tracking-wide uppercase">Stap 1</p>
            <h2 className="text-xl font-bold mb-3">AI-register</h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Een ingevulde Excel met voorbeelden voor de uitzendbranche. Carerix, Bullhorn, ChatGPT —
              de systemen die jouw bureau waarschijnlijk al gebruikt. Pas het aan op jouw situatie.
            </p>
            <p className="text-xs text-muted mb-4">Excel (.xlsx) — direct invulbaar</p>
            <a
              href="/ai-register-uitzendbranche.xlsx"
              download
              className="inline-block px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-primary transition-colors no-underline"
            >
              Download AI-register →
            </a>
          </div>

          {/* AI-beleid */}
          <div className="p-6 border-2 border-accent rounded-lg bg-surface">
            <p className="text-sm font-medium text-accent mb-1 tracking-wide uppercase">Stap 2</p>
            <h2 className="text-xl font-bold mb-3">AI-beleid</h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Een kant-en-klaar beleidsdocument: wat mag wel, wat mag niet, wie houdt toezicht.
              Inclusief voorbeeldtekst voor transparantie naar kandidaten. Vul de open velden in en deel het met je team.
            </p>
            <p className="text-xs text-muted mb-4">PDF — print en invulbaar</p>
            <a
              href="/ai-beleid-uitzendbranche.pdf"
              download
              className="inline-block px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-primary transition-colors no-underline"
            >
              Download AI-beleid →
            </a>
          </div>
        </div>
      </section>

      {/* Wat zit erin */}
      <section className="py-10 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wat zit erin?</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">AI-register (Excel)</h3>
            <p className="text-muted leading-relaxed text-sm">
              Per AI-systeem leg je vast: de naam, leverancier, waarvoor het gebruikt wordt, het
              risiconiveau, wie het gebruikt, wie toezicht houdt en of kandidaten geïnformeerd worden.
              Het template bevat ingevulde voorbeelden voor Carerix, Bullhorn, ChatGPT en Copilot —
              de tools die uitzendbureaus het meest gebruiken.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">AI-beleid (PDF)</h3>
            <p className="text-muted leading-relaxed text-sm">
              Een compleet beleidsdocument in 9 secties: doel, reikwijdte, wat AI is, wat wel en niet
              mag, menselijk toezicht, transparantie naar kandidaten, het AI-register, AI-geletterdheid
              en inwerkingtreding. Inclusief een voorbeeldtekst die je direct in je vacatures kunt plaatsen.
            </p>
          </div>
        </div>
      </section>

      {/* Waarom */}
      <section className="py-10 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Waarom heb je dit nodig?</h2>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            Artikel 26 van de EU AI Act verplicht organisaties die hoog-risico AI inzetten om te
            documenteren welke systemen zij gebruiken en hoe het toezicht is geregeld. Artikel 4
            verplicht AI-geletterdheid voor iedereen die met AI werkt — dat geldt al sinds februari 2025.
          </p>
          <p>
            Met deze twee templates heb je de basis op orde: je weet welke AI je gebruikt (register)
            en je team weet wat de regels zijn (beleid). Wat dan nog rest is stap 3: je team trainen.
          </p>
        </div>
      </section>

      {/* Volgende stap */}
      <section className="py-10">
        <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Stap 3</p>
          <h3 className="text-xl font-bold mb-3">Je team trainen</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Het register en het beleid zijn de basis. Maar je team moet ook begrijpen waarom het
            ertoe doet en wat er van hen verwacht wordt. Het Normelo AI-geletterdheid traject
            traint je recruiters en intercedenten — specifiek voor de systemen die jullie gebruiken.
          </p>
          <Link
            href="/training"
            className="inline-block px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors no-underline"
          >
            Bekijk het traject →
          </Link>
        </div>
      </section>
    </div>
  );
}
