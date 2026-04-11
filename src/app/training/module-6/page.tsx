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
      "Je ATS wijst cv's automatisch af die niet aan bepaalde keywords voldoen. De recruiter ziet deze kandidaten nooit. Wat is het probleem?",
    options: [
      "Keywords zijn niet betrouwbaar",
      "Er is geen menselijk toezicht op de filterbeslissing",
      "Het systeem is te langzaam",
      "De kandidaat krijgt geen bevestigingsmail",
    ],
    correct: 1,
    explanation:
      "Artikel 14 vereist menselijk toezicht bij hoog-risico AI-systemen. Als kandidaten automatisch worden afgewezen zonder dat een recruiter meekijkt, is er geen effectief menselijk toezicht.",
    module: "Module 3",
  },
  {
    id: 3,
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
      "Dit is shadow AI: een medewerker gebruikt een externe AI-tool om een selectiebeslissing te nemen over kandidaten. Zonder toezicht, logging of verwerkersovereenkomst is dit zowel een EU AI Act als een AVG-risico.",
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

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto px-6">
        <nav className="py-4 text-sm text-muted">
          <Link href="/training" className="hover:text-accent">Training</Link>
          <span className="mx-2">›</span>
          <span>Toets</span>
        </nav>

        <div className="py-16">
          <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">
            Preview afgerond
          </p>
          <h1 className="text-3xl font-bold mb-4">
            {score} van {questions.length} goed
          </h1>

          <div className="prose-custom space-y-4 text-foreground leading-relaxed mb-10">
            <p>
              Dit waren 3 voorbeeldvragen uit de volledige AI-geletterdheid toets.
              In het complete traject bevat de toets 12 vragen over alle onderwerpen:
              de EU AI Act, hoog-risico classificatie, menselijk toezicht, shadow AI,
              transparantie en kandidaatrechten.
            </p>
            <p>
              Wie slaagt voor de volledige toets ontvangt het Normelo certificaat —
              het bewijs dat jouw team voldoet aan de AI-geletterdheidsverplichting
              van Artikel 4.
            </p>
          </div>

          <div className="bg-surface rounded-lg border border-border p-8 mb-10">
            <h2 className="text-lg font-bold mb-3">
              Wat het volledige traject omvat
            </h2>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Training op maat voor jouw organisatie</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Toets en certificering per medewerker</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Compliance-documentatie die je kunt overleggen bij audits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Shadow AI beleid voor je organisatie</span>
              </li>
            </ul>
          </div>

          <Link
            href="/training"
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors no-underline"
          >
            Bekijk het volledige traject →
          </Link>

          <div className="flex justify-start mt-12 pt-8 border-t border-border">
            <Link
              href="/training/module-5"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              ← Module 5
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
            Preview — 3 voorbeeldvragen
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
