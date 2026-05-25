# Stone Industries — Conversion Notes

**Last updated:** 2026-05-25  
**Load when:** CTA, copy, service hierarchy, post-visual pass

---

## CTA hierarchy (local buyer)

| Rank | Action | Where |
|------|--------|-------|
| 1 | Service inquiry (mailto w/ subject) | Hero, Services cards, Contact |
| 2 | Phone `559-579-9376` | Hero secondary, Contact, mobile-visible |
| 3 | Capability brief | Footer / About — subcontracting only |

**Fail:** Capability brief outranks service inquiry (STONE-005, DESIGN-029).

---

## Per-service mailto subjects

From [`src/data/site.ts`](../src/data/site.ts) — e.g. `Tech Cleanup Inquiry — Stone Industries`

Each Services card should use its `inquirySubject`.

---

## Mobile conversion

- [ ] Phone visible without deep scroll
- [ ] Tap targets ≥ ~44px
- [ ] Sticky elements do not cover mailto/submit
- [ ] 375px + 320px verified

---

## Post-visual-upgrade check

After any background/orb/motion pass, re-run:

1. Primary CTA contrast (light buttons = dark text)
2. Service inquiry still obvious in 5 seconds
3. Vision section still labeled future-only

Conversion Intelligence flags: `cinematic_buried_conversion`, `brief_before_service_cta`, `missing_mobile_call_path`

---

## Trust without fake proof

- Veteran-led discipline — honest wording
- Quote-based scope
- No fabricated client logos or contract badges

See [`SAFETY_BOUNDARIES.md`](SAFETY_BOUNDARIES.md), [`CUSTOMER_VALIDATION.md`](CUSTOMER_VALIDATION.md)
