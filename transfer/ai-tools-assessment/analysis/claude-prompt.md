# Fase 2 — Claude analyseprompt

Plak transcript + onderstaande prompt in Claude (met web search aan indien mogelijk).  
Daarna altijd **menselijke QA** (`qa-checklist.md`).

---

## Prompt

```
Je helpt bij een AI Tools Assessment voor een MKB-ondernemer.

Ik plak hieronder het transcript van de discovery call.

Taak:
1. Haal 5–10 concrete pain points / tijdlekken eruit (met citaten of parafrase uit het transcript).
2. Schat uren/week per pain point (conservatief; zeg het als onzeker).
3. Schrijf per pain point 1 off-the-shelf SaaS- of AI-tool voor die de klant zelf kan starten.
4. Prioriteer op: high impact + low effort (quick wins). Major projects (high effort) apart zetten.
5. Vermijd enterprise-tools voor kleine teams (geen Salesforce voor een 4-persoons bedrijf).
6. Gebruik waar zinvol bekende directories (Futurepedia, There's An AI For That) en noem prijsindicatie + setup-tijd.
7. Output strikt in dit format:

# Pain points
- ...

# Quick wins (3–7)
Voor elke:
- Pain:
- Tool + URL:
- Waarom passend voor dit bedrijf:
- Kosten/maand (indicatie):
- Setup-tijd:
- Uren/week bespaard (indicatie):
- Hefboom: efficiëntie | effectiviteit | kwaliteit

# Major projects (upsell-kandidaten)
- ...

# Executive summary inputs
- Top 1–2 pains:
- Totale uren/week (som quick wins, conservatief):
- Primary focus (meest voorkomende hefboom):
- Outcome in 1 zin:

# Risico's / open vragen
- ...

Transcript:
---
[PLAK TRANSCRIPT]
---
```

---

## Tip om de skill sterker te maken

Na assessment 2–3: voed Claude met (1) eerdere transcripts en (2) jouw goedgekeurde rapporten als “zo ziet goed eruit”. Dan stijgt output van ~60–70% naar copy-paste-niveau.
