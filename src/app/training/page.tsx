"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function Training() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "already" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/wachtlijst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bron: "training-pagina" }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(data.already_registered ? "already" : "sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Binnenkort beschikbaar</p>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          AI-geletterdheid training voor de uitzendbranche
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Artikel 4 van de EU AI Act verplicht organisaties om medewerkers die met AI werken
          een basisniveau van AI-geletterdheid te geven. Deze verplichting geldt sinds
          2 februari 2025. Normelo ontwikkelt een training specifiek voor recruiters,
          intercedenten en hiring managers in de uitzendbranche.
        </p>
      </section>

      {/* Wat je leert */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wat je leert</h2>
        <p className="text-foreground leading-relaxed mb-4">
          De training richt zich op de dagelijkse praktijk van de uitzendbranche. Geen
          juridische taal, maar concrete kennis die je direct kunt toepassen. Na de training
          weet je welke AI-systemen in jouw werk onder de EU AI Act vallen, hoe je verantwoord
          met ATS-systemen en matchingtools omgaat, en wanneer menselijk toezicht vereist is.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Daarnaast behandelen we shadow AI — het ongecontroleerd gebruik van tools als
          ChatGPT en Copilot door medewerkers. Je leert hoe je dit bespreekbaar maakt en
          welk beleid je kunt opstellen.
        </p>
        <p className="text-foreground leading-relaxed">
          De training sluit af met een toets. Bij een voldoende ontvang je het
          Normelo AI-geletterdheid certificaat, waarmee je kunt aantonen dat jouw team
          aan de verplichting van Artikel 4 voldoet.
        </p>
      </section>

      {/* Voor wie */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Voor wie</h2>
        <p className="text-foreground leading-relaxed mb-4">
          De training is ontwikkeld voor mensen in de uitzendbranche die dagelijks met
          AI-systemen werken of er beslissingen over nemen: recruiters die met ATS-systemen
          en matchingtools werken, intercedenten die kandidaten beoordelen en plaatsen,
          hiring managers die selectiebeslissingen nemen, en teamleiders en directieleden
          die verantwoordelijk zijn voor compliance.
        </p>
        <p className="text-foreground leading-relaxed">
          Er is geen technische voorkennis nodig. De training is geschreven voor mensen die
          AI-systemen gebruiken, niet voor mensen die ze bouwen.
        </p>
      </section>

      {/* Wachtlijst */}
      <section className="py-12 border-b border-border">
        <div className="rounded-lg p-8 bg-surface">
          {status === "sent" ? (
            <div>
              <p className="text-xl font-bold text-green-700 mb-2">Je staat op de wachtlijst</p>
              <p className="text-foreground leading-relaxed">
                We sturen je een e-mail zodra de training beschikbaar is. Geen spam, alleen
                dit ene bericht.
              </p>
            </div>
          ) : status === "already" ? (
            <div>
              <p className="text-xl font-bold text-accent mb-2">Je staat al op de wachtlijst</p>
              <p className="text-foreground leading-relaxed">
                Dit e-mailadres is al aangemeld. We sturen je een bericht zodra de training
                beschikbaar is.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">Schrijf je in voor de wachtlijst</h2>
              <p className="text-muted mb-6">
                De training is nog in ontwikkeling. Laat je e-mailadres achter en je hoort
                als eerste wanneer het zover is. Geen spam — alleen één bericht wanneer de
                training live gaat.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  required
                  className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-5 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer whitespace-nowrap"
                >
                  {status === "sending" ? "Aanmelden..." : "Aanmelden"}
                </button>
              </form>
              {status === "error" && (
                <p className="text-sm text-red-600 mt-2">
                  Er ging iets mis. Probeer het opnieuw.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Verder lezen */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Meer over de EU AI Act</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/uitzendbranche"
            className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">EU AI Act &amp; de Uitzendbranche</h3>
            <p className="text-sm text-muted leading-relaxed">Hoog-risico systemen, shadow AI en wat dit betekent voor jouw bureau</p>
          </Link>
          <Link
            href="/quick-scan"
            className="block p-5 border border-border rounded-lg hover:border-accent hover:shadow-sm transition-colors no-underline group"
          >
            <h3 className="text-base font-semibold mb-1 group-hover:text-accent">Quick Scan</h3>
            <p className="text-sm text-muted leading-relaxed">Ontdek in 60 seconden hoe compliant jouw uitzendbureau is</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
