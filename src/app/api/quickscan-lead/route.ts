import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json(
        { error: "Server configuratie onvolledig." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await request.json();

    const { email, sector, risico_niveau, hoog_risico_systemen, antwoorden } =
      body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("quickscan_leads").insert({
      email: email.trim().toLowerCase(),
      sector: sector || null,
      risico_niveau: risico_niveau || null,
      hoog_risico_systemen: hoog_risico_systemen || [],
      antwoorden: antwoorden || {},
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Er ging iets mis bij het opslaan." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Ongeldig verzoek" },
      { status: 400 }
    );
  }
}
