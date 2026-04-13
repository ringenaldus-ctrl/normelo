import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

function authorized(request: NextRequest): boolean {
  const pw = request.headers.get("x-crm-password");
  return pw === process.env.CRM_PASSWORD;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createClient(url, key);
}

// POST: nieuw contact toevoegen
export async function POST(request: NextRequest) {
  if (!authorized(request))
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });

  const supabase = getSupabase();
  const body = await request.json();

  if (!body.prospect_id || !body.naam)
    return Response.json({ error: "prospect_id en naam zijn verplicht" }, { status: 400 });

  const { data, error } = await supabase
    .from("prospect_contacten")
    .insert({
      prospect_id: body.prospect_id,
      naam: body.naam,
      functie: body.functie || null,
      linkedin_url: body.linkedin_url || null,
      email: body.email || null,
      telefoon: body.telefoon || null,
      notities: body.notities || null,
    })
    .select()
    .single();

  if (error)
    return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}

// PUT: contact bijwerken
export async function PUT(request: NextRequest) {
  if (!authorized(request))
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });

  const supabase = getSupabase();
  const body = await request.json();

  if (!body.id)
    return Response.json({ error: "ID is verplicht" }, { status: 400 });

  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from("prospect_contacten")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error)
    return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}

// DELETE: contact verwijderen
export async function DELETE(request: NextRequest) {
  if (!authorized(request))
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });

  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id)
    return Response.json({ error: "ID is verplicht" }, { status: 400 });

  const { error } = await supabase.from("prospect_contacten").delete().eq("id", id);

  if (error)
    return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
}
