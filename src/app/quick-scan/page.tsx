"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type Step = "systemen" | "ats" | "shadow" | "beslissingen" | "toezicht" | "transparantie" | "resultaat";

interface Answers {
  systemen: string[];
  ats: string;
  shadow: string;
  beslissingen: string;
  toezicht: string;
  transparantie: string;
}

const atsOpties = [
  { id: "carerix", label: "Carerix", ai: "AI-matching en CV-screening" },
  { id: "mysolution", label: "Mysolution", ai: "AI-matching en kandidaatranking" },
  { id: "bullhorn", label: "Bullhorn / Connexys", ai: "AI-matching en automatische sourcing" },
  { id: "byner", label: "Byner", ai: "AI-matching en talent engagement" },
  { id: "anders", label: "Een ander systeem", ai: "" },
  { id: "weet-niet", label: "Weet ik niet", ai: "" },
  { id: "geen-ats", label: "Wij gebruiken geen ATS", ai: "" },
];

const systemen = [
  { id: "cv-screening", label: "Software die automatisch cv's selecteert of kandidaten rankt (bijv. ATS met AI-ranking)", risico: true },
  { id: "matching", label: "Software die kandidaten automatisch koppelt aan vacatures (matchingtool)", risico: true },
  { id: "chatbot-hr", label: "Een chatbot die kandidaten screent of voorselecteert", risico: true },
  { id: "monitoring", label: "Software die prestaties of gedrag van uitzendkrachten automatisch bijhoudt", risico: true },
  { id: "planning", label: "Software die diensten of opdrachten toewijst aan uitzendkrachten op basis van hun profiel", risico: true },
];

const geenOptie = { id: "geen", label: "Geen van bovenstaande", risico: false };

export default function QuickScan() {
  const [step, setStep] = useState<Step>("systemen");
  const [answers, setAnswers] = useState<Answers>({
    systemen: [],
    ats: "",
    shadow: "",
    beslissingen: "",
    toezicht: "",
    transparantie: "",
  });

  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const emailInputRef = useRef<HTMLInputElement>(null);

  const hoogRisicoSystemen = answers.systemen.filter(
    (s) => systemen.find((o) => o.id === s)?.risico
  );
  const aantalHoogRisico = hoogRisicoSystemen.length;

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
      setStep("shadow");
    } else {
      setStep("ats");
    }
  }

  function selectAts(value: string) {
    setAnswers({ ...answers, ats: value });
    setStep("shadow");
  }

  function selectShadow(value: string) {
    setAnswers({ ...answers, shadow: value });
    if (answers.systemen.includes("geen")) {
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
    setAnswers({ systemen: [], ats: "", shadow: "", beslissingen: "", toezicht: "", transparantie: "" });
    setEmail("");
    setEmailStatus("idle");
    setStep("systemen");
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setEmailStatus("sending");
    try {
      const res = await fetch("/api/quickscan-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          sector: "uitzendbranche",
          risico_niveau: risicoNiveau,
          hoog_risico_systemen: hoogRisicoSystemen,
          ats_systeem: answers.ats,
          antwoorden: {
            shadow: answers.shadow,
            beslissingen: answers.beslissingen,
            toezicht: answers.toezicht,
            transparantie: answers.transparantie,
          },
        }),
      });
      if (res.ok) {
        setEmailStatus("sent");
      } else {
        setEmailStatus("error");
      }
    } catch {
      setEmailStatus("error");
    }
  }

  // Calculate risk score
  function getRisicoNiveau(): "hoog" | "middel" | "laag" {
    if (aantalHoogRisico === 0 && answers.shadow !== "ja") return "laag";
    if (aantalHoogRisico === 0 && answers.shadow === "ja") return "middel";

    const problemen = [
      answers.beslissingen === "zelfstandig" || answers.beslissingen === "weet-niet",
      answers.toezicht === "nee" || answers.toezicht === "weet-niet",
      answers.transparantie === "nee" || answers.transparantie === "weet-niet",
    ].filter(Boolean).length;

    if (aantalHoogRisico >= 2 || problemen >= 2) return "hoog";
    if (answers.shadow === "ja") return "hoog";
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

  const stepOrder: Step[] = answers.systemen.includes("geen")
    ? ["systemen", "shadow", "resultaat"]
    : ["systemen", "ats", "shadow", "beslissingen", "toezicht", "transparantie", "resultaat"];

  const totalSteps = stepOrder.length - 1; // don't count "resultaat" as a step
  const currentStep = stepOrder.indexOf(step) + 1;

  return (
    <div className="max-w-2xl mx-auto px-6">
      <section className="py-16 border-b border-border">
        <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Uitzendbranche</p>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          EU AI Act Quick Scan
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Ontdek in 60 seconden of jouw uitzendbureau te maken heeft met hoog-risico AI
          volgens de EU AI Act. Van ATS-systemen tot matchingtools — weet waar je staat.
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

        {/* Stap 1: Systemen */}
        {step === "systemen" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Welke van deze software gebruikt jouw uitzendbureau?</h2>
            <p className="text-muted mb-6">Selecteer alles wat van toepassing is.</p>
            <div className="grid gap-3 mb-6">
              {systemen.map((optie) => (
                <button
                  key={optie.id}
                  onClick={() => toggleSysteem(optie.id)}
                  className={`group text-left p-5 rounded-xl transition-all duration-200 cursor-pointer ${
                    answers.systemen.includes(optie.id)
                      ? "border-2 border-accent bg-blue-50 shadow-sm"
                      : "border border-border hover:border-accent/50 hover:shadow-md hover:-translate-y-px"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      answers.systemen.includes(optie.id)
                        ? "border-accent bg-accent"
                        : "border-gray-300 group-hover:border-accent/50"
                    }`}>
                      {answers.systemen.includes(optie.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm leading-snug ${answers.systemen.includes(optie.id) ? "text-accent font-medium" : ""}`}>{optie.label}</span>
                  </div>
                </button>
              ))}
              <button
                onClick={() => toggleSysteem("geen")}
                className={`group text-left p-5 rounded-xl transition-all duration-200 cursor-pointer ${
                  answers.systemen.includes("geen")
                    ? "border-2 border-accent bg-blue-50 shadow-sm"
                    : "border border-border hover:border-accent/50 hover:shadow-md hover:-translate-y-px"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    answers.systemen.includes("geen")
                      ? "border-accent bg-accent"
                      : "border-gray-300 group-hover:border-accent/50"
                  }`}>
                    {answers.systemen.includes("geen") && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm leading-snug ${answers.systemen.includes("geen") ? "text-accent font-medium" : ""}`}>{geenOptie.label}</span>
                </div>
              </button>
            </div>
            <button
              onClick={submitSystemen}
              disabled={answers.systemen.length === 0}
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-primary transition-all duration-200 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Volgende
            </button>
          </div>
        )}

        {/* Stap 2: ATS systeem */}
        {step === "ats" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Welk ATS-systeem gebruikt jouw organisatie?</h2>
            <p className="text-muted mb-6">
              Dit helpt ons het resultaat specifieker te maken. We gebruiken dit alleen voor je scan.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {atsOpties.filter(o => o.ai).map((optie) => (
                <button
                  key={optie.id}
                  onClick={() => selectAts(optie.id)}
                  className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
                >
                  <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{optie.label}</span>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed">Bevat o.a. {optie.ai}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              {atsOpties.filter(o => !o.ai).map((optie) => (
                <button
                  key={optie.id}
                  onClick={() => selectAts(optie.id)}
                  className="flex-1 text-center py-3 px-4 rounded-lg border border-border text-sm text-muted hover:border-accent/50 hover:text-foreground transition-all duration-200 cursor-pointer"
                >
                  {optie.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stap 3: Shadow AI */}
        {step === "shadow" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Gebruiken recruiters of intercedenten eigen AI-tools?</h2>
            <p className="text-muted mb-6">
              Denk aan ChatGPT, Copilot of andere AI-tools die medewerkers zelf inzetten om cv&apos;s te
              beoordelen, vacatureteksten te schrijven of kandidaten te screenen — ook als dit niet officieel is afgesproken.
            </p>
            <div className="grid gap-3">
              <button
                onClick={() => selectShadow("ja")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Ja, dat gebeurt</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Medewerkers gebruiken eigen AI-tools voor hun werk</p>
              </button>
              <button
                onClick={() => selectShadow("nee")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Nee</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Er worden alleen goedgekeurde tools gebruikt</p>
              </button>
              <button
                onClick={() => selectShadow("weet-niet")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Weet ik niet</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">We hebben hier geen zicht op</p>
              </button>
            </div>
          </div>
        )}

        {/* Stap 4: Beslissingen */}
        {step === "beslissingen" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Nemen deze systemen zelfstandig beslissingen?</h2>
            <p className="text-muted mb-6">Of adviseren ze een recruiter of intercedent die de eindbeslissing neemt?</p>
            <div className="grid gap-3">
              <button
                onClick={() => selectBeslissingen("zelfstandig")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Zelfstandig</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Het systeem wijst kandidaten af of rankt ze zonder dat iemand meekijkt</p>
              </button>
              <button
                onClick={() => selectBeslissingen("adviserend")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Adviserend</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Het systeem geeft een aanbeveling, een recruiter beslist</p>
              </button>
              <button
                onClick={() => selectBeslissingen("weet-niet")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Weet ik niet</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Ik weet niet precies hoe het systeem werkt</p>
              </button>
            </div>
          </div>
        )}

        {/* Stap 5: Toezicht */}
        {step === "toezicht" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Is er iemand aangewezen die AI-beslissingen kan overrulen?</h2>
            <p className="text-muted mb-6">Iemand met de bevoegdheid én de kennis om in te grijpen wanneer het systeem een kandidaat onterecht afwijst.</p>
            <div className="grid gap-3">
              <button
                onClick={() => selectToezicht("ja")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Ja</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Er is iemand die de output van het systeem beoordeelt en kan aanpassen</p>
              </button>
              <button
                onClick={() => selectToezicht("nee")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Nee</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">De output van het systeem wordt zonder controle overgenomen</p>
              </button>
              <button
                onClick={() => selectToezicht("weet-niet")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Weet ik niet</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Het is me niet duidelijk of er toezicht is</p>
              </button>
            </div>
          </div>
        )}

        {/* Stap 6: Transparantie */}
        {step === "transparantie" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Worden kandidaten geïnformeerd dat AI wordt gebruikt?</h2>
            <p className="text-muted mb-6">Weten kandidaten en uitzendkrachten dat hun cv door AI wordt beoordeeld of dat een matchingtool meebesluit?</p>
            <div className="grid gap-3">
              <button
                onClick={() => selectTransparantie("ja")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Ja</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Kandidaten weten dat AI een rol speelt in het proces</p>
              </button>
              <button
                onClick={() => selectTransparantie("nee")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Nee</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Er wordt niet actief gecommuniceerd dat AI wordt ingezet</p>
              </button>
              <button
                onClick={() => selectTransparantie("weet-niet")}
                className="group text-left p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:-translate-y-px transition-all duration-200 cursor-pointer"
              >
                <span className="font-semibold group-hover:text-accent transition-colors">Weet ik niet</span>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">Ik weet niet of kandidaten hierover geïnformeerd worden</p>
              </button>
            </div>
          </div>
        )}

        {/* Resultaat */}
        {step === "resultaat" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Jouw resultaat</h2>

            {/* Risico badge */}
            <div className={`p-6 rounded-lg border-2 mb-6 ${risicoKleuren[risicoNiveau]}`}>
              <p className="text-2xl font-bold mb-2">{risicoLabels[risicoNiveau]}</p>
              <p className="leading-relaxed">
                {risicoNiveau === "hoog" && <>Jouw organisatie loopt risico onder de EU AI Act. De deadline is <strong>augustus 2026</strong>.</>}
                {risicoNiveau === "middel" && <>Er zijn aandachtspunten. De deadline is <strong>augustus 2026</strong>.</>}
                {risicoNiveau === "laag" && <>Op basis van je antwoorden lijkt jouw organisatie geen hoog-risico AI te gebruiken.</>}
              </p>
            </div>

            {/* Waarom — compacte bullet list */}
            {(aantalHoogRisico > 0 || answers.shadow === "ja" || answers.shadow === "weet-niet") && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Waarom?</h3>
                <div className="space-y-2">
                  {hoogRisicoSystemen.map((id) => {
                    const optie = systemen.find((o) => o.id === id);
                    return (
                      <div key={id} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-0.5">&#9888;</span>
                        <span>{optie?.label} — valt onder hoog-risico (EU AI Act, Bijlage III)</span>
                      </div>
                    );
                  })}
                  {(answers.shadow === "ja" || answers.shadow === "weet-niet") && (
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-amber-500 mt-0.5">&#9888;</span>
                      <span>{answers.shadow === "ja" ? "Medewerkers gebruiken eigen AI-tools (shadow AI)" : "Mogelijk onzichtbaar AI-gebruik door medewerkers"}</span>
                    </div>
                  )}
                  {aantalHoogRisico > 0 && (answers.toezicht === "nee" || answers.toezicht === "weet-niet") && (
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-red-500 mt-0.5">&#9888;</span>
                      <span>Geen menselijk toezicht op AI-beslissingen</span>
                    </div>
                  )}
                  {aantalHoogRisico > 0 && (answers.transparantie === "nee" || answers.transparantie === "weet-niet") && (
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-amber-500 mt-0.5">&#9888;</span>
                      <span>Kandidaten worden niet geïnformeerd over AI-gebruik</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Gevolg / pijnpunt */}
            {(aantalHoogRisico > 0 || answers.shadow === "ja" || answers.shadow === "weet-niet") && (
              <div className="mb-6 p-5 bg-surface rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-3">Wat betekent dit?</h3>
                <div className="space-y-2 text-sm text-muted leading-relaxed">
                  {risicoNiveau === "hoog" && (
                    <>
                      <p>
                        Vanaf augustus 2026 moet jouw organisatie kunnen aantonen dat hoog-risico AI-systemen voldoen aan de EU AI Act.
                        Dat betekent documentatie, menselijk toezicht en transparantie naar kandidaten.
                      </p>
                      <p>
                        Zonder actie riskeer je boetes tot 3% van de jaaromzet — én reputatieschade als kandidaten of opdrachtgevers vragen stellen die je niet kunt beantwoorden.
                      </p>
                    </>
                  )}
                  {risicoNiveau === "middel" && (
                    <>
                      <p>
                        Je organisatie valt niet direct in de zwaarste categorie, maar er zijn risico's die aandacht vragen vóór augustus 2026.
                      </p>
                      <p>
                        Opdrachtgevers en kandidaten verwachten steeds vaker dat je kunt uitleggen hoe AI in jouw processen wordt ingezet. Wie dat niet kan, verliest vertrouwen.
                      </p>
                    </>
                  )}
                  {risicoNiveau === "laag" && answers.shadow === "ja" && (
                    <p>
                      Hoewel je geen hoog-risico systemen gebruikt, vormt shadow AI een onzichtbaar risico. Medewerkers die zelfstandig AI inzetten voor kandidaatbeoordeling vallen mogelijk alsnog onder de wet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Hoe pak je dit aan? */}
            {(aantalHoogRisico > 0 || answers.shadow === "ja") && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Hoe pak je dit aan?</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  Je softwareleverancier zorgt voor de technische kant — CE-markering, productstandaarden.
                  Maar als gebruiker heb je eigen verplichtingen: je team moet AI-geletterd zijn, het toezicht
                  moet geregeld zijn, en kandidaten moeten geïnformeerd worden. Dat kun je zelf oppakken.
                </p>

                {/* Gratis stap */}
                <div className="p-5 bg-surface rounded-lg border border-border mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">&#9745;</span>
                    <div>
                      <p className="font-semibold mb-1">Begin vandaag — gratis</p>
                      <p className="text-sm text-muted leading-relaxed mb-3">
                        Download het AI-register template en breng in kaart welke AI-systemen jouw organisatie gebruikt.
                        Dat is stap één van compliance — en je kunt het zelf.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href="/ai-register"
                          className="inline-block px-4 py-2 text-sm font-medium border border-accent text-accent rounded-lg hover:bg-blue-50 transition-colors no-underline"
                        >
                          AI-register template &rarr;
                        </Link>
                        <Link
                          href="/uitzendbranche"
                          className="inline-block px-4 py-2 text-sm font-medium border border-border text-muted rounded-lg hover:border-accent/50 hover:text-foreground transition-colors no-underline"
                        >
                          Kennisbank uitzendbranche
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Traject */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">&#9889;</span>
                    <div>
                      <p className="font-semibold mb-1">Wil je het goed geregeld hebben?</p>
                      <p className="text-sm text-gray-300 leading-relaxed mb-4">
                        Het Normelo AI-geletterdheid traject helpt je van inventarisatie tot certificering.
                        Specifiek voor de uitzendbranche en de systemen die jij gebruikt.
                      </p>
                      <Link
                        href="/training"
                        className="inline-block px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors no-underline"
                      >
                        Bekijk het traject &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resultaat per e-mail */}
            <div className="mb-6 p-5 bg-surface rounded-lg border border-border">
              {emailStatus === "sent" ? (
                <div>
                  <p className="font-semibold text-green-700 mb-1">Verstuurd!</p>
                  <p className="text-sm text-muted">
                    Je ontvangt je resultaat op <strong>{email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitEmail}>
                  <p className="font-semibold mb-3">Ontvang je resultaat per e-mail</p>
                  <div className="flex gap-3">
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jouw@email.nl"
                      required
                      className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "sending"}
                      className="px-5 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer whitespace-nowrap"
                    >
                      {emailStatus === "sending" ? "Versturen..." : "Verstuur resultaat"}
                    </button>
                  </div>
                  {emailStatus === "error" && (
                    <p className="text-sm text-red-600 mt-2">
                      Er ging iets mis. Probeer het opnieuw.
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Opnieuw */}
            <button
              onClick={restart}
              className="px-5 py-3 border border-border rounded-lg hover:bg-surface transition-colors cursor-pointer text-sm"
            >
              Opnieuw doen
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
