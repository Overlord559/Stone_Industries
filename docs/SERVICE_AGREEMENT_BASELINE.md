# Stone Industries — Service Agreement Baseline (Operator Checklist)

**Last updated:** 2026-05-25  
**Purpose:** Internal checklist for quotes, invoices, and scope — **not** a final legal contract.  
**Not legal advice.** Have qualified counsel review before relying on custom contract language for serious disputes.

**Public copy:** [`public/pricing.html`](../public/pricing.html) — How payment works, scope protection, delivery, approval, disputes.

**Near-term invoicing:** **Bluevine** invoices and payment links (recommended). No custom invoice generator on the website yet.

---

## Before work begins

- [ ] Customer name and business name recorded
- [ ] Service / package selected (matches `src/data/site.ts` or custom scope)
- [ ] **Scope included** listed in writing (bullets, not vague “full service”)
- [ ] **Add-ons** listed if any (extra pages, devices, visits, rush, third-party tools)
- [ ] **Timeline** and target dates agreed
- [ ] **Deposit amount** and what it covers (scheduling + planning/setup)
- [ ] **Balance due** amount and **when** it is due (before launch/handoff/delivery)
- [ ] **Payment due date(s)** and method (Bluevine link, etc.)
- [ ] Customer confirms quote by email reply or payment of deposit

---

## Payment tiers (default — adjust in writing per job)

| Job size | Typical terms |
|----------|----------------|
| Under $300 | Full payment upfront or at appointment/completion |
| $300–$999 | ~50% deposit to schedule; balance before delivery |
| $1,000+ | ~40–50% deposit; balance before launch/transfer/handoff |
| Monthly care | Paid upfront monthly |
| Out-of-scope | $85–$125/hr or separate written quote |

---

## Final handoff condition

- [ ] **Websites:** Launch/transfer/handoff after final balance (preview may be earlier)
- [ ] **AI / workflows:** Credentials, docs, automations after final balance
- [ ] **Tech support:** Due at completion unless agreed otherwise
- [ ] **Logistics:** Deliverables after invoice terms met

---

## Revisions and change orders

- [ ] **Revision limits** stated (e.g. one round of minor fixes in scope)
- [ ] **Out-of-scope rate** stated ($85–$125/hr or re-quote)
- [ ] Major changes require **written approval** before more billable work

---

## Cancellation / refund note (safe baseline — not legal advice)

Use practical wording, e.g.:

> Deposits reserve project time and cover initial planning/setup. Refunds or credits depend on work already performed, third-party costs, and the written scope.

Do **not** promise unlimited refunds on marketing copy. Do **not** state “all deposits are non-refundable” without attorney review.

---

## Customer approval / signoff

- [ ] Customer reviewed deliverables within agreed scope
- [ ] Minor corrections completed when reasonable
- [ ] New requests outside scope quoted separately
- [ ] Optional: simple email confirmation — “Approved to launch” / “Approved as complete”

---

## What we do **not** build yet

| Item | Status |
|------|--------|
| Custom invoice generator on site | No |
| Embedded checkout / card forms | No |
| Card data collection on stoneindustries.netlify.app | No |
| Instant checkout | No |

---

## Related docs

- [`CONVERSION_NOTES.md`](CONVERSION_NOTES.md) — payment workflow + Bluevine
- [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) — business state
- [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md) — launch bar
- Factory [`STRIPE_PAYMENT_SECURITY_BASELINE.md`](../../priv-saas-factory/docs/STRIPE_PAYMENT_SECURITY_BASELINE.md) — if Stripe added later
