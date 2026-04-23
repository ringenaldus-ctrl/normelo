"use client";

import { useState } from "react";

export default function RegistratieForm() {
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/wachtlijst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          bron: "training-registratie",
          rol: rol || null,
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
      <div className="rounded-xl p-6 border border-border text-center">
        <p className="text-2xl mb-2">📬</p>
        <p className="font-semibold mb-2">Check je inbox</p>
        <p className="text-sm text-muted mb-1">
          We hebben een link gestuurd naar <strong>{email}</strong>.
        </p>
        <p className="text-sm text-muted">
          Klik op de link in de e-mail om direct te starten met de training.
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Geen e-mail? Check je spam-folder of <button onClick={() => setStatus("idle")} className="text-accent underline cursor-pointer">probeer opnieuw</button>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border border-border">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Jouw e-mailadres"
          required
          className="w-full px-4 py-3 rounded-lg text-sm border border-border text-foreground placeholder-gray-400 focus:outline-none focus:border-accent"
        />
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          required
          className={`w-full px-4 py-3 rounded-lg text-sm border border-border focus:outline-none focus:border-accent cursor-pointer ${rol ? "text-foreground" : "text-muted"}`}
        >
          <option value="" disabled>Wat is je rol?</option>
          <option value="intercedent">Recruiter / Intercedent</option>
          <option value="hiringManager">Accountmanager</option>
          <option value="hrCompliance">HR / Compliance</option>
          <option value="directie">Directie / Eigenaar</option>
        </select>
        <button
          type="submit"
          disabled={status === "sending" || !rol}
          className="w-full px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer"
        >
          {status === "sending" ? "Even geduld..." : "Start de training →"}
        </button>
        <p className="text-xs text-center text-muted">
          4 modules, ~10 minuten per module. In je eigen tempo.
        </p>
        <p className="text-xs text-center text-gray-400">
          Je e-mail gebruiken we alleen voor deze training. Geen spam.
        </p>
        {status === "error" && (
          <p className="text-sm text-red-600 text-center">Er ging iets mis. Probeer het opnieuw.</p>
        )}
      </form>
    </div>
  );
}
