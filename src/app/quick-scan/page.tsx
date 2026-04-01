"use client";

import { useState } from "react";
import Link from "next/link";

type Step = "sector" | "systemen" | "beslissingen" | "toezicht" | "transparantie" | "resultaat";

interface Answers {
  sector: string;
  systemen: string[];
  beslissingen: string;
  toezicht: string;
  transparantie: string;
}

const sectoren = [
  { id: "finance", label: "Financiële dienstverlening", link: "/financiele-dienstverlening" },
  { id: "hr", label: "HR & Recruitment", link: "/uitzendbranche" },
  { id: "industrie", label: "Industrie & Manufacturing", link: "/industrie" },
  { id: "logistiek", label: "Logistiek & Transport", link: "/logistiek" },
  { id: "onderwijs", label: "Onderwijs", link: "/onderwijs" },
  { id: "overheid", label: "Overheid", link: "/overheid" },
  { id: "verzekeringen", label: "Verzekeringen", link: "/verzekeringen" },
  { id: "zorg", label: "Zorg & Medisch", link: "/zorg" },
  { id: "anders", label: "Andere sector", link: "/" },
];

const alleSystemen: Record<string, { id: string; label: string; risico: boolean }[]> = {
  finance: [
    { id: "krediet", label: "Software die bepaalt of iemand in aanmerking komt voor een lening, hypotheek of creditcard", risico: true },
    { id: "fraude", label: "Software die automatisch verdachte transacties opspoort of blokkeert", risico: true },
    { id: "kyc", label: "Software die klantidentiteit controleert of risicoprofielen opstelt", risico: true },
    { id: "monitoring", label: "Software die prestaties of gedrag van medewerkers automatisch bijhoudt", risico: true },
    { id: "chatbot", label: "Een chatbot die klanten screent of financieel advies geeft", risico: true },
  ],
  hr: [
    { id: "cv-screening", label: "Software die automatisch cv's selecteert of kandidaten rankt", risico: true },
    { id: "matching", label: "Software die kandidaten automatisch koppelt aan vacatures", risico: true },
    { id: "chatbot-hr", label: "Een chatbot die kandidaten screent of voorselecteert", risico: true },
    { id: "monitoring", label: "Software die prestaties of gedrag van medewerkers automatisch bijhoudt", risico: true },
    { id: "planning", label: "Software die diensten of taken toewijst aan medewerkers op basis van hun profiel", risico: true },
  ],
  zorg: [
    { id: "diagnose", label: "Software die helpt bij het stellen van medische diagnoses", risico: true },
    { id: "beeldvorming", label: "Software die röntgenfoto's, scans of andere medische beelden analyseert", risico: true },
    { id: "triage", label: "Software die patiënten automatisch indeelt op urgentie", risico: true },
    { id: "monitoring-zorg", label: "Software die patiëntgegevens bewaakt en automatisch alarmeert", risico: true },
    { id: "planning-zorg", label: "Software die personeel inroostert op basis van zorgzwaarte of beschikbaarheid", risico: true },
  ],
  overheid: [
    { id: "uitkeringen", label: "Software die aanvragen voor uitkeringen of toeslagen beoordeelt", risico: true },
    { id: "fraude-overheid", label: "Software die automatisch controleert op fraude bij publieke diensten", risico: true },
    { id: "handhaving", label: "Software die bepaalt waar of bij wie gecontroleerd of gehandhaafd wordt", risico: true },
    { id: "chatbot-overheid", label: "Een chatbot die burgers doorverwijst of aanvragen afhandelt", risico: true },
    { id: "monitoring", label: "Software die prestaties of gedrag van medewerkers automatisch bijhoudt", risico: true },
  ],
  verzekeringen: [
    { id: "verzekering-risico", label: "Software die verzekeringsrisico's inschat of premies berekent", risico: true },
    { id: "schade", label: "Software die automatisch schadeclaims beoordeelt of afwijst", risico: true },
    { id: "fraude-verz", label: "Software die automatisch verdachte claims opspoort", risico: true },
    { id: "monitoring", label: "Software die prestaties of gedrag van medewerkers automatisch bijhoudt", risico: true },
    { id: "chatbot-verz", label: "Een chatbot die klanten screent of polissen adviseert", risico: true },
  ],
  onderwijs: [
    { id: "toelating", label: "Software die bepaalt wie wordt toegelaten tot een opleiding of cursus", risico: true },
    { id: "beoordeling", label: "Software die tentamens of opdrachten automatisch beoordeelt", risico: true },
    { id: "proctoring", label: "Software die studenten monitort tijdens online tentamens", risico: true },
    { id: "plagiaatdetectie", label: "Software die controleert of werk door AI is geschreven of geplagieerd", risico: true },
    { id: "monitoring", label: "Software die prestaties of gedrag van medewerkers automatisch bijhoudt", risico: true },
  ],
  logistiek: [
    { id: "monitoring-chauffeurs", label: "Software die rijgedrag of aandacht van chauffeurs monitort", risico: true },
    { id: "planning-log", label: "Software die taken of routes toewijst aan medewerkers op basis van hun profiel", risico: true },
    { id: "veiligheid", label: "AI in autonome voertuigen, drones of transportrobots", risico: true },
    { id: "monitoring", label: "Software die prestaties of gedrag van magazijnmedewerkers automatisch bijhoudt", risico: true },
    { id: "picking", label: "Software die pick-snelheid meet en medewerkers daarop beoordeelt", risico: true },
  ],
  industrie: [
    { id: "veiligheid-machines", label: "AI in machines, robots of cobots die de veiligheid van mensen raakt", risico: true },
    { id: "qc-personeel", label: "Software die kwaliteitscontrole koppelt aan beoordeling van medewerkers", risico: true },
    { id: "monitoring", label: "Software die prestaties of gedrag van medewerkers automatisch bijhoudt", risico: true },
    { id: "planning-ind", label: "Software die taken of ploegen toewijst aan medewerkers op basis van hun profiel", risico: true },
    { id: "emotie", label: "Software die emoties of vermoeidheid van medewerkers detecteert", risico: true },
  ],
  anders: [
    { id: "cv-screening", label: "Software die automatisch cv's selecteert of kandidaten rankt", risico: true },
    { id: "krediet", label: "Software die bepaalt of iemand in aanmerking komt voor een lening of krediet", risico: true },
    { id: "monitoring", label: "Software die prestaties of gedrag van medewerkers automatisch bijhoudt", risico: true },
    { id: "chatbot", label: "Een chatbot die klanten of kandidaten screent en doorstuurt", risico: true },
    { id: "planning", label: "Software die taken toewijst aan medewerkers op basis van hun profiel", risico: true },
    { id: "diagnose", label: "Software die helpt bij het nemen van beslissingen over individuele personen", risico: true },
    { id: "veiligheid", label: "AI in machines, robots of voertuigen die de veiligheid van mensen raakt", risico: true },
  ],
};

// Flat lookup for result display
const alleSystemenFlat = Object.values(alleSystemen).flat();

export default function QuickScan() {
  const [step, setStep] = useState<Step>("sector");
  const [answers, setAnswers] = useState<Answers>({
    sector: "",
    systemen: [],
    beslissingen: "",
    toezicht: "",
    transparantie: "",
  });

  const sectorSystemen = alleSystemen[answers.sector] || alleSystemen["anders"];
  const geenOptie = { id: "geen", label: "Geen van bovenstaande", risico: false };

  const hoogRisicoSystemen = answers.systemen.filter(
    (s) => alleSystemenFlat.find((o) => o.id === s)?.risico
  );
  const aantalHoogRisico = hoogRisicoSystemen.length;

  const sectorInfo = sectoren.find((s) => s.id === answers.sector);

  function selectSector(id: string) {
    setAnswers({ ...answers, sector: id });
    setStep("systemen");
  }

  function toggleSysteem(id: string) {
    if (id === "geen") {
      setAnswers({ ...answers, systemen: ["geen"] });
      return;
    }
    const current = answers.systemen.filter((s) => s !== "geen");
    if (current.includes(id)) {
      setAnswers({ ...answers, systemen: current.filter((s) => s !== id) });
    } else {
      setAnswers({ ...answers, systemen: [...current, id] });
    }
  }

  function submitSystemen() {
    if (answers.systemen.includes("geen") || answers.systemen.length === 0) {
      setAnswers({ ...answers, systemen: answers.systemen.length === 0 ? ["geen"] : answers.systemen });
      setStep("resultaat");
    } else {
      setStep("beslissingen");
    }
  }

  function selectBeslissingen(value: string) {
    setAnswers({ ...answers, beslissingen: value });
    setStep("toezicht");
  }

  function selectToezicht(value: string) {
    setAnswers({ ...answers, toezicht: value });
    setStep("transparantie");
  }

  function selectTransparantie(value: string) {
    setAnswers({ ...answers, transparantie: value });
    setStep("resultaat");
  }

  function restart() {
    setAnswers({ sector: "", systemen: [], beslissingen: "", toezicht: "", transparantie: "" });
    setStep("sector");
  }

  // Calculate risk score
  function getRisicoNiveau(): "hoog" | "middel" | "laag" {
    if (aantalHoogRisico === 0) return "laag";
    const problemen = [
      answers.beslissingen === "zelfstandig" || answers.beslissingen === "weet-niet",
      answers.toezicht === "nee" || answers.toezicht === "weet-niet",
      answers.transparantie === "nee" || answers.transparantie === "weet-niet",
    ].filter(Boolean).length;
    if (aantalHoogRisico >= 2 || problemen >= 2) return "hoog";
    if (aantalHoogRisico >= 1) return "middel";
    return "laag";
  }

  const risicoNiveau = getRisicoNiveau();

  const risicoKleuren = {
    hoog: "bg-red-50 border-red-200 text-red-800",
    middel: "bg-amber-50 border-amber-200 text-amber-800",
    laag: "bg-green-50 border-green-200 text-green-800",
  };

  const risicoLabels = {
    hoog: "Hoog risico",
    middel: "Aandacht nodig",
    laag: "Laag risico",
  };

  const stepNumber = { sector: 1, systemen: 2, beslissingen: 3, toezicht: 4, transparantie: 5, resultaat: 6 };
  const totalSteps = answers.systemen.includes("geen") ? 2 : 5;
  const currentStep = stepNumber[step];

  return (
    <div className="max-w-2xl mx-auto px-6">
      <section className="py-16 border-b border-border">
        <h1 className="text-4xl font-bold leading-tight mb-4">
          EU AI Act Quick Scan
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Ontdek in 60 seconden of uw organisatie te maken heeft met hoog-risico AI
          volgens de EU AI Act.
        </p>
      </section>

      <section className="py-12">
        {/* Progress bar */}
        {step !== "resultaat" && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted mb-2">
              <span>Vraag {currentStep} van {totalSteps}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-accent rounded-full h-2 transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Stap 1: Sector */}
        {step === "sector" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">In welke sector werkt uw organisatie?</h2>
            <p className="text-muted mb-6">Kies de sector die het beste past.</p>
            <div className="grid gap-3">
              {sectoren.map((sector) => (
                <button
                  key={sector.id}
                  onClick={() => selectSector(sector.id)}
                  className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
                >
                  {sector.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stap 2: Systemen */}
        {step === "systemen" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Welke van deze software gebruikt uw organisatie?</h2>
            <p className="text-muted mb-6">U kunt meerdere opties selecteren.</p>
            <div className="grid gap-3 mb-6">
              {sectorSystemen.map((optie) => (
                <button
                  key={optie.id}
                  onClick={() => toggleSysteem(optie.id)}
                  className={`text-left p-4 border rounded-lg transition-colors cursor-pointer ${
                    answers.systemen.includes(optie.id)
                      ? "border-accent bg-blue-50 text-accent"
                      : "border-border hover:border-accent hover:bg-surface"
                  }`}
                >
                  {optie.label}
                </button>
              ))}
              <button
                onClick={() => toggleSysteem("geen")}
                className={`text-left p-4 border rounded-lg transition-colors cursor-pointer ${
                  answers.systemen.includes("geen")
                    ? "border-accent bg-blue-50 text-accent"
                    : "border-border hover:border-accent hover:bg-surface"
                }`}
              >
                {geenOptie.label}
              </button>
            </div>
            <button
              onClick={submitSystemen}
              disabled={answers.systemen.length === 0}
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Volgende
            </button>
          </div>
        )}

        {/* Stap 3: Beslissingen */}
        {step === "beslissingen" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Nemen deze systemen zelfstandig beslissingen?</h2>
            <p className="text-muted mb-6">Of adviseren ze een medewerker die de eindbeslissing neemt?</p>
            <div className="grid gap-3">
              <button
                onClick={() => selectBeslissingen("zelfstandig")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Zelfstandig</span>
                <p className="text-sm text-muted mt-1">Het systeem neemt de beslissing zonder dat iemand meekijkt</p>
              </button>
              <button
                onClick={() => selectBeslissingen("adviserend")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Adviserend</span>
                <p className="text-sm text-muted mt-1">Het systeem geeft een aanbeveling, een medewerker beslist</p>
              </button>
              <button
                onClick={() => selectBeslissingen("weet-niet")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Weet ik niet</span>
                <p className="text-sm text-muted mt-1">Ik weet niet precies hoe het systeem werkt</p>
              </button>
            </div>
          </div>
        )}

        {/* Stap 4: Toezicht */}
        {step === "toezicht" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Is er iemand aangewezen die AI-beslissingen kan overrulen?</h2>
            <p className="text-muted mb-6">Iemand met de bevoegdheid én de kennis om in te grijpen.</p>
            <div className="grid gap-3">
              <button
                onClick={() => selectToezicht("ja")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Ja</span>
                <p className="text-sm text-muted mt-1">Er is iemand die de output van het systeem beoordeelt en kan aanpassen</p>
              </button>
              <button
                onClick={() => selectToezicht("nee")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Nee</span>
                <p className="text-sm text-muted mt-1">De output van het systeem wordt zonder controle overgenomen</p>
              </button>
              <button
                onClick={() => selectToezicht("weet-niet")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Weet ik niet</span>
                <p className="text-sm text-muted mt-1">Het is me niet duidelijk of er toezicht is</p>
              </button>
            </div>
          </div>
        )}

        {/* Stap 5: Transparantie */}
        {step === "transparantie" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Worden betrokkenen geïnformeerd dat AI wordt gebruikt?</h2>
            <p className="text-muted mb-6">Denk aan kandidaten, klanten, medewerkers of burgers die door het systeem geraakt worden.</p>
            <div className="grid gap-3">
              <button
                onClick={() => selectTransparantie("ja")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Ja</span>
                <p className="text-sm text-muted mt-1">Betrokkenen weten dat AI een rol speelt</p>
              </button>
              <button
                onClick={() => selectTransparantie("nee")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Nee</span>
                <p className="text-sm text-muted mt-1">Er wordt niet actief gecommuniceerd dat AI wordt ingezet</p>
              </button>
              <button
                onClick={() => selectTransparantie("weet-niet")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Weet ik niet</span>
                <p className="text-sm text-muted mt-1">Ik weet niet of betrokkenen hierover geïnformeerd worden</p>
              </button>
            </div>
          </div>
        )}

        {/* Resultaat */}
        {step === "resultaat" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Uw resultaat</h2>

            {/* Risico badge */}
            <div className={`p-6 rounded-lg border-2 mb-8 ${risicoKleuren[risicoNiveau]}`}>
              <p className="text-2xl font-bold mb-2">{risicoLabels[risicoNiveau]}</p>
              {risicoNiveau === "hoog" && (
                <p className="leading-relaxed">
                  Uw organisatie gebruikt waarschijnlijk <strong>{aantalHoogRisico} systeem{aantalHoogRisico !== 1 ? "en" : ""}</strong> dat
                  als hoog-risico kwalificeert onder de EU AI Act. Er zijn directe aandachtspunten
                  op het gebied van compliance. De deadline is <strong>augustus 2026</strong>.
                </p>
              )}
              {risicoNiveau === "middel" && (
                <p className="leading-relaxed">
                  Uw organisatie gebruikt waarschijnlijk <strong>{aantalHoogRisico} systeem{aantalHoogRisico !== 1 ? "en" : ""}</strong> dat
                  als hoog-risico kwalificeert onder de EU AI Act. Er zijn aandachtspunten,
                  maar u bent deels op de goede weg. De deadline is <strong>augustus 2026</strong>.
                </p>
              )}
              {risicoNiveau === "laag" && (
                <p className="leading-relaxed">
                  Op basis van uw antwoorden lijkt uw organisatie geen hoog-risico AI-systemen
                  te gebruiken. Dat kan veranderen als u nieuwe software introduceert. Houd
                  de ontwikkelingen in de gaten.
                </p>
              )}
            </div>

            {/* Hoog-risico systemen */}
            {aantalHoogRisico > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Uw hoog-risico systemen</h3>
                <div className="space-y-2">
                  {hoogRisicoSystemen.map((id) => {
                    const optie = alleSystemenFlat.find((o) => o.id === id);
                    return (
                      <div key={id} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                        <span className="text-red-600 mt-0.5">&#9888;</span>
                        <span className="text-sm">{optie?.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Aandachtspunten */}
            {aantalHoogRisico > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Uw aandachtspunten</h3>
                <div className="space-y-3">
                  {(answers.beslissingen === "zelfstandig" || answers.beslissingen === "weet-niet") && (
                    <div className="p-4 border-l-2 border-red-400 bg-red-50/50">
                      <p className="font-semibold text-sm mb-1">Autonome besluitvorming</p>
                      <p className="text-sm text-muted">
                        {answers.beslissingen === "zelfstandig"
                          ? "Uw systemen nemen zelfstandig beslissingen. De EU AI Act vereist menselijk toezicht bij hoog-risico AI."
                          : "U weet niet of uw systemen zelfstandig beslissingen nemen. Dit is een risico — breng dit in kaart."}
                      </p>
                    </div>
                  )}
                  {(answers.toezicht === "nee" || answers.toezicht === "weet-niet") && (
                    <div className="p-4 border-l-2 border-red-400 bg-red-50/50">
                      <p className="font-semibold text-sm mb-1">Menselijk toezicht</p>
                      <p className="text-sm text-muted">
                        {answers.toezicht === "nee"
                          ? "Er is niemand aangewezen die AI-beslissingen kan overrulen. Dit is een kernvereiste van de EU AI Act."
                          : "U weet niet of er menselijk toezicht is. Stel dit vast — het is een van de belangrijkste verplichtingen."}
                      </p>
                    </div>
                  )}
                  {(answers.transparantie === "nee" || answers.transparantie === "weet-niet") && (
                    <div className="p-4 border-l-2 border-amber-400 bg-amber-50/50">
                      <p className="font-semibold text-sm mb-1">Transparantie</p>
                      <p className="text-sm text-muted">
                        {answers.transparantie === "nee"
                          ? "Betrokkenen worden niet geïnformeerd over het gebruik van AI. De EU AI Act verplicht dit bij hoog-risico systemen."
                          : "U weet niet of betrokkenen geïnformeerd worden. Controleer dit — transparantie is verplicht."}
                      </p>
                    </div>
                  )}
                  {answers.beslissingen === "adviserend" && answers.toezicht === "ja" && answers.transparantie === "ja" && (
                    <div className="p-4 border-l-2 border-green-400 bg-green-50/50">
                      <p className="font-semibold text-sm mb-1">Goede basis</p>
                      <p className="text-sm text-muted">
                        U heeft menselijk toezicht en informeert betrokkenen. Dat is een sterke basis.
                        Zorg ervoor dat dit ook aantoonbaar en gedocumenteerd is.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sector link */}
            {sectorInfo && sectorInfo.id !== "anders" && (
              <div className="mb-8 p-4 bg-surface rounded-lg border border-border">
                <p className="text-sm mb-2">
                  Lees meer over de EU AI Act in uw sector:
                </p>
                <Link href={sectorInfo.link} className="text-accent font-semibold hover:underline">
                  EU AI Act &amp; {sectorInfo.label} &rarr;
                </Link>
              </div>
            )}

            {/* Deadline */}
            {aantalHoogRisico > 0 && (
              <div className="mb-8 p-4 bg-surface rounded-lg border border-border">
                <p className="text-sm">
                  <strong>Uw deadline:</strong> de verplichtingen voor hoog-risico AI-systemen worden
                  van toepassing in <strong>augustus 2026</strong>.{" "}
                  <Link href="/tijdlijn" className="text-accent hover:underline">
                    Bekijk de volledige tijdlijn &rarr;
                  </Link>
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={restart}
                className="px-5 py-3 border border-border rounded-lg hover:bg-surface transition-colors cursor-pointer"
              >
                Opnieuw doen
              </button>
              <Link
                href="/faq"
                className="btn-accent px-5 py-3 bg-accent rounded-lg hover:bg-primary transition-colors no-underline"
              >
                Veelgestelde vragen
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
