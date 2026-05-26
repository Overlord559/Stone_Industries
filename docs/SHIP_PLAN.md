# Stone Industries — Ship Plan

**Last updated:** 2026-05-25  
**Load when:** Finishing, launch prep, blocker triage

---

## Definition of shipped (current phase)

| Done when | Evidence |
|-----------|----------|
| Site live on Netlify (production) | https://stoneindustries.netlify.app/ loads, assets OK |
| GitHub Pages mirror (optional) | https://overlord559.github.io/Stone_Industries/ |
| Build + lint pass | `npm run build`, `npm run lint` |
| QA P0 complete | [`QA_CHECKLIST.md`](QA_CHECKLIST.md) desktop + 375px + 320px |
| No fake claims | [`SAFETY_BOUNDARIES.md`](SAFETY_BOUNDARIES.md) |
| Project OS docs current | This integration pass |

---

## Active blockers

| Blocker | Owner | Unblock |
|---------|-------|---------|
| GBP / local SEO | Operator | Time + account |
| Paid domain / Stripe Payment Links setup | Budget | Friday/Monday if funds |
| Supabase free tier full | Operator | Pause unused project or defer DB |

---

## Next ship milestones

| Milestone | Status |
|-----------|--------|
| M1 | Project OS v2 docs — done |
| M2 | Fresno service area — done |
| M3 | Static pricing funnel — done |
| M4 | Netlify production deploy + smoke test — done |
| M5 | First paid customer via manual quote — operator |
| M6 | GBP + local SEO — operator |

---

## Backend deferral (this week)

| System | Decision | When |
|--------|----------|------|
| Supabase | **DEFER** — free projects maxed; no intake DB need yet | After repeat inquiries or Friday/Monday budget |
| Stripe custom checkout | **DEFER** — use Payment Link after quote manually | When packages repeat |
| Vercel Pro | **DEFER** — Netlify is production; Hobby not for commercial use | Only if operator upgrades later |

---

## Finishing discipline

1. **One slice per prompt** — Micro or Standard preferred over endless Major
2. **No scope creep** — visual pass without conversion check = incomplete
3. **WIP visibility** — report dirty `src/` files; do not silent-fix unrelated
4. **Handoff Update** after every Standard/Major pass
5. **Exact-path commits** — separate docs commits from runtime when possible

---

## Stop conditions

Stop iteration when:

- Inquiry path works on mobile
- Build/lint green
- Operator approves “good enough for local outreach”

Do not infinite-polish backgrounds (STONE-001).
