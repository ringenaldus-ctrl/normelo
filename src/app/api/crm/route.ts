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

// GET: lijst alle prospects met contacten + optioneel leads
export async function GET(request: NextRequest) {
  if (!authorized(request))
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });

  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  // Return Quick Scan leads
  if (type === "leads") {
    const { data, error } = await supabase
      .from("quickscan_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error)
      return Response.json({ error: error.message }, { status: 500 });

    return Response.json(data);
  }

  // Return training registrations
  if (type === "registraties") {
    const { data, error } = await supabase
      .from("training_wachtlijst")
      .select("*")
      .order("created_at", { ascending: false });

    if (error)
      return Response.json({ error: error.message }, { status: 500 });

    return Response.json(data);
  }

  // Default: return prospects
  const { data, error } = await supabase
    .from("prospects")
    .select("*, prospect_contacten(*)")
    .order("updated_at", { ascending: false });

  if (error)
    return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}

// POST: nieuwe prospect toevoegen
export async function POST(request: NextRequest) {
  if (!authorized(request))
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });

  const supabase = getSupabase();
  const body = await request.json();

  const { data, error } = await supabase
    .from("prospects")
    .insert({
      bedrijf: body.bedrijf,
      contactpersoon: body.contactpersoon || null,
      functie: body.functie || null,
      ats_systeem: body.ats_systeem || null,
      linkedin_url: body.linkedin_url || null,
      email: body.email || null,
      telefoon: body.telefoon || null,
      status: body.status || "nieuw",
      notities: body.notities || null,
      bron: body.bron || null,
    })
    .select()
    .single();

  if (error)
    return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}

// PUT: prospect bijwerken
export async function PUT(request: NextRequest) {
  if (!authorized(request))
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });

  const supabase = getSupabase();
  const body = await request.json();

  if (!body.id)
    return Response.json({ error: "ID is verplicht" }, { status: 400 });

  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from("prospects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error)
    return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}

// DELETE: prospect verwijderen
export async function DELETE(request: NextRequest) {
  if (!authorized(request))
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });

  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id)
    return Response.json({ error: "ID is verplicht" }, { status: 400 });

  const { error } = await supabase.from("prospects").delete().eq("id", id);

  if (error)
    return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
}
