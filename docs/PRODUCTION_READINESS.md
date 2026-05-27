# Stone Industries — Production Readiness

**Last updated:** 2026-05-25  
**Load when:** Deploy, host change, pre-push review

---

## Production bar

| Check | Requirement |
|-------|-------------|
| Live URL | https://stoneindustries.netlify.app/ (canonical) |
| Build | `npm run build` exit 0 |
| Lint | `npm run lint` exit 0 |
| Base path | Matches host — see [`DEPLOYMENT.md`](DEPLOYMENT.md) |
| Assets | WebP under `public/assets/` — not repo root |
| CTAs | HTML links work with production base |
| Legal | privacy, terms, capability-brief load |
| Console | No uncaught errors on homepage |
| Mobile | 375px + 320px QA pass |
| Hosting compliance | Commercial site on **Netlify Free** — not Vercel Hobby |
| Service packaging | Secure-by-default sections on all `public/services/*.html`; no compliance overclaims |
| Payment protection copy | `pricing.html` — deposits, scope, delivery, Bluevine workflow; no on-site checkout |
| Productized pricing | Fixed package tiers on pricing + **6** service pages; `pricingCatalog.ts` source of truth |
| Package estimator | Service + package-scoped add-ons; website page-count control; add-on `<details>` explanations; included add-ons not double-charged; PC builds show package context (best for / includes / not included) per STONE-026 |
| Tech Cleanup scope | Windows PCs only — no phones/Linux; macOS case-by-case; see `techCleanupPlatformScopeNote` |
| Estimator UX | Compact grouped add-ons; no standalone secure-lead-capture callout; `Details` collapsed by default |
| Post-launch QA | Removed from customer-facing catalog — QA remains internal delivery standard (`docs/QA_CHECKLIST.md`) |
| Paid ads | Setup/guidance quotable separately — not ongoing ad management or guaranteed results |
| AI scope | AI models, APIs, n8n-style workflows, AI-agent-style automation with human approval |
| Static page backgrounds | `page-atmosphere--coastal` on pricing/services — readable scrim (STONE-001) |
| Competitive positioning | `#where-stone-fits` on pricing/services; logistics freight disclaimer; no competitor names |
| Vision page | `public/vision.html` — grounded roadmap; homepage vision objects link to anchors |
| Email fallback | Copy email + mailto on React + static pages; no Gmail-login-only URLs (STONE-020) |
| Inquiry-first CTAs | Supabase forms primary; phone plain text; no mailto-only Request buttons |
| Certification trust | VOSB/SDVOSB/SAM.gov + certified LLC on About/footer/pricing/services — bounded disclaimer; no contract-win claims (**STONE-034**) |
| Launch critic pass | Recurring care visible; capability brief parity; hero deduped (**STONE-035**) |

---

## Payment & agreement workflow (operator)

| Rule | Implementation |
|------|----------------|
| Invoicing | **Bluevine** invoices/payment links near-term — no custom invoice app |
| Checkout | None on website; no card data collection |
| Quote | Fixed packages for defined scope; written confirmation before work; deposits per tier on pricing page |
| Stripe | **Not implemented** — Payment Links/invoices planned after quote; no card data on site |
| Handoff | Final balance before launch/transfer/credentials unless written exception |
| Change orders | Written approval for out-of-scope; hourly or re-quote |
| Internal template | [`SERVICE_AGREEMENT_BASELINE.md`](SERVICE_AGREEMENT_BASELINE.md) |

---

## Environment variables

| Var | Netlify (production) | GitHub Pages (mirror) | Vercel Pro (future) |
|-----|----------------------|----------------------|---------------------|
| `VITE_BASE_PATH` | `/` | `/Stone_Industries/` (CI default) | `/` |
| `VITE_SUPABASE_URL` | Supabase project URL | unset (forms fall back to mailto/tel) | optional |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key | unset | optional |

Set `VITE_BASE_PATH` in `netlify.toml`. Set Supabase vars in **Netlify UI** (never commit real keys). GitHub Actions mirror does not need Supabase unless mirror forms are enabled. Use `.env.local` for local prod preview.

---

## Smoke test (post-deploy — Netlify)

```text
1. Homepage 200 at /
2. Background WebP 200 (Network tab)
3. /pricing.html + /services.html + /vision.html + all **6** service detail pages 200
4. Mailto opens with subject; Copy email shows confirmation
5. tel:+15595799376 on hero, contact, static pages
6. /privacy.html /terms.html /capability-brief.html 200
7. Mobile sticky bar at 375px and 320px
8. One scroll through Services + Contact — no console errors
9. Inquiry form submit (when Supabase env set) — success message; row in Supabase Table Editor
10. Inquiry form with env unset — submit disabled; mailto/tel fallback visible
```

Full checklist: [`DEPLOYMENT.md`](DEPLOYMENT.md) post-deploy section.

---

## Rollback plan

| Host | Rollback |
|------|----------|
| **Netlify** | Publish previous successful deploy in Netlify dashboard |
| GitHub Pages | Revert commit on `main`; workflow redeploys prior artifact |
| Vercel Pro (future) | Redeploy previous production deployment in dashboard |

**Do not** force-push without operator approval.

---

## SRE rules

- Test production base path (`VITE_BASE_PATH=/`) before Netlify cutover
- Do not push runtime to `main` without build/lint locally or CI green
- Report dirty tree before deploy-related edits
- **Vercel Hobby is not approved for commercial production**

---

## Security backlog (post-launch hardening)

| Item | Status | Notes |
|------|--------|-------|
| Run hardened SQL in Supabase | **Before first live submit** | [`docs/supabase/stone-industries-inquiries.sql`](supabase/stone-industries-inquiries.sql) |
| CAPTCHA / Turnstile | Deferred | Requires server-side token verification — not client-only |
| Rate limiting | Deferred | Supabase Edge Function, Netlify Function proxy, or platform limits |
| Content-Security-Policy | Deferred | Google Fonts `@import` + Vite bundles need tuned CSP — see factory [`NETLIFY_SECURITY_HEADERS.md`](../../priv-saas-factory/docs/NETLIFY_SECURITY_HEADERS.md) |
| Spam monitoring | Deferred | Watch `public.inquiries` volume in Supabase Table Editor |
| Netlify Function proxy | Deferred | Escalation if direct anon insert abuse appears |
| Duplicate validation cleanup | Low | `inquiryTypes.ts` vs `inquiry-form.js` — keep in sync when fields change |

Factory security pack: [`../../priv-saas-factory/docs/SECURITY_BASELINE.md`](../../priv-saas-factory/docs/SECURITY_BASELINE.md)

Cross-ref: [`QA_CHECKLIST.md`](QA_CHECKLIST.md), [`DEPLOYMENT.md`](DEPLOYMENT.md)
