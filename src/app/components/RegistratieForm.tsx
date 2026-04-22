"use client";

import { useState } from "react";

const ROLLEN = [
  { id: "intercedent", label: "Recruiter / Intercedent", desc: "Je werkt dagelijks met ATS, matching en CV-screening" },
  { id: "hiringManager", label: "Accountmanager", desc: "Je stuurt recruiters aan en houdt toezicht op AI-gebruik" },
  { id: "hrCompliance", label: "HR / Compliance", desc: "Je bent verantwoordelijk voor beleid en naleving" },
  { id: "directie", label: "Directie / Eigenaar", desc: "Je bent eindverantwoordelijk voor compliance" },
];

export default function RegistratieForm() {
  const [form, setForm] = useState({ naam: "", email: "", organisatie: "", rol: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.email.includes("@") || !form.rol) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/wachtlijst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          bron: "training-registratie",
          naam: form.naam,
          organisatie: form.organisatie,
          rol: form.rol,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        window.location.href = `https://hireai-certified.vercel.app/?rol=${form.rol}`;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl p-6 border border-border text-center">
        <p className="font-semibold mb-2">Je wordt doorgestuurd naar de training...</p>
        <p className="text-sm text-muted">
          Niet automatisch doorgestuurd?{" "}
          <a href={`https://hireai-certified.vercel.app/?rol=${form.rol}`} className="text-accent underline">
            Klik hier
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border border-border">
      <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">Gratis training</p>
      <p className="font-semibold text-lg mb-4">Start direct met leren</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={form.naam}
          onChange={(e) => setForm({ ...form, naam: e.target.value })}
          placeholder="Jouw naam"
          className="w-full px-4 py-3 rounded-lg text-sm border border-border text-foreground placeholder-gray-400 focus:outline-none focus:border-accent"
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="E-mailadres"
          required
          className="w-full px-4 py-3 rounded-lg text-sm border border-border text-foreground placeholder-gray-400 focus:outline-none focus:border-accent"
        />
        <input
          type="text"
          value={form.organisatie}
          onChange={(e) => setForm({ ...form, organisatie: e.target.value })}
          placeholder="Naam uitzendbureau (optioneel)"
          className="w-full px-4 py-3 rounded-lg text-sm border border-border text-foreground placeholder-gray-400 focus:outline-none focus:border-accent"
        />

        {/* Rolkeuze */}
        <div>
          <p className="text-xs text-muted mb-2">Wat is jouw rol?</p>
          <div className="grid grid-cols-2 gap-2">
            {ROLLEN.map((rol) => (
              <button
                key={rol.id}
                type="button"
                onClick={() => setForm({ ...form, rol: rol.id })}
                className={`px-3 py-2.5 rounded-lg text-left text-sm border transition-colors cursor-pointer ${
                  form.rol === rol.id
                    ? "bg-accent/10 border-accent text-foreground"
                    : "border-border text-muted hover:border-gray-400"
                }`}
              >
                <span className="font-medium block">{rol.label}</span>
                <span className="text-xs text-muted block mt-0.5">{rol.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "sending" || !form.rol}
          className="w-full px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer"
        >
          {status === "sending" ? "Even geduld..." : "Start de gratis training →"}
        </button>
        {!form.rol && form.email && (
          <p className="text-xs text-accent text-center">Kies eerst je rol</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">Er ging iets mis. Probeer het opnieuw.</p>
        )}
      </form>
    </div>
  );
}
