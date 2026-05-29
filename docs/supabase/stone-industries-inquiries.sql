-- Stone Industries — minimal inquiry capture
-- Run in Supabase SQL Editor (Project → SQL → New query)
-- Client uses anon key only; no service role in frontend.

create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 100),
  email text check (email is null or char_length(trim(email)) <= 254),
  phone text check (phone is null or char_length(trim(phone)) <= 40),
  service_requested text not null check (char_length(trim(service_requested)) between 2 and 120),
  city text check (city is null or char_length(trim(city)) <= 100),
  message text not null check (char_length(trim(message)) between 10 and 2000),
  source_page text check (source_page is null or char_length(source_page) <= 500),
  status text not null default 'new' check (status in ('new', 'reviewed', 'closed')),
  created_at timestamptz not null default now(),
  constraint inquiries_email_or_phone check (
    nullif(trim(coalesce(email, '')), '') is not null
    or nullif(trim(coalesce(phone, '')), '') is not null
  )
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

alter table public.inquiries enable row level security;

-- Anonymous site visitors may INSERT only (no read/update/delete).
drop policy if exists "anon_insert_inquiries" on public.inquiries;
create policy "anon_insert_inquiries"
  on public.inquiries
  for insert
  to anon
  with check (status = 'new');

revoke all on public.inquiries from anon;
grant insert (name, email, phone, service_requested, city, message, source_page)
  on public.inquiries to anon;

-- Authenticated dashboard access is out of scope for this pass.
-- Use Supabase Table Editor or service role in a trusted admin context only.
--
-- Extended package-request columns (optional): see stone-industries-inquiries-extended-fields.sql
