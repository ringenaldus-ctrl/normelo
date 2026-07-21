-- WhatsApp offerte-flow voor klusjesman ↔ prospect
-- Voer uit in de Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists offerte_gesprekken (
  id uuid primary key default gen_random_uuid(),
  prospect_naam text,
  prospect_telefoon text not null,
  status text not null default 'nieuw'
    check (status in (
      'nieuw',
      'in_behandeling',
      'offerte_open',
      'wijziging_gevraagd',
      'akkoord',
      'bevestigd',
      'geannuleerd'
    )),
  wacht_op text
    check (wacht_op is null or wacht_op in ('wijzigingstekst')),
  laatste_bericht text,
  notities text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists offerte_gesprekken_telefoon_actief_idx
  on offerte_gesprekken (prospect_telefoon)
  where status not in ('bevestigd', 'geannuleerd');

create table if not exists offertes (
  id uuid primary key default gen_random_uuid(),
  gesprek_id uuid not null references offerte_gesprekken(id) on delete cascade,
  versie integer not null default 1,
  status text not null default 'concept'
    check (status in (
      'concept',
      'verstuurd',
      'wijziging_gevraagd',
      'geaccepteerd',
      'bevestigd',
      'vervangen',
      'geannuleerd'
    )),
  titel text not null,
  omschrijving text,
  bedrag_centen integer not null check (bedrag_centen >= 0),
  btw_percentage numeric(5,2) not null default 21,
  geldig_tot date,
  wijzigingsverzoek text,
  verstuurd_at timestamptz,
  geaccepteerd_at timestamptz,
  bevestigd_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (gesprek_id, versie)
);

create table if not exists offerte_regels (
  id uuid primary key default gen_random_uuid(),
  offerte_id uuid not null references offertes(id) on delete cascade,
  omschrijving text not null,
  aantal numeric(10,2) not null default 1,
  eenheid text not null default 'uur',
  prijs_centen integer not null check (prijs_centen >= 0),
  volgorde integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists whatsapp_berichten (
  id uuid primary key default gen_random_uuid(),
  gesprek_id uuid references offerte_gesprekken(id) on delete set null,
  richting text not null check (richting in ('in', 'uit')),
  wa_message_id text,
  type text not null default 'text',
  inhoud text,
  raw jsonb,
  created_at timestamptz not null default now()
);

create index if not exists whatsapp_berichten_gesprek_idx
  on whatsapp_berichten (gesprek_id, created_at desc);

create index if not exists offertes_gesprek_idx
  on offertes (gesprek_id, versie desc);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists offerte_gesprekken_updated_at on offerte_gesprekken;
create trigger offerte_gesprekken_updated_at
  before update on offerte_gesprekken
  for each row execute function set_updated_at();

drop trigger if exists offertes_updated_at on offertes;
create trigger offertes_updated_at
  before update on offertes
  for each row execute function set_updated_at();
