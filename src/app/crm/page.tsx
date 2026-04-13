"use client";

import { useState, useEffect, useCallback } from "react";

interface Prospect {
  id: string;
  bedrijf: string;
  contactpersoon: string | null;
  functie: string | null;
  ats_systeem: string | null;
  linkedin_url: string | null;
  email: string | null;
  telefoon: string | null;
  status: string;
  notities: string | null;
  bron: string | null;
  created_at: string;
  updated_at: string;
}

const STATUSSEN = [
  { id: "nieuw", label: "Nieuw", kleur: "bg-gray-100 text-gray-700" },
  { id: "linkedin_verstuurd", label: "LinkedIn verstuurd", kleur: "bg-blue-50 text-blue-700" },
  { id: "geconnect", label: "Geconnect", kleur: "bg-indigo-50 text-indigo-700" },
  { id: "bericht_gestuurd", label: "Bericht gestuurd", kleur: "bg-purple-50 text-purple-700" },
  { id: "quickscan_gedaan", label: "Quick Scan gedaan", kleur: "bg-amber-50 text-amber-700" },
  { id: "gesprek_gehad", label: "Gesprek gehad", kleur: "bg-emerald-50 text-emerald-700" },
  { id: "klant", label: "Klant", kleur: "bg-green-100 text-green-800" },
];

const ATS_LABELS: Record<string, string> = {
  carerix: "Carerix",
  mysolution: "Mysolution",
  bullhorn: "Bullhorn",
  byner: "Byner",
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUSSEN.find((x) => x.id === status);
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${s?.kleur || "bg-gray-100 text-gray-600"}`}>
      {s?.label || status}
    </span>
  );
}

export default function CRM() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"board" | "lijst">("board");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<string>("alle");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    bedrijf: "",
    contactpersoon: "",
    functie: "",
    ats_systeem: "",
    linkedin_url: "",
    email: "",
    telefoon: "",
    status: "nieuw",
    notities: "",
    bron: "",
  });

  const headers = useCallback(() => ({
    "Content-Type": "application/json",
    "x-crm-password": password,
  }), [password]);

  const loadProspects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crm", { headers: headers() });
      if (res.ok) {
        const data = await res.json();
        setProspects(data);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch {
      setAuthenticated(false);
    }
    setLoading(false);
  }, [headers]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await loadProspects();
  }

  async function saveProspect(e: React.FormEvent) {
    e.preventDefault();
    if (!form.bedrijf.trim()) return;

    if (editingId) {
      await fetch("/api/crm", {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch("/api/crm", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(form),
      });
    }
    resetForm();
    loadProspects();
  }

  async function updateStatus(id: string, newStatus: string) {
    await fetch("/api/crm", {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({ id, status: newStatus }),
    });
    loadProspects();
  }

  async function deleteProspect(id: string) {
    if (!confirm("Weet je zeker dat je deze prospect wilt verwijderen?")) return;
    await fetch(`/api/crm?id=${id}`, { method: "DELETE", headers: headers() });
    loadProspects();
  }

  function startEdit(p: Prospect) {
    setForm({
      bedrijf: p.bedrijf,
      contactpersoon: p.contactpersoon || "",
      functie: p.functie || "",
      ats_systeem: p.ats_systeem || "",
      linkedin_url: p.linkedin_url || "",
      email: p.email || "",
      telefoon: p.telefoon || "",
      status: p.status,
      notities: p.notities || "",
      bron: p.bron || "",
    });
    setEditingId(p.id);
    setShowAdd(true);
  }

  function resetForm() {
    setForm({ bedrijf: "", contactpersoon: "", functie: "", ats_systeem: "", linkedin_url: "", email: "", telefoon: "", status: "nieuw", notities: "", bron: "" });
    setEditingId(null);
    setShowAdd(false);
  }

  const filtered = prospects.filter((p) => {
    if (filter !== "alle" && p.ats_systeem !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.bedrijf.toLowerCase().includes(q) ||
        (p.contactpersoon || "").toLowerCase().includes(q) ||
        (p.notities || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Login screen
  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
          <h1 className="text-xl font-bold mb-1">Normelo CRM</h1>
          <p className="text-sm text-gray-500 mb-6">Voer je wachtwoord in</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 mb-4"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {loading ? "Laden..." : "Inloggen"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-gray-900">Normelo CRM</h1>
            <span className="text-sm text-gray-400">{prospects.length} prospects</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setView("board")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${view === "board" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
              >
                Board
              </button>
              <button
                onClick={() => setView("lijst")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${view === "lijst" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
              >
                Lijst
              </button>
            </div>
            <button
              onClick={() => { resetForm(); setShowAdd(true); }}
              className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              + Prospect
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 pb-3 flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek op bedrijf, contact of notities..."
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 w-64"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 cursor-pointer"
          >
            <option value="alle">Alle ATS</option>
            <option value="carerix">Carerix</option>
            <option value="mysolution">Mysolution</option>
            <option value="bullhorn">Bullhorn</option>
            <option value="byner">Byner</option>
          </select>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={saveProspect} className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold mb-4">
              {editingId ? "Prospect bewerken" : "Nieuwe prospect"}
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-500 mb-1 block">Bedrijf *</label>
                <input
                  type="text"
                  value={form.bedrijf}
                  onChange={(e) => setForm({ ...form, bedrijf: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Contactpersoon</label>
                <input
                  type="text"
                  value={form.contactpersoon}
                  onChange={(e) => setForm({ ...form, contactpersoon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Functie</label>
                <input
                  type="text"
                  value={form.functie}
                  onChange={(e) => setForm({ ...form, functie: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">ATS-systeem</label>
                <select
                  value={form.ats_systeem}
                  onChange={(e) => setForm({ ...form, ats_systeem: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 cursor-pointer"
                >
                  <option value="">Onbekend</option>
                  <option value="carerix">Carerix</option>
                  <option value="mysolution">Mysolution</option>
                  <option value="bullhorn">Bullhorn</option>
                  <option value="byner">Byner</option>
                  <option value="anders">Anders</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 cursor-pointer"
                >
                  {STATUSSEN.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">LinkedIn URL</label>
                <input
                  type="url"
                  value={form.linkedin_url}
                  onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">E-mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Telefoon</label>
                <input
                  type="tel"
                  value={form.telefoon}
                  onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Bron</label>
                <input
                  type="text"
                  value={form.bron}
                  onChange={(e) => setForm({ ...form, bron: e.target.value })}
                  placeholder="bijv. Carerix klantcase"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-500 mb-1 block">Notities</label>
                <textarea
                  value={form.notities}
                  onChange={(e) => setForm({ ...form, notities: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {editingId ? "Opslaan" : "Toevoegen"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Annuleren
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Board View */}
      {view === "board" && (
        <div className="max-w-7xl mx-auto p-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {STATUSSEN.map((status) => {
              const items = filtered.filter((p) => p.status === status.id);
              return (
                <div key={status.id} className="w-72 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <h3 className="text-sm font-semibold text-gray-700">{status.label}</h3>
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => startEdit(p)}
                      >
                        <p className="font-semibold text-sm text-gray-900 mb-1">{p.bedrijf}</p>
                        {p.contactpersoon && (
                          <p className="text-xs text-gray-600 mb-1">{p.contactpersoon}{p.functie ? ` — ${p.functie}` : ""}</p>
                        )}
                        {p.ats_systeem && (
                          <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-600 mb-1">
                            {ATS_LABELS[p.ats_systeem] || p.ats_systeem}
                          </span>
                        )}
                        {p.linkedin_url && (
                          <a
                            href={p.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-blue-500 hover:underline mt-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            LinkedIn profiel
                          </a>
                        )}
                        {p.notities && (
                          <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{p.notities}</p>
                        )}
                        {/* Quick status buttons */}
                        <div className="flex gap-1 mt-2 pt-2 border-t border-gray-100">
                          {STATUSSEN.map((s, i) => {
                            const currentIdx = STATUSSEN.findIndex((x) => x.id === p.status);
                            if (i !== currentIdx + 1) return null;
                            return (
                              <button
                                key={s.id}
                                onClick={(e) => { e.stopPropagation(); updateStatus(p.id, s.id); }}
                                className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                              >
                                → {s.label}
                              </button>
                            );
                          })}
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteProspect(p.id); }}
                            className="text-xs px-2 py-1 rounded hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer ml-auto text-gray-300"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                    {items.length === 0 && (
                      <div className="text-xs text-gray-300 text-center py-8 border border-dashed border-gray-200 rounded-lg">
                        Geen prospects
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {view === "lijst" && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Bedrijf</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">ATS</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Notities</th>
                  <th className="px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{p.bedrijf}</span>
                      {p.linkedin_url && (
                        <a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 text-xs hover:underline">
                          LI
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {p.contactpersoon || "—"}
                      {p.functie && <span className="text-gray-400 ml-1 text-xs">({p.functie})</span>}
                    </td>
                    <td className="px-4 py-3">
                      {p.ats_systeem ? (
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{ATS_LABELS[p.ats_systeem] || p.ats_systeem}</span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={p.status}
                        onChange={(e) => updateStatus(p.id, e.target.value)}
                        className="text-xs px-2 py-1 border border-gray-200 rounded cursor-pointer focus:outline-none focus:border-orange-400"
                      >
                        {STATUSSEN.map((s) => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 max-w-xs truncate">{p.notities || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => startEdit(p)} className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer">Bewerk</button>
                        <button onClick={() => deleteProspect(p.id)} className="text-xs text-gray-300 hover:text-red-600 cursor-pointer">×</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">Geen prospects gevonden</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
