# Stone Industries — Project Context

**Last updated:** 2026-05-25 · **Project OS v2**  
**Live production:** https://stoneindustries.netlify.app/ (Netlify Free, `VITE_BASE_PATH=/`) — see [`DEPLOYMENT.md`](DEPLOYMENT.md)  
**Mirror / preview:** https://overlord559.github.io/Stone_Industries/ (GitHub Pages)  
**Repo:** `stone_industries website` · branch `main`  
**Routing:** [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md)

---

## Positioning

**Tagline:** *Reliable Today. Autonomous Tomorrow.* — current five services are “today”; Vision section is “tomorrow” only.

---

## Current state

- React + TypeScript + Vite + Tailwind CSS marketing site
- React Three Fiber for restrained interactive orb accents (desktop)
- Cinematic parallax backgrounds (main DALRM hero + lower coastal-tech support image)
- **Netlify Free** — recommended commercial production host (`netlify.toml`, root base path)
- GitHub Pages mirror via `.github/workflows/deploy.yml` on push to `main` (fallback, not primary commercial URL)
- Contact: `stoneindustries0.llc@gmail.com` · `559-579-9376`
- Inquiry capture: Supabase `public.inquiries` (anon insert + RLS) when env configured; mailto/tel fallback always available
- **Navigation (2026-05-25):** Top nav **Services** → `services.html`; **Pricing** → `pricing.html`. Homepage `#services` anchor kept for hero scroll only.
- **Homepage service cards:** Compare → `pricing.html?service=<slug>`; Request → same-page inquiry scroll with service preselect (`navigateToContactInquiry`). CSS **3D service objects** link to estimator — no WebGL.
- **Inquiry-first conversion:** Hero and form clusters use inquiry CTAs; phone shown as plain linked text (`Prefer phone? 559-579-9376`). Mobile sticky bar: Inquiry + Pricing.
- **Vision page:** `public/vision.html` — grounded roadmap (local-first → bigger vision). Top nav **Vision** → vision page. Homepage vision direction tiles use CSS **3D vision objects** linking to anchored sections — no WebGL.
- **Email contact fallback:** Visible `stoneindustries0.llc@gmail.com` + **Copy email** + **Open email app** (`mailto:`) on React contact/footer/inquiry clusters and static pages via `contact-email.js` — no Gmail web-login-only URLs.
- Legal pages: `public/privacy.html`, `public/terms.html`, `public/capability-brief.html`, `public/vision.html`

- **Learning backfill (2026-05-25):** 26 operator corrections indexed in [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) → *Recent Operator Corrections Backfill*; promoted to factory **DESIGN-036**.

**Runtime note:** Uncommitted WIP may exist in `src/` — agents must not assume working tree is clean.

---

## Services (current — sold today)

Source of truth for copy: [`src/data/site.ts`](../src/data/site.ts) · package tiers/add-ons: [`src/data/pricingCatalog.ts`](../src/data/pricingCatalog.ts)

| # | Service | Package name |
|---|---------|--------------|
| 1 | **Same-Day Tech Cleanup** | Tech Cleanup Sprint |
| 2 | **24-Hour Business Websites** | 24-Hour Website Launch |
| 3 | **Wi-Fi, Printer & POS Support** | Small Business Tech Support |
| 4 | **Logistics Coordination** | Logistics Coordination Support |
| 5 | **AI Automation & Digital Assistant Systems** | Digital Assistant Setup |

**Productized packages** with add-on `detail` blocks, compact grouped estimator UI, and scope guardrails: Windows-only Tech Cleanup, no customer-facing Post-launch QA (launch-ready handoff is standard delivery), paid-ads setup/guidance only (not campaign management), AI-agent-style workflows with human approval.

**Static visuals:** Pricing/services pages use coastal-tech background (`stone-coastal-tech-bg.webp`) with glass sections — aligned with homepage lower parallax (STONE-001).

**Competitive positioning (public):** Fixed-scope alternative for Fresno/Central Valley small businesses — not a full marketing agency, MSP, AI agency, or freight broker/3PL. **Local-first mission:** win Fresno/Central Valley trust with fixed-scope packages before claiming larger enterprise capability. **Future vision:** “Local First. Bigger Vision.” on pricing/services pages — grounded expansion path, no premature defense/enterprise/MSP/3PL/AI-platform claims. Service #4 public title: **Operations & Logistics Coordination Setup** (`logistics-coordination` slug unchanged). See `whereStoneFits` in `pricingCatalog.ts` and `#where-stone-fits` on pricing/services pages.

**Secure-by-default packaging:** Each current service documents practical security-conscious deliverables (device safety, secure site launch basics, Wi-Fi/POS guidance, coordination handoffs, guarded AI workflows). Copy explicitly avoids hacker-proof, military-grade, and PCI/HIPAA/SOC 2 claims unless separately contracted. Global disclaimer on pricing/services pages.

---

## Visual system

| Layer | Asset / component | Notes |
|-------|-------------------|-------|
| Main hero background | `public/assets/stone-main-dalrm-bg.webp` | DALRM cinematic hero — asymmetric scrim on copy column |
| Lower support background | `public/assets/stone-coastal-tech-bg.webp` | Calmer coastal-tech image for lower sections — do not over-darken |
| Interactive accents | `InteractiveOrbAccent` / orb scene | Satellite/orbit signal pattern — empty space only, not over signs/logos/CTAs |
| Motion fallbacks | CSS + reduced-motion | Disable fixed attachment on mobile; minimize WebGL below `lg` |

Factory cross-reference: SaaS Factory DESIGN-026 (parallax + orb integration).

---

## Roadmap — **FUTURE ONLY** (not sold today)

Label clearly in UI as research / planned / not available:

| Item | Status label |
|------|--------------|
| DALRM | Research direction — not sold today |
| AI-assisted operations | Planned capability — not deployed |
| Autonomous logistics | Future capability — not available now |
| Resilient infrastructure | Research roadmap — not for purchase |

Do not move these into Current Services without operator approval and realistic delivery scope.

---

## Service area

**Primary market:** Fresno & Central Valley, California (on-site when scheduling allows; remote for web/AI/logistics).

Source of truth: [`src/data/site.ts`](../src/data/site.ts) — `serviceAreaPrimary`, `serviceAreaOnSite`, `serviceAreaRemote`.

**No street address or fake office** — service-area positioning only.

---

## Current next business tasks

| Priority | Task | Status |
|----------|------|--------|
| 1 | **Static pricing funnel** | Done — `pricing.html` + 5 service pages |
| 2 | **Fresno service-area copy + meta** | Done |
| 3 | **Operator Netlify import + smoke test** | Done — https://stoneindustries.netlify.app/ |
| 4 | **Google Business Profile / local SEO** | Pending — post-deploy, operator |
| 5 | **Phone / paid domain / Bluevine invoicing live** | Operator — use Bluevine for quotes/deposits per pricing page |
| 6 | **Supabase inquiry capture** | Done — operator runs SQL + Netlify env before first live submit |
| 7 | **Secure-by-default service packaging** | Done — static service pages + `site.ts`; honest scope, no compliance overclaims |
| 8 | **Payment protection / agreement copy** | Done — `pricing.html` + [`SERVICE_AGREEMENT_BASELINE.md`](SERVICE_AGREEMENT_BASELINE.md) |

---

## Payment & business protection (near-term)

| Item | Policy |
|------|--------|
| **Invoicing** | **Bluevine** invoices and payment links (recommended) — no custom invoice generator on site yet |
| **Checkout** | None — no card data on stoneindustries.netlify.app |
| **Quote flow** | Package or inquiry → written scope/quote → deposit on larger jobs → balance before handoff |
| **Scope** | Fixed package price = listed scope only; changes need written approval |
| **Out-of-scope** | Often $85–$125/hr or separate quote |
| **Stripe** | Optional later for hosted links — not current primary workflow |

Public: [`public/pricing.html`](../public/pricing.html) · Operator: [`SERVICE_AGREEMENT_BASELINE.md`](SERVICE_AGREEMENT_BASELINE.md)

---

## Conversion priorities

1. Service inquiry / call path beats capability brief for local buyers
2. Phone visible on mobile (sticky or hero secondary minimum)
3. Mailto subjects pre-filled per service type
4. No fake social proof or contract claims

See [`docs/DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) · SaaS Factory DESIGN-029.

---

## Agent handoff

New ChatGPT chat or Cursor agent must read:

1. [`AGENTS.md`](../AGENTS.md)
2. [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md) — route task type → load docs
3. This file
4. [`CHATGPT_CURSOR_BRIDGE.md`](CHATGPT_CURSOR_BRIDGE.md)
5. Latest git status before editing runtime files
