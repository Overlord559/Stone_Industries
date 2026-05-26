# Stone Industries — Design Mistake Ledger

**Last updated:** 2026-05-25 · **Project OS v2**  
**Routing:** [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md)  
**Factory cross-ref:** [`../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md`](../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md) (DESIGN-024–030)

---

## STONE-001 — No over-darkening generated backgrounds

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-026 |
| **Status** | ACTIVE |

**Problem:** Stacked global scrims made `stone-coastal-tech-bg.webp` nearly invisible.

**Rule:** Lower parallax scrim stays ~10% darker than hero readable zone. Use local glass cards for text — not full-page near-black overlays.

---

## STONE-002 — No 3D overlays over important image focal points

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-026 |
| **Status** | ACTIVE |

**Problem:** Interactive orb accents can block embedded signage, logos, or hero art.

**Rule:** Place orbs in section **empty space** only. Inspect focal points before placing WebGL accents. Hide/minimize below `lg`.

---

## STONE-003 — No root generated asset commits

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-027 |
| **Status** | ACTIVE |

**Problem:** Draft `ChatGPT Image*.webp` at repo root risks accidental staging.

**Rule:** Production assets live in `public/assets/`. Stage exact paths — never `git add .` on visual passes.

---

## STONE-004 — Tailwind class validity

| Field | Value |
|-------|-------|
| **Severity** | WARNING |
| **Factory link** | DESIGN-028 |
| **Status** | ACTIVE |

**Problem:** Invalid utilities (e.g. `py-22`) compile with no CSS output.

**Rule:** Use scale tokens or bracket syntax. Grep build output when spacing looks wrong.

---

## STONE-005 — Conversion before spectacle

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029, DESIGN-003 |
| **Status** | ACTIVE |

**Problem:** Cinematic backgrounds passed visual QA while service inquiry was secondary to capability brief; phone buried on mobile.

**Rule:** Service inquiry/call primary. Capability brief secondary. Visual upgrades ship only after funnel clarity.

---

## STONE-007 — Service CTAs need pricing/detail pages before backend

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |

**Problem:** Premium service sites with mailto-only CTAs dead-end without package context — buyers bounce before quoting.

**Rule:** Every current service gets a static pricing/detail page. Homepage card primary CTA → detail page; mailto secondary. Build static funnel before Supabase/Stripe.

**QA check:** No service card mailto-only without detail page link.

---

## STONE-006 — Practical AI service naming

| Field | Value |
|-------|-------|
| **Severity** | WARNING |
| **Factory link** | DESIGN-030 |
| **Status** | ACTIVE |

**Problem:** Vague “agentic” labels overclaim and blur future vs current services.

**Rule:** Use **AI Automation & Digital Assistant Systems** (or equivalent practical naming) with human review in scope. “Agentic-style” is OK when paired with approval gates—not unsupervised autonomy. Future roadmap items stay in Vision section — not Current Services.

---

## STONE-009 — Static pricing pages must inherit homepage visual system before deploy

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-003, DESIGN-008 |
| **Status** | ACTIVE |

**Problem:** Static pricing/service HTML felt like a separate basic site—Segoe UI, flat cards, weak CTA bands—while the React homepage used premium glass, typography, and conversion hierarchy.

**Rule:** `public/static-pages.css` must share fonts, glass cards, hero bands, and CTA styling with the homepage before Netlify deploy. HTML CTAs stay primary; motion stays L3 (CSS hover) only on static pages.

**QA check:** Pricing + all five service pages visually match homepage tone at 375px.

---

## STONE-010 — L3 Advanced Motion is the safe pre-deploy visual tier

| Field | Value |
|-------|-------|
| **Severity** | WARNING |
| **Factory link** | DESIGN-008, DESIGN-014 |
| **Status** | ACTIVE |

**Problem:** Full L7 WebGL, frame-scroll, or visual-world migration before deploy risks conversion regression and deploy delay.

**Rule:** Pre-Netlify polish = CSS glass, card hover, restrained framer-motion, existing orb accents only. Defer frame-scroll and Real 3D until after production is live and smoke-tested.

---

## STONE-008 — Commercial sites need hosting-platform compliance before “free” production

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | — |
| **Status** | ACTIVE |

**Problem:** Vercel Hobby and GitHub Pages were documented as interchangeable free production options for a commercial service site with pricing pages — Hobby is non-commercial per platform terms; GitHub Pages is a poor canonical URL for local business SEO.

**Rule:** **Netlify Free** is the recommended commercial production host. GitHub Pages = mirror/preview only. **Vercel Hobby = not for production** — Vercel Pro only if operator upgrades. Set `VITE_BASE_PATH=/` on Netlify. Update `og:url` after Netlify URL is live.

**QA check:** Post-deploy smoke on Netlify root paths before adding backend (Supabase/Stripe).

---

## How to add a lesson

1. Assign next `STONE-NNN` ID
2. Set severity and status
3. Link SaaS Factory `DESIGN-NNN` if reusable
4. Add QA check to [`QA_CHECKLIST.md`](QA_CHECKLIST.md) when applicable
5. Reference in final report Handoff Update
