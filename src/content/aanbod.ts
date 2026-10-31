/**
 * Alles wat Normelo nu kost of later mag kosten, staat in dit bestand.
 *
 * Zolang `betaaldePlannen` leeg is, is het hele aanbod gratis.
 * Een betaalde laag terugzetten: vul `betaaldePlannen` en zet `gratis` op false.
 * `AanbodSectie` rendert dan de plannen in plaats van het gratis-blok.
 * Verzin hier geen prijzen zolang Gerard die niet heeft vastgesteld.
 */

export type BetaaldPlan = {
  id: string;
  naam: string;
  /** Weergave, bijvoorbeeld "€99". Leeg laten zolang de prijs niet vaststaat. */
  prijsPerMaand: string;
  /** Weergave, bijvoorbeeld "€1.188 per jaar". */
  prijsPerJaar: string;
  voorWie: string;
  kenmerken: string[];
  cta: string;
  href: string;
  uitgelicht?: boolean;
};

/** Enige aanmeldroute: het platform op normelo.nl. */
export const aanmelden = {
  href: "https://normelo.nl/aanmelden",
  label: "Gratis aanmelden",
  toelichting:
    "Je meldt je organisatie aan met bedrijfsnaam, aantal medewerkers en een contactpersoon.",
};

export const aanbod = {
  /** false zodra `betaaldePlannen` de bron van de prijzenpagina wordt. */
  gratis: true,
  label: "Gratis",
  titel: "Normelo is gratis",
  tekst:
    "Training, toets, certificaat en het AI-register zijn nu gratis. Welke onderdelen later een betaald abonnement worden, staat nog niet vast.",
  cta: aanmelden.label,
  href: aanmelden.href,
  toelichting: aanmelden.toelichting,
  betaaldePlannen: [] as BetaaldPlan[],
};

/** Korte regel voor de footer. Geen prijzen en geen claims over die diensten. */
export const gerardRegel =
  "Normelo wordt aangeboden door Gerard. Hij helpt mkb-bedrijven zonder IT-afdeling ook met een AI-scan, workshops en automatiseringen.";
