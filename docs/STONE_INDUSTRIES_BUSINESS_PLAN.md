# Stone Industries — Business Plan (Internal Operator Reference)

**Last updated:** 2026-05-26  
**Audience:** Operator, ChatGPT strategy, Cursor agents — **not public marketing copy**  
**Public site source of truth for services:** [`src/data/pricingCatalog.ts`](../src/data/pricingCatalog.ts) · [`src/data/buildServices.ts`](../src/data/buildServices.ts)

---

## Business description

**Stone Industries LLC** is the operator’s **immediate revenue engine**: a veteran-led local technology services business serving Fresno and the Central Valley. The company sells practical, fixed-scope technology help — not enterprise MSP contracts, not a full agency, and not regulated logistics.

**Industry category:** Professional, Scientific, and Technical Services (local IT support, web delivery, managed-outcome tool setup, and narrow operations coordination).

**Tagline (public):** *Reliable Today. Autonomous Tomorrow.* — current services are “today”; Vision page is “tomorrow” only.

---

## Current status

| Item | Status |
|------|--------|
| Marketing site | Live — Netlify (`stoneindustries.netlify.app`) |
| Pricing funnel | Productized packages + estimator on static pages |
| Inquiry capture | Supabase when env configured; mailto/tel fallback always |
| Invoicing | **Bluevine** (recommended near-term) |
| First customers | **In progress** — PC builds + Tier 1 IT are first outreach priorities |
| Paid ads at scale | **Delayed** |
| Custom Stripe checkout | **Delayed** |
| GoHighLevel / heavy CRM | **Delayed** |
| Gov contracting credentials | **Public** — certified VOSB, SDVOSB, SAM.gov registration, certified LLC (with disclaimer — no contract-win claims) |

---

## Service stack (public — sold today)

Priority order for homepage, outreach, and first conversations:

| # | Service | Notes |
|---|---------|--------|
| 1 | **Custom PC Builds & Upgrades** | First-money priority; parts separate from service fee |
| 2 | **Tier 1 IT Support & Tech Cleanup** | Windows-focused; same-day when scheduling allows |
| 3 | **Wi-Fi, Printer & POS Support** | Quick fixes and setup visits |
| 4 | **Business Websites & 3D Interactive Websites** | Page-count packages; 3D/interactive via safe L3/CSS before heavy WebGL |
| 5 | **AI Receptionist & Workflow Automation** | Managed outcomes using third-party tools internally — **do not publicly resell Ulio** |
| 6 | **Mobile App / MVP Prototyping** | Clickable concepts before full dev — **do not publicly lead with Rork** |
| 7 | **Operations & Technology Project Coordination** | **Secondary/narrow** — not freight/3PL/carrier |

---

## Internal delivery stack

Use tools to deliver faster while preserving customer ownership — **the tool stack must not become the business**.

| Layer | Tools (internal) | Rule |
|-------|------------------|------|
| Sites / apps | Lovable, Supabase, Cursor, SaaS Factory patterns | Customer owns repo/data where scoped |
| Mobile MVP | Rork (internal prototyping) | Sell managed prototype outcomes, not “we use Rork” |
| AI receptionist | Ulio or similar (internal) | Sell configured workflow + handoff, not Ulio resale |
| Outreach (later) | Predis, Instantly | **Only after** domain/email foundation |
| Lean ops | HubSpot Free, Calendly Free, Wave, Bluevine | Before heavy CRM |
| Factory learning | `priv-saas-factory` docs + Stone proof-site ledger | Promote reusable patterns; no Stone branding in factory apps |

---

## Tool purchase / setup order

1. Domain, email, and basic invoicing (Bluevine, Wave)
2. Google Business Profile + local listing hygiene
3. HubSpot Free + Calendly Free for lead tracking
4. Supabase inquiry table + Netlify env (if not already live)
5. Test AI receptionist on operator’s own line (Ulio or similar — internal)
6. Predis / Instantly only when outreach foundation is ready
7. GoHighLevel, custom Stripe checkout, paid ads at scale, dashboards — **only when revenue/lead flow justify**

---

## Tools to delay

- GoHighLevel
- Custom Stripe checkout / embedded payments on marketing site
- Heavy CRM and custom operator dashboards
- Paid ads at scale
- Large custom backend builds before recurring revenue exists

---

## Near-term action plan

1. **Win first paying customers** through PC builds/upgrades and Tier 1 IT support (local outreach, referrals, GBP).
2. **Bundle adjacent wins:** Wi-Fi/printer/POS on same visit when natural.
3. **Offer websites** when prospect clearly has weak/missing site.
4. **Pilot AI receptionist** as monthly managed service on operator’s own business first, then 1–2 local clients.
5. **Track money** in Wave + Bluevine; turn one-time jobs into optional monthly care where scoped.
6. **Log every correction** in Stone + SaaS Factory learning engines.

---

## Operating rule

**The business is:** finding customers, solving practical technology problems, delivering professionally, getting paid, tracking money, turning one-time jobs into recurring support, and reinvesting carefully.

**The business is not:** collecting tools, building dashboards before revenue, or claiming capabilities Stone cannot deliver today.

---

## First outreach priorities

1. Custom Windows PC builds & upgrades (gamers, creators, home offices)
2. Tier 1 IT cleanup (pop-ups, slow PCs, scam recovery)
3. Wi-Fi / printer / POS pain at small shops
4. “No website or bad website” local vendors
5. AI receptionist only when prospect clearly misses calls/leads

---

## Future expansion (not sold today)

- Recurring IT/website care plans
- Stronger automation support packages
- GovCon-adjacent services for Stone (separate from BidSignal product)
- Software-style products and larger infrastructure — Vision page only until earned

---

## Public-claim guardrails

| Do not claim | Do not say publicly |
|--------------|---------------------|
| Full MSP / full agency / full 3PL / freight broker | Stone is fixed-scope local services |
| Guaranteed leads, bookings, rankings, AI accuracy | Honest scope + written quotes |
| Proprietary AI receptionist platform | Unless Stone actually built one |
| “We resell Ulio” / “We use Rork” as main value | Sell managed outcomes only |
| Regulated logistics (carrier, warehouse, fleet) | Operations coordination only — with explicit not-included lists |

**Cross-repo reference:** SaaS Factory [`docs/project-directions/STONE_INDUSTRIES_DIRECTION.md`](../../priv-saas-factory/docs/project-directions/STONE_INDUSTRIES_DIRECTION.md) · govcontractapp [`docs/OPERATOR_BUSINESS_DIRECTION.md`](../../govcontractapp/docs/OPERATOR_BUSINESS_DIRECTION.md) · Opslayer [`docs/OPERATOR_BUSINESS_DIRECTION.md`](../../opslayer/docs/OPERATOR_BUSINESS_DIRECTION.md)
