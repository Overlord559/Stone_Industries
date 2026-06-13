# Stone Industries — CRM & HubSpot Lead Routing

**Last updated:** 2026-06-13  
**Status:** Implemented — `POST /api/inquiries` on Cloudflare Pages Functions

---

## Architecture

```text
Visitor form submit
  → POST /api/inquiries (Cloudflare Functions)
      1. Validate + honeypot
      2. Supabase insert (service role) — REQUIRED for customer success
      3. Resend email → Edward — optional
      4. HubSpot contact + note — optional
  → JSON { saved, emailNotified, hubspotSynced, inquiryId? }
```

If `/api/inquiries` is unavailable (local Vite dev), frontend falls back to direct Supabase anon insert.

---

## Layer priorities

| Layer | Role | Failure impact |
|-------|------|----------------|
| **Supabase** | Source of truth for all inquiries | Customer sees failure — must fix |
| **Email (Resend)** | Edward's operational inbox | Logged; customer still succeeds |
| **HubSpot** | CRM backup for follow-up | Logged; customer still succeeds |
| **Calendly** | Optional post-capture scheduling | Never blocks save |

**Doctrine:** Lead capture source of truth is Supabase. Email notification is Edward's operational inbox. HubSpot is CRM backup. Calendly is optional post-capture scheduling, not a replacement for lead capture.

---

## Endpoint

| Route | File | Method |
|-------|------|--------|
| `/api/inquiries` | `functions/api/inquiries.js` | POST |

### Request body (JSON)

Required (after trim):

- `name`
- `service_requested`
- `message`
- `email` **or** `phone`

Optional:

- `city`
- `source_page`
- `website` / `honeypot` (spam trap — silent reject)
- Extended package fields (see `stone-industries-inquiries-extended-fields.sql`)

### Response

```json
{
  "saved": true,
  "emailNotified": true,
  "hubspotSynced": false,
  "inquiryId": "uuid"
}
```

On validation failure: `{ "saved": false, "errorCode": "..." }` with HTTP 400.

On Supabase failure: `{ "saved": false, "emailNotified": false, "hubspotSynced": false, "errorCode": "..." }` with HTTP 503.

---

## Cloudflare Functions environment variables

Set in **Pages → Settings → Environment variables** (Functions scope):

| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_URL` | Yes (for API path) | Supabase REST base |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (for API path) | Server-side insert |
| `RESEND_API_KEY` | No | Send operator notification |
| `RESEND_FROM` | Yes if using Resend | Verified sender domain in Resend |
| `STONE_NOTIFY_EMAIL` | No | Default `edward@stoneindustriesusa.com` |
| `HUBSPOT_PRIVATE_APP_TOKEN` | No | HubSpot private app with CRM contacts scope |

**Never** prefix these with `VITE_`.

---

## Resend setup (operator)

1. Create Resend account and verify sending domain (or use Resend onboarding domain for testing).
2. Set `RESEND_FROM` to verified sender (e.g. `Stone Industries <hello@stoneindustriesusa.com>`).
3. Set `RESEND_API_KEY` in Cloudflare Functions env.
4. Set `STONE_NOTIFY_EMAIL=edward@stoneindustriesusa.com`.
5. Submit test inquiry on production → check Edward inbox.

Notification subject: `New Stone inquiry — {service_requested} — {name}`

---

## HubSpot setup (operator)

1. Create HubSpot private app with **crm.objects.contacts** read/write and **crm.objects.notes** write scopes.
2. Set `HUBSPOT_PRIVATE_APP_TOKEN` in Cloudflare Functions env.
3. Submit test inquiry with email → verify contact + note in HubSpot.

Mapping:

- Standard contact fields: email, firstname, lastname, phone, city
- Note body: service, message, source page, Supabase inquiry id, timestamp
- No fragile custom properties — safe defaults only

If contact email already exists: update contact + append note. Duplicate create conflicts are logged, not fatal.

---

## Forms covered

| Surface | Submit helper |
|---------|---------------|
| React homepage `InquiryForm` | `submitInquiry()` |
| React audit form | `submitInquiry()` |
| Static `inquiry-form.js` | `SI_submitInquiryWithFallback` |
| Package request modal | `SI_submitInquiryWithFallback` with enhanced fields |

---

## Related docs

- [`CLOUDFLARE_MIGRATION.md`](CLOUDFLARE_MIGRATION.md) — deploy + env vars
- [`EMAIL_PHASE2.md`](EMAIL_PHASE2.md) — customer confirmation email (future)
- [`ADMIN_CRM.md`](ADMIN_CRM.md) — admin lead list UI
- [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) — **STONE-039**
