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
    const { email, bron } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("training_wachtlijst").insert({
      email: email.trim().toLowerCase(),
      bron: bron || "website",
    });

    if (error) {
      // Duplicate email — treat as success for user
      if (error.code === "23505") {
        return Response.json({ success: true, already_registered: true });
      }
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Er ging iets mis." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Ongeldig verzoek" }, { status: 400 });
  }
}
