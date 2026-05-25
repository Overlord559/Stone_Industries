# Stone Industries — Asset Guidelines

**Last updated:** 2026-05-25  
**Load when:** New images, visual commits, background changes

---

## Canonical paths

| Asset | Path |
|-------|------|
| Main DALRM hero | `public/assets/stone-main-dalrm-bg.webp` |
| Lower coastal-tech | `public/assets/stone-coastal-tech-bg.webp` |
| OG / favicon | `public/og-image.svg`, `public/favicon.svg` |

**Never** commit production backgrounds at repo root (STONE-003).

---

## Commit hygiene

```powershell
git status --short
```

Before any visual commit:

- [ ] No untracked `ChatGPT*.webp` or root `*.webp`
- [ ] Stage **exact paths** — never `git add .`
- [ ] List assets in commit message

---

## Format rules

- **WebP** for photographic backgrounds (optimized)
- **SVG** for icons, OG, favicon
- Do not commit raw 4MB+ unoptimized files without operator OK

---

## Promotion workflow

1. Generate/select image
2. Optimize → rename descriptively
3. Move to `public/assets/`
4. Reference in CSS/components
5. Delete or gitignore drafts at root

Factory: DESIGN-027 — [`../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md`](../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md)

---

## Base path check

Production URLs include `/Stone_Industries/` prefix on GitHub Pages. After Vercel migration, re-verify all asset references.
