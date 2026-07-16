# Stone Industries — Operator Brain Handoff

**Last updated:** 2026-06-13  
**Purpose:** Copy/paste blocks for `C:\dev\operator-brain` and new chat sessions.  
**Stone repo HEAD:** `db3c4b2`

---

## Quick state (paste into new chats)

```text
STONE INDUSTRIES PRODUCTION STATE (2026-06-13):
- Live: https://stoneindustriesusa.com on Cloudflare Pages (GitHub main auto-deploy)
- Netlify is rollback only — NOT production
- Lead capture: POST /api/inquiries → Supabase save (required) → Resend notify → HubSpot optional
- Resend LIVE: Stone Industries <notifications@notify.stoneindustriesusa.com> → edward@stoneindustriesusa.com
- HubSpot: code ready; HUBSPOT_PRIVATE_APP_TOKEN optional/pending unless operator configured
- Calendly: Book Free Remote Revenue Leak Review + success-panel consultation link — post-capture only
- Stripe: NOT implemented; Bluevine/Wave/manual quote invoice flow
- Do not break: capture-first, no auto mailto, no secrets in VITE_*, no fake success
- Stone repo: C:\dev\stone_industries website
- Docs: README.md, docs/PRODUCTION_SYSTEM_AUDIT.md, docs/CRM_HUBSPOT_LEAD_ROUTING.md
```

---

## Current production state

| Item | Value |
|------|-------|
| **Live URL** | https://stoneindustriesusa.com |
| **Host** | Cloudflare Pages + Cloudflare DNS |
| **GitHub** | https://github.com/Overlord559/Stone_Industries |
| **Branch** | `main` |
| **Local path** | `C:\dev\stone_industries website` |
| **Rollback** | https://stoneindustries.netlify.app/ |
| **GitHub Pages mirror** | https://overlord559.github.io/Stone_Industries/ |

---

## Lead pipeline (canonical)

```text
Form submit → POST /api/inquiries (Cloudflare Function)
  → validate + honeypot
  → Supabase INSERT (source of truth)
  → Resend → edward@stoneindustriesusa.com (when RESEND_* configured)
  → HubSpot contact + note (when HUBSPOT_PRIVATE_APP_TOKEN configured)
  → Customer success ONLY if Supabase saved
  → Success UI: Calendly optional + copy/email/phone manual fallbacks
```

**Fallback:** Direct Supabase anon insert when `/api/inquiries` unavailable (local Vite dev).

---

## Verified working (operator-confirmed)

- Cloudflare Pages production deploy from GitHub `main`
- Domain + HTTPS on stoneindustriesusa.com
- Supabase inquiry rows on submit
- Capture-first forms — no auto Gmail/mailto on normal submit
- Resend operator notification email delivered
- Calendly booking buttons on pricing/services and success panel
- Security + cache headers via `public/_headers`
- Admin CRM code at `/admin/leads.html` + Functions (token auth)

---

## Deferred / optional

| Item | Status |
|------|--------|
| HubSpot token in Cloudflare env | Optional — sync code shipped |
| Customer confirmation email | Not built (EMAIL_PHASE2) |
| Stripe / on-site checkout | Deferred |
| CAPTCHA / rate limiting on `/api/inquiries` | Deferred |
| CSP hardening (`unsafe-inline` removal) | Deferred |
| Netlify rollback retirement | After extended Cloudflare stability |
| JARVIS v0 build | Operator Brain gate — see current-state.md |

---

## Required env vars (names only)

**Cloudflare Pages build**

- `VITE_BASE_PATH=/`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Cloudflare Functions**

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM` → `Stone Industries <notifications@notify.stoneindustriesusa.com>`
- `STONE_NOTIFY_EMAIL` → `edward@stoneindustriesusa.com`
- `HUBSPOT_PRIVATE_APP_TOKEN` (optional)
- `STONE_ADMIN_TOKEN` (admin CRM)

---

## Do-not-break rules

1. Supabase save is required for customer success — never fake success.
2. Never auto-open mailto/Gmail on normal submit.
3. Never put service role, Resend, HubSpot, or admin tokens in `VITE_*`.
4. Email/HubSpot failures must not fail customer success if Supabase saved.
5. Calendly is post-capture — not a replacement for lead capture.
6. Purge Cloudflare cache after lead-capture JS/HTML changes; test canonical URL.
7. No fake contracts, awards, agency endorsement, or guaranteed leads in copy.

Ledger: Stone **STONE-037**, **STONE-038**, **STONE-039**

---

## Next priorities (operator)

1. Configure `HUBSPOT_PRIVATE_APP_TOKEN` if CRM sync wanted
2. Run admin CRM test: new → contacted → booked on one lead
3. Rate limit or Turnstile before heavy ad spend
4. Customer confirmation email (Resend use case #2)
5. Outreach volume — site is ready; focus on calls/drafts (California remote plan)

---

## Resume / portfolio value

See [`docs/RESUME_PROJECT_SUMMARY.md`](RESUME_PROJECT_SUMMARY.md).

**One-liner for Brain memory:** Production React/Vite site on Cloudflare with Supabase lead capture, Resend operator notify, optional HubSpot, Calendly post-booking, documented capture-first pipeline.

---

## Copy/paste: `operator-brain/current-state.md` patch

Replace or append under **Stone Industries** / **Last completed** / **Known blockers**:

```markdown
### Stone Industries website (2026-06-13 production audit)

| Field | Value |
|-------|-------|
| **Production URL** | https://stoneindustriesusa.com |
| **Host** | Cloudflare Pages + DNS (GitHub main auto-deploy) |
| **Netlify** | Rollback mirror only — not production |
| **Lead pipeline** | POST /api/inquiries → Supabase → Resend → HubSpot (optional) |
| **Resend** | **Live** — notifications@notify.stoneindustriesusa.com → edward@stoneindustriesusa.com |
| **HubSpot sync** | Code shipped; token optional until operator sets HUBSPOT_PRIVATE_APP_TOKEN |
| **Calendly** | Live — post-capture booking links |
| **Stripe** | Deferred — Bluevine/Wave/manual invoice |
| **Repo docs** | README.md, docs/PRODUCTION_SYSTEM_AUDIT.md, docs/OPERATOR_BRAIN_HANDOFF.md |

**JARVIS gate update:** Stone Cloudflare deploy + inquiry capture + Resend notify are **live**. Remaining gates: admin CRM production test, Calendly same-day event verification, first lead new→booked workflow.

**Do not:** break capture-first inquiry behavior; polish site code unless broken (cash mode).
```

---

## Copy/paste: `operator-brain/projects/stone-industries.md` patch

Add after **Production** block:

```markdown
**Lead capture (2026-06-13):** `POST /api/inquiries` on Cloudflare Functions — Supabase source of truth, Resend operator email (live), HubSpot optional. See Stone repo `docs/CRM_HUBSPOT_LEAD_ROUTING.md` and `docs/OPERATOR_BRAIN_HANDOFF.md`.
```

Update **Rollback mirror** line if present to say "not primary production."

---

## Copy/paste: `operator-brain/BRAIN_INDEX.md` routing note

Under Stone Industries website row, add doc pointer:

```markdown
| Stone lead router / production audit | Stone repo `docs/PRODUCTION_SYSTEM_AUDIT.md`, `docs/OPERATOR_BRAIN_HANDOFF.md`, `docs/CRM_HUBSPOT_LEAD_ROUTING.md` |
```

---

## Related Operator Brain docs

| Brain path | Use |
|------------|-----|
| [`projects/stone-industries.md`](../../operator-brain/projects/stone-industries.md) | Project index |
| [`current-state.md`](../../operator-brain/current-state.md) | Portfolio snapshot |
| [`docs/stone/BOOKINGOPS.md`](../../operator-brain/docs/stone/BOOKINGOPS.md) | Calendly doctrine |
| [`docs/stone/PAYMENTOPS.md`](../../operator-brain/docs/stone/PAYMENTOPS.md) | Payment doctrine |

---

## Learning reason code

New lesson already captured: **STONE-039** (Supabase truth, email inbox, HubSpot backup, Calendly optional). Audit pass adds README + operational docs — `already_covered` for new ledger entry.
