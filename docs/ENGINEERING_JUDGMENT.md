# Stone Industries — Engineering Judgment

**Last updated:** 2026-05-25  
**Load when:** Technical changes, refactors, dependency questions

---

## Stack (fixed unless operator approves)

- Vite + React 19 + TypeScript + Tailwind CSS 4
- R3F + Three.js for **restrained** orb accents only
- framer-motion for section motion — keep minimal

**No new npm dependencies** without explicit operator approval.

---

## Tradeoff rules

| Prefer | Over |
|--------|------|
| HTML `<a>` / `<button>` CTAs | Canvas-baked CTAs |
| CSS parallax + WebP | Heavy live WebGL hero |
| Single `site.ts` data source | Scattered hardcoded copy |
| Explicit Vite `base` path | Assumed root deploy |
| Fail-closed WebGL (hide on mobile) | Crash-on-scroll 3D |

---

## Technical debt prevention

- Do not copy Snocialclub/factory demo code into Stone — use documented primitives
- Invalid Tailwind utilities fail silently — verify build CSS (STONE-004)
- Global `a { color: inherit }` can break light buttons — test CTA contrast
- Chunk manual splits in `vite.config.ts` — do not remove without size check

---

## When to SIMPLIFY vs BUILD

| SIMPLIFY | BUILD |
|----------|-------|
| Full visual rewrite | One-section CTA fix |
| New 3D system | Adjust scrim opacity |
| Multi-host deploy change | Docs-only deploy note |

Document decision in Pre-Build Gate.

---

## Validation (required for runtime changes)

```powershell
npm run build
npm run lint
```

Plus QA viewports in [`QA_CHECKLIST.md`](QA_CHECKLIST.md).

---

## Factory cross-reference

DESIGN-014 (engine tier), DESIGN-016 (WebGL fail-closed), DESIGN-025–026 (primitives) — [`../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md`](../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md)
