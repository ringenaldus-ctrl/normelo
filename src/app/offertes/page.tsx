"use client";

import { useCallback, useState } from "react";
import {
  GESPREK_STATUS_LABELS,
  formatEuro,
  type GesprekStatus,
  type Offerte,
  type OfferteGesprek,
  type OfferteRegel,
  type WhatsappBericht,
} from "@/lib/offertes";

type GesprekListItem = OfferteGesprek & {
  offertes?: Pick<
    Offerte,
    "id" | "versie" | "status" | "titel" | "bedrag_centen" | "updated_at"
  >[];
};

const STATUS_KLEUR: Record<GesprekStatus, string> = {
  nieuw: "bg-amber-100 text-amber-800",
  in_behandeling: "bg-blue-100 text-blue-800",
  offerte_open: "bg-indigo-100 text-indigo-800",
  wijziging_gevraagd: "bg-orange-100 text-orange-900",
  akkoord: "bg-emerald-100 text-emerald-800",
  bevestigd: "bg-green-100 text-green-900",
  geannuleerd: "bg-gray-100 text-gray-600",
};

function euroNaarCenten(input: string): number {
  const normalized = input.replace(",", ".").replace(/[^\d.]/g, "");
  const n = Number(normalized);
  if (Number.isNaN(n)) return 0;
  return Math.round(n * 100);
}

export default function OffertesPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);
  const [gesprekken, setGesprekken] = useState<GesprekListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [gesprek, setGesprek] = useState<OfferteGesprek | null>(null);
  const [berichten, setBerichten] = useState<WhatsappBericht[]>([]);

  // Nieuw gesprek
  const [nieuwNaam, setNieuwNaam] = useState("");
  const [nieuwTel, setNieuwTel] = useState("");
  const [nieuwBericht, setNieuwBericht] = useState("");

  // Offerte form
  const [titel, setTitel] = useState("");
  const [omschrijving, setOmschrijving] = useState("");
  const [regels, setRegels] = useState<
    { omschrijving: string; aantal: string; eenheid: string; prijs: string }[]
  >([{ omschrijving: "", aantal: "1", eenheid: "uur", prijs: "" }]);
  const [simTekst, setSimTekst] = useState("Graag 10% korting");

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      "x-offertes-password": password,
    }),
    [password]
  );

  const loadLijst = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/offertes", { headers: headers() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Laden mislukt");
      setGesprekken(data.gesprekken || []);
      setDemo(Boolean(data.demo));
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      setError(err instanceof Error ? err.message : "Fout");
    } finally {
      setLoading(false);
    }
  }, [headers]);

  const loadDetail = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/offertes?gesprek_id=${id}`, {
          headers: headers(),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Laden mislukt");
        setSelectedId(id);
        setGesprek(data.gesprek);
        setBerichten(data.berichten || []);
        setDemo(Boolean(data.demo));

        const open = (data.gesprek.offertes || []).find(
          (o: Offerte) =>
            o.status === "wijziging_gevraagd" || o.status === "concept"
        );
        if (open) {
          setTitel(open.titel);
          setOmschrijving(open.omschrijving || "");
          if (open.offerte_regels?.length) {
            setRegels(
              open.offerte_regels.map((r: OfferteRegel) => ({
                omschrijving: r.omschrijving,
                aantal: String(r.aantal),
                eenheid: r.eenheid,
                prijs: (r.prijs_centen / 100).toFixed(2),
              }))
            );
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Fout");
      } finally {
        setLoading(false);
      }
    },
    [headers]
  );

  async function postAction(body: Record<string, unknown>) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/offertes", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Actie mislukt");
      await loadLijst();
      const id =
        (data.gesprek?.id as string | undefined) ||
        selectedId ||
        (body.gesprek_id as string | undefined);
      if (id) await loadDetail(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fout");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await loadLijst();
  }

  async function handleNieuwGesprek(e: React.FormEvent) {
    e.preventDefault();
    await postAction({
      action: "nieuw_gesprek",
      naam: nieuwNaam,
      telefoon: nieuwTel,
      bericht: nieuwBericht || "Handmatige aanvraag",
    });
    setNieuwNaam("");
    setNieuwTel("");
    setNieuwBericht("");
  }

  async function handleMaakEnVerstuur(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedId) return;
    const parsed: OfferteRegel[] = regels
      .filter((r) => r.omschrijving.trim() && r.prijs)
      .map((r) => ({
        omschrijving: r.omschrijving.trim(),
        aantal: Number(r.aantal.replace(",", ".")) || 1,
        eenheid: r.eenheid || "uur",
        prijs_centen: euroNaarCenten(r.prijs),
      }));
    if (!parsed.length) {
      setError("Voeg minstens één regel toe");
      return;
    }
    const created = await postAction({
      action: "maak_offerte",
      gesprek_id: selectedId,
      titel,
      omschrijving,
      regels: parsed,
    });
    await postAction({
      action: "verstuur",
      offerte_id: created.offerte.id,
    });
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <h1 className="text-2xl mb-2">WhatsApp offertes</h1>
        <p className="text-muted text-sm mb-6">
          Dashboard voor aanvragen, offertes en bevestigingen via WhatsApp.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            className="w-full border border-border rounded px-3 py-2"
            autoFocus
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-accent bg-accent text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Laden…" : "Inloggen"}
          </button>
        </form>
      </div>
    );
  }

  const actieveOfferte = (gesprek?.offertes || []).find((o) =>
    ["concept", "verstuurd", "wijziging_gevraagd", "geaccepteerd", "bevestigd"].includes(
      o.status
    )
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl mb-1">WhatsApp offertes</h1>
          <p className="text-sm text-muted">
            Aanvraag → offerte → akkoord/wijziging → bevestiging
          </p>
        </div>
        {demo && (
          <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 rounded px-3 py-1">
            Demomodus — WhatsApp-credentials ontbreken; berichten worden gelogd
          </span>
        )}
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Lijst */}
        <aside className="space-y-4">
          <form
            onSubmit={handleNieuwGesprek}
            className="border border-border rounded p-4 space-y-2 bg-surface"
          >
            <h2 className="text-sm font-semibold">Nieuwe aanvraag</h2>
            <input
              value={nieuwNaam}
              onChange={(e) => setNieuwNaam(e.target.value)}
              placeholder="Naam prospect"
              className="w-full border border-border rounded px-2 py-1.5 text-sm"
            />
            <input
              value={nieuwTel}
              onChange={(e) => setNieuwTel(e.target.value)}
              placeholder="06… of +31…"
              required
              className="w-full border border-border rounded px-2 py-1.5 text-sm"
            />
            <textarea
              value={nieuwBericht}
              onChange={(e) => setNieuwBericht(e.target.value)}
              placeholder="Klusomschrijving / WhatsApp-bericht"
              rows={2}
              className="w-full border border-border rounded px-2 py-1.5 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white text-sm rounded py-2"
            >
              Aanvraag starten
            </button>
          </form>

          <div className="border border-border rounded divide-y divide-border max-h-[70vh] overflow-auto">
            {gesprekken.length === 0 && (
              <p className="p-4 text-sm text-muted">Nog geen gesprekken.</p>
            )}
            {gesprekken.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => loadDetail(g.id)}
                className={`w-full text-left p-3 hover:bg-surface ${
                  selectedId === g.id ? "bg-surface" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-medium text-sm">
                    {g.prospect_naam || g.prospect_telefoon}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded ${STATUS_KLEUR[g.status]}`}
                  >
                    {GESPREK_STATUS_LABELS[g.status]}
                  </span>
                </div>
                <p className="text-xs text-muted truncate">
                  {g.laatste_bericht || "—"}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Detail */}
        <section>
          {!gesprek ? (
            <div className="border border-dashed border-border rounded p-10 text-center text-muted text-sm">
              Selecteer een gesprek of start een nieuwe aanvraag.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border border-border rounded p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h2 className="text-lg">
                    {gesprek.prospect_naam || "Prospect"} ·{" "}
                    {gesprek.prospect_telefoon}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded ${STATUS_KLEUR[gesprek.status]}`}
                  >
                    {GESPREK_STATUS_LABELS[gesprek.status]}
                  </span>
                </div>
                {gesprek.laatste_bericht && (
                  <p className="text-sm text-muted">{gesprek.laatste_bericht}</p>
                )}
                {actieveOfferte?.wijzigingsverzoek && (
                  <p className="mt-3 text-sm bg-orange-50 border border-orange-100 rounded px-3 py-2">
                    <strong>Wijzigingsverzoek:</strong>{" "}
                    {actieveOfferte.wijzigingsverzoek}
                  </p>
                )}
              </div>

              {/* Offerte maken / versturen */}
              {!["bevestigd", "geannuleerd", "akkoord"].includes(
                gesprek.status
              ) && (
                <form
                  onSubmit={handleMaakEnVerstuur}
                  className="border border-border rounded p-4 space-y-3"
                >
                  <h3 className="font-semibold text-sm">
                    {gesprek.status === "wijziging_gevraagd"
                      ? "Aangepaste offerte maken"
                      : "Offerte opstellen & versturen"}
                  </h3>
                  <input
                    value={titel}
                    onChange={(e) => setTitel(e.target.value)}
                    placeholder="Titel (bijv. Keuken kraan vervangen)"
                    required
                    className="w-full border border-border rounded px-3 py-2 text-sm"
                  />
                  <textarea
                    value={omschrijving}
                    onChange={(e) => setOmschrijving(e.target.value)}
                    placeholder="Toelichting voor de prospect"
                    rows={2}
                    className="w-full border border-border rounded px-3 py-2 text-sm"
                  />
                  <div className="space-y-2">
                    {regels.map((r, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-2 items-center"
                      >
                        <input
                          value={r.omschrijving}
                          onChange={(e) => {
                            const next = [...regels];
                            next[i] = { ...r, omschrijving: e.target.value };
                            setRegels(next);
                          }}
                          placeholder="Regel"
                          className="col-span-5 border border-border rounded px-2 py-1.5 text-sm"
                        />
                        <input
                          value={r.aantal}
                          onChange={(e) => {
                            const next = [...regels];
                            next[i] = { ...r, aantal: e.target.value };
                            setRegels(next);
                          }}
                          placeholder="Aantal"
                          className="col-span-2 border border-border rounded px-2 py-1.5 text-sm"
                        />
                        <input
                          value={r.eenheid}
                          onChange={(e) => {
                            const next = [...regels];
                            next[i] = { ...r, eenheid: e.target.value };
                            setRegels(next);
                          }}
                          placeholder="Eenheid"
                          className="col-span-2 border border-border rounded px-2 py-1.5 text-sm"
                        />
                        <input
                          value={r.prijs}
                          onChange={(e) => {
                            const next = [...regels];
                            next[i] = { ...r, prijs: e.target.value };
                            setRegels(next);
                          }}
                          placeholder="€ / eenheid"
                          className="col-span-3 border border-border rounded px-2 py-1.5 text-sm"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-sm text-accent"
                      onClick={() =>
                        setRegels([
                          ...regels,
                          {
                            omschrijving: "",
                            aantal: "1",
                            eenheid: "uur",
                            prijs: "",
                          },
                        ])
                      }
                    >
                      + Regel toevoegen
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-accent bg-accent text-white px-4 py-2 rounded text-sm"
                  >
                    {loading ? "Bezig…" : "Opslaan en via WhatsApp versturen"}
                  </button>
                </form>
              )}

              {/* Offertegeschiedenis */}
              {(gesprek.offertes || []).length > 0 && (
                <div className="border border-border rounded p-4">
                  <h3 className="font-semibold text-sm mb-3">Offertes</h3>
                  <ul className="space-y-2">
                    {(gesprek.offertes || []).map((o) => (
                      <li
                        key={o.id}
                        className="flex flex-wrap justify-between gap-2 text-sm border-b border-border pb-2 last:border-0"
                      >
                        <span>
                          v{o.versie} · {o.titel}{" "}
                          <span className="text-muted">({o.status})</span>
                        </span>
                        <span className="font-medium">
                          {formatEuro(o.bedrag_centen)} excl. btw
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Simulatie */}
              <div className="border border-border rounded p-4 bg-surface space-y-3">
                <h3 className="font-semibold text-sm">Simuleer prospect</h3>
                <p className="text-xs text-muted">
                  Test het proces zonder echte WhatsApp: akkoord, wijziging
                  vragen, of een tekstbericht sturen.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="text-sm bg-emerald-700 text-white px-3 py-1.5 rounded"
                    onClick={() =>
                      postAction({
                        action: "simuleer",
                        gesprek_id: gesprek.id,
                        actie: "akkoord",
                      })
                    }
                  >
                    Akkoord
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-orange-600 text-white px-3 py-1.5 rounded"
                    onClick={() =>
                      postAction({
                        action: "simuleer",
                        gesprek_id: gesprek.id,
                        actie: "wijziging",
                      })
                    }
                  >
                    Wijziging vragen
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    value={simTekst}
                    onChange={(e) => setSimTekst(e.target.value)}
                    className="flex-1 border border-border rounded px-2 py-1.5 text-sm"
                  />
                  <button
                    type="button"
                    className="text-sm bg-primary text-white px-3 py-1.5 rounded"
                    onClick={() =>
                      postAction({
                        action: "simuleer",
                        gesprek_id: gesprek.id,
                        actie: "tekst",
                        tekst: simTekst,
                      })
                    }
                  >
                    Stuur tekst
                  </button>
                </div>
              </div>

              {/* Chatlog */}
              <div className="border border-border rounded p-4">
                <h3 className="font-semibold text-sm mb-3">WhatsApp-log</h3>
                <div className="space-y-2 max-h-80 overflow-auto">
                  {berichten.length === 0 && (
                    <p className="text-sm text-muted">Nog geen berichten.</p>
                  )}
                  {berichten.map((b) => (
                    <div
                      key={b.id}
                      className={`text-sm rounded px-3 py-2 ${
                        b.richting === "uit"
                          ? "bg-blue-50 ml-8"
                          : "bg-gray-50 mr-8"
                      }`}
                    >
                      <div className="text-[10px] text-muted mb-1">
                        {b.richting === "uit" ? "Jij" : "Prospect"} · {b.type} ·{" "}
                        {new Date(b.created_at).toLocaleString("nl-NL")}
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-sm">
                        {b.inhoud}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
