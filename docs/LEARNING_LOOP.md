# Stone Industries — Learning Loop

**Last updated:** 2026-06-13 · **Project OS v2**  
**Routing:** [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md) → learning/backfill row  
**Related:** SaaS Factory [`docs/SAAS_FACTORY_LEARNING_LOOP.md`](../../priv-saas-factory/docs/SAAS_FACTORY_LEARNING_LOOP.md)

---

## Purpose

Capture mistakes once so ChatGPT and Cursor do not repeat them across sessions.

---

## Every correction rule (mandatory)

**Every operator correction, dislike, bug, UI issue, scope correction, or preference** must be:

1. Checked against [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) (Stone `STONE-NNN`)
2. Checked against factory [`DESIGN_MISTAKE_LEDGER.md`](../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md) (`DESIGN-NNN`)
3. Either **documented** (new or extended entry) or **reason-coded** in the final report

No silent dismissals. Visual QA passing does not exempt learning capture.

**Backfill index:** [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) → *Recent Operator Corrections Backfill* (2026-05-25) and **STONE-027**–**STONE-035** (2026-05-26).

---

## When to add a lesson

Add to [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) when:

- Operator corrects the same issue twice (or once if launch-blocking)
- Visual pass hides conversion or contact paths
- Generated assets staged at repo root
- Invalid Tailwind utilities silently fail
- AI service naming overclaims capability
- Background/scrim tuning blocks focal art
- CTA routing, email fallback, scope boundaries, or prompt/doc discipline gaps
- Inquiry forms that treat mailto/Gmail as primary capture instead of Supabase save (**STONE-037**, 2026-06-13)
- Lead router missing operator email notify or exposing server secrets in frontend (**STONE-039**, 2026-06-13)
- Stale CDN cache on canonical URL while query-string URLs work (**STONE-038**, 2026-06-13)

If the pattern applies to **all factory projects**, also promote to SaaS Factory `DESIGN-NNN` (see **DESIGN-036** for 2026-05-25 Stone proof-site batch).

---

## Reason codes when no lesson is added

| Code | When |
|------|------|
| `already_covered` | Existing ledger entry fully covers it — cite ID |
| `one_off_fix` | Single typo/bug, no reusable pattern |
| `out_of_scope` | Read-only, docs-only baseline, or task excluded learning |
| `needs_operator_review` | Operator may disagree — schedule backfill |

**Mandatory:** Every Standard/Major agent final report includes one of the above if no new lesson was written.

---

## Operator disagreement rule

If the operator says a pass should have produced a lesson, run a **learning backfill** — extend an existing entry or add `STONE-NNN`. Do not dismiss because visual QA passed.

---

## Where lessons go

| Location | Owns |
|----------|------|
| `docs/DESIGN_MISTAKE_LEDGER.md` | Stone-specific and site-proven patterns |
| `../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md` | Factory-wide DESIGN-NNN doctrine |
| Handoff Update in chat | Session continuity until doc updated |

---

## Relationship to SaaS Factory

Stone Industries is a **proof site** for factory visual patterns (parallax, orb accents, conversion discipline). Lessons discovered here should:

1. Land in Stone ledger first (plain language)
2. Promote to SaaS Factory `DESIGN-NNN` when reusable (see DESIGN-024–036)

### SaaS Factory Reference Rule (serious Stone work)

Before **Standard/Major** Stone passes (visual, conversion, pricing, contact, audit, launch), also load relevant factory material:

| Load | Path |
|------|------|
| Factory brain | `../priv-saas-factory/MASTER.md` |
| Source map | `../priv-saas-factory/docs/SAAS_FACTORY_SOURCE_OF_TRUTH.md` |
| Learning loop | `../priv-saas-factory/docs/SAAS_FACTORY_LEARNING_LOOP.md` |
| Factory ledger | `../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md` |
| Conversion | `../priv-saas-factory/docs/CONVERSION_INTELLIGENCE.md` |
| Visual intake | `../priv-saas-factory/docs/VISUAL_INSPIRATION_LAB.md`, `SAFE_3D_SITE_IMPORT_POLICY.md` |
| Engines / primitives | `../priv-saas-factory/docs/visual-engines/`, `visual-primitives/` |
| Agents | `../priv-saas-factory/prompts/README.md`, `prompts/agents/` (as task requires) |
| Reusable code | `../priv-saas-factory/packages/visual-world/README.md` (read-only unless scoped) |

**Do not** edit factory apps from Stone tasks unless explicitly scoped. **Do** promote cross-project lessons.

Agents working in Stone should read **both** ledgers before visual or conversion passes.
