/**
 * Meta WhatsApp Cloud API client.
 * Zonder credentials werkt de client in demomodus (berichten worden gelogd, niet verstuurd).
 */

export type WhatsappButton = {
  id: string;
  title: string;
};

export type SendResult = {
  ok: boolean;
  demo: boolean;
  messageId: string | null;
  error?: string;
};

function isConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID
  );
}

export function whatsappDemoMode(): boolean {
  return !isConfigured();
}

async function graphPost(path: string, body: unknown): Promise<SendResult> {
  if (!isConfigured()) {
    console.info("[whatsapp:demo] outbound", JSON.stringify(body, null, 2));
    return {
      ok: true,
      demo: true,
      messageId: `demo_${Date.now()}`,
    };
  }

  const token = process.env.WHATSAPP_TOKEN!;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID!;
  const version = process.env.WHATSAPP_API_VERSION || "v21.0";
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as {
    messages?: { id: string }[];
    error?: { message: string };
  };

  if (!res.ok) {
    return {
      ok: false,
      demo: false,
      messageId: null,
      error: data.error?.message || `WhatsApp API ${res.status}`,
    };
  }

  return {
    ok: true,
    demo: false,
    messageId: data.messages?.[0]?.id ?? null,
  };
}

export async function sendWhatsappText(
  to: string,
  text: string
): Promise<SendResult> {
  return graphPost("messages", {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to.replace(/^\+/, ""),
    type: "text",
    text: { preview_url: false, body: text },
  });
}

export async function sendWhatsappButtons(
  to: string,
  bodyText: string,
  buttons: WhatsappButton[],
  header?: string
): Promise<SendResult> {
  return graphPost("messages", {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to.replace(/^\+/, ""),
    type: "interactive",
    interactive: {
      type: "button",
      ...(header
        ? { header: { type: "text", text: header.slice(0, 60) } }
        : {}),
      body: { text: bodyText.slice(0, 1024) },
      action: {
        buttons: buttons.slice(0, 3).map((b) => ({
          type: "reply",
          reply: {
            id: b.id.slice(0, 256),
            title: b.title.slice(0, 20),
          },
        })),
      },
    },
  });
}

/** Parse inbound webhook payload van Meta. */
export type InboundMessage =
  | {
      kind: "text";
      from: string;
      messageId: string;
      text: string;
      contactName?: string;
      raw: unknown;
    }
  | {
      kind: "button";
      from: string;
      messageId: string;
      buttonId: string;
      buttonTitle: string;
      contactName?: string;
      raw: unknown;
    };

export function parseInboundMessages(payload: unknown): InboundMessage[] {
  const results: InboundMessage[] = [];
  const root = payload as {
    entry?: {
      changes?: {
        value?: {
          contacts?: { wa_id: string; profile?: { name?: string } }[];
          messages?: {
            from: string;
            id: string;
            type: string;
            text?: { body: string };
            interactive?: {
              type: string;
              button_reply?: { id: string; title: string };
              list_reply?: { id: string; title: string };
            };
            button?: { payload: string; text: string };
          }[];
        };
      }[];
    }[];
  };

  for (const entry of root.entry || []) {
    for (const change of entry.changes || []) {
      const value = change.value;
      if (!value?.messages) continue;
      const nameByWa = new Map(
        (value.contacts || []).map((c) => [c.wa_id, c.profile?.name])
      );

      for (const msg of value.messages) {
        const contactName = nameByWa.get(msg.from);
        if (msg.type === "text" && msg.text?.body) {
          results.push({
            kind: "text",
            from: msg.from.startsWith("+") ? msg.from : `+${msg.from}`,
            messageId: msg.id,
            text: msg.text.body,
            contactName,
            raw: msg,
          });
        } else if (
          msg.type === "interactive" &&
          msg.interactive?.button_reply
        ) {
          results.push({
            kind: "button",
            from: msg.from.startsWith("+") ? msg.from : `+${msg.from}`,
            messageId: msg.id,
            buttonId: msg.interactive.button_reply.id,
            buttonTitle: msg.interactive.button_reply.title,
            contactName,
            raw: msg,
          });
        } else if (msg.type === "button" && msg.button) {
          results.push({
            kind: "button",
            from: msg.from.startsWith("+") ? msg.from : `+${msg.from}`,
            messageId: msg.id,
            buttonId: msg.button.payload,
            buttonTitle: msg.button.text,
            contactName,
            raw: msg,
          });
        }
      }
    }
  }

  return results;
}
