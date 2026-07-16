# Stone Industries — Production System Audit

**Audit date:** 2026-06-13  
**HEAD:** `db3c4b2` (Add server-side lead router for inquiry email and HubSpot sync)  
**Auditor:** Cursor agent pass (docs + repo inspection; no business logic changes)

---

## Executive summary

Stone Industries is a **production-ready marketing and lead-capture system** on Cloudflare Pages with a capture-first inquiry pipeline, verified Resend operator notifications, optional HubSpot sync, and strong conversion/documentation discipline. Netlify is no longer the production host. Stripe is deferred. Primary remaining gaps are optional CRM token, spam/rate-limit hardening, and customer confirmation email.

---

## Repo structure

| Area | Path | Notes |
|------|------|-------|
| React app | `src/` | Homepage, sections, inquiry forms, audit landing |
| Static HTML | `public/*.html`, `public/services/*.html` | Pricing, services, legal, capability brief |
| MPA entries | `ai-revenue-leak-audit/`, `price-fit-calculator/`, `remote-support/` | Vite multi-page build inputs |
| Lead capture JS | `public/inquiry-form.js`, `inquiry-submit.js`, `package-request-form.js` | Cache-busted at build |
| Serverless | `functions/api/inquiries.js`, `functions/admin/*` | Cloudflare Pages Functions |
| Legacy Netlify | `netlify/functions/*` | Rollback only |
| Pricing catalog | `src/data/pricingCatalog.ts` → `public/pricing-catalog.js` | Single source of truth |
| Supabase schema | `docs/supabase/*.sql` | Operator-run migrations |
| Project OS | `docs/`, `AGENTS.md` | Agent + operator truth |

---

## Frontend

| Item | Detail |
|------|--------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 (`tsc -b && vite build`) |
| Styling | Tailwind CSS 4 |
| 3D accents | React Three Fiber / Three.js (desktop, reduced on mobile) |
| Motion | framer-motion (restrained) |
| Icons | lucide-react |

### React surfaces

- Homepage (`index.html` → `src/App.tsx`)
- Contact / inquiry: `InquiryForm.tsx`
- Revenue leak audit: `RevenueLeakAuditForm.tsx` + `/ai-revenue-leak-audit`
- Sections: Hero, Services, About, Contact, etc.

### Static surfaces

- `pricing.html` — catalog, estimator, package request modal, inquiry section
- `services.html` — service overview + inquiry
- Six service detail pages under `public/services/`
- `vision.html`, `privacy.html`, `terms.html`, `capability-brief.html`
- Admin shell: `admin/leads.html` (unlinked, token auth)

---

## Deployment

| Item | Value |
|------|-------|
| **Production host** | Cloudflare Pages |
| **Domain** | stoneindustriesusa.com (Cloudflare DNS) |
| **CI** | GitHub `main` → auto deploy |
| **Build output** | `dist/` |
| **Functions** | `functions/` at repo root |
| **Rollback** | stoneindustries.netlify.app |
| **Preview mirror** | overlord559.github.io/Stone_Industries/ |

Redirects: `public/_redirects` (copied to dist)

---

## API / Function endpoints

| Route | File | Method | Auth | Purpose |
|-------|------|--------|------|---------|
| `/api/inquiries` | `functions/api/inquiries.js` | POST | Public | Lead router |
| `/admin/leads` | `functions/admin/leads.js` | GET | `X-Stone-Admin-Token` | List inquiries |
| `/admin/lead-update` | `functions/admin/lead-update.js` | PATCH | `X-Stone-Admin-Token` | Update status |

---

## Integration inventory

| Integration | Purpose | Where implemented | Env vars (names only) | Status | Notes |
|-------------|---------|-------------------|------------------------|--------|-------|
| Cloudflare Pages | Static + Functions hosting | Dashboard + GitHub | (dashboard config) | **Live** | Production |
| Cloudflare DNS | Domain, HTTPS, edge | Cloudflare dashboard | — | **Live** | HSTS at edge (Cloudflare default) |
| Cloudflare Pages Functions | Lead router, admin API | `functions/` | See server vars below | **Live** | |
| Supabase | Inquiry DB | REST via Function + anon fallback | `VITE_SUPABASE_*`, `SUPABASE_*` | **Live** | RLS insert-only for anon |
| Resend | Operator email notify | `functions/api/inquiries.js` | `RESEND_API_KEY`, `RESEND_FROM`, `STONE_NOTIFY_EMAIL` | **Live** | Verified sender on notify subdomain |
| HubSpot | CRM contact + note | `functions/api/inquiries.js` | `HUBSPOT_PRIVATE_APP_TOKEN` | **Optional** | Code ready; token may be unset |
| Calendly | Booking after capture | Links in `site.ts`, static HTML, success panel | — | **Live** | External; no embed required |
| Google Workspace | Business email inbox | Operator email | — | **Live** | edward@stoneindustriesusa.com |
| Bluevine / Wave | Invoices & payment links | Off-site manual | — | **Current** | No site checkout |
| Stripe | Hosted payments | Not in repo | — | **Deferred** | docs/PAYMENT_PHASE2.md |
| Google Analytics | Optional traffic | `analytics-config.js` | `VITE_GA_MEASUREMENT_ID` | Optional | |
| Microsoft Clarity | Optional heatmaps | `analytics-config.js` | `VITE_CLARITY_PROJECT_ID` | Optional | |

### Environment variables

**Browser / build**

- `VITE_BASE_PATH`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GA_MEASUREMENT_ID` (optional)
- `VITE_CLARITY_PROJECT_ID` (optional)

**Server / Functions**

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STONE_ADMIN_TOKEN`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `STONE_NOTIFY_EMAIL`
- `HUBSPOT_PRIVATE_APP_TOKEN`

---

## Lead pipeline (verified design)

```text
Customer submit
  → frontend POST /api/inquiries
  → validate (name, service_requested, message, email OR phone, honeypot)
  → Supabase INSERT (service role) — customer success gate
  → Resend email → edward@stoneindustriesusa.com (when configured)
  → HubSpot contact + note (when token configured)
  → JSON { saved, emailNotified, hubspotSynced, inquiryId? }
  → UI: "Inquiry received" + optional Calendly + manual fallbacks
```

**Verified behaviors**

| Check | Result |
|-------|--------|
| No auto mailto on submit | Pass — manual buttons only |
| No fake success | Pass — success only after save |
| No secrets in frontend | Pass — service role / Resend / HubSpot server-only |
| No query-string capture dependency | Pass — only `?service=` for preselect |
| Cache-safe lead JS | Pass — `_headers` + build stamp |
| Supabase columns | `name`, `email`, `phone`, `service_requested`, `city`, `message`, `source_page`, `status`, `created_at` + optional extended fields |

**Production email (operator-verified)**

- From: `Stone Industries <notifications@notify.stoneindustriesusa.com>`
- To: `edward@stoneindustriesusa.com`
- Example subject: `New Stone inquiry — General Inquiry — Edward Stone`

---

## Security / production readiness

| Control | Status | Evidence |
|---------|--------|----------|
| HTTPS | Live | Cloudflare |
| Security headers | Implemented | `public/_headers` — CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy |
| Cache policy | Implemented | HTML + lead JS `no-cache`; assets immutable |
| No card storage | Pass | No Stripe SDK; no checkout forms |
| No committed secrets | Pass (audit) | `.env.example` placeholders only |
| Supabase RLS | Documented | `stone-industries-inquiries.sql` — anon insert only |
| Service role isolation | Pass | Functions env only |
| Resend sender domain | Verified (operator) | notify.stoneindustriesusa.com |
| DMARC/SPF/DKIM | Partial | Resend notify subdomain — full marketing domain alignment optional |
| CAPTCHA / rate limit | **Deferred** | Honeypot only today |
| CSP hardening | **Partial** | `'unsafe-inline'` for scripts/styles |
| HubSpot token | **Optional** | May not be set in production |
| Admin CRM hardening | **Basic** | Shared token; unlinked URL |
| Customer confirm email | **Deferred** | EMAIL_PHASE2.md |

---

## Business positioning audit

| Claim type | Site behavior |
|------------|---------------|
| VOSB / SDVOSB / SAM / LLC | Shown with bounded disclaimer |
| Awarded contracts | **Not claimed** |
| Agency / DoD endorsement | **Not claimed** |
| Full MSP / 3PL / freight broker | **Not claimed** — ops coordination is narrow |
| Guaranteed leads / revenue | **Not claimed** |
| Autonomous unsupervised AI | **Not claimed** on current services |

---

## Documentation map

| Doc | Role |
|-----|------|
| `README.md` | Public project summary |
| `docs/PRODUCTION_SYSTEM_AUDIT.md` | This audit |
| `docs/CRM_HUBSPOT_LEAD_ROUTING.md` | Lead router detail |
| `docs/CLOUDFLARE_MIGRATION.md` | Deploy runbook |
| `docs/OPERATOR_BRAIN_HANDOFF.md` | Cross-repo handoff |
| `docs/RESUME_PROJECT_SUMMARY.md` | Portfolio bullets |
| `docs/DESIGN_MISTAKE_LEDGER.md` | STONE-037, STONE-038, STONE-039 |

---

## Stale doc flags (corrected in this pass)

- `README.md` — was GitHub-Pages-only stub → replaced
- `docs/PROJECT_CONTEXT.md` — inquiry section updated to lead router + Resend
- `docs/ADMIN_CRM.md` — still references Netlify as primary (minor; Cloudflare path documented in CLOUDFLARE_MIGRATION)
- `docs/PRODUCTION_READINESS.md` — live URL still mentions Netlify canonical in places

---

## Recommended next actions

1. Set `HUBSPOT_PRIVATE_APP_TOKEN` when CRM sync is wanted
2. Move one test lead through admin CRM: new → contacted → booked
3. Add rate limiting or Turnstile on `/api/inquiries` before aggressive ad spend
4. Customer confirmation email (second Resend use case)
5. Retire Netlify rollback after extended Cloudflare stability
6. Update Operator Brain `current-state.md` from [`OPERATOR_BRAIN_HANDOFF.md`](OPERATOR_BRAIN_HANDOFF.md)
