import { Resend } from "resend";

/** Gebruikt als send.normelo.nl nog niet bij Resend geverifieerd is. */
export const MAIL_FROM_FALLBACK = "Normelo <onboarding@resend.dev>";

export function mailTo(): string {
  return process.env.MAIL_TO || "ringenaldus@gmail.com";
}

export function mailFrom(): string {
  return process.env.MAIL_FROM || "Normelo <noreply@send.normelo.nl>";
}

function errorText(error: unknown): string {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function domainNotVerified(error: unknown): boolean {
  const text = errorText(error).toLowerCase();
  return text.includes("domain") && (text.includes("verif") || text.includes("not allowed"));
}

type OutboundMail = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Verstuurt via Resend. Zonder RESEND_API_KEY gebeurt er niets en komt er een warning.
 * Lukt het afzenderdomein niet, dan één keer opnieuw via onboarding@resend.dev.
 */
export async function sendMail(message: OutboundMail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY ontbreekt; e-mail wordt niet verstuurd.");
    return false;
  }

  const resend = new Resend(apiKey);
  const preferred = mailFrom();

  async function deliver(from: string) {
    return resend.emails.send({
      from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      replyTo: message.replyTo,
    });
  }

  try {
    const first = await deliver(preferred);
    if (!first.error) return true;
    if (preferred !== MAIL_FROM_FALLBACK && domainNotVerified(first.error)) {
      console.warn("Afzenderdomein niet geverifieerd; opnieuw via onboarding@resend.dev.");
      const second = await deliver(MAIL_FROM_FALLBACK);
      if (!second.error) return true;
      console.error("Resend fallback mislukt:", second.error);
      return false;
    }
    console.error("Resend mislukt:", first.error);
    return false;
  } catch (error) {
    if (preferred !== MAIL_FROM_FALLBACK && domainNotVerified(error)) {
      try {
        console.warn("Afzenderdomein niet geverifieerd; opnieuw via onboarding@resend.dev.");
        const second = await deliver(MAIL_FROM_FALLBACK);
        if (!second.error) return true;
        console.error("Resend fallback mislukt:", second.error);
      } catch (fallbackError) {
        console.error("Resend fallback mislukt:", fallbackError);
      }
      return false;
    }
    console.error("Resend mislukt:", error);
    return false;
  }
}
