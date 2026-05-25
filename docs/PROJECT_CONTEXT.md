# Stone Industries — Project Context

**Last updated:** 2026-05-25 · **Project OS v2**  
**Live site:** https://overlord559.github.io/Stone_Industries/  
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
- GitHub Pages deploy via `.github/workflows/deploy.yml` on push to `main`
- Contact: `stoneindustries0.llc@gmail.com` · `559-579-9376`
- Legal pages: `public/privacy.html`, `public/terms.html`, `public/capability-brief.html`

**Runtime note:** Uncommitted WIP may exist in `src/` — agents must not assume working tree is clean.

---

## Services (current — sold today)

Source of truth for copy: [`src/data/site.ts`](../src/data/site.ts)

| # | Service | Package name |
|---|---------|--------------|
| 1 | **Same-Day Tech Cleanup** | Tech Cleanup Sprint |
| 2 | **24-Hour Business Websites** | 24-Hour Website Launch |
| 3 | **Wi-Fi, Printer & POS Support** | Small Business Tech Support |
| 4 | **Logistics Coordination** | Logistics Coordination Support |
| 5 | **AI Workflow Automation** | AI Workflow Setup |

All pricing is **quote-based**. Scope confirmed before work begins.

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
| 3 | **Operator Vercel import + smoke test** | Pending |
| 4 | **Google Business Profile / local SEO** | Pending — post-deploy, operator |
| 5 | **Phone / paid domain / Stripe Payment Links** | Deferred — budget (Fri/Mon) |
| 6 | **Supabase intake DB** | Deferred — free tier maxed; validate demand first |

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
