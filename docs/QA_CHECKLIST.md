# Stone Industries — QA Checklist

**Last updated:** 2026-05-25 · **Project OS v2**  
**Routing:** [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md) → deployment/technical rows  
**Evals:** [`EVALS.md`](EVALS.md)  
Run before commit or deploy when runtime files changed.

---

## Build / lint

From repo root:

```powershell
npm run build
npm run lint
```

| Check | Pass criteria |
|-------|---------------|
| TypeScript build | Exit 0 |
| ESLint | Exit 0 |
| Dist output | `dist/` contains `index.html` and assets |

Optional preview: `npm run preview` — open printed local URL.

---

## Desktop QA (≥1024px)

- [ ] Hero: headline, subcopy, primary CTA readable
- [ ] Primary CTA contrast on light buttons (dark text visible)
- [ ] Services section: all 5 services visible with inquiry links
- [ ] Vision section: future items labeled **not sold today**
- [ ] Contact: mailto opens with subject; phone link uses `tel:+15595799376`
- [ ] Navbar anchor links scroll to sections
- [ ] Footer links: privacy, terms, capability brief

---

## 375px QA (iPhone standard)

- [ ] No horizontal scroll
- [ ] Hero text readable without zoom
- [ ] CTAs tappable (min ~44px touch target)
- [ ] Phone number visible without excessive scrolling
- [ ] Sticky/fixed elements do not cover submit or primary CTA

---

## 320px QA (narrow fallback)

- [ ] Layout does not break
- [ ] Long service titles wrap cleanly
- [ ] Mailto/tel still reachable

---

## Background image checks

- [ ] Main DALRM hero visible — sign/art not fully crushed by scrim
- [ ] Lower coastal-tech image visible — not uniform black
- [ ] Mobile: no broken `background-attachment: fixed` jank
- [ ] Reduced motion: site usable with motion minimized

---

## Orb interaction checks

- [ ] Orbs do not cover hero signage or primary CTAs
- [ ] WebGL hidden or minimal below `lg` if configured
- [ ] Console: no uncaught WebGL errors breaking page

---

## Mailto / tel checks

- [ ] Each service inquiry link includes correct subject (see `site.ts`)
- [ ] Contact section mailto works
- [ ] `tel:+15595799376` dialable on mobile test device or emulator

---

## Legal / capability checks

- [ ] `/privacy.html` loads — inquiry form data collection accurately described (with base path in production)
- [ ] `/terms.html` loads
- [ ] `/capability-brief.html` loads — positioned as subcontracting, not primary local CTA
- [ ] No fake testimonials or contract logos

---

## Console check

- [ ] No uncaught errors on homepage happy path
- [ ] Note acceptable warnings (chunk size, dev-only)

---

## Asset path check

- [ ] Backgrounds served from `/assets/` on **Netlify production** (`VITE_BASE_PATH=/`)
- [ ] GitHub Pages mirror (if enabled): `/Stone_Industries/assets/`
- [ ] No references to repo-root draft images
- [ ] `og-image.svg` and favicon load

---

## Inquiry form check (Supabase)

- [ ] Homepage Contact section form loads without console errors
- [ ] `/pricing.html` and `/services.html` inquiry sections render
- [ ] Client validation: name + message required; email **or** phone required
- [ ] Honeypot field hidden; filled honeypot rejects submit
- [ ] With Supabase env configured: test submit creates row in `public.inquiries`
- [ ] With env unset: submit disabled on React form; static form shows mailto/tel fallback note
- [ ] Submit failure shows error + mailto/tel still available
- [ ] No service role key in repo, build output, or client bundle

---

## Netlify post-deploy smoke (production)

Run on live Netlify URL after deploy — https://stoneindustries.netlify.app/ — see [`DEPLOYMENT.md`](DEPLOYMENT.md):

- [ ] `/`, `/pricing.html`, `/services.html` — 200
- [ ] All five `/services/*.html` detail pages — 200
- [ ] `/capability-brief.html`, `/privacy.html`, `/terms.html` — 200
- [ ] Hero primary CTA → `/pricing.html`
- [ ] `tel:+15595799376` on hero, contact, static pages
- [ ] Mobile sticky bar (Call + View Pricing) at 375px and 320px
- [ ] No horizontal scroll; sticky bar does not cover contact CTAs

---

## No fake claims check

- [ ] Services match deliverable scope in `site.ts`
- [ ] Future roadmap not sold as current product
- [ ] AI service copy includes human review — no “autonomous agent” promises
- [ ] Veteran-led / subcontracting claims honest — no invented wins

---

## Pre-commit hygiene

```powershell
git status --short
```

- [ ] No untracked `*.webp` at repo root
- [ ] Only intended files modified
- [ ] Docs-only pass did not touch `src/` unless scoped

---

## Learning loop

After QA, note: new `STONE-NNN` lesson or reason code per [`LEARNING_LOOP.md`](LEARNING_LOOP.md).
