# Nieuwe GitHub-repo aanmaken + deze kit pushen

De Cloud Agent in `normelo` mag **geen** nieuwe repos aanmaken (GitHub App-rechten). Doe dit zelf in 2 minuten:

## Optie A — via GitHub website

1. Ga naar https://github.com/new
2. Owner: `ringenaldus-ctrl`
3. Repository name: `ai-tools-assessment` (of andere naam)
4. Private
5. **Geen** README/license toevoegen (lege repo)
6. Create repository

## Optie B — via `gh` op je eigen machine

```bash
gh repo create ringenaldus-ctrl/ai-tools-assessment --private --description "AI Tools Assessment playbook (Corey Ganim model)"
```

## Daarna: kit pushen

Download/unzip de starterkit, dan:

```bash
cd ai-tools-assessment
git init
git add .
git commit -m "Initial AI Tools Assessment playbook"
git branch -M main
git remote add origin https://github.com/ringenaldus-ctrl/ai-tools-assessment.git
git push -u origin main
```

## Daarna in Cursor

Start een nieuwe Cloud Agent **op die repo** met bijvoorbeeld:

> “Help me mijn eerste gratis mini-audit voorbereiden voor een lokale dienstverlener in [stad].”

Of:

> “Bouw een minimale landing page + intake voor het €999 AI Tools Assessment offer.”
