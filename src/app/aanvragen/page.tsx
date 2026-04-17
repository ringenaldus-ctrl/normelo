"use client";

import { useState } from "react";
import Link from "next/link";

const AI_TOOLS = [
  "Carerix",
  "Bullhorn / Connexys",
  "Mysolution",
  "Byner",
  "ChatGPT / Copilot",
  "Anders",
];

export default function Aanvragen() {
  const [form, setForm] = useState({
    naam: "",
    organisatie: "",
    email: "",
    telefoon: "",
    teamgrootte: "",
    aiTools: [] as string[],
    opmerkingen: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function toggleTool(tool: string) {
    setForm((prev) => ({
      ...prev,
      aiTools: prev.aiTools.includes(tool)
        ? prev.aiTools.filter((t) => t !== tool)
        : [...prev.aiTools, tool],
    }));
  }

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
          opmerkingen: [
            form.aiTools.length > 0
              ? `AI-tools: ${form.aiTools.join(", ")}`
              : "",
            form.opmerkingen,
          ]
            .filter(Boolean)
            .join("\n"),
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

  if (status === "sent") {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <p className="text-2xl font-bold text-green-700 mb-3">Bedankt voor je aanvraag</p>
        <p className="text-foreground leading-relaxed mb-6">
          We nemen dezelfde werkdag nog contact op om het traject te bespreken
          en af te stemmen op jouw bureau.
        </p>
        <Link
          href="/"
          className="text-accent font-medium no-underline hover:underline"
        >
          ← Terug naar de homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid gap-10 md:grid-cols-5">
        {/* Formulier — neemt 3/5 kolommen */}
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold leading-tight mb-2">Plan een kennismaking</h1>
          <p className="text-muted mb-6">
            Vul je gegevens in — we nemen dezelfde werkdag nog contact op. Geen verplichtingen.
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

            {/* AI-tools checkboxes */}
            <div>
              <label className="text-xs font-medium text-muted mb-2 block">
                Welke AI-tools gebruikt jullie bureau? (optioneel)
              </label>
              <div className="flex flex-wrap gap-2">
                {AI_TOOLS.map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleTool(tool)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
                      form.aiTools.includes(tool)
                        ? "bg-accent text-white border-accent"
                        : "bg-white text-foreground border-border hover:border-accent"
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted mb-1 block">Opmerkingen (optioneel)</label>
              <textarea
                value={form.opmerkingen}
                onChange={(e) => setForm({ ...form, opmerkingen: e.target.value })}
                placeholder="bijv. hoeveel vestigingen, specifieke vragen, of wanneer jullie willen starten"
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-accent resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer text-lg"
            >
              {status === "sending" ? "Verzenden..." : "Plan een gesprek"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-600 mt-1">
                Er ging iets mis. Probeer het opnieuw.
              </p>
            )}
            <p className="text-xs text-muted mt-2">
              We gebruiken je gegevens alleen om contact met je op te nemen over het pakket.
              Lees hoe we ermee omgaan in onze{" "}
              <Link href="/privacy" className="text-accent hover:underline">
                privacyverklaring
              </Link>
              .
            </p>
          </form>
        </div>

        {/* Compacte samenvatting — neemt 2/5 kolommen */}
        <aside className="md:col-span-2">
          <div className="rounded-xl p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white md:sticky md:top-8">
            <p className="text-sm font-medium text-orange-300 mb-3 tracking-wide uppercase">Het pakket</p>
            <p className="text-sm text-gray-300 mb-5 leading-relaxed">
              Richtprijs wordt in het kennismakingsgesprek toegelicht — afhankelijk van je
              teamgrootte en het aantal AI-systemen dat je gebruikt.
            </p>
            <div className="space-y-2.5 text-sm text-gray-300">
              <p>✓ Inventarisatie van al je AI-systemen</p>
              <p>✓ Ingevuld AI-register conform de wet</p>
              <p>✓ AI-beleid op maat voor jouw bureau</p>
              <p>✓ Teamtraining voor al je medewerkers</p>
              <p>✓ Toets en deelnamebewijs per persoon</p>
              <p>✓ Auditklaar dossier</p>
            </div>
            <p className="mt-5 text-[11px] text-gray-400 italic leading-relaxed">
              Inspanningsverbintenis. Normelo is geen aangemelde instantie onder de EU AI Act;
              het deelnamebewijs is een privaat attest, geen EU-conformiteitscertificering.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
