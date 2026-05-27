# Stone Industries — Stripe Readiness Plan

**Last updated:** 2026-05-26  
**Status:** Plan only — **not implemented**  
**Audience:** Operator, ChatGPT strategy, Cursor agents

---

## Recommended first approach

Use **Stripe Payment Links** or **Stripe Invoices** — not custom checkout, not embedded Stripe.js on the marketing site.

| Approach | When | Why |
|----------|------|-----|
| **Bluevine invoices** (current near-term) | Deposits and first customers now | Already in operator workflow |
| **Stripe Payment Links** | Repeat fixed packages after domain/email stable | No card storage on site; operator creates link per quote |
| **Stripe Invoices** | Custom scope / larger jobs | Written quote → invoice → pay link |
| **Custom Checkout / Elements** | **Defer** | Higher build, PCI scope, and maintenance cost |

---

## Products / payment links to create manually (later)

Create in Stripe Dashboard when operator is ready — names align with public catalog:

| Product | Suggested use | Notes |
|---------|---------------|-------|
| Tech Cleanup Sprint — Basic | One-time fixed package | Match `pricingCatalog.ts` tier |
| Tech Cleanup Sprint — Standard | One-time fixed package | |
| Tech Cleanup Sprint — Deep | One-time fixed package | |
| Small Business Tech Support tiers | Wi-Fi/POS packages | |
| Website Launch tiers | Starter / Business / Premium | Page-count extras still custom-quoted |
| AI Receptionist Setup | Setup fee | Monthly tool costs separate |
| Mobile MVP Prototype | Fixed prototype fee | |
| PC Build service tiers | Service fee only | **Parts always separate** — never bundle parts in Stripe SKU |
| Deposit line item | Custom amount | Use invoice or manual Payment Link amount |

Do not publish Payment Link URLs on the site until operator confirms amounts match written quotes.

---

## Deposit / payment rules (public + operator)

1. **No online checkout on the marketing site** — inquiry → written quote → hosted pay link or invoice.
2. **No card data collected** on `stoneindustries.netlify.app` or static pages.
3. **Deposits** on larger jobs per `public/pricing.html` — confirm in writing before work starts.
4. **Final balance** before launch, handoff, transfer, or final delivery unless written exception.
5. **Change orders** — out-of-scope work approved in writing; re-quote or hourly.
6. **Refunds/credits** — practical business policy on pricing page; not legal advice.

Internal template: [`SERVICE_AGREEMENT_BASELINE.md`](SERVICE_AGREEMENT_BASELINE.md)

---

## Domain / email readiness (before Stripe go-live)

| Item | Requirement |
|------|-------------|
| Business email | Prefer `@stoneindustries.net` or verified domain email in Stripe — not only Gmail for customer-facing receipts |
| Stripe business profile | Legal entity name matches **Stone Industries LLC** |
| Receipt branding | Logo + support phone `559-579-9376` |
| Privacy/terms | Existing `public/privacy.html` and `public/terms.html` — update if payment data handling changes |
| Netlify env | No Stripe secret keys in frontend; serverless only if proxy added later |

---

## Future implementation checklist (when approved)

- [ ] Operator creates Stripe account and completes business verification
- [ ] Operator creates Products / Prices for fixed packages (service fee only for PC builds)
- [ ] Operator tests one Payment Link end-to-end (test mode)
- [ ] Document which packages get static Payment Links vs manual invoice-only
- [ ] Add **hosted link after quote** language only — no embedded checkout
- [ ] Optional: Netlify Function or Edge Function to create Payment Links server-side (keeps secret key off client) — **defer until volume justifies**
- [ ] Update `PRODUCTION_READINESS.md` and `CONVERSION_NOTES.md` when live
- [ ] QA: confirm site still shows no fake checkout and no card fields

---

## Operator must provide before any Stripe implementation

1. Stripe account access (test + live)
2. Confirmed package prices matching `src/data/pricingCatalog.ts`
3. Deposit rules per service tier
4. Whether Bluevine remains primary or Stripe replaces it for some flows
5. Approved business email/domain for receipts
6. Explicit Cursor prompt approving Stripe scope (Payment Links only vs custom checkout)

---

## Explicit non-goals

- No Stripe SDK in React app for this phase
- No saved cards / subscriptions on marketing site
- No automatic charging without written quote
- No implying instant pay on homepage hero

Cross-ref: [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md), [`CONVERSION_NOTES.md`](CONVERSION_NOTES.md) Payment section.
