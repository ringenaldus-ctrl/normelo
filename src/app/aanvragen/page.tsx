"use client";

import { useState } from "react";
import Link from "next/link";

export default function Aanvragen() {
  const [form, setForm] = useState({ naam: "", organisatie: "", email: "", telefoon: "", teamgrootte: "", opmerkingen: "" });
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
          bron: "pakket-aanvraag",
          naam: form.naam,
          organisatie: form.organisatie,
          telefoon: form.telefoon,
          teamgrootte: form.teamgrootte,
          opmerkingen: form.opmerkingen,
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
      <section className="py-16 border-b border-border">
        <h1 className="text-4xl font-bold leading-tight mb-4">
          EU AI Act compliance voor jouw bureau
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-6">
          Eén pakket, vast tarief, alles geregeld. Normelo maakt jouw uitzendbureau
          compliant — van inventarisatie tot certificaat.
        </p>

        <div className="rounded-xl p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold">€3.500</span>
            <span className="text-gray-400">per bureau</span>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <p>✓ Inventarisatie van al je AI-systemen</p>
            <p>✓ Ingevuld AI-register conform de wet</p>
            <p>✓ AI-beleid op maat voor jouw bureau</p>
            <p>✓ Teamtraining voor al je medewerkers</p>
            <p>✓ Toets en certificaat per persoon</p>
            <p>✓ Compleet compliance-dossier</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        {status === "sent" ? (
          <div className="rounded-lg p-8 bg-surface text-center">
            <p className="text-2xl font-bold text-green-700 mb-3">Bedankt voor je aanvraag</p>
            <p className="text-foreground leading-relaxed mb-6">
              We nemen binnen twee werkdagen contact op om het traject te bespreken
              en af te stemmen op jouw bureau.
            </p>
            <Link
              href="/"
              className="text-accent font-medium no-underline hover:underline"
            >
              ← Terug naar de homepage
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">Plan een kennismaking</h2>
            <p className="text-muted mb-6">
              Vul je gegevens in en we nemen contact op om alles door te spreken.
              Geen verplichtingen.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Jouw naam</label>
                  <input
                    type="text"
                    value={form.naam}
                    onChange={(e) => setForm({ ...form, naam: e.target.value })}
                    placeholder="Jouw naam"
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Naam uitzendbureau *</label>
                  <input
                    type="text"
                    value={form.organisatie}
                    onChange={(e) => setForm({ ...form, organisatie: e.target.value })}
                    placeholder="Naam bureau"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">E-mailadres *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jouw@bureau.nl"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Telefoonnummer</label>
                  <input
                    type="tel"
                    value={form.telefoon}
                    onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
                    placeholder="06-..."
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">Aantal medewerkers (optioneel)</label>
                <input
                  type="text"
                  value={form.teamgrootte}
                  onChange={(e) => setForm({ ...form, teamgrootte: e.target.value })}
                  placeholder="bijv. 12"
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">Opmerkingen (optioneel)</label>
                <textarea
                  value={form.opmerkingen}
                  onChange={(e) => setForm({ ...form, opmerkingen: e.target.value })}
                  placeholder="Heb je specifieke vragen of opmerkingen?"
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer text-lg"
              >
                {status === "sending" ? "Verzenden..." : "Plan een kennismaking"}
              </button>
              <p className="text-xs text-muted text-center">
                We nemen binnen twee werkdagen contact op. Geen verplichtingen.
              </p>
            </form>
            {status === "error" && (
              <p className="text-sm text-red-600 mt-2">
                Er ging iets mis. Probeer het opnieuw.
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
