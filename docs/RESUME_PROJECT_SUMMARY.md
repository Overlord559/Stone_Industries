# Stone Industries — Resume / Portfolio Summary

**Last updated:** 2026-06-13  
**Evidence base:** Production site at https://stoneindustriesusa.com · repo commit `db3c4b2` · operator-verified Resend notifications

Use this file for resume bullets, LinkedIn project descriptions, and portfolio case studies. Keep claims aligned with [`docs/PRODUCTION_SYSTEM_AUDIT.md`](PRODUCTION_SYSTEM_AUDIT.md) and [`docs/SAFETY_BOUNDARIES.md`](SAFETY_BOUNDARIES.md).

---

## Project headline

**Stone Industries Website** — Production marketing site and capture-first lead pipeline for a veteran-led technology services business (Fresno / Central Valley + California remote-first delivery).

---

## Full resume bullets

- Built and deployed a production business website for Stone Industries using **React, TypeScript, Vite, and Tailwind CSS**, hosted on **Cloudflare Pages** with automatic deploys from GitHub `main`.
- Implemented a **capture-first inquiry pipeline** with **Cloudflare Pages Functions**, **Supabase** persistence, and **Resend** operator email notifications — customer success gated on database save, not mailto drafts.
- Configured production **domain, DNS, HTTPS, cache headers, and security headers** (CSP, X-Frame-Options, nosniff) through Cloudflare; resolved stale-cache lead-capture issues with `no-cache` policy and build-stamped JS versioning.
- Built **service and pricing pages**, a **package pricing estimator**, static fallback inquiry forms, and a **server-side lead router** with documented env-var contract and anon-key fallback for local dev.
- Integrated **Calendly** booking as optional post-capture scheduling; designed **HubSpot CRM sync** as an optional server-side route (contact create/update + note) without blocking customer success.
- Applied **conversion-focused UX** improvements: inquiry-first CTAs, bounded GovCon trust signals, professional contact fallback (copy email / manual draft / phone), and production QA workflows documented in Project OS.
- Maintained **honest commercial boundaries** — no fake testimonials, no on-site card checkout, no inflated certification or contract claims; payments via manual quote and off-site invoice workflow.

---

## Technical skills demonstrated

| Category | Tools / patterns |
|----------|------------------|
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 4, framer-motion, R3F/Three.js |
| Static / hybrid | Multi-page Vite build, vanilla JS inquiry modules, HTML funnel pages |
| Backend / edge | Cloudflare Pages Functions, REST integration, honeypot validation |
| Data | Supabase Postgres, RLS anon insert, service-role server writes |
| Email | Resend transactional API, verified sender subdomain |
| CRM | HubSpot CRM v3 contacts + notes API (optional integration) |
| DevOps | GitHub CI → Cloudflare Pages, `_headers` cache/security policy, env separation |
| Documentation | Project OS, design mistake ledger, QA checklists, operator handoffs |

---

## Architecture one-paragraph (portfolio)

Stone Industries’ site combines a React homepage with static HTML conversion pages. Inquiry forms POST to a Cloudflare Function that validates input, saves to Supabase as the source of truth, notifies the operator via Resend, and optionally syncs HubSpot. The frontend never sees service-role or email API keys; local development falls back to Supabase anon insert when the Function route is unavailable. Calendly handles scheduling after capture; payments remain off-site via quote and invoice.

---

## LinkedIn / resume short version

> Built and deployed Stone Industries’ production website with React/Vite, Cloudflare Pages, Supabase lead capture, Resend email notifications, Calendly booking, and documented CRM/HubSpot routing.

---

## Interview talking points (truthful)

1. **Why Supabase first?** Reliable structured lead storage with RLS; operator can query Table Editor and admin CRM; email is notification layer, not source of truth.
2. **Why Cloudflare Functions?** Same deploy as static site, no separate backend host, secrets stay server-side, $0 tier aligned with operator cash mode.
3. **Cache bug lesson:** Canonical URL served stale inquiry JS until HTML/JS cache headers + build stamp + purge — documented as STONE-038.
4. **Capture-first lesson:** Auto mailto on submit lost leads — fixed in STONE-037; success only after save.
5. **What you did NOT build:** Stripe checkout, custom scheduler, full MSP portal, guaranteed lead gen, or fake social proof.

---

## Metrics you can cite (if asked)

- **7** productized service lines with pricing catalog source of truth
- **6** static service detail pages + pricing estimator + audit landing page
- **3** serverless API routes (inquiries + admin list + admin update)
- **0** card-data touchpoints on the marketing site

Do not invent traffic, conversion rate, or revenue numbers unless operator provides them.

---

## Related files

- [`README.md`](../README.md) — project overview
- [`docs/OPERATOR_BRAIN_HANDOFF.md`](OPERATOR_BRAIN_HANDOFF.md) — operator state
- [`docs/CRM_HUBSPOT_LEAD_ROUTING.md`](CRM_HUBSPOT_LEAD_ROUTING.md) — pipeline detail
