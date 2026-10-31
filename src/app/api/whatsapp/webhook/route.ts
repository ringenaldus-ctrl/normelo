import { NextRequest } from "next/server";
import {
  parseInboundMessages,
  whatsappDemoMode,
} from "@/lib/whatsapp";
import { verwerkInbound } from "@/lib/offerte-flow";

export const dynamic = "force-dynamic";

/** Meta webhook verificatie. */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && token && expected && token === expected) {
    return new Response(challenge || "", { status: 200 });
  }

  return Response.json({ error: "Forbidden" }, { status: 403 });
}

/** Inbound WhatsApp berichten. */
export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Ongeldige JSON" }, { status: 400 });
  }

  const messages = parseInboundMessages(payload);

  // Meta verwacht snel 200; verwerk synchroon maar lichtgewicht
  for (const message of messages) {
    try {
      await verwerkInbound(message);
    } catch (err) {
      console.error("[whatsapp webhook]", err);
    }
  }

  return Response.json({
    ok: true,
    processed: messages.length,
    demo: whatsappDemoMode(),
  });
}
