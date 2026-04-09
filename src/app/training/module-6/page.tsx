"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  module: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Wanneer is de EU AI Act in werking getreden?",
    options: [
      "1 januari 2024",
      "1 augustus 2024",
      "2 februari 2025",
      "2 augustus 2026",
    ],
    correct: 1,
    explanation:
      "De EU AI Act is op 1 augustus 2024 in werking getreden. Artikel 4 (AI-geletterdheid) geldt sinds 2 februari 2025. De hoog-risico verplichtingen gelden vanaf 2 augustus 2026.",
    module: "Module 1",
  },
  {
    id: 2,
    question:
      "Onder welke risicocategorie vallen ATS-systemen die cv's ranken?",
    options: [
      "Minimaal risico",
      "Beperkt risico",
      "Hoog risico",
      "Onaanvaardbaar risico",
    ],
    correct: 2,
    explanation:
      "ATS-systemen die cv's ranken, scoren of filteren vallen onder hoog-risico (Bijlage III, categorie 4: werkgelegenheid). Ze nemen beslissingen die directe gevolgen hebben voor kandidaten.",
    module: "Module 2",
  },
  {
    id: 3,
    question:
      "Je bent een uitzendbureau dat een ATS-systeem van een externe leverancier gebruikt. Wat is je rol onder de EU AI Act?",
    options: [
      "Provider — je biedt het systeem aan",
      "Deployer — je zet het systeem in",
      "Geen rol — de leverancier is verantwoordelijk",
      "Toezichthouder — je controleert de leverancier",
    ],
    correct: 1,
    explanation:
      "Als uitzendbureau ben je deployer: je zet het AI-systeem in. De leverancier (provider) heeft eigen verplichtingen, maar die ontslaan jou niet van de jouwe. Je bent zelf verantwoordelijk voor het juiste gebruik.",
    module: "Module 2",
  },
  {
    id: 4,
    question:
      "Je ATS wijst cv's automatisch af die niet aan bepaalde keywords voldoen. De recruiter ziet deze kandidaten nooit. Wat is het probleem?",
    options: [
      "Keywords zijn niet betrouwbaar",
      "Er is geen menselijk toezicht op de filterbeslissing",
      "Het systeem is te langzaam",
      "De kandidaat krijgt geen bevestigingsmail",
    ],
    correct: 1,
    explanation:
      "Artikel 14 vereist menselijk toezicht bij hoog-risico AI-systemen. Als kandidaten automatisch worden afgewezen zonder dat een recruiter meekijkt, is er geen effectief menselijk toezicht op de beslissing.",
    module: "Module 3",
  },
  {
    id: 5,
    question: "Wat is 'automation bias'?",
    options: [
      "Een technische fout in het AI-systeem",
      "De neiging om AI-output klakkeloos te vertrouwen",
      "Een vorm van discriminatie door algoritmes",
      "Het automatisch bijwerken van AI-modellen",
    ],
    correct: 1,
    explanation:
      "Automation bias is de psychologische neiging om de output van een computersysteem als juist aan te nemen. De EU AI Act erkent dit risico — effectief menselijk toezicht vereist dat de mens ook daadwerkelijk kritisch is.",
    module: "Module 3",
  },
  {
    id: 6,
    question:
      "Een recruiter gebruikt ChatGPT om 20 cv's te ranken voor een vacature. Wat is hier aan de hand?",
    options: [
      "Niets — ChatGPT is geen AI-systeem onder de wet",
      "Shadow AI — ongecontroleerd hoog-risico AI-gebruik",
      "Dit mag, zolang de recruiter de ranking controleert",
      "Dit is alleen een AVG-probleem, niet een EU AI Act probleem",
    ],
    correct: 1,
    explanation:
      "Dit is shadow AI: een medewerker gebruikt een externe AI-tool om een selectiebeslissing te nemen over kandidaten. Er is geen menselijk toezicht, geen logging, en persoonsgegevens worden gedeeld met een externe partij. Dit is zowel een EU AI Act als een AVG-risico.",
    module: "Module 4",
  },
  {
    id: 7,
    question:
      "Wat is de beste aanpak om shadow AI in je uitzendbureau aan te pakken?",
    options: [
      "Alle AI-tools verbieden",
      "Negeren — het is toch niet te controleren",
      "Een AI-beleid opstellen dat duidelijk maakt wat wel en niet mag",
      "Alleen de IT-afdeling mag AI-tools gebruiken",
    ],
    correct: 2,
    explanation:
      "Een helder AI-beleid dat duidelijk maakt welke tools zijn toegestaan, wat er nooit in een AI-tool mag, en hoe medewerkers gebruik moeten melden. Verbieden werkt niet — medewerkers gaan het dan stiekem doen.",
    module: "Module 4",
  },
  {
    id: 8,
    question:
      "Wanneer moet je kandidaten informeren dat AI wordt ingezet in het selectieproces?",
    options: [
      "Alleen als ze erom vragen",
      "Na afloop van het selectieproces",
      "Voordat het systeem een beslissing over hen neemt",
      "Alleen bij een afwijzing",
    ],
    correct: 2,
    explanation:
      "De informatieplicht geldt vooraf — de kandidaat moet weten dat AI wordt ingezet voordat het systeem een beslissing over hem neemt. Dit kan in de vacaturetekst, bij inschrijving, of in de sollicitatiebevestiging.",
    module: "Module 5",
  },
  {
    id: 9,
    question:
      "Een kandidaat vraagt: 'Kan ik bezwaar maken tegen een AI-beslissing over mijn sollicitatie?' Wat is het juiste antwoord?",
    options: [
      "Nee, AI-beslissingen zijn definitief",
      "Ja, onder zowel de AVG als de EU AI Act",
      "Alleen als het een volledig geautomatiseerde beslissing was",
      "Dat hangt af van de leverancier van het systeem",
    ],
    correct: 1,
    explanation:
      "Ja. Onder zowel de AVG (Artikel 22) als de EU AI Act heeft een kandidaat het recht om een AI-beslissing aan te vechten. Je moet een procedure hebben om dit af te handelen.",
    module: "Module 5",
  },
  {
    id: 10,
    question: "Artikel 4 van de EU AI Act (AI-geletterdheid) geldt sinds:",
    options: [
      "Het is nog niet van kracht",
      "2 februari 2025",
      "2 augustus 2026",
      "1 januari 2027",
    ],
    correct: 1,
    explanation:
      "Artikel 4 geldt sinds 2 februari 2025. Dit is de eerste verplichting die van kracht is geworden — nog vóór de hoog-risico verplichtingen van augustus 2026.",
    module: "Module 1",
  },
  {
    id: 11,
    question:
      "Je matchingtool toont alleen de top-5 matches. De recruiter werkt daar altijd mee en bekijkt nooit andere kandidaten. Hoe beoordeel je dit?",
    options: [
      "Prima — de tool selecteert efficiënt",
      "Probleem — dit functioneert als autonome besluitvorming",
      "Geen probleem zolang de recruiter de top-5 zelf beoordeelt",
      "Dit valt niet onder de EU AI Act",
    ],
    correct: 1,
    explanation:
      "Als de recruiter structureel alleen de top-5 bekijkt, worden kandidaten lager in de lijst nooit gezien. In de praktijk functioneert dit als een autonome beslissing door het AI-systeem.",
    module: "Module 3",
  },
  {
    id: 12,
    question:
      "Welke persoonsgegevens mag je NOOIT invoeren in een externe AI-tool zoals ChatGPT?",
    options: [
      "Alleen BSN-nummers",
      "Alleen medische gegevens",
      "Alle persoonsgegevens van kandidaten zonder verwerkersovereenkomst",
      "Geen beperkingen als de kandidaat toestemming heeft gegeven",
    ],
    correct: 2,
    explanation:
      "Persoonsgegevens van kandidaten — namen, cv's, contactgegevens, werkgeschiedenis — mogen nooit worden ingevoerd in externe AI-tools zonder expliciete toestemming en een verwerkersovereenkomst. Dit is een AVG-vereiste.",
    module: "Module 4",
  },
];

export default function Module6() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === q.correct) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }

  function handleRetry() {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  const passed = score >= 10;
  const percentage = Math.round((score / questions.length) * 100);

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto px-6">
        <nav className="py-4 text-sm text-muted">
          <Link href="/training" className="hover:text-accent">Training</Link>
          <span className="mx-2">›</span>
          <span>Toets</span>
        </nav>

        <div className="py-16 text-center">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold mb-6 ${
              passed
                ? "bg-green-50 text-green-700 border-2 border-green-300"
                : "bg-red-50 text-red-700 border-2 border-red-300"
            }`}
          >
            {percentage}%
          </div>

          <h1 className="text-3xl font-bold mb-2">
            {passed ? "Gefeliciteerd!" : "Helaas, nog niet voldoende"}
          </h1>
          <p className="text-lg text-muted mb-6">
            Je hebt {score} van de {questions.length} vragen goed beantwoord.
            {passed
              ? " Je hebt de toets gehaald."
              : " Je hebt minimaal 10 goede antwoorden nodig om te slagen."}
          </p>

          {passed ? (
            <div className="max-w-md mx-auto p-6 bg-green-50 rounded-lg border border-green-200 mb-8">
              <p className="font-bold text-green-800 mb-2">
                AI-geletterdheid toets behaald
              </p>
              <p className="text-sm text-green-700">
                Je hebt aangetoond dat je de basiskennis bezit over de EU AI Act en
                de toepassing ervan in de uitzendbranche. In het volledige
                compliance-traject ontvang je hiervoor het Normelo certificaat.
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-8">
              <p className="text-sm text-muted mb-4">
                Bekijk de modules nog een keer en probeer het opnieuw. Focus vooral
                op de onderwerpen waar je vragen fout had.
              </p>
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors cursor-pointer"
              >
                Opnieuw proberen
              </button>
            </div>
          )}

          <div className="pt-8 border-t border-border">
            <Link
              href="/training"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              ← Terug naar training overzicht
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6">
      <nav className="py-4 text-sm text-muted">
        <Link href="/training" className="hover:text-accent">Training</Link>
        <span className="mx-2">›</span>
        <span>Toets</span>
      </nav>

      <article className="py-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-medium text-accent tracking-wide uppercase">
            Module 6 — Toets
          </p>
          <p className="text-sm text-muted">
            Vraag {current + 1} van {questions.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-surface rounded-full mb-8">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{
              width: `${((current + (answered ? 1 : 0)) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="mb-8">
          <p className="text-xs text-muted mb-2">{q.module}</p>
          <h2 className="text-xl font-bold leading-snug">{q.question}</h2>
        </div>

        <div className="space-y-3 mb-8">
          {q.options.map((option, i) => {
            let style =
              "border border-border hover:border-accent cursor-pointer";
            if (answered) {
              if (i === q.correct) {
                style = "border-2 border-green-500 bg-green-50";
              } else if (i === selected && i !== q.correct) {
                style = "border-2 border-red-400 bg-red-50";
              } else {
                style = "border border-border opacity-50";
              }
            } else if (i === selected) {
              style = "border-2 border-accent bg-accent/5";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-lg transition-colors ${style} ${answered ? "cursor-default" : ""}`}
              >
                <span className="text-sm">{option}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              selected === q.correct
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p
              className={`text-sm font-semibold mb-1 ${
                selected === q.correct ? "text-green-800" : "text-red-800"
              }`}
            >
              {selected === q.correct ? "Goed!" : "Onjuist"}
            </p>
            <p className="text-sm text-muted">{q.explanation}</p>
          </div>
        )}

        {answered && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors cursor-pointer"
          >
            {current < questions.length - 1
              ? "Volgende vraag →"
              : "Bekijk resultaat"}
          </button>
        )}

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link
            href="/training/module-5"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← Module 5
          </Link>
          <p className="text-sm text-muted">
            Score: {score}/{current + (answered ? 1 : 0)}
          </p>
        </div>
      </article>
    </div>
  );
}
