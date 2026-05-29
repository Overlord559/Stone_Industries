# Payment & Deposit — Phase 2 (deferred)

**Last updated:** 2026-05-28  
**Status:** Not implemented — lead capture only on site today.

---

## Current state (audit)

| Check | Result |
|-------|--------|
| Stripe npm package | **Not installed** |
| Stripe env vars in repo | **None** (no `STRIPE_*` / `VITE_STRIPE_*`) |
| Serverless checkout route | **None** |
| On-site card capture | **None** — by design |
| `wants_deposit_link` on package request | **Interest capture only** — checkbox stores intent in Supabase when migration applied |

Copy references Bluevine invoices and future **Stripe Payment Links** on pricing/service pages — marketing/operator workflow only, not runtime code.

---

## Phase 2 rule (when trust stack is ready)

1. Written quote confirmed by email or signed scope summary.
2. Optional **50% deposit** (or tier rules on `pricing.html#how-payment-works`) to lock scheduling.
3. Send **Stripe Payment Link** or hosted invoice — **never** fake checkout success on the website.
4. Never charge without clear service scope and customer acknowledgment.
5. Enable only after Friday unlock: domain, business email, SPF/DKIM/DMARC, professional sender identity.

---

## Operator checklist before first live deposit link

- [ ] Stripe account verified for Stone Industries LLC
- [ ] Business email + domain sending trust stack live
- [ ] Payment link tied to written quote ID / inquiry row
- [ ] Refund/deposit policy matches pricing page copy
- [ ] Test link in staging — no production charge without operator approval

See also: [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md) · [`docs/supabase/stone-industries-inquiries-extended-fields.sql`](supabase/stone-industries-inquiries-extended-fields.sql)
