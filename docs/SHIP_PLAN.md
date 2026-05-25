# Stone Industries — Ship Plan

**Last updated:** 2026-05-25  
**Load when:** Finishing, launch prep, blocker triage

---

## Definition of shipped (current phase)

| Done when | Evidence |
|-----------|----------|
| Site live on GitHub Pages | URL loads, assets OK |
| Build + lint pass | `npm run build`, `npm run lint` |
| QA P0 complete | [`QA_CHECKLIST.md`](QA_CHECKLIST.md) desktop + 375px + 320px |
| No fake claims | [`SAFETY_BOUNDARIES.md`](SAFETY_BOUNDARIES.md) |
| Project OS docs current | This integration pass |

---

## Active blockers

| Blocker | Owner | Unblock |
|---------|-------|---------|
| Fresno service-area copy | Next Standard prompt | `site.ts` + meta |
| Vercel not configured | Operator + deploy doc | Import repo, set `VITE_BASE_PATH=/` |
| GBP / local SEO | Operator | Time + account |
| Paid domain/phone | Budget | Deferred |

---

## Finishing discipline

1. **One slice per prompt** — Micro or Standard preferred over endless Major
2. **No scope creep** — visual pass without conversion check = incomplete
3. **WIP visibility** — report dirty `src/` files; do not silent-fix unrelated
4. **Handoff Update** after every Standard/Major pass
5. **Exact-path commits** — separate docs commits from runtime when possible

---

## Next ship milestones

| Milestone | Type |
|-----------|------|
| M1 | Project OS v2 docs committed |
| M2 | Fresno + mobile CTA Standard pass |
| M3 | Vercel preview + smoke test |
| M4 | GBP + local SEO (operator) |

---

## Stop conditions

Stop iteration when:

- Inquiry path works on mobile
- Build/lint green
- Operator approves “good enough for local outreach”

Do not infinite-polish backgrounds (STONE-001).
