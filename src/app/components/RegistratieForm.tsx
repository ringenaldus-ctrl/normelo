"use client";

import { useState } from "react";
import { aanmelden } from "@/content/aanbod";

export default function RegistratieForm() {
  const [bedrijf, setBedrijf] = useState("");
  const [aantal, setAantal] = useState("");
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const aantalNummer = Number(aantal);
  const aantalGeldig = Number.isInteger(aantalNummer) && aantalNummer > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || !naam.trim() || !bedrijf.trim() || !aantalGeldig) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/wachtlijst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          naam: naam.trim(),
          organisatie: bedrijf.trim(),
          aantalMedewerkers: aantalNummer,
          bron: "gratis-aanmelden",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl p-6 border border-border text-center">
        <p className="font-semibold mb-2">Check je inbox</p>
        <p className="text-sm text-muted mb-1">
          We hebben een link gestuurd naar <strong>{email}</strong>.
        </p>
        <p className="text-sm text-muted">
          Klik op de link om het gratis platform te openen voor {bedrijf}.
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Geen e-mail? Check je spam-folder of{" "}
          <button onClick={() => setStatus("idle")} className="text-accent underline cursor-pointer">
            probeer opnieuw
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border border-border">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Bedrijfsnaam</span>
          <input
            type="text"
            value={bedrijf}
            onChange={(e) => setBedrijf(e.target.value)}
            required
            autoComplete="organization"
            className="w-full px-4 py-3 rounded-lg text-sm border border-border text-foreground focus:outline-none focus:border-accent"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Aantal medewerkers</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            value={aantal}
            onChange={(e) => setAantal(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg text-sm border border-border text-foreground focus:outline-none focus:border-accent"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Contactpersoon</span>
          <input
            type="text"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            required
            autoComplete="name"
            className="w-full px-4 py-3 rounded-lg text-sm border border-border text-foreground focus:outline-none focus:border-accent"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">E-mailadres van de contactpersoon</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-lg text-sm border border-border text-foreground focus:outline-none focus:border-accent"
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending" || !bedrijf.trim() || !naam.trim() || !aantalGeldig}
          className="w-full px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer"
        >
          {status === "sending" ? "Even geduld..." : aanmelden.label}
        </button>
        <p className="text-xs text-center text-muted">{aanmelden.toelichting}</p>
        <p className="text-xs text-center text-gray-400">
          Nu gratis. Je e-mail gebruiken we alleen voor deze aanmelding.
        </p>
        {status === "error" && (
          <p className="text-sm text-red-600 text-center">Er ging iets mis. Probeer het opnieuw.</p>
        )}
      </form>
    </div>
  );
}
