# Stone Industries — Visual System

**Last updated:** 2026-05-26  
**Load when:** Visual/design/motion work  
**Tagline context:** *Reliable Today. Autonomous Tomorrow.*

---

## Layers

| Layer | Asset / component | Rule |
|-------|-------------------|------|
| **Main hero** | `public/assets/stone-main-dalrm-bg.webp` | DALRM coastal cinematic — asymmetric scrim on copy column |
| **Lower support** | `public/assets/stone-coastal-tech-bg.webp` | Calmer coastal-tech — do not over-darken (STONE-001) |
| **Orb accents** | `InteractiveOrbAccent`, orb scene | Services/Contact empty space — satellite/orbit signal pattern |
| **Hero shuttle** | `HeroRocketAccent` (SVG/CSS) | Sky clear zone only — distinct from section orbs (**STONE-031**) |
| **Typography** | Tailwind + glass cards | Local readability surfaces — not global near-black wash |
| **Motion** | CSS parallax + framer-motion | Restrained; PRM + mobile fallbacks |

---

## Scrim rules (STONE-001)

1. Lower scrim ~10% darker than hero readable zone max
2. Asymmetric hero: darker on copy, lighter on art/sign zone — but **right edge must not drop below ~0.38 opacity** (no cyan body rail)
3. Section-specific scrims for Vision/Contact — no stacked duplicate globals
4. Mobile: disable `background-attachment: fixed`; tune `background-position`
5. **No right-biased global cyan glows** at `82%` — use center-top atmosphere only (**STONE-030**)

---

## Hero accent clear zone (STONE-002 / STONE-030 / STONE-031)

- DALRM hero embeds Stone Industries signage on the right art column
- **Hero rocket:** `HeroRocketAccent` — vertical retro-futuristic SVG (`nose / body / port / fins / exhaust`) in upper-right sky (`right ~8–10%`, `top ~9–10%` at `lg+`); hidden below `lg`
- Mount: `.si-hero-rocket-mount` at `z-20` after hero copy; copy column `pointer-events-none` with CTA links `pointer-events-auto` (**STONE-033**)
- Interaction: `<button>` hitbox; pointer tilt; hold → plume; window release fallback; `prefers-reduced-motion` = static tilt only (**STONE-032**)
- Services/Contact keep `InteractiveOrbAccent` — do not duplicate orbital motif in hero
- Map clear zones before placing any accent on backgrounds with embedded logos/text

## Motion restraint (Apple HIG lens)

- One coherent accent system — not motion soup
- WebGL minimized/hidden below `lg`
- Reduced-motion: static/slow orbit; conversion HTML unchanged

---

## Conversion before spectacle

Visual pass is **incomplete** without CTA hierarchy check — [`CONVERSION_NOTES.md`](CONVERSION_NOTES.md)

Factory: DESIGN-026 — [`../../priv-saas-factory/docs/visual-primitives/`](../../priv-saas-factory/docs/visual-primitives/)

---

## Do not

- Repeat hero wallpaper in every section
- Place 3D over embedded signage (STONE-002)
- Ship visual QA without 375px check

Details: [`VISUAL_PRIMITIVES.md`](VISUAL_PRIMITIVES.md), [`ASSET_GUIDELINES.md`](ASSET_GUIDELINES.md)
