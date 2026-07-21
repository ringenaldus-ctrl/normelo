export type GesprekStatus =
  | "nieuw"
  | "in_behandeling"
  | "offerte_open"
  | "wijziging_gevraagd"
  | "akkoord"
  | "bevestigd"
  | "geannuleerd";

export type OfferteStatus =
  | "concept"
  | "verstuurd"
  | "wijziging_gevraagd"
  | "geaccepteerd"
  | "bevestigd"
  | "vervangen"
  | "geannuleerd";

export type WachtOp = "wijzigingstekst" | null;

export interface OfferteRegel {
  id?: string;
  omschrijving: string;
  aantal: number;
  eenheid: string;
  prijs_centen: number;
  volgorde?: number;
}

export interface Offerte {
  id: string;
  gesprek_id: string;
  versie: number;
  status: OfferteStatus;
  titel: string;
  omschrijving: string | null;
  bedrag_centen: number;
  btw_percentage: number;
  geldig_tot: string | null;
  wijzigingsverzoek: string | null;
  verstuurd_at: string | null;
  geaccepteerd_at: string | null;
  bevestigd_at: string | null;
  created_at: string;
  updated_at: string;
  offerte_regels?: OfferteRegel[];
}

export interface OfferteGesprek {
  id: string;
  prospect_naam: string | null;
  prospect_telefoon: string;
  status: GesprekStatus;
  wacht_op: WachtOp;
  laatste_bericht: string | null;
  notities: string | null;
  created_at: string;
  updated_at: string;
  offertes?: Offerte[];
}

export interface WhatsappBericht {
  id: string;
  gesprek_id: string | null;
  richting: "in" | "uit";
  wa_message_id: string | null;
  type: string;
  inhoud: string | null;
  raw: unknown;
  created_at: string;
}

/** Normaliseer NL/internationaal nummer naar E.164 (+31...). */
export function normaliseerTelefoon(input: string): string {
  const digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  if (digits.startsWith("0") && digits.length === 10) {
    return `+31${digits.slice(1)}`;
  }
  if (digits.startsWith("31") && digits.length >= 11) {
    return `+${digits}`;
  }
  return digits.startsWith("+") ? digits : `+${digits}`;
}

export function formatEuro(centen: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(centen / 100);
}

export function berekenTotaal(regels: OfferteRegel[]): number {
  return regels.reduce(
    (sum, r) => sum + Math.round(Number(r.aantal) * r.prijs_centen),
    0
  );
}

export function formatOfferteBericht(offerte: Offerte, prospectNaam?: string | null): string {
  const begroeting = prospectNaam ? `Hoi ${prospectNaam},` : "Hoi,";
  const regels = (offerte.offerte_regels || [])
    .map((r) => {
      const regelTotaal = Math.round(Number(r.aantal) * r.prijs_centen);
      return `• ${r.omschrijving}: ${r.aantal} ${r.eenheid} × ${formatEuro(r.prijs_centen)} = ${formatEuro(regelTotaal)}`;
    })
    .join("\n");

  const btw = Math.round(offerte.bedrag_centen * (Number(offerte.btw_percentage) / 100));
  const incl = offerte.bedrag_centen + btw;

  let tekst = `${begroeting}

Hier is offerte v${offerte.versie}: *${offerte.titel}*`;

  if (offerte.omschrijving) {
    tekst += `\n\n${offerte.omschrijving}`;
  }

  if (regels) {
    tekst += `\n\n${regels}`;
  }

  tekst += `\n\n*Totaal excl. btw:* ${formatEuro(offerte.bedrag_centen)}
*Btw (${offerte.btw_percentage}%):* ${formatEuro(btw)}
*Totaal incl. btw:* ${formatEuro(incl)}`;

  if (offerte.geldig_tot) {
    tekst += `\n\nGeldig tot ${new Date(offerte.geldig_tot).toLocaleDateString("nl-NL")}.`;
  }

  tekst += `\n\nKlik hieronder om akkoord te gaan of een wijziging te vragen.`;
  return tekst;
}

export function formatBevestiging(offerte: Offerte, prospectNaam?: string | null): string {
  const begroeting = prospectNaam ? `Bedankt ${prospectNaam}!` : "Bedankt!";
  return `${begroeting}

Je akkoord op *${offerte.titel}* (v${offerte.versie}) is ontvangen.

*Bevestigd bedrag:* ${formatEuro(offerte.bedrag_centen)} excl. btw

We plannen de klus zo snel mogelijk in. Heb je nog vragen? Stuur gerust een bericht.`;
}

export const GESPREK_STATUS_LABELS: Record<GesprekStatus, string> = {
  nieuw: "Nieuwe aanvraag",
  in_behandeling: "In behandeling",
  offerte_open: "Offerte verstuurd",
  wijziging_gevraagd: "Wijziging gevraagd",
  akkoord: "Akkoord",
  bevestigd: "Bevestigd",
  geannuleerd: "Geannuleerd",
};
