import { NextRequest } from "next/server";
import {
  laadGesprekMetOffertes,
  maakOfferte,
  simuleerProspectActie,
  verstuurOfferte,
  vindOfMaakGesprek,
} from "@/lib/offerte-flow";
import { getServiceSupabase } from "@/lib/supabase-server";
import { normaliseerTelefoon, type OfferteRegel } from "@/lib/offertes";
import { whatsappDemoMode } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

function authorized(request: NextRequest): boolean {
  const pw = request.headers.get("x-offertes-password");
  const expected =
    process.env.OFFERTES_PASSWORD || process.env.CRM_PASSWORD;
  return Boolean(expected && pw === expected);
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const gesprekId = searchParams.get("gesprek_id");

  try {
    if (gesprekId) {
      const gesprek = await laadGesprekMetOffertes(gesprekId);
      if (!gesprek) {
        return Response.json({ error: "Niet gevonden" }, { status: 404 });
      }

      const supabase = getServiceSupabase();
      const { data: berichten } = await supabase
        .from("whatsapp_berichten")
        .select("*")
        .eq("gesprek_id", gesprekId)
        .order("created_at", { ascending: true });

      return Response.json({
        gesprek,
        berichten: berichten || [],
        demo: whatsappDemoMode(),
      });
    }

    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("offerte_gesprekken")
      .select("*, offertes(id, versie, status, titel, bedrag_centen, updated_at)")
      .order("updated_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      gesprekken: data || [],
      demo: whatsappDemoMode(),
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Serverfout" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  const action = body.action as string;

  try {
    if (action === "nieuw_gesprek") {
      const telefoon = String(body.telefoon || "");
      const naam = body.naam ? String(body.naam) : null;
      const bericht = body.bericht ? String(body.bericht) : "Handmatige aanvraag";
      if (!telefoon) {
        return Response.json({ error: "Telefoon verplicht" }, { status: 400 });
      }
      const gesprek = await vindOfMaakGesprek({
        telefoon: normaliseerTelefoon(telefoon),
        naam,
        bericht,
      });
      return Response.json({ gesprek, demo: whatsappDemoMode() });
    }

    if (action === "maak_offerte") {
      const gesprek_id = String(body.gesprek_id || "");
      const titel = String(body.titel || "");
      const regels = (body.regels || []) as OfferteRegel[];
      if (!gesprek_id || !titel || !Array.isArray(regels) || regels.length === 0) {
        return Response.json(
          { error: "gesprek_id, titel en regels zijn verplicht" },
          { status: 400 }
        );
      }
      const offerte = await maakOfferte({
        gesprek_id,
        titel,
        omschrijving: body.omschrijving ? String(body.omschrijving) : undefined,
        btw_percentage:
          body.btw_percentage != null ? Number(body.btw_percentage) : 21,
        geldig_tot: body.geldig_tot ? String(body.geldig_tot) : null,
        regels,
      });
      return Response.json({ offerte });
    }

    if (action === "verstuur") {
      const offerte_id = String(body.offerte_id || "");
      if (!offerte_id) {
        return Response.json({ error: "offerte_id verplicht" }, { status: 400 });
      }
      const result = await verstuurOfferte(offerte_id);
      return Response.json(result);
    }

    if (action === "simuleer") {
      const gesprek_id = String(body.gesprek_id || "");
      const actie = body.actie as "akkoord" | "wijziging" | "tekst";
      if (!gesprek_id || !actie) {
        return Response.json(
          { error: "gesprek_id en actie verplicht" },
          { status: 400 }
        );
      }
      await simuleerProspectActie({
        gesprek_id,
        actie,
        tekst: body.tekst ? String(body.tekst) : undefined,
      });
      const gesprek = await laadGesprekMetOffertes(gesprek_id);
      return Response.json({ ok: true, gesprek });
    }

    return Response.json({ error: "Onbekende action" }, { status: 400 });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Serverfout" },
      { status: 500 }
    );
  }
}
