-- Zenvio Labs lead capture
-- Run in Supabase → SQL Editor (or any Postgres compatible with RLS).

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  email           text not null,
  phone           text,
  company         text,
  service         text,
  budget          text,
  message         text,
  preferred_date  text,
  preferred_time  text,
  source          text not null default 'website',
  created_at      timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

drop policy if exists "Allow public inserts" on public.leads;
create policy "Allow public inserts"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- No public select / update / delete.
-- Read leads from the Supabase dashboard or a service-role client.

comment on table public.leads is 'Website contact and booking submissions for Zenvio Labs.';
