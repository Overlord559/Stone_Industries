# Stone Industries — Conversion Notes

**Last updated:** 2026-05-25  
**Load when:** CTA, copy, service hierarchy, post-visual pass

---

## CTA hierarchy (local buyer)

| Rank | Action | Where |
|------|--------|-------|
| 1 | Service pricing + package context | Hero primary → `pricing.html`; homepage cards → `pricing.html?service=<slug>` |
| 2 | Service inquiry (Supabase form) | Homepage cards → same-page `#contact` scroll + service preselect; pricing/services static forms |
| 3 | Phone `559-579-9376` | Plain linked text near inquiry/contact — not a primary desktop button |
| 4 | Email copy + mailto fallback | Visible address + Copy email + Open email app — not mailto-only |
| 5 | Capability brief | Footer / About — subcontracting only |

**Fail:** Mailto-only request buttons (STONE-007, STONE-013). Mailto-only email fallback with no copy path (STONE-020). Inquiry buried by Call-first chrome (STONE-021). First-click `#contact` scroll race (STONE-014). Top nav **Services** must open `/services.html`.

**Backfill index:** [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) → *Recent Operator Corrections Backfill* (26 items → STONE/DESIGN IDs).

---

## Email contact fallback (2026-05-25)

| Pattern | Rule |
|---------|------|
| Visible address | `stoneindustries0.llc@gmail.com` on contact, footer, pricing, services, service detail pages |
| Copy email | Clipboard copy with “Email copied.” status — legacy fallback if clipboard blocked |
| Open email app | Standard `mailto:stoneindustries0.llc@gmail.com?subject=Stone%20Industries%20Inquiry` |
| Forbidden | Gmail compose / Google account picker URLs without copy fallback |
| React | `EmailContactActions` + `copyContactEmail()` |
| Static | `public/contact-email.js` + `[data-si-copy-email]` |

Inquiry form remains primary — email is fallback when Supabase fails or buyer prefers email client.

---

## Vision page + 3D objects (2026-05-25)

| Element | Target |
|---------|--------|
| Top nav Vision | `vision.html` |
| Homepage direction tiles | CSS 3D `VisionObjectLink` → `vision.html#local-first` etc. |
| Future roadmap cards | Icon objects link to matching vision anchors |
| Content guardrails | No defense contracts, mature enterprise platform, full MSP/agency/3PL, or autonomous AI “live today” |

---

## Static pricing funnel (current)

| Page | Path |
|------|------|
| All pricing | `public/pricing.html` |
| Package estimator | `pricing.html#package-estimator` — `pricing-catalog.js` + `pricing-estimator.js` |
| All services | `public/services.html` |
| Per-service | `public/services/*.html` |

React links use `import.meta.env.BASE_URL` via `site.ts`. Catalog source: `src/data/pricingCatalog.ts` → build emits `public/pricing-catalog.js`.

---

## Productized pricing (2026-05-25)

| Pattern | Rule |
|---------|------|
| Packages | Fixed tiers per service (e.g. Tech $99/$179/$299+) |
| Add-ons | Visible $ amounts on service pages + estimator checkboxes |
| Estimator | Running total + mailto prefill; **estimate only** disclaimer |
| Custom work | Quote in writing — not hidden behind inquiry-only |
| CTAs | Request This Package → `#contact` scroll + service preselect · Compare → `pricing.html?service=<slug>` · 3D service object → estimator |
| Checkout | **None** — do not imply instant pay |

**Fail:** Inquiry-only pages with no visible package price (STONE-014).

---

## Website page-count pricing (2026-05-25 correction)

| Package | Price | Pages | Extra pages |
|---------|-------|-------|-------------|
| Starter Landing | $399 | 1 | +$125/page via page-count control on estimator |
| Business Website | $799 | Up to 5 | +$125/page beyond 5 on estimator; 10+ pages → final-quote note |
| Premium Website | $1,199+ | Up to 7 | +$125/page beyond 7 on estimator; 10+ pages → final-quote note |

- **Secure lead capture** ≠ cybersecurity tiers — see `secureLeadCaptureHelp` in catalog; every add-on has `detail` blocks with includes / not-included lists.
- **Add-on education:** Estimator and service pages use `<details>` accordions — click “What this add-on is” / “What this includes”.
- **SEO scope:** Basic SEO/meta vs deeper SEO/ads/campaigns — see `advancedSeoPublicLine` in `addOnExplanations.ts`.
- **AI scope:** AI models, APIs, n8n-style workflow automation — see `aiWorkflowScopeNote`.
- **Premium** `includedAddOnIds`: lead-capture, cyber-tier-1, cyber-tier-2, stripe-link, copy (not monthly-care). Launch-ready handoff is standard delivery — not a customer-facing QA add-on.

---

## Estimator rules (2026-05-25 refinement)

| Rule | Behavior |
|------|----------|
| Service → package | Add-ons list only after package selected; service-scoped only |
| Website page count | After website package selected: “How many pages do you estimate?” — defaults to included count; extra beyond included = +$125/page line item |
| Large sites | 10+ estimated pages → “final quote after scope review” note (not added to total beyond per-page math) |
| Included add-ons | `includedAddOnIds` on package — shown as included, not summed |
| One-time total | Package + checked one-time add-ons only |
| Hourly / monthly | Notes + mailto lines — not added to one-time total |
| Mailto | Breakdown with package, estimated pages, extra-page line, add-ons, hourly/monthly notes |

**Fail:** Double-charging bundled add-ons (STONE-015).

---

## Static page visuals

- `page-atmosphere--coastal` uses `stone-coastal-tech-bg.webp` (homepage image 2) with light scrim — STONE-001
- Glass `page-section` cards on pricing/services for readability

---

## Competitor-aware positioning (2026-05-25)

| Competitor type | Stone position | Do not claim |
|-----------------|----------------|--------------|
| Marketing/SEO agencies | Page-count websites, lead capture, fast launch | Full SEO/ad replacement, guaranteed rankings |
| MSPs (e.g. mature IT/security shops) | Fixed-scope tech, Wi-Fi/POS, security-conscious setup | Managed IT, help desk, compliance, incident response |
| AI automation vendors | Starter workflows, human approval, expand later | Autonomous agents, employee replacement, enterprise RAG |
| Freight/3PL/logistics operators | Operations coordination systems | Broker, carrier, 3PL, transportation arrangement |

Public section: `#where-stone-fits` on `pricing.html` and `services.html`. **Local First. Bigger Vision.** (`#local-first-vision`) on pricing/services — grounded expansion, no premature enterprise claims. **No competitor names** on public pages.

Logistics guardrail: `logisticsFreightDisclaimer` in catalog + service page.

---

## Competitor-aware positioning (no trade dress copy)

- Transparent fixed packages for small businesses — not full MSP contracts
- Custom quote for managed IT / formal compliance programs
- Do not name competitors on public pages

---

## Mobile contact chrome (current)

| Element | Breakpoint | Actions |
|---------|------------|---------|
| Navbar phone | All | Plain linked text in menu/footer — not primary desktop button |
| Hero phone | All | `Prefer phone?` linked text near inquiry |
| Sticky bottom bar | `< md` | Inquiry + Pricing (max 2) |
| Email fallback | All | Copy email + Open email app near inquiry clusters |

Bottom bar uses safe-area padding and `#root` mobile padding so footer/contact is not covered.

---

## Payment (manual first)

- No fake checkout on site; **no card data collected** on the marketing site
- **Written quote / scope before work** — customer confirms package or custom scope
- **Bluevine invoices / payment links** — recommended near-term invoicing (no custom invoice generator yet)
- **Deposits** on larger jobs ($300+ tiers on [`public/pricing.html`](../public/pricing.html))
- **Final balance before launch, handoff, transfer, or final delivery** unless agreed otherwise in writing
- **Change orders** — out-of-scope work approved in writing; often $85–$125/hr or re-quoted
- **Stripe Payment Links / Checkout** may be added later for repeat packages — still not embedded checkout on site (no Stripe SDK in repo yet)

**Operator checklist:** [`SERVICE_AGREEMENT_BASELINE.md`](SERVICE_AGREEMENT_BASELINE.md)

**Public detail:** `pricing.html` sections — payment workflow, scope protection, final delivery, approval, disputes/refunds (practical tone, not scary legal).

---

## Secure-by-default packaging (2026-05-25)

| Rule | Why |
|------|-----|
| Sell **practical** security per service | Local buyers want trust without enterprise fear-mongering |
| Link to service detail pages | Full bullet lists live on `public/services/*.html` |
| Global disclaimer on pricing/services | “Included where applicable” — not hacker-proof or compliance certified |
| No PCI/HIPAA/SOC 2/military-grade claims | Avoid legal/trust drift (factory DESIGN-033) |

**CTA unchanged:** Email/phone/manual quote still primary; security copy supports trust, does not replace contact path.

Source: `src/data/site.ts` (`securityIncluded`, `securityPackageDisclaimer`) + static service pages.

---

## Post-visual-upgrade check

After any background/orb/motion pass, re-run CTA hierarchy check.

See [`CUSTOMER_VALIDATION.md`](CUSTOMER_VALIDATION.md), STONE-005, STONE-007.
