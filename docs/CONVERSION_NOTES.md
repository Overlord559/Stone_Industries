# Stone Industries — Conversion Notes

**Last updated:** 2026-05-25  
**Load when:** CTA, copy, service hierarchy, post-visual pass

---

## CTA hierarchy (local buyer)

| Rank | Action | Where |
|------|--------|-------|
| 1 | Service pricing/detail page | Hero primary → `pricing.html`; cards → service pages |
| 2 | Service inquiry (mailto w/ subject) | Service pages, Contact, card secondary |
| 3 | Phone `559-579-9376` | Contact, Navbar mobile, service pages |
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

## Payment (manual first)

- No fake checkout on site
- Quote confirmed before work
- Stripe Payment Link / invoice after quote when operator ready — not embedded checkout yet

---

## Post-visual-upgrade check

After any background/orb/motion pass, re-run CTA hierarchy check.

See [`CUSTOMER_VALIDATION.md`](CUSTOMER_VALIDATION.md), STONE-005, STONE-007.
