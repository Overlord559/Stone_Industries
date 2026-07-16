# Stone Industries Website

Production marketing site for **Stone Industries LLC** — veteran-led technology services for Fresno, the Central Valley, and California remote-first business clients.

**Live:** https://stoneindustriesusa.com  
**Repo:** https://github.com/Overlord559/Stone_Industries  
**Local path:** `C:\dev\stone_industries website`

---

## Project Overview

React + TypeScript single-page homepage with static HTML funnel pages, a pricing estimator, inquiry capture backed by Supabase, server-side lead routing on Cloudflare Pages Functions, and Resend email notifications to the operator inbox. Calendly handles optional post-capture booking. HubSpot CRM sync is implemented but optional until a private app token is configured. Stripe checkout is **not** implemented — quotes and invoices use Bluevine/Wave/manual workflow.

**Tagline:** *Reliable Today. Autonomous Tomorrow.*

Agent routing and deeper operational docs: [`docs/PROJECT_OS_INDEX.md`](docs/PROJECT_OS_INDEX.md) · [`AGENTS.md`](AGENTS.md)

---

## Live Site

| URL | Role |
|-----|------|
| https://stoneindustriesusa.com | **Production** (Cloudflare Pages + DNS) |
| https://stoneindustries.netlify.app/ | Rollback mirror only — not primary |
| https://overlord559.github.io/Stone_Industries/ | GitHub Pages preview (`VITE_BASE_PATH=/Stone_Industries/`) |

**Deploy:** Push to `main` → Cloudflare Pages auto-build from GitHub.

---

## Business Context

Stone Industries sells practical local and remote technology services: PC builds, Tier 1 IT support, Wi-Fi/POS help, business websites, AI workflow setup, mobile MVP prototyping, and narrow operations coordination.

**Trust signals (bounded):** VOSB, SDVOSB, SAM.gov registration, and certified LLC are shown with disclaimers. The site does **not** claim awarded contracts, agency endorsement, DoD approval, or federal past performance.

**Payments today:** Written quote → Bluevine invoice or payment link / Wave — no card data collected on the website.

Canonical business plan: [`docs/STONE_INDUSTRIES_BUSINESS_PLAN.md`](docs/STONE_INDUSTRIES_BUSINESS_PLAN.md)

---

## Core Services

Source of truth: [`src/data/pricingCatalog.ts`](src/data/pricingCatalog.ts) · copy: [`src/data/site.ts`](src/data/site.ts)

| # | Service |
|---|---------|
| 1 | Custom PC Builds & Upgrades |
| 2 | Tier 1 IT Support & Tech Cleanup |
| 3 | Wi-Fi, Printer & POS Support |
| 4 | Business Websites & 3D Interactive Websites |
| 5 | AI Receptionist & Workflow Automation |
| 6 | Mobile App / MVP Prototyping |
| 7 | Operations & Technology Project Coordination |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 4 |
| 3D / motion | React Three Fiber, Three.js, framer-motion (restrained accents) |
| Static pages | HTML + vanilla JS in `public/` |
| Hosting | **Cloudflare Pages** (production) |
| DNS / edge | Cloudflare |
| Database | Supabase (`public.inquiries`) |
| Serverless API | Cloudflare Pages Functions (`functions/`) |
| Email notify | Resend (operator notification only) |
| CRM (optional) | HubSpot private app API |
| Scheduling | Calendly (external links) |
| Analytics (optional) | Google Analytics, Microsoft Clarity |

---

## Architecture

```text
Browser (React homepage + static HTML pages)
  │
  ├─ POST /api/inquiries  ──► Cloudflare Pages Function
  │                              ├─ validate + honeypot
  │                              ├─ Supabase insert (service role)  ← source of truth
  │                              ├─ Resend → edward@stoneindustriesusa.com
  │                              └─ HubSpot contact + note (if token set)
  │
  └─ fallback (local dev / API unavailable)
       └─ direct Supabase anon REST insert

Admin: GET/PATCH /admin/leads, /admin/lead-update (token + service role)
```

**MPA entries (Vite):** `/` · `/ai-revenue-leak-audit` · `/price-fit-calculator` · `/remote-support`

**Static funnel:** `public/pricing.html`, `public/services.html`, six `public/services/*.html`, legal pages, capability brief, vision.

Detail: [`docs/PRODUCTION_SYSTEM_AUDIT.md`](docs/PRODUCTION_SYSTEM_AUDIT.md)

---

## Lead Capture Pipeline

1. Customer submits inquiry (React `InquiryForm`, static `inquiry-form.js`, package modal, audit form).
2. Frontend POSTs to **`/api/inquiries`** first.
3. Cloudflare Function validates payload and inserts into **Supabase** — required for customer success.
4. **Resend** sends operator notification when `RESEND_API_KEY` + `RESEND_FROM` are configured.
5. **HubSpot** sync attempts when `HUBSPOT_PRIVATE_APP_TOKEN` is configured.
6. Customer sees **Inquiry received** only after Supabase save succeeds.
7. **Calendly** booking is optional on the success panel — never required before capture.
8. Manual copy / email draft / phone fallback only when save fails.

**Verified production notification:**
- From: `Stone Industries <notifications@notify.stoneindustriesusa.com>`
- To: `edward@stoneindustriesusa.com`
- Subject pattern: `New Stone inquiry — {service} — {name}`

**Rules (do not break):** No auto mailto on submit · no fake success · no secrets in frontend · no query-string dependency for capture behavior.

Detail: [`docs/CRM_HUBSPOT_LEAD_ROUTING.md`](docs/CRM_HUBSPOT_LEAD_ROUTING.md) · **STONE-037**, **STONE-039** in [`docs/DESIGN_MISTAKE_LEDGER.md`](docs/DESIGN_MISTAKE_LEDGER.md)

---

## APIs / Integrations

| Integration | Purpose | Implementation | Status |
|-------------|---------|----------------|--------|
| Cloudflare Pages | Production host + CI | GitHub `main` auto-deploy | **Live** |
| Cloudflare DNS | Domain, HTTPS, edge | `stoneindustriesusa.com` | **Live** |
| Cloudflare Functions | Lead router + admin CRM | `functions/api/inquiries.js`, `functions/admin/*` | **Live** |
| Supabase | Inquiry persistence | RLS anon insert + service role in Functions | **Live** |
| Resend | Operator email notify | `/api/inquiries` server-side | **Live** (when env set) |
| HubSpot | CRM backup | `/api/inquiries` server-side | **Optional** — needs token |
| Calendly | Post-capture booking | External links in CTAs / success panel | **Live** |
| Google Workspace | Business email | `edward@stoneindustriesusa.com` | **Live** (operator inbox) |
| Bluevine / Wave | Invoices & payment links | Manual off-site workflow | **Current payment path** |
| Stripe | Hosted checkout | Not implemented | **Deferred** |
| GA / Clarity | Analytics | Optional `VITE_*` vars | Optional |

Full inventory: [`docs/PRODUCTION_SYSTEM_AUDIT.md`](docs/PRODUCTION_SYSTEM_AUDIT.md)

---

## Environment Variables

**Never commit real values.** Names only below.

### Browser / build (Cloudflare Pages build env)

| Variable | Purpose |
|----------|---------|
| `VITE_BASE_PATH` | `/` for production root deploy |
| `VITE_SUPABASE_URL` | Supabase project URL (anon path fallback) |
| `VITE_SUPABASE_ANON_KEY` | Public anon key only |
| `VITE_GA_MEASUREMENT_ID` | Optional Google Analytics |
| `VITE_CLARITY_PROJECT_ID` | Optional Microsoft Clarity |

### Server / Functions only (never prefix with `VITE_`)

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | Supabase REST base for lead router + admin |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side insert/read/update |
| `STONE_ADMIN_TOKEN` | `/admin/leads.html` auth header |
| `RESEND_API_KEY` | Send operator notification |
| `RESEND_FROM` | Verified sender, e.g. `Stone Industries <notifications@notify.stoneindustriesusa.com>` |
| `STONE_NOTIFY_EMAIL` | Defaults to `edward@stoneindustriesusa.com` |
| `HUBSPOT_PRIVATE_APP_TOKEN` | Optional HubSpot CRM sync |

Template: [`.env.example`](.env.example)

---

## Local Development

```powershell
cd "C:\dev\stone_industries website"
npm install
npm run dev
```

- Copy `.env.example` → `.env.local` and set `VITE_SUPABASE_*` for direct Supabase fallback testing.
- `/api/inquiries` is **not** available in plain `vite dev` — submit falls back to direct Supabase anon insert.
- For full Function testing locally, use Cloudflare Wrangler Pages dev or test on a Cloudflare preview deployment.

---

## Build / Deploy

```powershell
npm run build    # tsc + vite → dist/
npm run lint
npm run preview  # optional local dist preview
```

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Functions directory | `functions/` |
| Production branch | `main` |

GitHub Pages mirror (optional): set `VITE_BASE_PATH=/Stone_Industries/` before build.

Runbook: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) · [`docs/CLOUDFLARE_MIGRATION.md`](docs/CLOUDFLARE_MIGRATION.md)

---

## Cloudflare Pages Production Notes

- **Cache:** `public/_headers` sets `no-cache` on HTML and lead-capture JS; hashed `/assets/*` is immutable.
- **After inquiry/JS changes:** bump `LEAD_CAPTURE_ASSET_VERSION` in `vite.config.ts` and purge Cloudflare cache.
- **Post-deploy QA:** Test canonical URL (not `?v=` params) — [`docs/QA_CHECKLIST.md`](docs/QA_CHECKLIST.md)
- **Rollback:** Netlify mirror remains available until Cloudflare is fully smoke-tested.

---

## Security / Privacy Notes

- HTTPS via Cloudflare; security headers in `public/_headers` (CSP, X-Frame-Options, nosniff, Permissions-Policy).
- No card storage or Stripe SDK on site.
- Service role, Resend, HubSpot, and admin tokens are **Functions-only**.
- Supabase RLS: anon **insert-only** on `public.inquiries` — see [`docs/supabase/stone-industries-inquiries.sql`](docs/supabase/stone-industries-inquiries.sql).
- **Deferred:** CAPTCHA/rate limiting, stricter CSP, customer confirmation email, audit log hardening.

---

## Payment Status

| Item | Status |
|------|--------|
| On-site checkout | **None** |
| Stripe | **Deferred** — see [`docs/PAYMENT_PHASE2.md`](docs/PAYMENT_PHASE2.md) |
| Current flow | Quote → Bluevine/Wave invoice or payment link → manual confirmation |
| Deposits | Described on pricing page; collected off-site |

---

## Deferred Roadmap

- HubSpot token configuration (code ready)
- Customer-facing confirmation email (Resend)
- Stripe Payment Links for standardized packages
- CAPTCHA / rate limiting on `/api/inquiries`
- CSP hardening
- JARVIS / StoneOS cockpit integration (Operator Brain — after lead workflow gates)

---

## Resume / Portfolio Summary

Evidence-based summary for LinkedIn, resume, and portfolio: [`docs/RESUME_PROJECT_SUMMARY.md`](docs/RESUME_PROJECT_SUMMARY.md)

**One-liner:** Built and deployed Stone Industries’ production website with React/Vite, Cloudflare Pages, Supabase lead capture, Resend email notifications, Calendly booking, and documented CRM/HubSpot routing.

---

## Maintenance Checklist

- [ ] Submit test inquiry on https://stoneindustriesusa.com — Supabase row + Edward email
- [ ] Purge Cloudflare cache after lead-capture JS or HTML changes
- [ ] Run `npm run build` + `npm run lint` before merge
- [ ] Verify `/admin/leads.html` on production when using admin CRM
- [ ] Keep Netlify rollback until operator retires it
- [ ] Do not expose secrets in `VITE_*` or README
- [ ] Preserve capture-first inquiry behavior on any lead-form change

Operator handoff: [`docs/OPERATOR_BRAIN_HANDOFF.md`](docs/OPERATOR_BRAIN_HANDOFF.md)

---

## Documentation Index

| Doc | Purpose |
|-----|---------|
| [`docs/PROJECT_OS_INDEX.md`](docs/PROJECT_OS_INDEX.md) | Agent task routing |
| [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) | Live product state |
| [`docs/PRODUCTION_SYSTEM_AUDIT.md`](docs/PRODUCTION_SYSTEM_AUDIT.md) | Full system audit |
| [`docs/QA_CHECKLIST.md`](docs/QA_CHECKLIST.md) | Post-deploy QA |
| [`docs/CONVERSION_NOTES.md`](docs/CONVERSION_NOTES.md) | CTA hierarchy |
| [`docs/DESIGN_MISTAKE_LEDGER.md`](docs/DESIGN_MISTAKE_LEDGER.md) | Regression lessons |
