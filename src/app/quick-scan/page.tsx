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

        {/* Stap 2: ATS systeem */}
        {step === "ats" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Welk ATS-systeem gebruikt jouw organisatie?</h2>
            <p className="text-muted mb-6">
              Dit helpt ons het resultaat specifieker te maken. We gebruiken dit alleen voor je scan.
            </p>
            <div className="grid gap-3">
              {atsOpties.map((optie) => (
                <button
                  key={optie.id}
                  onClick={() => selectAts(optie.id)}
                  className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
                >
                  <span className="font-semibold">{optie.label}</span>
                  {optie.ai && (
                    <p className="text-sm text-muted mt-1">Bevat o.a. {optie.ai}</p>
                  )}
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
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Ja, dat gebeurt</span>
                <p className="text-sm text-muted mt-1">Medewerkers gebruiken eigen AI-tools voor hun werk</p>
              </button>
              <button
                onClick={() => selectShadow("nee")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Nee</span>
                <p className="text-sm text-muted mt-1">Er worden alleen goedgekeurde tools gebruikt</p>
              </button>
              <button
                onClick={() => selectShadow("weet-niet")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Weet ik niet</span>
                <p className="text-sm text-muted mt-1">We hebben hier geen zicht op</p>
              </button>
            </div>
          </div>
        )}

        {/* Stap 3: Beslissingen */}
        {step === "beslissingen" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Nemen deze systemen zelfstandig beslissingen?</h2>
            <p className="text-muted mb-6">Of adviseren ze een recruiter of intercedent die de eindbeslissing neemt?</p>
            <div className="grid gap-3">
              <button
                onClick={() => selectBeslissingen("zelfstandig")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Zelfstandig</span>
                <p className="text-sm text-muted mt-1">Het systeem wijst kandidaten af of rankt ze zonder dat iemand meekijkt</p>
              </button>
              <button
                onClick={() => selectBeslissingen("adviserend")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Adviserend</span>
                <p className="text-sm text-muted mt-1">Het systeem geeft een aanbeveling, een recruiter beslist</p>
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
            <p className="text-muted mb-6">Iemand met de bevoegdheid én de kennis om in te grijpen wanneer het systeem een kandidaat onterecht afwijst.</p>
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
            <h2 className="text-2xl font-bold mb-2">Worden kandidaten geïnformeerd dat AI wordt gebruikt?</h2>
            <p className="text-muted mb-6">Weten kandidaten en uitzendkrachten dat hun cv door AI wordt beoordeeld of dat een matchingtool meebesluit?</p>
            <div className="grid gap-3">
              <button
                onClick={() => selectTransparantie("ja")}
                className="text-left p-4 border border-border rounded-lg hover:border-accent hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="font-semibold">Ja</span>
                <p className="text-sm text-muted mt-1">Kandidaten weten dat AI een rol speelt in het proces</p>
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
                <p className="text-sm text-muted mt-1">Ik weet niet of kandidaten hierover geïnformeerd worden</p>
              </button>
            </div>
          </div>
        )}

        {/* Resultaat */}
        {step === "resultaat" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Jouw resultaat</h2>

            {/* Risico badge */}
            <div className={`p-6 rounded-lg border-2 mb-8 ${risicoKleuren[risicoNiveau]}`}>
              <p className="text-2xl font-bold mb-2">{risicoLabels[risicoNiveau]}</p>
              {risicoNiveau === "hoog" && (
                <p className="leading-relaxed">
                  Jouw uitzendbureau gebruikt waarschijnlijk <strong>{aantalHoogRisico} systeem{aantalHoogRisico !== 1 ? "en" : ""}</strong> dat
                  als hoog-risico kwalificeert onder de EU AI Act.
                  {answers.shadow === "ja" && " Daarnaast is er sprake van ongecontroleerd AI-gebruik (shadow AI)."}
                  {" "}Er zijn directe aandachtspunten op het gebied van compliance. De deadline is <strong>augustus 2026</strong>.
                </p>
              )}
              {risicoNiveau === "middel" && (
                <p className="leading-relaxed">
                  {aantalHoogRisico > 0 ? (
                    <>Jouw uitzendbureau gebruikt waarschijnlijk <strong>{aantalHoogRisico} systeem{aantalHoogRisico !== 1 ? "en" : ""}</strong> dat
                    als hoog-risico kwalificeert onder de EU AI Act. Er zijn aandachtspunten,
                    maar je bent deels op de goede weg.</>
                  ) : (
                    <>Je gebruikt geen officiële hoog-risico systemen, maar er is wel sprake van
                    ongecontroleerd AI-gebruik door medewerkers (shadow AI). Dit vormt een risico onder de EU AI Act.</>
                  )}
                  {" "}De deadline is <strong>augustus 2026</strong>.
                </p>
              )}
              {risicoNiveau === "laag" && (
                <p className="leading-relaxed">
                  Op basis van je antwoorden lijkt jouw uitzendbureau geen hoog-risico AI-systemen
                  te gebruiken. Dat kan veranderen als je nieuwe software introduceert. Houd
                  de ontwikkelingen in de gaten.
                </p>
              )}
            </div>

            {/* ATS-specifieke toelichting */}
            {answers.ats && answers.ats !== "geen-ats" && answers.ats !== "weet-niet" && aantalHoogRisico > 0 && (
              <div className="mb-8 p-5 bg-surface rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-2">
                  {answers.ats === "anders" ? "Jouw ATS-systeem" : atsOpties.find(o => o.id === answers.ats)?.label}
                </h3>
                {answers.ats === "carerix" && (
                  <p className="text-sm text-foreground leading-relaxed">
                    Carerix heeft AI-matching en CV-screening geïntegreerd. Als jouw organisatie die functionaliteiten
                    gebruikt voor selectiebeslissingen over kandidaten, kwalificeren die als hoog-risico onder Bijlage III
                    van de EU AI Act (categorie 4: werkgelegenheid). Jullie zijn als gebruiker (deployer) zelf
                    verantwoordelijk voor het juiste gebruik — ongeacht wat Carerix als leverancier doet.
                  </p>
                )}
                {answers.ats === "mysolution" && (
                  <p className="text-sm text-foreground leading-relaxed">
                    Mysolution bevat AI-matching en kandidaatranking. Als jouw organisatie die functionaliteiten gebruikt
                    om kandidaten te selecteren, ranken of filteren, valt dat onder hoog-risico (Bijlage III, categorie 4).
                    Als deployer ben je zelf verantwoordelijk voor compliance — Mysolution als provider heeft eigen
                    verplichtingen, maar die ontslaan jou niet van de jouwe.
                  </p>
                )}
                {answers.ats === "bullhorn" && (
                  <p className="text-sm text-foreground leading-relaxed">
                    Bullhorn (voorheen Connexys) bevat AI-matching en automatische sourcing. Wanneer deze functies worden
                    ingezet voor selectiebeslissingen over kandidaten, vallen ze onder hoog-risico (Bijlage III, categorie 4).
                    Als deployer ben je zelf verantwoordelijk voor het juiste gebruik en menselijk toezicht.
                  </p>
                )}
                {answers.ats === "byner" && (
                  <p className="text-sm text-foreground leading-relaxed">
                    Byner bevat AI-matching en talent engagement functionaliteiten. Als die worden ingezet voor
                    selectiebeslissingen, kwalificeren ze als hoog-risico onder de EU AI Act. Als deployer op het
                    Byner-platform ben je zelf verantwoordelijk voor compliance.
                  </p>
                )}
                {answers.ats === "anders" && (
                  <p className="text-sm text-foreground leading-relaxed">
                    Als jouw ATS-systeem AI-functionaliteiten bevat die worden ingezet voor selectiebeslissingen over
                    kandidaten (matching, ranking, screening), valt dat gebruik onder hoog-risico in de EU AI Act
                    (Bijlage III, categorie 4). Als gebruiker (deployer) ben je zelf verantwoordelijk voor compliance.
                  </p>
                )}
              </div>
            )}

            {/* Hoog-risico systemen */}
            {aantalHoogRisico > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Jouw hoog-risico systemen</h3>
                <div className="space-y-2">
                  {hoogRisicoSystemen.map((id) => {
                    const optie = systemen.find((o) => o.id === id);
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
            {(aantalHoogRisico > 0 || answers.shadow === "ja" || answers.shadow === "weet-niet") && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Jouw aandachtspunten</h3>
                <div className="space-y-3">
                  {(answers.shadow === "ja" || answers.shadow === "weet-niet") && (
                    <div className="p-4 border-l-2 border-red-400 bg-red-50/50">
                      <p className="font-semibold text-sm mb-1">Shadow AI</p>
                      <p className="text-sm text-muted">
                        {answers.shadow === "ja"
                          ? "Medewerkers gebruiken eigen AI-tools voor recruitmenttaken. Dit valt ook onder de EU AI Act — en brengt extra risico's mee op het gebied van privacy, bias en compliance. Artikel 4 verplicht AI-geletterdheid voor iedereen die AI inzet."
                          : "Je hebt geen zicht op of medewerkers eigen AI-tools gebruiken. Onderzoek toont dat meer dan de helft van werknemers dit doet. Breng dit in kaart."}
                      </p>
                    </div>
                  )}
                  {aantalHoogRisico > 0 && (answers.beslissingen === "zelfstandig" || answers.beslissingen === "weet-niet") && (
                    <div className="p-4 border-l-2 border-red-400 bg-red-50/50">
                      <p className="font-semibold text-sm mb-1">Autonome besluitvorming</p>
                      <p className="text-sm text-muted">
                        {answers.beslissingen === "zelfstandig"
                          ? "Je systemen nemen zelfstandig beslissingen over kandidaten. De EU AI Act vereist menselijk toezicht bij hoog-risico AI."
                          : "Je weet niet of je systemen zelfstandig beslissingen nemen over kandidaten. Dit is een risico — breng dit in kaart."}
                      </p>
                    </div>
                  )}
                  {aantalHoogRisico > 0 && (answers.toezicht === "nee" || answers.toezicht === "weet-niet") && (
                    <div className="p-4 border-l-2 border-red-400 bg-red-50/50">
                      <p className="font-semibold text-sm mb-1">Menselijk toezicht</p>
                      <p className="text-sm text-muted">
                        {answers.toezicht === "nee"
                          ? "Er is niemand aangewezen die AI-beslissingen over kandidaten kan overrulen. Dit is een kernvereiste van de EU AI Act."
                          : "Je weet niet of er menselijk toezicht is op AI-beslissingen. Stel dit vast — het is een van de belangrijkste verplichtingen."}
                      </p>
                    </div>
                  )}
                  {aantalHoogRisico > 0 && (answers.transparantie === "nee" || answers.transparantie === "weet-niet") && (
                    <div className="p-4 border-l-2 border-amber-400 bg-amber-50/50">
                      <p className="font-semibold text-sm mb-1">Transparantie</p>
                      <p className="text-sm text-muted">
                        {answers.transparantie === "nee"
                          ? "Kandidaten worden niet geïnformeerd over het gebruik van AI. De EU AI Act verplicht dit bij hoog-risico systemen."
                          : "Je weet niet of kandidaten geïnformeerd worden. Controleer dit — transparantie is verplicht."}
                      </p>
                    </div>
                  )}
                  {aantalHoogRisico > 0 && answers.beslissingen === "adviserend" && answers.toezicht === "ja" && answers.transparantie === "ja" && (
                    <div className="p-4 border-l-2 border-green-400 bg-green-50/50">
                      <p className="font-semibold text-sm mb-1">Goede basis</p>
                      <p className="text-sm text-muted">
                        Je hebt menselijk toezicht en informeert kandidaten. Dat is een sterke basis.
                        Zorg ervoor dat dit ook aantoonbaar en gedocumenteerd is.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sector link */}
            <div className="mb-8 p-4 bg-surface rounded-lg border border-border">
              <p className="text-sm mb-2">
                Lees meer over de EU AI Act in de uitzendbranche:
              </p>
              <Link href="/uitzendbranche" className="text-accent font-semibold hover:underline">
                EU AI Act &amp; de Uitzendbranche &rarr;
              </Link>
            </div>

            {/* Deadline */}
            {(aantalHoogRisico > 0 || answers.shadow === "ja") && (
              <div className="mb-8 p-4 bg-surface rounded-lg border border-border">
                <p className="text-sm">
                  <strong>De deadline:</strong> de verplichtingen voor hoog-risico AI-systemen worden
                  van toepassing in <strong>augustus 2026</strong>. AI-geletterdheid (Art. 4) is al verplicht sinds <strong>februari 2025</strong>.{" "}
                  <Link href="/tijdlijn" className="text-accent hover:underline">
                    Bekijk de volledige tijdlijn &rarr;
                  </Link>
                </p>
              </div>
            )}

            {/* PDF rapport per e-mail */}
            <div className="mb-8 p-6 bg-surface rounded-lg border border-border">
              {emailStatus === "sent" ? (
                <div>
                  <p className="font-semibold text-green-700 mb-1">Verstuurd!</p>
                  <p className="text-sm text-muted">
                    Je ontvangt je Quick Scan resultaat op <strong>{email}</strong>.
                    We gebruiken je e-mailadres nergens anders voor.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitEmail}>
                  <p className="font-semibold mb-1">Ontvang je resultaat per e-mail</p>
                  <p className="text-sm text-muted mb-4">
                    Handig om te bewaren of te delen met collega&apos;s. We sturen geen spam.
                  </p>
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

            {/* CTA */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={restart}
                className="px-5 py-3 border border-border rounded-lg hover:bg-surface transition-colors cursor-pointer"
              >
                Opnieuw doen
              </button>
              <Link
                href="/uitzendbranche"
                className="btn-accent px-5 py-3 bg-accent rounded-lg hover:bg-primary transition-colors no-underline"
              >
                EU AI Act &amp; de Uitzendbranche
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
