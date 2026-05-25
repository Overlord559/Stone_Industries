# Stone Industries — Customer Validation

**Last updated:** 2026-05-25  
**Load when:** Copy, offers, CTAs, new service wording

---

## Who buys today

| Segment | Need | Primary CTA |
|---------|------|-------------|
| Local small business | Tech cleanup, Wi-Fi, POS | Service inquiry / call |
| Contractor / vendor | Fast website | Website inquiry |
| Prime / partner | Coordination, capability | Capability brief (secondary) |
| Home office | One-off cleanup | Tech cleanup inquiry |

---

## 5-second test (mobile)

Can a Fresno-area buyer answer:

1. **What do you sell?** → Five named services
2. **Can I hire you today?** → Mailto/tel with clear subject
3. **Are you local?** → Service area (update pending)
4. **Is this real?** → Honest scope, no fake logos

If any fail → **VALIDATE** before visual work.

---

## Message checks

- [ ] Service names match [`src/data/site.ts`](../src/data/site.ts)
- [ ] Quote-based pricing — no fake “from $X” unless operator sets prices
- [ ] AI Workflow = human review, not autonomous agents
- [ ] Vision/DALRM not sold as current product
- [ ] Capability brief ≠ primary hero CTA for local buyers

---

## Validation without budget

- Operator review of mailto subjects and hero hierarchy
- Manual mobile QA (375px) — [`QA_CHECKLIST.md`](QA_CHECKLIST.md)
- Future: Google Business Profile, 3–5 friendly operator reads

---

## Fail signals

- Visitor opens capability brief before service inquiry
- Phone requires scroll on mobile
- “Agentic” or enterprise AI language on homepage

See [`CONVERSION_NOTES.md`](CONVERSION_NOTES.md), STONE-005.
