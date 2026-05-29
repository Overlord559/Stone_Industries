# Stone Admin CRM v0

**Last updated:** 2026-05-28  
**Purpose:** Internal lead dashboard for package requests and inquiries — better than raw Supabase Table Editor.

---

## Route

| Item | Value |
|------|-------|
| **URL** | `/admin/leads.html` (unlinked — bookmark only) |
| **Auth** | `STONE_ADMIN_TOKEN` header via Netlify Functions |
| **Data** | Supabase `public.inquiries` via service role (server-side only) |

---

## Required Netlify environment variables

Set in **Netlify UI → Site configuration → Environment variables** (never commit):

| Variable | Scope | Purpose |
|----------|-------|---------|
| `SUPABASE_URL` | Functions | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Functions | Server-side read/update only |
| `STONE_ADMIN_TOKEN` | Functions | Shared secret Edward enters on admin page |

Existing public vars unchanged:

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Browser insert (anon key path) |
| `VITE_SUPABASE_ANON_KEY` | Browser insert only |

**Never** put `SUPABASE_SERVICE_ROLE_KEY` in `VITE_*` or browser code.

---

## Supabase migrations (operator order)

1. [`stone-industries-inquiries.sql`](supabase/stone-industries-inquiries.sql)
2. [`stone-industries-inquiries-extended-fields.sql`](supabase/stone-industries-inquiries-extended-fields.sql)
3. [`stone-industries-inquiries-admin-status.sql`](supabase/stone-industries-inquiries-admin-status.sql) — CRM status workflow

---

## Files

| File | Role |
|------|------|
| `netlify/functions/admin-leads.js` | List/filter leads (GET) |
| `netlify/functions/admin-lead-update.js` | Status update only (PATCH) |
| `public/admin/leads.html` | Admin UI shell |
| `public/admin/leads.js` | Token gate, filters, detail panel |
| `public/admin/leads.css` | Minimal internal styling |

---

## Security model (v0)

- Browser stores admin token in **sessionStorage** only
- Functions reject missing/invalid `X-Stone-Admin-Token`
- Service role key used **only** in Netlify Functions
- Page is `noindex, nofollow` — not linked from public site
- **TODO:** Replace token gate with proper auth (OAuth/magic link) when email + operator login stack exists

---

## Lead fields visible

- name, email, phone, city
- service_requested, message, source_page, created_at
- customer_type, business_name
- selected_package, package_price_or_estimate
- urgency, preferred_contact
- service_address_or_area, best_time_to_contact
- wants_deposit_link, estimator_selections, request_metadata

---

## Status workflow

| Status | Meaning |
|--------|---------|
| `new` | Just submitted |
| `contacted` | Edward reached out |
| `quoted` | Quote sent in writing |
| `booked` | Work scheduled |
| `won` | Completed / paid |
| `lost` | Declined / no response / closed |

---

## Intentionally not built (v0)

- No deletes
- No bulk actions
- No payment actions
- No outbound email from admin
- No Stripe integration
- No customer-facing portal
- No Resend/email automation

---

## Operator smoke test

1. Run admin status SQL in Supabase
2. Set Netlify env vars + redeploy
3. Submit test package request on `/pricing.html`
4. Open `/admin/leads.html`, enter token
5. Confirm lead appears with structured fields
6. Update status → verify in Supabase Table Editor

---

## Related

- Hybrid tools: `c:\dev\operator-brain\docs\HYBRID_TOOL_DOCTRINE.md`
- Booking (Calendly v0): [`BOOKINGOPS_PHASE2.md`](BOOKINGOPS_PHASE2.md)
- Deployment: [`DEPLOYMENT.md`](DEPLOYMENT.md)
- Outbound email/SMS (Phase 2): [`EMAIL_PHASE2.md`](EMAIL_PHASE2.md)
- Payments (Phase 2): [`PAYMENT_PHASE2.md`](PAYMENT_PHASE2.md)
