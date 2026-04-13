"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface AISystem {
  id: string;
  naam: string;
  leverancier: string;
  doel: string;
  categorie: string;
  risicoNiveau: string;
  gebruikers: string;
  toezichthouder: string;
  transparantie: string;
  notities: string;
}

const leegSysteem: Omit<AISystem, "id"> = {
  naam: "",
  leverancier: "",
  doel: "",
  categorie: "cv-screening",
  risicoNiveau: "hoog",
  gebruikers: "",
  toezichthouder: "",
  transparantie: "",
  notities: "",
};

const categorieOpties = [
  { value: "cv-screening", label: "CV-screening / selectie" },
  { value: "matching", label: "Matching / kandidaat-vacature koppeling" },
  { value: "chatbot", label: "Chatbot / voorselectie" },
  { value: "planning", label: "Planning / roosteroptimalisatie" },
  { value: "monitoring", label: "Prestatie- of gedragsmonitoring" },
  { value: "tekstgeneratie", label: "Tekstgeneratie (vacatures, communicatie)" },
  { value: "overig", label: "Overig" },
];

const risicoOpties = [
  { value: "hoog", label: "Hoog risico (Bijlage III)" },
  { value: "beperkt", label: "Beperkt risico (transparantieplicht)" },
  { value: "minimaal", label: "Minimaal risico" },
  { value: "onbekend", label: "Nog niet beoordeeld" },
];

export default function AIRegister() {
  const [systemen, setSystemen] = useState<AISystem[]>([]);
  const [huidig, setHuidig] = useState<Omit<AISystem, "id">>(leegSysteem);
  const [bewerkId, setBewerkId] = useState<string | null>(null);
  const [toonFormulier, setToonFormulier] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  function voegToe() {
    if (!huidig.naam.trim()) return;
    if (bewerkId) {
      setSystemen(systemen.map((s) => (s.id === bewerkId ? { ...huidig, id: bewerkId } : s)));
      setBewerkId(null);
    } else {
      setSystemen([...systemen, { ...huidig, id: crypto.randomUUID() }]);
    }
    setHuidig(leegSysteem);
    setToonFormulier(false);
  }

  function bewerk(systeem: AISystem) {
    setHuidig({ ...systeem });
    setBewerkId(systeem.id);
    setToonFormulier(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  function verwijder(id: string) {
    setSystemen(systemen.filter((s) => s.id !== id));
    if (bewerkId === id) {
      setBewerkId(null);
      setHuidig(leegSysteem);
      setToonFormulier(false);
    }
  }

  function exporteerCSV() {
    if (systemen.length === 0) return;
    const headers = [
      "Naam systeem",
      "Leverancier",
      "Doel / toepassing",
      "Categorie",
      "Risiconiveau",
      "Gebruikers / afdeling",
      "Toezichthouder",
      "Transparantie naar betrokkenen",
      "Notities",
    ];
    const rows = systemen.map((s) => [
      s.naam,
      s.leverancier,
      s.doel,
      categorieOpties.find((c) => c.value === s.categorie)?.label || s.categorie,
      risicoOpties.find((r) => r.value === s.risicoNiveau)?.label || s.risicoNiveau,
      s.gebruikers,
      s.toezichthouder,
      s.transparantie,
      s.notities,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-register-normelo.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const aantalHoog = systemen.filter((s) => s.risicoNiveau === "hoog").length;

  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero */}
      <section className="py-16 border-b border-border">
        <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Gratis template</p>
        <h1 className="text-4xl font-bold leading-tight mb-4">AI-register voor de uitzendbranche</h1>
        <p className="text-lg text-muted leading-relaxed">
          De EU AI Act verplicht organisaties om een overzicht bij te houden van de AI-systemen die zij gebruiken.
          Dit is je startpunt: vul je systemen in, beoordeel het risico, en download het als CSV.
        </p>
      </section>

      {/* Uitleg */}
      <section className="py-10 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Waarom een AI-register?</h2>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            Artikel 26 van de EU AI Act verplicht organisaties die hoog-risico AI inzetten om te documenteren
            welke systemen zij gebruiken, waarvoor, en hoe het toezicht is geregeld. Voor uitzendbureaus die
            werken met ATS-systemen, matchingtools of AI-screening is dit direct relevant.
          </p>
          <p>
            Een AI-register is geen ingewikkeld document. Het is een gestructureerd overzicht van je AI-systemen
            met daarbij de beoordeling van het risico en de maatregelen die je hebt genomen. Vergelijk het met
            een verwerkingsregister onder de AVG — maar dan voor AI.
          </p>
        </div>
      </section>

      {/* Wat moet erin */}
      <section className="py-10 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Wat moet erin staan?</h2>
        <div className="space-y-3 text-muted leading-relaxed">
          <p>Voor elk AI-systeem dat je gebruikt, leg je het volgende vast:</p>
          <div className="grid gap-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">1.</span>
              <span><strong className="text-foreground">Naam en leverancier</strong> — welk systeem is het en van wie?</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">2.</span>
              <span><strong className="text-foreground">Doel</strong> — waarvoor gebruik je het? CV-screening, matching, planning?</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">3.</span>
              <span><strong className="text-foreground">Risiconiveau</strong> — valt het onder hoog-risico (Bijlage III)?</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">4.</span>
              <span><strong className="text-foreground">Menselijk toezicht</strong> — wie controleert de output?</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">5.</span>
              <span><strong className="text-foreground">Transparantie</strong> — weten kandidaten dat AI wordt ingezet?</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive register */}
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-2">Jouw AI-register</h2>
        <p className="text-muted mb-6">
          Vul je systemen in met het formulier hieronder. Alles blijft lokaal in je browser — er wordt niets opgeslagen op onze servers.
        </p>

        {/* Overzicht */}
        {systemen.length > 0 && (
          <div className="mb-6">
            {aantalHoog > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                <strong>{aantalHoog} hoog-risico {aantalHoog === 1 ? "systeem" : "systemen"}</strong> — hiervoor gelden aanvullende verplichtingen onder de EU AI Act.
              </div>
            )}
            <div className="space-y-3">
              {systemen.map((s) => (
                <div key={s.id} className="p-4 bg-surface border border-border rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{s.naam}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          s.risicoNiveau === "hoog" ? "bg-red-100 text-red-700" :
                          s.risicoNiveau === "beperkt" ? "bg-amber-100 text-amber-700" :
                          s.risicoNiveau === "minimaal" ? "bg-green-100 text-green-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {risicoOpties.find((r) => r.value === s.risicoNiveau)?.label || s.risicoNiveau}
                        </span>
                      </div>
                      <p className="text-sm text-muted">
                        {s.leverancier && <>{s.leverancier} — </>}
                        {categorieOpties.find((c) => c.value === s.categorie)?.label}
                      </p>
                      {s.doel && <p className="text-sm text-muted mt-1">{s.doel}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => bewerk(s)}
                        className="text-xs px-3 py-1.5 border border-border rounded hover:bg-surface transition-colors cursor-pointer"
                      >
                        Bewerk
                      </button>
                      <button
                        onClick={() => verwijder(s.id)}
                        className="text-xs px-3 py-1.5 text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        Verwijder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => { setToonFormulier(true); setBewerkId(null); setHuidig(leegSysteem); }}
                className="px-4 py-2 text-sm font-medium border border-accent text-accent rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              >
                + Systeem toevoegen
              </button>
              <button
                onClick={exporteerCSV}
                className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-primary transition-colors cursor-pointer"
              >
                Download als CSV
              </button>
            </div>
          </div>
        )}

        {/* Formulier */}
        {(toonFormulier || systemen.length === 0) && (
          <div ref={formRef} className="p-5 bg-surface border border-border rounded-lg mb-6">
            <h3 className="font-semibold mb-4">{bewerkId ? "Systeem bewerken" : "Systeem toevoegen"}</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Naam systeem *</label>
                  <input
                    type="text"
                    value={huidig.naam}
                    onChange={(e) => setHuidig({ ...huidig, naam: e.target.value })}
                    placeholder="bijv. Carerix, Bullhorn"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Leverancier</label>
                  <input
                    type="text"
                    value={huidig.leverancier}
                    onChange={(e) => setHuidig({ ...huidig, leverancier: e.target.value })}
                    placeholder="bijv. Carerix B.V."
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Doel / toepassing</label>
                <input
                  type="text"
                  value={huidig.doel}
                  onChange={(e) => setHuidig({ ...huidig, doel: e.target.value })}
                  placeholder="bijv. Automatisch ranken van sollicitanten op basis van CV"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Categorie</label>
                  <select
                    value={huidig.categorie}
                    onChange={(e) => setHuidig({ ...huidig, categorie: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent bg-white"
                  >
                    {categorieOpties.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Risiconiveau</label>
                  <select
                    value={huidig.risicoNiveau}
                    onChange={(e) => setHuidig({ ...huidig, risicoNiveau: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent bg-white"
                  >
                    {risicoOpties.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Gebruikers / afdeling</label>
                  <input
                    type="text"
                    value={huidig.gebruikers}
                    onChange={(e) => setHuidig({ ...huidig, gebruikers: e.target.value })}
                    placeholder="bijv. Recruitmentteam"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Toezichthouder</label>
                  <input
                    type="text"
                    value={huidig.toezichthouder}
                    onChange={(e) => setHuidig({ ...huidig, toezichthouder: e.target.value })}
                    placeholder="bijv. HR Manager"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Transparantie naar betrokkenen</label>
                <input
                  type="text"
                  value={huidig.transparantie}
                  onChange={(e) => setHuidig({ ...huidig, transparantie: e.target.value })}
                  placeholder="bijv. Kandidaten worden geïnformeerd via privacyverklaring"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notities</label>
                <textarea
                  value={huidig.notities}
                  onChange={(e) => setHuidig({ ...huidig, notities: e.target.value })}
                  placeholder="Eventuele opmerkingen of actiepunten"
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={voegToe}
                  disabled={!huidig.naam.trim()}
                  className="px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {bewerkId ? "Opslaan" : "Toevoegen"}
                </button>
                {(toonFormulier && systemen.length > 0) && (
                  <button
                    onClick={() => { setToonFormulier(false); setBewerkId(null); setHuidig(leegSysteem); }}
                    className="px-5 py-2.5 border border-border rounded-lg text-sm hover:bg-surface transition-colors cursor-pointer"
                  >
                    Annuleren
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Leeg state */}
        {systemen.length === 0 && !toonFormulier && (
          <div className="text-center py-10 text-muted">
            <p className="mb-4">Je hebt nog geen systemen toegevoegd.</p>
            <button
              onClick={() => setToonFormulier(true)}
              className="px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-primary transition-colors cursor-pointer"
            >
              Voeg je eerste systeem toe
            </button>
          </div>
        )}
      </section>

      {/* Volgende stap */}
      <section className="py-10 border-t border-border">
        <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <p className="text-sm font-medium text-orange-300 mb-2 tracking-wide uppercase">Volgende stap</p>
          <h3 className="text-xl font-bold mb-3">Van register naar compliance</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Een AI-register is het begin. Het Normelo AI-geletterdheid traject helpt je met de volgende stappen:
            risicobeoordelingen, menselijk toezicht inrichten, documentatie opstellen en je team trainen.
          </p>
          <Link
            href="/training"
            className="inline-block px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors no-underline"
          >
            Bekijk het traject &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
