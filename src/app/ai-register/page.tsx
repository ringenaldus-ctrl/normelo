import type { Metadata } from "next";
import AanbodSectie from "../components/Aanbod";
import AanmeldenCta from "../components/AanmeldenCta";

export const metadata: Metadata = {
  title: "AI-register voor uitzendbureaus — Normelo",
  description:
    "Het Normelo AI-register is gratis: registreer je AI-systemen, genereer compliance-documentatie en blijf actueel wanneer de EU AI Act verandert.",
};

export default function AIRegister() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <h1 className="text-4xl font-bold leading-tight mb-4">Het Normelo AI-register</h1>
        <p className="text-lg text-muted leading-relaxed mb-4">
          Je weet wat de EU AI Act van je bureau vraagt. Nu moet je het regelen. Het Normelo
          AI-register is de tool waarmee je dat doet — al je AI-systemen geregistreerd,
          gedocumenteerd en bijgehouden op één plek.
        </p>
        <p className="text-sm text-accent font-medium">
          Het enige register dat niet veroudert. Wanneer de wet verandert, beweegt je dossier mee.
        </p>
      </section>

      {/* Wat het regelt — 6 blokken */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">Wat het AI-register voor je regelt</h2>
        <p className="text-muted mb-8">Alles wat de EU AI Act van je als uitzendbureau vraagt — op één plek, altijd actueel.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">AI-inventarisatie</p>
            <p className="text-sm text-muted leading-relaxed">
              Elk AI-systeem dat je bureau gebruikt — van Carerix en Bullhorn tot ChatGPT
              en Copilot — vastgelegd met leverancier, doel, gebruikers, risiconiveau en
              toezichthouder. Eén plek, altijd actueel.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Automatische documentgeneratie</p>
            <p className="text-sm text-muted leading-relaxed">
              AI-beleid, transparantieteksten voor kandidaten, procedures voor menselijk
              toezicht, informatie voor werknemers en OR. Gegenereerd op basis van jouw
              register — klaar om te delen met opdrachtgevers en toezichthouders.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Risicobeoordeling en FRIA</p>
            <p className="text-sm text-muted leading-relaxed">
              Per systeem een classificatie volgens Annex III. Voor hoog-risico systemen een
              Fundamental Rights Impact Assessment volgens Artikel 27 — met template en
              begeleiding.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Menselijk toezicht in de praktijk</p>
            <p className="text-sm text-muted leading-relaxed">
              Leg vast wie welke AI-output beoordeelt, overruled of goedkeurt. Het
              oversight-log is je bewijs richting toezichthouders dat Artikel 14
              wordt nageleefd.
            </p>
          </div>
          <div className="p-5 border border-border rounded-lg">
            <p className="font-semibold mb-1">Incident-register en review-ritme</p>
            <p className="text-sm text-muted leading-relaxed">
              Registreer incidenten, stel meldingsprocedures in, en krijg herinneringen
              voor periodieke reviews. Compliance is geen moment — het is een ritme.
            </p>
          </div>
          <div className="p-5 border-2 border-accent rounded-lg bg-surface">
            <p className="font-semibold mb-1 text-accent">Levende wiki, ingebouwd</p>
            <p className="text-sm text-muted leading-relaxed">
              De EU AI Act verandert bijna wekelijks: nieuwe guidance, delegated acts,
              handhavingsbesluiten. Normelo volgt het allemaal. Wanneer iets in de wet
              verandert dat jouw register raakt, krijg je een melding met de concrete
              actie die je moet ondernemen.
            </p>
          </div>
        </div>
      </section>

      <AanbodSectie />

      {/* Waarom geen Excel */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Waarom geen Excel?</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Je kunt een AI-register in Excel bijhouden. Veel bureaus beginnen daar ook mee.
          Maar een spreadsheet vertelt je niet of je iets mist, genereert geen beleidsdocumenten,
          herinnert je niet aan deadlines, en beweegt niet mee wanneer de wet verandert.
          Het is een lijst, geen systeem.
        </p>
        <p className="text-foreground leading-relaxed">
          Het Normelo AI-register is gebouwd voor uitzendbureaus die hun compliance
          serieus willen regelen — zonder er een dagtaak van te maken.
        </p>
      </section>

      {/* Over Normelo */}
      <section className="py-12 border-b border-border">
        <p className="text-sm text-muted leading-relaxed">
          Normelo is een gespecialiseerd compliance-platform voor de uitzendbranche.
          Directe lijn met de ontwikkelaar — geen callcenter.
        </p>
      </section>

      {/* Training als instap */}
      <section className="py-12">
        <div className="rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Gratis</p>
          <h3 className="text-xl font-bold mb-3">Start gratis</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            Het register en de training zitten in hetzelfde gratis platform. Meld je
            organisatie aan en je kunt direct beginnen.
          </p>
          <AanmeldenCta
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors no-underline"
            noteClassName="text-xs text-gray-400 mt-2 max-w-md"
          />
        </div>
      </section>
    </div>
  );
}
