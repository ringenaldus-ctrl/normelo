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

  // Return training registrations with magic link info
  if (type === "registraties") {
    const { data: registraties, error } = await supabase
      .from("training_wachtlijst")
      .select("*")
      .order("created_at", { ascending: false });

    if (error)
      return Response.json({ error: error.message }, { status: 500 });

    // Enrich with magic link data via employee email
    const emails = (registraties || []).map((r: { email: string }) => r.email);
    const { data: employees } = await supabase
      .from("employees")
      .select("id, email")
      .in("email", emails);

    const employeeMap = new Map((employees || []).map((e: { email: string; id: string }) => [e.email, e.id]));
    const employeeIds = Array.from(employeeMap.values());

    let tokenMap = new Map<string, { id: string; token: string; expiresAt: string; usedAt: string | null }>();
    if (employeeIds.length > 0) {
      const { data: tokens } = await supabase
        .from("magic_link_tokens")
        .select("id, token, employeeId, expiresAt, usedAt")
        .in("employeeId", employeeIds)
        .order("expiresAt", { ascending: false });

      // Keep only the latest token per employee
      for (const t of (tokens || [])) {
        const typedToken = t as { id: string; token: string; employeeId: string; expiresAt: string; usedAt: string | null };
        if (!tokenMap.has(typedToken.employeeId)) {
          tokenMap.set(typedToken.employeeId, { id: typedToken.id, token: typedToken.token, expiresAt: typedToken.expiresAt, usedAt: typedToken.usedAt });
        }
      }
    }

    const enriched = (registraties || []).map((r: { email: string }) => {
      const empId = employeeMap.get(r.email);
      const magicLink = empId ? tokenMap.get(empId) : null;
      return {
        ...r,
        magicLink: magicLink ? {
          id: magicLink.id,
          url: `https://hireai-certified.vercel.app/api/auth/magic-link/verify?token=${encodeURIComponent(magicLink.token)}`,
          expiresAt: magicLink.expiresAt,
          usedAt: magicLink.usedAt,
        } : null,
      };
    });

    return Response.json(enriched);
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

// DELETE: prospect of magic link verwijderen
export async function DELETE(request: NextRequest) {
  if (!authorized(request))
    return Response.json({ error: "Niet geautoriseerd" }, { status: 401 });

  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  if (!id)
    return Response.json({ error: "ID is verplicht" }, { status: 400 });

  if (type === "magic_link") {
    const { error } = await supabase.from("magic_link_tokens").delete().eq("id", id);
    if (error)
      return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ success: true });
  }

  const { error } = await supabase.from("prospects").delete().eq("id", id);

  if (error)
    return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
}
