# Stone Industries — Outbound Email & SMS (Phase 2)

**Last updated:** 2026-05-28  
**Status:** **Not implemented** — do not promise automated confirmation **email** or **SMS** on the site until built.

**Booking:** Calendly v0 — see [`BOOKINGOPS_PHASE2.md`](BOOKINGOPS_PHASE2.md). No custom scheduler.

---

## Current state

| Item | Status |
|------|--------|
| Supabase inquiry capture | **Live** (API router + anon fallback) |
| Internal lead notification (Resend) | **Implemented** — requires `RESEND_API_KEY` + `RESEND_FROM` in Cloudflare Functions |
| HubSpot CRM sync | **Implemented** — requires `HUBSPOT_PRIVATE_APP_TOKEN` |
| Admin CRM v0 | **Live** (Cloudflare Functions + `/admin/leads.html`) |
| Domain email trust (SPF/DKIM/DMARC) | Configure for Resend sending domain |
| Customer confirmation email | **No** |
| Twilio / SMS API configured | **No** |
| Automated SMS status updates | **No** |

---

## Phase 2 scope (when approved + funded)

### Recommended provider

**Resend** or equivalent transactional provider — server-side only.

### First use case (internal)

Notify Edward when a new inquiry/package request arrives:

- Trigger: Supabase webhook or Netlify Function after insert (server-side)
- Recipient: operator business email
- Content: name, contact, package, urgency, link to admin CRM row

### Second use case (customer-facing)

Send confirmation that request was received:

- Only after domain + SPF/DKIM/DMARC are configured
- Copy must match site truth: “We received your request and will respond using your preferred contact method”
- **Do not** imply booking confirmed or payment collected

### Third use case (SMS — after explicit opt-in)

Same-day **service status** texts (e.g. “on the way”) only when:

- Customer **opted in** in writing or on a future consent checkbox
- **Twilio** (or equivalent) runs **server-side** only
- Opt-out path documented (STOP / unsubscribe)
- Copy does not imply queue position or guaranteed ETA

**v0:** Manual phone/text using preferred contact field — no automated SMS.

---

## Hard rules

- **Never send email from browser JavaScript**
- **Never expose** email API keys in `VITE_*` or client bundles
- **Never promise** instant/automated email on forms until function + DNS are live
- Preferred contact field = **how Stone should respond manually**, not auto-send channel (v0)
- **Never send SMS from browser JavaScript**
- **Never promise** automated text confirmations until provider + opt-in are live

---

## Environment variables (future)

| Variable | Scope | Purpose |
|----------|-------|---------|
| `RESEND_API_KEY` | Netlify Functions | Send transactional email |
| `STONE_NOTIFY_EMAIL` | Functions | Edward notification inbox |
| `STONE_FROM_EMAIL` | Functions | Verified sender (e.g. `hello@stoneindustries.net`) |
| `TWILIO_ACCOUNT_SID` | Functions | SMS provider |
| `TWILIO_AUTH_TOKEN` | Functions | SMS provider (never client) |
| `TWILIO_FROM_NUMBER` | Functions | Verified sending number |
| `STONE_SMS_OPT_IN_REQUIRED` | Policy | Must be true before any automated SMS |

---

## Prerequisites before customer-facing email

1. Custom domain or verified sending domain
2. SPF, DKIM, DMARC records
3. Business email inbox monitored daily
4. Written templates reviewed for no false booking/payment claims
5. Unsubscribe / privacy compliance for marketing (if applicable)

---

## Related

- Admin CRM: [`ADMIN_CRM.md`](ADMIN_CRM.md)
- Booking (Calendly): [`BOOKINGOPS_PHASE2.md`](BOOKINGOPS_PHASE2.md)
- Deployment / env: [`DEPLOYMENT.md`](DEPLOYMENT.md)
- Payments: [`PAYMENT_PHASE2.md`](PAYMENT_PHASE2.md)
