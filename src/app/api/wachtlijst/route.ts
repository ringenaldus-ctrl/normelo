import { aanmelden } from "@/content/aanbod";

/**
 * Accounts worden alleen nog aangemaakt op het platform (normelo.nl/aanmelden).
 * Deze route maakt geen organisatie, medewerker of magic link meer aan.
 */
export async function POST() {
  return Response.json(
    {
      error: "Aanmelden gaat via het platform.",
      aanmelden: aanmelden.href,
    },
    { status: 410 }
  );
}
