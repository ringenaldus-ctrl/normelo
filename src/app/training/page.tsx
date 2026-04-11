"use client";

import { useState } from "react";
import Link from "next/link";

export default function Training() {
  const [form, setForm] = useState({ naam: "", organisatie: "", email: "", telefoon: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.email.includes("@") || !form.organisatie) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/wachtlijst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          bron: "training-aanvraag",
          naam: form.naam,
          organisatie: form.organisatie,
          telefoon: form.telefoon,
        }),
      });
      if (res.ok) {
        setStatus("sent");
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
        <div className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-red-50 text-red-700 rounded-md border border-red-200">
          Artikel 4 — verplicht sinds 2 februari 2025
        </div>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          AI-geletterdheid training voor de uitzendbranche
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-4">
          De EU AI Act verplicht organisaties om medewerkers die met AI-systemen werken
          een basisniveau van AI-geletterdheid te geven. Voor uitzendbureaus die dagelijks
          met ATS-systemen, matchingtools en CV-screening werken, is dit geen optie — het
          is een wettelijke verplichting die nu al geldt.
        </p>
        <p className="text-lg text-foreground leading-relaxed font-medium">
          Normelo biedt een compleet traject waarmee jouw team compliant wordt én je het kunt bewijzen.
        </p>
      </section>

      {/* Het probleem */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Waarom dit niet kan wachten</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Sinds 2 februari 2025 geldt Artikel 4 van de EU AI Act. Elke organisatie die
          AI-systemen inzet of ontwikkelt, moet zorgen dat medewerkers voldoende kennis
          hebben van AI. Dit is geen richtlijn — het is wet.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Uitzendbureaus lopen extra risico. Jullie werken dagelijks met AI-systemen die
          onder de hoog-risico categorie vallen: ATS-systemen die cv&apos;s ranken,
          matchingtools die kandidaten koppelen aan vacatures, chatbots die
          kandidaat-screening doen. Recruiters en intercedenten moeten begrijpen hoe deze
          systemen werken en wanneer menselijk ingrijpen nodig is.
        </p>
        <p className="text-foreground leading-relaxed">
          De boetes bij het niet naleven van de EU AI Act lopen op tot €35 miljoen
          of 7% van de wereldwijde jaaromzet. Maar het echte risico is reputatieschade
          wanneer een kandidaat ontdekt dat AI zonder waarborg over zijn toekomst beslist.
        </p>
      </section>

      {/* Wat je krijgt */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-6">Wat het traject omvat</h2>

        <div className="space-y-6">
          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">Online training — op eigen tempo</p>
            <p className="text-muted text-sm leading-relaxed">
              Modules specifiek voor de uitzendbranche. Geen juridische taal, maar
              concrete kennis over de AI-systemen die jouw team dagelijks gebruikt.
              Elke medewerker doorloopt de training op een moment dat uitkomt.
            </p>
          </div>

          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">Toets en certificering</p>
            <p className="text-muted text-sm leading-relaxed">
              Elke deelnemer sluit af met een toets. Bij een voldoende ontvang je het
              Normelo AI-geletterdheid certificaat — het bewijs dat jouw team voldoet
              aan Artikel 4. Dit certificaat kun je tonen bij een audit of als een
              toezichthouder vraagt hoe je compliance hebt geborgd.
            </p>
          </div>

          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">Compliance-documentatie</p>
            <p className="text-muted text-sm leading-relaxed">
              Je ontvangt een compleet dossier: een overzicht van wie de training heeft
              gevolgd, wanneer het certificaat is behaald, en een beleidsdocument
              AI-geletterdheid dat je direct kunt opnemen in je kwaliteitssysteem.
            </p>
          </div>

          <div className="border-l-3 border-accent pl-5">
            <p className="font-semibold text-foreground mb-1">Shadow AI beleid</p>
            <p className="text-muted text-sm leading-relaxed">
              Medewerkers die zelf ChatGPT of Copilot gebruiken voor recruitmenttaken
              creëren onbewust hoog-risico situaties. Je krijgt een kant-en-klaar
              AI-beleid dat duidelijk maakt welke tools wel en niet zijn toegestaan.
            </p>
          </div>
        </div>
      </section>

      {/* Programma */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-6">Het programma</h2>

        <div className="space-y-4">
          <Link href="/training/module-1" className="block p-4 bg-surface rounded-lg hover:border-accent border border-transparent transition-colors no-underline group">
            <p className="text-sm text-accent font-medium mb-1">Module 1</p>
            <p className="font-semibold mb-1 group-hover:text-accent">De EU AI Act — wat het is en waarom het er is</p>
            <p className="text-sm text-muted">Wat de wet regelt, voor wie die geldt, en waarom uitzendbureaus extra aandacht moeten geven. Geen juridische taal — gewoon helder uitgelegd.</p>
          </Link>

          <Link href="/training/module-2" className="block p-4 bg-surface rounded-lg hover:border-accent border border-transparent transition-colors no-underline group">
            <p className="text-sm text-accent font-medium mb-1">Module 2</p>
            <p className="font-semibold mb-1 group-hover:text-accent">Hoog-risico AI in de uitzendbranche</p>
            <p className="text-sm text-muted">Welke systemen jullie dagelijks gebruiken die als hoog-risico worden aangemerkt: ATS, matchingtools, cv-screening, planningssoftware. Wat dit betekent en welke verplichtingen erbij horen.</p>
          </Link>

          <Link href="/training/module-3" className="block p-4 bg-surface rounded-lg hover:border-accent border border-transparent transition-colors no-underline group">
            <p className="text-sm text-accent font-medium mb-1">Module 3</p>
            <p className="font-semibold mb-1 group-hover:text-accent">Menselijk toezicht en besluitvorming</p>
            <p className="text-sm text-muted">Wanneer mag AI adviseren en wanneer moet een mens beslissen? Hoe je voorkomt dat kandidaten automatisch worden afgewezen zonder dat iemand meekijkt.</p>
          </Link>

          <Link href="/training/module-4" className="block p-4 bg-surface rounded-lg hover:border-accent border border-transparent transition-colors no-underline group">
            <p className="text-sm text-accent font-medium mb-1">Module 4</p>
            <p className="font-semibold mb-1 group-hover:text-accent">Shadow AI — het onzichtbare risico</p>
            <p className="text-sm text-muted">Wat er gebeurt als recruiters zelf ChatGPT gebruiken om cv&apos;s te beoordelen. Hoe je dit bespreekbaar maakt en welk beleid je nodig hebt.</p>
          </Link>

          <Link href="/training/module-5" className="block p-4 bg-surface rounded-lg hover:border-accent border border-transparent transition-colors no-underline group">
            <p className="text-sm text-accent font-medium mb-1">Module 5</p>
            <p className="font-semibold mb-1 group-hover:text-accent">Transparantie en kandidaatrechten</p>
            <p className="text-sm text-muted">Wanneer en hoe je kandidaten informeert over AI-gebruik. Wat je in vacatureteksten en het sollicitatieproces moet aanpassen.</p>
          </Link>

          <Link href="/training/module-6" className="block p-4 bg-surface rounded-lg hover:border-accent border border-transparent transition-colors no-underline group">
            <p className="text-sm text-accent font-medium mb-1">Module 6</p>
            <p className="font-semibold mb-1 group-hover:text-accent">Toets (preview)</p>
            <p className="text-sm text-muted">Test je kennis met 3 voorbeeldvragen. De volledige toets met certificering is onderdeel van het traject.</p>
          </Link>
        </div>
      </section>

      {/* Voor wie */}
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Voor wie</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Het traject is ontwikkeld voor uitzendbureaus — van kleine bureaus met 5
          medewerkers tot organisaties met tientallen vestigingen. De training is geschreven
          voor de mensen die dagelijks met AI-systemen werken: recruiters, intercedenten,
          hiring managers, teamleiders en directieleden.
        </p>
        <p className="text-foreground leading-relaxed">
          Er is geen technische voorkennis nodig. De training is gemaakt voor mensen die
          AI-systemen gebruiken, niet voor mensen die ze bouwen.
        </p>
      </section>

      {/* CTA */}
      <section className="py-12 border-b border-border">
        <div className="rounded-lg p-8 bg-surface">
          {status === "sent" ? (
            <div>
              <p className="text-xl font-bold text-green-700 mb-2">Bedankt voor je aanvraag</p>
              <p className="text-foreground leading-relaxed">
                We nemen binnen twee werkdagen contact met je op om het traject te
                bespreken en af te stemmen op jouw organisatie.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">Vraag het programma aan</h2>
              <p className="text-muted mb-6">
                Laat je gegevens achter en we nemen contact op om het traject te bespreken.
                Geen verplichtingen — we kijken samen of het past bij jouw organisatie.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    value={form.naam}
                    onChange={(e) => setForm({ ...form, naam: e.target.value })}
                    placeholder="Jouw naam"
                    className="px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                  <input
                    type="text"
                    value={form.organisatie}
                    onChange={(e) => setForm({ ...form, organisatie: e.target.value })}
                    placeholder="Naam uitzendbureau *"
                    required
                    className="px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="E-mailadres *"
                    required
                    className="px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                  <input
                    type="tel"
                    value={form.telefoon}
                    onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
                    placeholder="Telefoonnummer"
                    className="px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full px-5 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {status === "sending" ? "Verzenden..." : "Vraag het programma aan"}
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
