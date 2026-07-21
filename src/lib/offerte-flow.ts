import {
  Offerte,
  OfferteGesprek,
  OfferteRegel,
  berekenTotaal,
  formatBevestiging,
  formatOfferteBericht,
  normaliseerTelefoon,
} from "./offertes";
import { getServiceSupabase } from "./supabase-server";
import {
  sendWhatsappButtons,
  sendWhatsappText,
  type InboundMessage,
} from "./whatsapp";

async function logBericht(params: {
  gesprek_id: string | null;
  richting: "in" | "uit";
  wa_message_id?: string | null;
  type: string;
  inhoud?: string | null;
  raw?: unknown;
}) {
  const supabase = getServiceSupabase();
  await supabase.from("whatsapp_berichten").insert({
    gesprek_id: params.gesprek_id,
    richting: params.richting,
    wa_message_id: params.wa_message_id ?? null,
    type: params.type,
    inhoud: params.inhoud ?? null,
    raw: params.raw ?? null,
  });
}

export async function vindOfMaakGesprek(params: {
  telefoon: string;
  naam?: string | null;
  bericht?: string | null;
}): Promise<OfferteGesprek> {
  const supabase = getServiceSupabase();
  const telefoon = normaliseerTelefoon(params.telefoon);

  const { data: kandidaten } = await supabase
    .from("offerte_gesprekken")
    .select("*")
    .eq("prospect_telefoon", telefoon)
    .order("created_at", { ascending: false })
    .limit(10);

  const bestaand = (kandidaten || []).find(
    (g: OfferteGesprek) =>
      g.status !== "bevestigd" && g.status !== "geannuleerd"
  );

  if (bestaand) {
    const updates: Record<string, unknown> = {
      laatste_bericht: params.bericht ?? bestaand.laatste_bericht,
    };
    if (params.naam && !bestaand.prospect_naam) {
      updates.prospect_naam = params.naam;
    }
    if (bestaand.status === "nieuw" && params.bericht) {
      updates.status = "in_behandeling";
    }
    const { data } = await supabase
      .from("offerte_gesprekken")
      .update(updates)
      .eq("id", bestaand.id)
      .select("*")
      .single();
    return (data || bestaand) as OfferteGesprek;
  }

  const { data, error } = await supabase
    .from("offerte_gesprekken")
    .insert({
      prospect_telefoon: telefoon,
      prospect_naam: params.naam ?? null,
      status: "nieuw",
      laatste_bericht: params.bericht ?? null,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as OfferteGesprek;
}

export async function laadGesprekMetOffertes(
  gesprekId: string
): Promise<OfferteGesprek | null> {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("offerte_gesprekken")
    .select("*, offertes(*, offerte_regels(*))")
    .eq("id", gesprekId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;

  const gesprek = data as OfferteGesprek;
  if (gesprek.offertes) {
    gesprek.offertes = [...gesprek.offertes].sort(
      (a, b) => b.versie - a.versie
    );
    for (const o of gesprek.offertes) {
      if (o.offerte_regels) {
        o.offerte_regels = [...o.offerte_regels].sort(
          (a, b) => (a.volgorde ?? 0) - (b.volgorde ?? 0)
        );
      }
    }
  }
  return gesprek;
}

export async function maakOfferte(params: {
  gesprek_id: string;
  titel: string;
  omschrijving?: string;
  btw_percentage?: number;
  geldig_tot?: string | null;
  regels: OfferteRegel[];
}): Promise<Offerte> {
  const supabase = getServiceSupabase();
  const { data: laatste } = await supabase
    .from("offertes")
    .select("versie")
    .eq("gesprek_id", params.gesprek_id)
    .order("versie", { ascending: false })
    .limit(1)
    .maybeSingle();

  const versie = (laatste?.versie || 0) + 1;
  const bedrag = berekenTotaal(params.regels);

  // Markeer eerdere open offertes als vervangen
  await supabase
    .from("offertes")
    .update({ status: "vervangen" })
    .eq("gesprek_id", params.gesprek_id)
    .in("status", ["concept", "verstuurd", "wijziging_gevraagd"]);

  const { data: offerte, error } = await supabase
    .from("offertes")
    .insert({
      gesprek_id: params.gesprek_id,
      versie,
      status: "concept",
      titel: params.titel,
      omschrijving: params.omschrijving ?? null,
      bedrag_centen: bedrag,
      btw_percentage: params.btw_percentage ?? 21,
      geldig_tot: params.geldig_tot ?? null,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  if (params.regels.length > 0) {
    const { error: regelsError } = await supabase.from("offerte_regels").insert(
      params.regels.map((r, i) => ({
        offerte_id: offerte.id,
        omschrijving: r.omschrijving,
        aantal: r.aantal,
        eenheid: r.eenheid || "uur",
        prijs_centen: r.prijs_centen,
        volgorde: r.volgorde ?? i,
      }))
    );
    if (regelsError) throw new Error(regelsError.message);
  }

  await supabase
    .from("offerte_gesprekken")
    .update({ status: "in_behandeling", wacht_op: null })
    .eq("id", params.gesprek_id);

  const geladen = await laadGesprekMetOffertes(params.gesprek_id);
  const result = geladen?.offertes?.find((o) => o.id === offerte.id);
  if (!result) throw new Error("Offerte niet gevonden na aanmaken");
  return result;
}

export async function verstuurOfferte(offerteId: string): Promise<{
  offerte: Offerte;
  demo: boolean;
}> {
  const supabase = getServiceSupabase();
  const { data: offerteRow, error } = await supabase
    .from("offertes")
    .select("*, offerte_regels(*), offerte_gesprekken(*)")
    .eq("id", offerteId)
    .single();

  if (error || !offerteRow) {
    throw new Error(error?.message || "Offerte niet gevonden");
  }

  const gesprek = offerteRow.offerte_gesprekken as OfferteGesprek;
  const offerte = {
    ...offerteRow,
    offerte_regels: offerteRow.offerte_regels,
  } as Offerte;

  const body = formatOfferteBericht(offerte, gesprek.prospect_naam);
  const send = await sendWhatsappButtons(
    gesprek.prospect_telefoon,
    body,
    [
      { id: `offerte_akkoord_${offerte.id}`, title: "Akkoord" },
      { id: `offerte_wijziging_${offerte.id}`, title: "Wijziging" },
    ],
    `Offerte v${offerte.versie}`
  );

  if (!send.ok) {
    throw new Error(send.error || "Versturen mislukt");
  }

  await logBericht({
    gesprek_id: gesprek.id,
    richting: "uit",
    wa_message_id: send.messageId,
    type: "interactive",
    inhoud: body,
    raw: { demo: send.demo, buttons: ["Akkoord", "Wijziging"] },
  });

  const now = new Date().toISOString();
  await supabase
    .from("offertes")
    .update({ status: "verstuurd", verstuurd_at: now })
    .eq("id", offerte.id);

  await supabase
    .from("offerte_gesprekken")
    .update({
      status: "offerte_open",
      wacht_op: null,
      laatste_bericht: `Offerte v${offerte.versie} verstuurd`,
    })
    .eq("id", gesprek.id);

  return {
    offerte: { ...offerte, status: "verstuurd", verstuurd_at: now },
    demo: send.demo,
  };
}

async function accepteerOfferte(
  offerteId: string,
  gesprek: OfferteGesprek
): Promise<void> {
  const supabase = getServiceSupabase();
  const { data: offerte, error } = await supabase
    .from("offertes")
    .select("*, offerte_regels(*)")
    .eq("id", offerteId)
    .single();

  if (error || !offerte) throw new Error("Offerte niet gevonden");

  const now = new Date().toISOString();
  await supabase
    .from("offertes")
    .update({ status: "geaccepteerd", geaccepteerd_at: now })
    .eq("id", offerteId);

  await supabase
    .from("offerte_gesprekken")
    .update({
      status: "akkoord",
      wacht_op: null,
      laatste_bericht: "Prospect ging akkoord",
    })
    .eq("id", gesprek.id);

  const bevestiging = formatBevestiging(
    offerte as Offerte,
    gesprek.prospect_naam
  );
  const send = await sendWhatsappText(gesprek.prospect_telefoon, bevestiging);

  await logBericht({
    gesprek_id: gesprek.id,
    richting: "uit",
    wa_message_id: send.messageId,
    type: "text",
    inhoud: bevestiging,
    raw: { demo: send.demo },
  });

  const bevestigdAt = new Date().toISOString();
  await supabase
    .from("offertes")
    .update({ status: "bevestigd", bevestigd_at: bevestigdAt })
    .eq("id", offerteId);

  await supabase
    .from("offerte_gesprekken")
    .update({
      status: "bevestigd",
      laatste_bericht: "Bevestiging verstuurd",
    })
    .eq("id", gesprek.id);
}

async function startWijzigingsverzoek(
  offerteId: string,
  gesprek: OfferteGesprek
): Promise<void> {
  const supabase = getServiceSupabase();
  await supabase
    .from("offertes")
    .update({ status: "wijziging_gevraagd" })
    .eq("id", offerteId);

  await supabase
    .from("offerte_gesprekken")
    .update({
      status: "wijziging_gevraagd",
      wacht_op: "wijzigingstekst",
      laatste_bericht: "Wijziging gevraagd — wacht op toelichting",
    })
    .eq("id", gesprek.id);

  const vraag =
    "Oké, wat wil je graag wijzigen aan de offerte? Stuur je wijzigingsverzoek in één bericht.";
  const send = await sendWhatsappText(gesprek.prospect_telefoon, vraag);
  await logBericht({
    gesprek_id: gesprek.id,
    richting: "uit",
    wa_message_id: send.messageId,
    type: "text",
    inhoud: vraag,
    raw: { demo: send.demo },
  });
}

async function verwerkWijzigingstekst(
  gesprek: OfferteGesprek,
  tekst: string
): Promise<void> {
  const supabase = getServiceSupabase();
  const { data: offerte } = await supabase
    .from("offertes")
    .select("id")
    .eq("gesprek_id", gesprek.id)
    .eq("status", "wijziging_gevraagd")
    .order("versie", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (offerte) {
    await supabase
      .from("offertes")
      .update({ wijzigingsverzoek: tekst })
      .eq("id", offerte.id);
  }

  await supabase
    .from("offerte_gesprekken")
    .update({
      wacht_op: null,
      laatste_bericht: `Wijzigingsverzoek: ${tekst.slice(0, 200)}`,
    })
    .eq("id", gesprek.id);

  const ack =
    "Dank je, je wijzigingsverzoek is doorgegeven. Je krijgt zo snel mogelijk een aangepaste offerte.";
  const send = await sendWhatsappText(gesprek.prospect_telefoon, ack);
  await logBericht({
    gesprek_id: gesprek.id,
    richting: "uit",
    wa_message_id: send.messageId,
    type: "text",
    inhoud: ack,
    raw: { demo: send.demo },
  });
}

export async function verwerkInbound(message: InboundMessage): Promise<void> {
  const gesprek = await vindOfMaakGesprek({
    telefoon: message.from,
    naam: message.contactName,
    bericht:
      message.kind === "text"
        ? message.text
        : `Knop: ${message.buttonTitle}`,
  });

  await logBericht({
    gesprek_id: gesprek.id,
    richting: "in",
    wa_message_id: message.messageId,
    type: message.kind,
    inhoud:
      message.kind === "text" ? message.text : message.buttonTitle,
    raw: message.raw,
  });

  if (message.kind === "button") {
    const akkoord = message.buttonId.match(/^offerte_akkoord_(.+)$/);
    const wijziging = message.buttonId.match(/^offerte_wijziging_(.+)$/);
    if (akkoord) {
      await accepteerOfferte(akkoord[1], gesprek);
      return;
    }
    if (wijziging) {
      await startWijzigingsverzoek(wijziging[1], gesprek);
      return;
    }
  }

  if (message.kind === "text") {
    if (gesprek.wacht_op === "wijzigingstekst") {
      await verwerkWijzigingstekst(gesprek, message.text);
      return;
    }

    // Nieuwe aanvraag of vervolgvraag: bevestig ontvangst
    if (gesprek.status === "nieuw" || gesprek.status === "in_behandeling") {
      const ack =
        "Bedankt voor je bericht! We maken zo snel mogelijk een offerte en sturen die via WhatsApp.";
      const send = await sendWhatsappText(gesprek.prospect_telefoon, ack);
      await logBericht({
        gesprek_id: gesprek.id,
        richting: "uit",
        wa_message_id: send.messageId,
        type: "text",
        inhoud: ack,
        raw: { demo: send.demo },
      });
      const supabase = getServiceSupabase();
      await supabase
        .from("offerte_gesprekken")
        .update({ status: "in_behandeling" })
        .eq("id", gesprek.id);
    }
  }
}

/** Simuleer prospect-antwoord (handig zonder echte WhatsApp). */
export async function simuleerProspectActie(params: {
  gesprek_id: string;
  actie: "akkoord" | "wijziging" | "tekst";
  tekst?: string;
}): Promise<void> {
  const gesprek = await laadGesprekMetOffertes(params.gesprek_id);
  if (!gesprek) throw new Error("Gesprek niet gevonden");

  const actieve = (gesprek.offertes || []).find((o) =>
    ["verstuurd", "wijziging_gevraagd"].includes(o.status)
  );

  if (params.actie === "akkoord") {
    if (!actieve) throw new Error("Geen openstaande offerte om te accepteren");
    await verwerkInbound({
      kind: "button",
      from: gesprek.prospect_telefoon,
      messageId: `sim_akkoord_${Date.now()}`,
      buttonId: `offerte_akkoord_${actieve.id}`,
      buttonTitle: "Akkoord",
      contactName: gesprek.prospect_naam ?? undefined,
      raw: { simulated: true },
    });
    return;
  }

  if (params.actie === "wijziging") {
    if (!actieve) throw new Error("Geen openstaande offerte");
    await verwerkInbound({
      kind: "button",
      from: gesprek.prospect_telefoon,
      messageId: `sim_wijzig_${Date.now()}`,
      buttonId: `offerte_wijziging_${actieve.id}`,
      buttonTitle: "Wijziging",
      contactName: gesprek.prospect_naam ?? undefined,
      raw: { simulated: true },
    });
    return;
  }

  await verwerkInbound({
    kind: "text",
    from: gesprek.prospect_telefoon,
    messageId: `sim_tekst_${Date.now()}`,
    text: params.tekst || "Graag een lagere prijs",
    contactName: gesprek.prospect_naam ?? undefined,
    raw: { simulated: true },
  });
}
