"use client";

import { useState, useCallback } from "react";

interface Contact {
  id: string;
  prospect_id: string;
  naam: string;
  functie: string | null;
  linkedin_url: string | null;
  email: string | null;
  telefoon: string | null;
  notities: string | null;
  created_at: string;
}

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
  prospect_contacten: Contact[];
}

interface MagicLink {
  id: string;
  url: string;
  expiresAt: string;
  usedAt: string | null;
}

interface Registratie {
  id: number;
  email: string;
  naam: string | null;
  organisatie: string | null;
  rol: string | null;
  bron: string | null;
  telefoon: string | null;
  created_at: string;
  magicLink: MagicLink | null;
}

const ROL_LABELS: Record<string, string> = {
  intercedent: "Recruiter / Intercedent",
  hiringManager: "Accountmanager",
  hrCompliance: "HR / Compliance",
  directie: "Directie / Eigenaar",
};

const STATUSSEN = [
  { id: "nieuw", label: "Nieuw", kleur: "bg-gray-100 text-gray-700" },
  { id: "linkedin_verstuurd", label: "LinkedIn verstuurd", kleur: "bg-blue-50 text-blue-700" },
  { id: "geconnect", label: "Geconnect", kleur: "bg-indigo-50 text-indigo-700" },
  { id: "bericht_gestuurd", label: "Bericht gestuurd", kleur: "bg-purple-50 text-purple-700" },
  { id: "quickscan_gedaan", label: "Quick Scan gedaan", kleur: "bg-amber-50 text-amber-700" },
  { id: "gesprek_gehad", label: "Gesprek gehad", kleur: "bg-emerald-50 text-emerald-700" },
  { id: "klant", label: "Klant", kleur: "bg-green-100 text-green-800" },
];

// Statussen die als "actief sales proces" tellen
const OPPORTUNITY_STATUSSEN = ["bericht_gestuurd", "quickscan_gedaan", "gesprek_gehad"];

const ATS_LABELS: Record<string, string> = {
  carerix: "Carerix",
  mysolution: "Mysolution",
  bullhorn: "Bullhorn",
  byner: "Byner",
};

type SortField = "bedrijf" | "updated_at" | "status";
type SortDir = "asc" | "desc";

type Tab = "registraties" | "opportunities";

export default function CRM() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [registraties, setRegistraties] = useState<Registratie[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("registraties");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<string>("alle");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("bedrijf");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Contact management
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [contactProspectId, setContactProspectId] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    naam: "",
    functie: "",
    linkedin_url: "",
    email: "",
    telefoon: "",
    notities: "",
  });

  const [form, setForm] = useState({
    bedrijf: "",
    ats_systeem: "",
    status: "nieuw",
    notities: "",
    bron: "",
  });

  const headers = useCallback(() => ({
    "Content-Type": "application/json",
    "x-crm-password": password,
  }), [password]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [prospectsRes, registratiesRes] = await Promise.all([
        fetch("/api/crm", { headers: headers() }),
        fetch("/api/crm?type=registraties", { headers: headers() }),
      ]);
      if (prospectsRes.ok) {
        const data = await prospectsRes.json();
        setProspects(data);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      if (registratiesRes.ok) {
        const regData = await registratiesRes.json();
        setRegistraties(regData);
      }
    } catch {
      setAuthenticated(false);
    }
    setLoading(false);
  }, [headers]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await loadData();
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
    loadData();
  }

  async function updateStatus(id: string, newStatus: string) {
    await fetch("/api/crm", {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({ id, status: newStatus }),
    });
    loadData();
  }

  async function deleteProspect(id: string) {
    if (!confirm("Weet je zeker dat je dit bedrijf en alle contacten wilt verwijderen?")) return;
    await fetch(`/api/crm?id=${id}`, { method: "DELETE", headers: headers() });
    loadData();
  }

  function startEdit(p: Prospect) {
    setForm({
      bedrijf: p.bedrijf,
      ats_systeem: p.ats_systeem || "",
      status: p.status,
      notities: p.notities || "",
      bron: p.bron || "",
    });
    setEditingId(p.id);
    setShowAdd(true);
  }

  function resetForm() {
    setForm({ bedrijf: "", ats_systeem: "", status: "nieuw", notities: "", bron: "" });
    setEditingId(null);
    setShowAdd(false);
  }

  // Contact functions
  async function saveContact(e: React.FormEvent) {
    e.preventDefault();
    if (!contactForm.naam.trim()) return;

    if (editingContactId) {
      await fetch("/api/crm/contacten", {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ id: editingContactId, ...contactForm }),
      });
    } else {
      await fetch("/api/crm/contacten", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ prospect_id: contactProspectId, ...contactForm }),
      });
    }
    resetContactForm();
    loadData();
  }

  async function deleteContact(id: string) {
    if (!confirm("Contact verwijderen?")) return;
    await fetch(`/api/crm/contacten?id=${id}`, { method: "DELETE", headers: headers() });
    loadData();
  }

  function startAddContact(prospectId: string) {
    setContactProspectId(prospectId);
    setEditingContactId(null);
    setContactForm({ naam: "", functie: "", linkedin_url: "", email: "", telefoon: "", notities: "" });
    setShowContactModal(true);
  }

  function startEditContact(c: Contact) {
    setContactProspectId(c.prospect_id);
    setEditingContactId(c.id);
    setContactForm({
      naam: c.naam,
      functie: c.functie || "",
      linkedin_url: c.linkedin_url || "",
      email: c.email || "",
      telefoon: c.telefoon || "",
      notities: c.notities || "",
    });
    setShowContactModal(true);
  }

  function resetContactForm() {
    setContactForm({ naam: "", functie: "", linkedin_url: "", email: "", telefoon: "", notities: "" });
    setEditingContactId(null);
    setContactProspectId(null);
    setShowContactModal(false);
  }

  // Delete registratie
  async function deleteRegistratie(id: string) {
    if (!confirm("Registratie verwijderen?")) return;
    await fetch(`/api/crm?id=${id}&type=registratie`, { method: "DELETE", headers: headers() });
    loadData();
  }

  // Update registratie
  async function updateRegistratie(id: string, updates: { naam?: string; email?: string; rol?: string }) {
    await fetch("/api/crm", {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({ id, type: "registratie", ...updates }),
    });
    loadData();
  }

  // Convert registratie to opportunity (prospect with bericht_gestuurd status)
  async function convertRegistratie(reg: Registratie) {
    const contactNaam = reg.naam || reg.email.split("@")[0]
      .replace(/[._-]/g, " ")
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

    const bedrijf = reg.organisatie?.trim() ||
      (() => {
        const domain = reg.email.split("@")[1] || "";
        const name = domain.replace(/\.\w+$/, "");
        return name.charAt(0).toUpperCase() + name.slice(1);
      })();

    const rolLabel = reg.rol ? (ROL_LABELS[reg.rol] || reg.rol) : "—";
    const notities = `Training-registratie op ${new Date(reg.created_at).toLocaleDateString("nl-NL")}\nRol: ${rolLabel}`;

    const res = await fetch("/api/crm", {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        bedrijf,
        ats_systeem: "",
        status: "bericht_gestuurd",
        notities,
        bron: "Training registratie",
        email: reg.email,
      }),
    });
    if (res.ok) {
      const prospect = await res.json();
      // Contactpersoon aanmaken
      await fetch("/api/crm/contacten", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          prospect_id: prospect.id,
          naam: contactNaam,
          email: reg.email,
          functie: rolLabel !== "—" ? rolLabel : "",
          telefoon: reg.telefoon || "",
        }),
      });
      await loadData();
      setTab("opportunities");
    }
  }

  // Delete magic link
  async function deleteMagicLink(magicLinkId: string) {
    if (!confirm("Magic link verwijderen? De gebruiker kan dan niet meer inloggen via deze link.")) return;
    await fetch(`/api/crm?id=${magicLinkId}&type=magic_link`, { method: "DELETE", headers: headers() });
    loadData();
  }

  // Sorting
  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  function sortIndicator(field: SortField) {
    if (sortField !== field) return "";
    return sortDir === "asc" ? " ↑" : " ↓";
  }

  // Filter + sort for opportunities
  const filtered = prospects
    .filter((p) => {
      if (!OPPORTUNITY_STATUSSEN.includes(p.status)) return false;
      if (filter !== "alle" && p.ats_systeem !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        const contactMatch = (p.prospect_contacten || []).some(
          (c) => c.naam.toLowerCase().includes(q) || (c.email || "").toLowerCase().includes(q)
        );
        return (
          p.bedrijf.toLowerCase().includes(q) ||
          (p.notities || "").toLowerCase().includes(q) ||
          contactMatch
        );
      }
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === "bedrijf") {
        cmp = a.bedrijf.localeCompare(b.bedrijf, "nl");
      } else if (sortField === "updated_at") {
        cmp = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      } else if (sortField === "status") {
        const ai = STATUSSEN.findIndex((s) => s.id === a.status);
        const bi = STATUSSEN.findIndex((s) => s.id === b.status);
        cmp = ai - bi;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

  const opportunityCount = prospects.filter((p) => OPPORTUNITY_STATUSSEN.includes(p.status)).length;

  // Filter registraties by search
  const filteredRegistraties = registraties.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.email.toLowerCase().includes(q) ||
      (r.naam || "").toLowerCase().includes(q) ||
      (r.organisatie || "").toLowerCase().includes(q)
    );
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
            <span className="text-sm text-gray-400">
              {tab === "registraties"
                ? `${registraties.length} registraties`
                : `${opportunityCount} opportunities`}
            </span>
          </div>
          {tab === "opportunities" && (
            <button
              onClick={() => { resetForm(); setShowAdd(true); }}
              className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              + Bedrijf
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-0 border-b border-gray-100">
          <button
            onClick={() => setTab("registraties")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              tab === "registraties"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Registraties
            {registraties.length > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                tab === "registraties" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>
                {registraties.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("opportunities")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              tab === "opportunities"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Opportunities
            {opportunityCount > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                tab === "opportunities" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500"
              }`}>
                {opportunityCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tab === "registraties" ? "Zoek op naam, e-mail of organisatie..." : "Zoek op bedrijf, contact of notities..."}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 w-64"
          />
          {tab === "opportunities" && (
            <>
              <div className="flex items-center gap-1 ml-auto text-xs text-gray-400">
                <span>Sorteer:</span>
                <button onClick={() => toggleSort("bedrijf")} className={`px-2 py-1 rounded cursor-pointer ${sortField === "bedrijf" ? "bg-gray-200 text-gray-700 font-medium" : "hover:bg-gray-100"}`}>
                  Bedrijf{sortIndicator("bedrijf")}
                </button>
                <button onClick={() => toggleSort("status")} className={`px-2 py-1 rounded cursor-pointer ${sortField === "status" ? "bg-gray-200 text-gray-700 font-medium" : "hover:bg-gray-100"}`}>
                  Status{sortIndicator("status")}
                </button>
                <button onClick={() => toggleSort("updated_at")} className={`px-2 py-1 rounded cursor-pointer ${sortField === "updated_at" ? "bg-gray-200 text-gray-700 font-medium" : "hover:bg-gray-100"}`}>
                  Datum{sortIndicator("updated_at")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Prospect Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={saveProspect} className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold mb-4">
              {editingId ? "Bedrijf bewerken" : "Nieuw bedrijf"}
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-500 mb-1 block">Bedrijfsnaam *</label>
                <input
                  type="text"
                  value={form.bedrijf}
                  onChange={(e) => setForm({ ...form, bedrijf: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  required
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

            {/* Contacten sectie bij bewerken */}
            {editingId && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Contactpersonen</h3>
                  <button
                    type="button"
                    onClick={() => startAddContact(editingId)}
                    className="text-xs px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium"
                  >
                    + Contact
                  </button>
                </div>
                {(() => {
                  const p = prospects.find((x) => x.id === editingId);
                  const contacten = p?.prospect_contacten || [];
                  if (contacten.length === 0) {
                    return <p className="text-xs text-gray-400 py-2">Nog geen contactpersonen toegevoegd</p>;
                  }
                  return (
                    <div className="space-y-2">
                      {contacten.map((c) => (
                        <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                          <div>
                            <span className="text-sm font-medium text-gray-800">{c.naam}</span>
                            {c.functie && <span className="text-xs text-gray-500 ml-2">({c.functie})</span>}
                            {c.email && <span className="text-xs text-gray-400 ml-2">{c.email}</span>}
                            {c.linkedin_url && (
                              <a href={c.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 ml-2 hover:underline" onClick={(e) => e.stopPropagation()}>
                                LI
                              </a>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <button type="button" onClick={() => startEditContact(c)} className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer px-1">Bewerk</button>
                            <button type="button" onClick={() => deleteContact(c.id)} className="text-xs text-gray-300 hover:text-red-600 cursor-pointer px-1">×</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

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

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <form onSubmit={saveContact} className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">
              {editingContactId ? "Contact bewerken" : "Nieuw contact"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Naam *</label>
                <input
                  type="text"
                  value={contactForm.naam}
                  onChange={(e) => setContactForm({ ...contactForm, naam: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  required
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Functie</label>
                  <input
                    type="text"
                    value={contactForm.functie}
                    onChange={(e) => setContactForm({ ...contactForm, functie: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">E-mail</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">LinkedIn URL</label>
                  <input
                    type="url"
                    value={contactForm.linkedin_url}
                    onChange={(e) => setContactForm({ ...contactForm, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Telefoon</label>
                  <input
                    type="tel"
                    value={contactForm.telefoon}
                    onChange={(e) => setContactForm({ ...contactForm, telefoon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Notities</label>
                <textarea
                  value={contactForm.notities}
                  onChange={(e) => setContactForm({ ...contactForm, notities: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button type="submit" className="flex-1 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer">
                {editingContactId ? "Opslaan" : "Toevoegen"}
              </button>
              <button type="button" onClick={resetContactForm} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                Annuleren
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Registraties View */}
      {tab === "registraties" && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Naam</th>
                  <th className="px-4 py-3">E-mail</th>
                  <th className="px-4 py-3">Rol</th>
                  <th className="px-4 py-3">Magic link</th>
                  <th className="px-4 py-3">Datum</th>
                  <th className="px-4 py-3 w-32"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRegistraties.map((r) => {
                  const isAlreadyProspect = prospects.some(
                    (p) => p.email === r.email || (r.organisatie && p.bedrijf.toLowerCase() === r.organisatie.toLowerCase())
                  );
                  const ml = r.magicLink;
                  const isExpired = ml ? new Date(ml.expiresAt) < new Date() : false;
                  const isUsed = ml ? !!ml.usedAt : false;
                  return (
                    <tr key={r.id || r.email} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{r.naam || "—"}</td>
                      <td className="px-4 py-3 text-gray-700">
                        <a href={`mailto:${r.email}`} className="hover:text-orange-600 hover:underline">{r.email}</a>
                      </td>
                      <td className="px-4 py-3">
                        {r.rol ? (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                            {ROL_LABELS[r.rol] || r.rol}
                          </span>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {ml ? (
                          <div className="flex items-center gap-2">
                            {isUsed ? (
                              <span className="text-xs font-medium text-green-600">✓ Gebruikt</span>
                            ) : isExpired ? (
                              <span className="text-xs font-medium text-red-500">Verlopen</span>
                            ) : (
                              <a href={ml.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate max-w-[120px] inline-block">
                                Actief
                              </a>
                            )}
                            <button
                              onClick={() => deleteMagicLink(ml.id)}
                              className="text-xs text-gray-300 hover:text-red-600 cursor-pointer"
                              title="Magic link verwijderen"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(r.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center justify-end">
                          {isAlreadyProspect ? (
                            <span className="text-xs text-green-600 font-medium">✓ Opportunity</span>
                          ) : (
                            <button
                              onClick={() => convertRegistratie(r)}
                              className="text-xs px-3 py-1.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                              → Opportunity
                            </button>
                          )}
                          <button
                            onClick={() => {
                              const nieuwNaam = prompt("Naam:", r.naam || "");
                              if (nieuwNaam !== null) updateRegistratie(String(r.id), { naam: nieuwNaam });
                            }}
                            className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
                          >
                            Bewerk
                          </button>
                          <button
                            onClick={() => deleteRegistratie(String(r.id))}
                            className="text-xs text-gray-300 hover:text-red-600 cursor-pointer"
                          >
                            Verwijder
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredRegistraties.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">Nog geen registraties</div>
            )}
          </div>
        </div>
      )}

      {/* Opportunities View */}
      {tab === "opportunities" && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 cursor-pointer hover:text-gray-700 select-none" onClick={() => toggleSort("bedrijf")}>
                    Bedrijf{sortIndicator("bedrijf")}
                  </th>
                  <th className="px-4 py-3">Contacten</th>
                  <th className="px-4 py-3">ATS</th>
                  <th className="px-4 py-3 cursor-pointer hover:text-gray-700 select-none" onClick={() => toggleSort("status")}>
                    Status{sortIndicator("status")}
                  </th>
                  <th className="px-4 py-3">Notities</th>
                  <th className="px-4 py-3 w-28"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{p.bedrijf}</span>
                    </td>
                    <td className="px-4 py-3">
                      {(p.prospect_contacten || []).length > 0 ? (
                        <div className="space-y-0.5">
                          {p.prospect_contacten.map((c) => (
                            <div key={c.id} className="flex items-center gap-1">
                              <span className="text-xs text-gray-700">{c.naam}</span>
                              {c.functie && <span className="text-xs text-gray-400">({c.functie})</span>}
                              {c.linkedin_url && (
                                <a href={c.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">LI</a>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
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
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(p)} className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer">Bewerk</button>
                        <button onClick={() => startAddContact(p.id)} className="text-xs text-gray-400 hover:text-blue-600 cursor-pointer">+Contact</button>
                        <button onClick={() => deleteProspect(p.id)} className="text-xs text-gray-300 hover:text-red-600 cursor-pointer">Verwijder</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">Geen actieve opportunities</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
