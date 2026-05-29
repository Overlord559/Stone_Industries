-- Stone Industries — CRM admin status workflow
-- Run AFTER stone-industries-inquiries.sql and extended-fields migration.
-- Maps legacy statuses and expands allowed values for admin CRM v0.

-- Legacy mapping (safe if already migrated)
update public.inquiries set status = 'contacted' where status = 'reviewed';
update public.inquiries set status = 'lost' where status = 'closed';

alter table public.inquiries drop constraint if exists inquiries_status_check;

alter table public.inquiries
  add constraint inquiries_status_check
  check (status in ('new', 'contacted', 'quoted', 'booked', 'won', 'lost'));

-- Admin reads/updates use service role in Netlify Functions only — not browser anon key.
