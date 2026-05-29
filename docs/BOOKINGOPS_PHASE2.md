# BookingOps / ServiceQueue — Phase 2 (Calendly v0)

**Last updated:** 2026-05-28  
**Status:** **Scheduling via Calendly** — do **not** build a custom scheduler in v0.

**Doctrine:** [`c:\dev\operator-brain\docs\HYBRID_TOOL_DOCTRINE.md`](../../../operator-brain/docs/HYBRID_TOOL_DOCTRINE.md)  
**Brain ops doc:** [`c:\dev\operator-brain\docs\stone\BOOKINGOPS.md`](../../../operator-brain/docs/stone/BOOKINGOPS.md)

---

## v0 policy: Calendly, not custom code

| Rule | Detail |
|------|--------|
| **Preferred tool** | **Calendly** (free tier acceptable for v0) |
| **Do not build** | Custom booking app, queue engine, ETA calculator, SMS bot |
| **Website truth** | Package/inquiry form captures **intent**; Calendly captures **confirmed time** only after customer books |
| **Admin CRM** | Lead status `booked` = operator confirmed (Calendly event or manual) |
| **Payment** | **Separate from booking** — Stripe Payment Link sent manually after quote — see [`PAYMENTOPS.md`](PAYMENTOPS.md) |

**Booking ≠ payment.** Calendly confirms **time**. Payment Link confirms **deposit/payment** when needed. Same-day service still requires **≥2 hours minimum notice** when available. No automated ETA or payment system yet.

---

## Calendly event configuration (operator setup)

Create one primary event:

| Field | Value |
|-------|-------|
| **Event name** | Stone Same-Day Tech Visit |
| **Duration** | 60 minutes |
| **Scheduling window** | 1-hour slots |
| **Minimum notice** | **2 hours** before start |
| **Buffers** | Optional (e.g. 15 min travel) — operator choice |
| **Calendar** | Connect **Google Calendar** — real availability only |
| **Same-day** | Only when calendar shows open slots — **no guaranteed same-day** on marketing copy |

### Embed (when ready)

1. Create event in Calendly
2. Copy embed link or inline widget code
3. Add to Stone site (pricing / contact) — **only after** event is live and tested
4. Document public URL in Netlify env or site config — **do not** hardcode fake “Book now” without link

**Until embed is live:** Use inquiry form + phone; copy must not say “booking confirmed.”

---

## ServiceQueue v0 (manual + Calendly)

**ServiceQueue** = operator’s same-day visit queue — **not** a software queue in v0.

| Step | Tool |
|------|------|
| Lead arrives | Supabase inquiry + Admin CRM |
| Triage | Edward — status `new` → `contacted` |
| Quote / scope | Phone/email — status `quoted` |
| Schedule | Send **Calendly link** for Same-Day Tech Visit when appropriate |
| Confirmed visit | Calendly booking + CRM status `booked` |
| Complete | CRM `won` or `lost` |

**Deferred:** Queue numbers, live ETA, automated “you’re next” SMS, driver-style tracking.

---

## Site copy (approved — use on forms / pricing)

> Need help today? We’ll respond using your preferred contact method. Same-day visits are scheduled in 1-hour windows with at least 2 hours of notice when available.

### Do not claim

- Exact ETA or arrival time
- Queue position / “you are #3 in line”
- Automated confirmation **email** or **SMS**
- Booking confirmed until Calendly (or operator) confirms
- Payment collected on website (Payment Links sent manually after quote only)
- Deposit charged automatically at booking

---

## Email / SMS (Phase 2 — separate)

Outbound automation is **not** part of BookingOps v0. See [`EMAIL_PHASE2.md`](EMAIL_PHASE2.md).

| Channel | v0 | Phase 2 |
|---------|-----|---------|
| Email | Manual + preferred contact field | Resend server-side |
| SMS | Manual text only if customer opted in verbally | Twilio with explicit opt-in/opt-out |

---

## Intentionally not built

- Custom Netlify scheduler
- Stripe deposit at booking
- Real-time queue dashboard for customers
- Automated Calendly ↔ Supabase sync (optional later — not v0)

---

## Operator smoke test

1. Create Calendly event per table above
2. Book test slot ≥2 hours out
3. Confirm Google Calendar block appears
4. Submit test package request on site → see lead in Admin CRM
5. Mark CRM `booked` when Calendly confirms

---

## Related

- Admin CRM: [`ADMIN_CRM.md`](ADMIN_CRM.md)
- PaymentOps (manual links): [`PAYMENTOPS.md`](PAYMENTOPS.md)
- Email/SMS Phase 2: [`EMAIL_PHASE2.md`](EMAIL_PHASE2.md)
- Payments Phase 2: [`PAYMENT_PHASE2.md`](PAYMENT_PHASE2.md)
