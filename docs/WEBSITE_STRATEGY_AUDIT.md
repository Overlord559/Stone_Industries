# Website Strategy Audit — Stone Industries

**Date:** 2026-06-05  
**Scope:** California remote-first business model alignment  
**Repo:** `c:\dev\stone_industries website`  
**Operator Brain refs:** `REMOTE_SERVICE_PRODUCT_LADDER.md`, `STONE_OFFER_ROUTER.md`, `PAYMENT_OPTIONS_POLICY.md`, `BUDGET_FIT_SCORING.md`

---

## Pre-Build Gate

**BUILD NOW** — Site copy and funnel were stale (Fresno-local-first, paid audit as primary CTA, missing product ladder pages). Conversion and trust depend on accurate public positioning.

---

## Current pages / routes (after update)

| Route | Type | Status |
|-------|------|--------|
| `/` | React SPA (home) | Updated |
| `/ai-revenue-leak-audit` | React MPA | Updated — free vs paid |
| `/price-fit-calculator` | React MPA | **New** |
| `/remote-support` | React MPA | **New** |
| `/pricing.html` | Static | Updated — product ladder + payment bands |
| `/services.html` | Static | Updated — remote-first offers |
| `/vision.html` | Static | Unchanged (nav not synced — low priority) |
| `/services/*.html` | Static subpages | Legacy catalog — unchanged |
| `/admin/leads.html` | Admin | Unchanged |
| `/privacy.html`, `/terms.html` | Legal | Unchanged |

---

## Stale copy found (pre-update)

| Location | Issue |
|----------|-------|
| `Hero.tsx` | Fresno-local-first headline; BidSignal as primary offer |
| `primaryOffers.ts` | No free review tier; BidSignal First Award Sprint prominent |
| `site.ts` | `serviceAreaPrimary` = Fresno only; audit CTA = paid audit |
| `revenueLeakAudit.ts` | Paid $497 audit only; no free review distinction |
| `AiRevenueLeakAuditPage.tsx` | Book paid audit as primary; Fresno SEO title |
| `Navbar.tsx` | Mobile sticky = "Pricing" not calculator |
| `pricing.html` | Fresno-local; legacy packages only; old payment splits |
| `services.html` | "View pricing" primary CTA; local-first mission |
| Calendly | Mixed 30min vs general consultation URLs |

---

## Missing offers (pre-update)

- Free Remote Revenue Leak Review ($0) as primary CTA
- Remote Quick Fix / Remote Business Tech Session
- Starter Fix Sprint distinct from Customer Engine
- Website / Lead Capture Sprint
- Clear free review vs paid audit comparison
- Price/fit calculator page
- Remote support page with safety rules
- Payment options per new bands ($297–$750 credit, 30/40/30 splits)
- California statewide remote service areas
- Proof-ledger / before-after language (no revenue guarantees)

---

## Missing CTAs (pre-update)

- Book Free Remote Revenue Leak Review (primary)
- Find Your Best-Fit Package (secondary)
- No "View Pricing" as lead CTA on services page

---

## Pricing conflicts (pre-update)

| Old site | New ladder |
|----------|------------|
| Audit = $497 only, primary | Free review $0 + $297 launch / $497 paid |
| Tier 1 IT from $99 on-site framing | Remote Quick Fix $49–$99 |
| AI receptionist from $499 packages | Receptionist Sprint $2,500–$3,500+ |
| Payment: 50% deposit $300–$999 generic | Band-specific splits per PAYMENT_OPTIONS_POLICY |
| Fresno-only service area | California remote-first |

Legacy catalog (`pricingCatalog.ts`, estimator) retained as **Supporting packages** — not removed to avoid breaking estimator; labeled secondary on static pages.

---

## Mobile / CTA issues (pre-update)

- Mobile sticky bar showed "Pricing" instead of calculator
- Hero had 4+ CTAs with paid audit primary
- Audit page lacked free/paid side-by-side on mobile

**Fixed:** Mobile sticky = Book Free Review + Find Best-Fit Package.

---

## Recommended edits (completed)

1. SSOT data: `productLadder.ts`, `paymentOptions.ts`, `serviceAreas.ts`, `priceFitCalculator.ts`
2. Homepage hero + primary offers → California remote-first, free review CTA
3. Audit page → free vs paid split, launch pricing, sprint credit
4. New `/price-fit-calculator` and `/remote-support` React pages
5. Static pricing + services → product ladder cards, payment bands, nav links
6. Calendly unified to `general-business-tech-consultation` for free review
7. `_redirects` + `vite.config.ts` multi-page entries for new routes

---

## Files created

- `docs/WEBSITE_STRATEGY_AUDIT.md` (this file)
- `src/data/productLadder.ts`
- `src/data/paymentOptions.ts`
- `src/data/serviceAreas.ts`
- `src/lib/priceFitCalculator.ts`
- `src/pages/PriceFitCalculatorPage.tsx`
- `src/pages/RemoteSupportPage.tsx`
- `price-fit-calculator/index.html`
- `remote-support/index.html`

---

## Files changed

- `src/data/site.ts`
- `src/data/revenueLeakAudit.ts`
- `src/data/primaryOffers.ts`
- `src/lib/routePath.ts`
- `src/App.tsx`
- `src/pages/AiRevenueLeakAuditPage.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/PrimaryOffers.tsx`
- `src/components/sections/RevenueLeakAuditTeaser.tsx`
- `src/components/sections/Services.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `public/pricing.html`
- `public/services.html`
- `public/_redirects`
- `vite.config.ts`
- `index.html`
- `ai-revenue-leak-audit/index.html`

---

## Final product ladder on site

1. Free Remote Revenue Leak Review — $0  
2. Remote Quick Fix — $49–$99  
3. Remote Business Tech Session — $149–$299  
4. AI Revenue Leak Audit — $297 launch / $497 standard  
5. Remote Website / Lead Capture Sprint — $750–$2,500  
6. Starter Fix Sprint — $750–$1,500  
7. AI Customer Engine Sprint — $1,500–$2,500  
8. AI Receptionist / Automation Sprint — $2,500–$3,500+  
9. Managed AI Ops — $299–$997/mo  

On-site exception: Central Valley hardware/POS/networking — custom quote.

---

## Final CTAs

| Priority | Label | Target |
|----------|-------|--------|
| Primary | Book Free Remote Revenue Leak Review | Calendly general consultation |
| Secondary | Find Your Best-Fit Package | `/price-fit-calculator` |
| Tertiary | Free Review vs Paid Audit | `/ai-revenue-leak-audit` |
| Contact | edward@stoneindustriesusa.com · 559-579-9376 | mailto / tel |

---

## Payment options added

- Under $300: upfront  
- $297–$750: upfront + 7-day sprint credit  
- $750–$1,500: 50/50 or 40/30/30  
- $1,500–$2,500: 50/50 or 40/30/30  
- $2,500+: 30/40/30 + usage separate  
- Monthly: first month upfront, renew before period  

---

## Build / lint results

| Command | Result |
|---------|--------|
| `npm run build` | **PASS** (2026-06-05) |
| `npm run lint` | **PASS** (2026-06-05) |
| `npm run typecheck` | N/A (covered by `tsc -b` in build) |

---

## Hard no-gos verified

- No wholesale floors exposed  
- No Counsel of Marketers / Operator Brain / StoneOS mentions added  
- No guaranteed revenue language  
- No fake testimonials or case studies  
- No new paid dependencies  
- No git commit performed  

---

## Remaining follow-ups (optional)

- Sync `vision.html` and service subpage nav to match new links  
- Update `pricingCatalog.ts` / estimator defaults to surface remote tiers  
- Add `paymentOptions.ts` render to React pricing section (static HTML done)  
- Playwright mobile snapshot pass when Edward requests visual QA  

---

## Learning reason code

`already_covered` — remote-first website alignment documented in Operator Brain stone docs; this audit records site-specific delta.
