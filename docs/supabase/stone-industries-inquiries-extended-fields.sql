-- Stone Industries — additive package-request fields for public.inquiries
-- Run AFTER stone-industries-inquiries.sql in Supabase SQL Editor.
-- Safe to run multiple times (IF NOT EXISTS / drop+recreate grant).
-- Frontend tries enhanced insert first; falls back to legacy columns if migration not applied.

alter table public.inquiries
  add column if not exists customer_type text
    check (customer_type is null or customer_type in ('residential', 'business')),
  add column if not exists business_name text
    check (business_name is null or char_length(trim(business_name)) <= 120),
  add column if not exists selected_package text
    check (selected_package is null or char_length(trim(selected_package)) <= 200),
  add column if not exists package_price_or_estimate text
    check (package_price_or_estimate is null or char_length(trim(package_price_or_estimate)) <= 120),
  add column if not exists urgency text
    check (urgency is null or urgency in ('today', 'this_week', 'this_month', 'planning')),
  add column if not exists preferred_contact text
    check (preferred_contact is null or preferred_contact in ('phone', 'email', 'text')),
  add column if not exists service_address_or_area text
    check (service_address_or_area is null or char_length(trim(service_address_or_area)) <= 200),
  add column if not exists best_time_to_contact text
    check (best_time_to_contact is null or char_length(trim(best_time_to_contact)) <= 120),
  add column if not exists wants_deposit_link boolean not null default false,
  add column if not exists estimator_selections jsonb,
  add column if not exists request_metadata jsonb;

create index if not exists inquiries_selected_package_idx
  on public.inquiries (selected_package)
  where selected_package is not null;

create index if not exists inquiries_source_page_idx
  on public.inquiries (source_page)
  where source_page is not null;

-- Extend anon INSERT grant (insert-only RLS unchanged).
revoke all on public.inquiries from anon;
grant insert (
  name,
  email,
  phone,
  service_requested,
  city,
  message,
  source_page,
  customer_type,
  business_name,
  selected_package,
  package_price_or_estimate,
  urgency,
  preferred_contact,
  service_address_or_area,
  best_time_to_contact,
  wants_deposit_link,
  estimator_selections,
  request_metadata
) on public.inquiries to anon;
