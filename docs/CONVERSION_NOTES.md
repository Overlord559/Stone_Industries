# Stone Industries — Conversion Notes

**Last updated:** 2026-05-25  
**Load when:** CTA, copy, service hierarchy, post-visual pass

---

## CTA hierarchy (local buyer)

| Rank | Action | Where |
|------|--------|-------|
| 1 | Service pricing/detail page | Hero primary → `pricing.html`; cards → service pages |
| 2 | Phone `559-579-9376` | Hero secondary (Call / Text), mobile sticky bar, Navbar mobile, Contact |
| 3 | Service inquiry (mailto w/ subject) | Service pages, Contact, card secondary |
| 4 | Capability brief | Footer / About — subcontracting only |

**Fail:** Mailto-only with no package context (STONE-007).

---

## Static pricing funnel (current)

| Page | Path |
|------|------|
| All pricing | `public/pricing.html` |
| All services | `public/services.html` |
| Per-service | `public/services/*.html` |

React links use `import.meta.env.BASE_URL` via `site.ts`.

---

## Mobile contact chrome (current)

| Element | Breakpoint | Actions |
|---------|------------|---------|
| Navbar top Call | `< md` | `tel:` quick dial |
| Hero Call / Text | All | `tel:` with visible number |
| Sticky bottom bar | `< md` | Call + View Pricing (max 2) |

Bottom bar uses safe-area padding and `#root` mobile padding so footer/contact is not covered.

---

## Payment (manual first)

- No fake checkout on site
- Quote confirmed before work
- Stripe Payment Link / invoice after quote when operator ready — not embedded checkout yet

---

## Secure-by-default packaging (2026-05-25)

| Rule | Why |
|------|-----|
| Sell **practical** security per service | Local buyers want trust without enterprise fear-mongering |
| Link to service detail pages | Full bullet lists live on `public/services/*.html` |
| Global disclaimer on pricing/services | “Included where applicable” — not hacker-proof or compliance certified |
| No PCI/HIPAA/SOC 2/military-grade claims | Avoid legal/trust drift (factory DESIGN-033) |

**CTA unchanged:** Email/phone/manual quote still primary; security copy supports trust, does not replace contact path.

Source: `src/data/site.ts` (`securityIncluded`, `securityPackageDisclaimer`) + static service pages.

---

## Post-visual-upgrade check

After any background/orb/motion pass, re-run CTA hierarchy check.

See [`CUSTOMER_VALIDATION.md`](CUSTOMER_VALIDATION.md), STONE-005, STONE-007.
