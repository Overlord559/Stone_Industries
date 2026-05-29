# Stone PaymentOps

**Last updated:** 2026-05-28  
**Status:** v0 — manual Stripe Payment Links after quote; **no site checkout**

**Brain SSOT:** [`c:\dev\operator-brain\docs\stone\PAYMENTOPS.md`](../../../operator-brain/docs/stone/PAYMENTOPS.md)  
**Phase 2 technical detail:** [`PAYMENT_PHASE2.md`](PAYMENT_PHASE2.md)

---

## Purpose

PaymentOps defines how Stone Industries accepts deposits and payments **without fake checkout or premature automation**.

**Booking confirms time. Payment confirms money.** See [`BOOKINGOPS_PHASE2.md`](BOOKINGOPS_PHASE2.md).

---

## v0 rule

**Do not charge before scope is reviewed.**

### Flow

1. Customer submits package request.
2. Lead appears in Admin CRM.
3. Edward contacts customer.
4. Edward confirms service scope and window.
5. Edward sends **Stripe Payment Link manually** if payment/deposit is needed.
6. CRM status moves **quoted → booked → won/lost**.

---

## Payment types

- Remote tech cleanup fixed fee
- On-site visit diagnostic/deposit
- Wi-Fi / printer / POS support deposit
- Custom quote payment
- Future recurring support plan (**deferred**)

---

## Suggested initial Stripe products

| Product | Suggested price |
|---------|-----------------|
| Stone Remote Tech Cleanup | **$79** |
| Stone On-Site Tech Visit Deposit | **$50** |
| Stone Wi-Fi / Printer / POS Diagnostic | **$99** |
| Custom Quote Payment | Customer-specific amount |

Create in Stripe Dashboard — **send links manually**. Do not embed live checkout buttons on the marketing site until trust stack is live.

---

## No-go

- No fake payment success
- No automatic charge from package request
- No customer-facing checkout until domain/email/trust stack is live
- No subscription plans before service proof
- No Stripe secret keys in frontend

---

## Future

- Stripe Payment Links (manual v0 → tracked in CRM Phase 2)
- Stripe Checkout
- Webhook into Supabase/CRM
- Customer confirmation email
- Payment status in Admin CRM — see [`ADMIN_CRM.md`](ADMIN_CRM.md) Phase 2 fields

---

## Related

- Admin CRM: [`ADMIN_CRM.md`](ADMIN_CRM.md)
- Booking: [`BOOKINGOPS_PHASE2.md`](BOOKINGOPS_PHASE2.md)
- Email Phase 2: [`EMAIL_PHASE2.md`](EMAIL_PHASE2.md)
- Friday deploy: [`CLOUDFLARE_MIGRATION.md`](CLOUDFLARE_MIGRATION.md)
