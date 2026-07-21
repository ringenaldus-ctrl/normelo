# WhatsApp offerte-flow (klusjesman ↔ prospect)

## Proces

```
Prospect vraagt offerte via WhatsApp
        ↓
Systeem maakt gesprek (status: nieuw / in_behandeling)
        ↓
Klusjesman maakt offerte in /offertes en verstuurt
        ↓
Prospect krijgt WhatsApp-bericht met knoppen:
   [Akkoord]  [Wijziging]
        ↓                    ↓
   Akkoord              Wijziging
        ↓                    ↓
Bevestiging          Vraag om toelichting
verstuurd            → wijzigingsverzoek opgeslagen
        ↓              → klusjesman stuurt nieuwe versie
   Klaar (bevestigd)
```

## Wat is gebouwd

| Onderdeel | Pad |
|-----------|-----|
| Database schema | `supabase/offertes-schema.sql` |
| Domein + berichten | `src/lib/offertes.ts`, `src/lib/offerte-flow.ts` |
| WhatsApp Cloud API | `src/lib/whatsapp.ts` |
| Webhook | `POST/GET /api/whatsapp/webhook` |
| Dashboard API | `/api/offertes` |
| Klusjesman UI | `/offertes` |

## Setup

### 1. Database

Voer `supabase/offertes-schema.sql` uit in de Supabase SQL editor.

### 2. Environment variables

```bash
# Bestaand
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CRM_PASSWORD=                 # of apart:
OFFERTES_PASSWORD=            # optioneel; valt terug op CRM_PASSWORD

# WhatsApp (Meta Cloud API) — zonder deze vars werkt demomodus
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_VERIFY_TOKEN=        # zelf gekozen string voor webhook-verify
WHATSAPP_API_VERSION=v21.0    # optioneel
```

### 3. Meta WhatsApp webhook

1. Maak een Meta App met WhatsApp product.
2. Callback URL: `https://<jouw-domein>/api/whatsapp/webhook`
3. Verify token: dezelfde waarde als `WHATSAPP_VERIFY_TOKEN`
4. Abonneer op `messages`

Zonder credentials: demomodus. Gebruik in `/offertes` de knoppen **Simuleer prospect** om akkoord/wijziging/tekst te testen.

## Handmatige flow (zonder inbound WhatsApp)

1. Open `/offertes`, log in met CRM/offertes-wachtwoord
2. Start **Nieuwe aanvraag** (naam + telefoon + klus)
3. Stel regels op → **Opslaan en via WhatsApp versturen**
4. Simuleer **Akkoord** of **Wijziging vragen**
5. Bij wijziging: prospect stuurt tekst → maak nieuwe offerteversie → opnieuw versturen

## Knop-IDs in WhatsApp

- `offerte_akkoord_<offerte-uuid>` → accepteert + stuurt bevestiging
- `offerte_wijziging_<offerte-uuid>` → vraagt toelichting, zet `wacht_op=wijzigingstekst`
