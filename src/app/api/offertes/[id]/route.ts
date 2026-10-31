import { NextRequest } from "next/server";
import { laadGesprekMetOffertes } from "@/lib/offerte-flow";
import { getServiceSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

function authorized(request: NextRequest): boolean {
  const pw = request.headers.get("x-offertes-password");
  const expected =
    process.env.OFFERTES_PASSWORD || process.env.CRM_PASSWORD;
  return Boolean(expected && pw === expected);
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!authorized(request)) {
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    // id kan gesprek-id of offerte-id zijn — probeer eerst gesprek
    const gesprek = await laadGesprekMetOffertes(id);
    if (gesprek) {
      const supabase = getServiceSupabase();
      const { data: berichten } = await supabase
        .from("whatsapp_berichten")
        .select("*")
        .eq("gesprek_id", id)
        .order("created_at", { ascending: true });
      return Response.json({ gesprek, berichten: berichten || [] });
    }

    const supabase = getServiceSupabase();
    const { data: offerte, error } = await supabase
      .from("offertes")
      .select("*, offerte_regels(*), offerte_gesprekken(*)")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    if (!offerte) {
      return Response.json({ error: "Niet gevonden" }, { status: 404 });
    }

    return Response.json({ offerte });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Serverfout" },
      { status: 500 }
    );
  }
}
