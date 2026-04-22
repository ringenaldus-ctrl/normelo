"use client";

import { useState } from "react";

export default function RegistratieForm() {
  const [form, setForm] = useState({ naam: "", email: "", organisatie: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.email.includes("@")) return;
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
        }),
      });
      if (res.ok) {
        setStatus("sent");
        // Redirect naar de training na succesvolle registratie
        window.location.href = "https://hireai-certified.vercel.app/";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl p-6 bg-white/10 backdrop-blur text-center">
        <p className="text-white font-semibold mb-2">Je wordt doorgestuurd naar de training...</p>
        <p className="text-sm text-gray-300">
          Niet automatisch doorgestuurd?{" "}
          <a href="https://hireai-certified.vercel.app/" className="text-accent underline">
            Klik hier
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 bg-white/10 backdrop-blur">
      <p className="text-sm font-medium text-orange-300 mb-3 tracking-wide uppercase">Gratis training</p>
      <p className="text-white font-semibold text-lg mb-4">Start direct met leren</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={form.naam}
          onChange={(e) => setForm({ ...form, naam: e.target.value })}
          placeholder="Jouw naam"
          className="w-full px-4 py-3 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent"
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="E-mailadres"
          required
          className="w-full px-4 py-3 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent"
        />
        <input
          type="text"
          value={form.organisatie}
          onChange={(e) => setForm({ ...form, organisatie: e.target.value })}
          placeholder="Naam uitzendbureau (optioneel)"
          className="w-full px-4 py-3 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer"
        >
          {status === "sending" ? "Even geduld..." : "Start de gratis training →"}
        </button>
        {status === "error" && (
          <p className="text-sm text-red-400">Er ging iets mis. Probeer het opnieuw.</p>
        )}
      </form>
    </div>
  );
}
