# Stone Industries — Visual System

**Last updated:** 2026-05-25  
**Load when:** Visual/design/motion work  
**Tagline context:** *Reliable Today. Autonomous Tomorrow.*

---

## Layers

| Layer | Asset / component | Rule |
|-------|-------------------|------|
| **Main hero** | `public/assets/stone-main-dalrm-bg.webp` | DALRM coastal cinematic — asymmetric scrim on copy column |
| **Lower support** | `public/assets/stone-coastal-tech-bg.webp` | Calmer coastal-tech — do not over-darken (STONE-001) |
| **Orb accents** | `InteractiveOrbAccent`, orb scene | Empty space only — satellite/orbit signal pattern |
| **Typography** | Tailwind + glass cards | Local readability surfaces — not global near-black wash |
| **Motion** | CSS parallax + framer-motion | Restrained; PRM + mobile fallbacks |

---

## Scrim rules (STONE-001)

1. Lower scrim ~10% darker than hero readable zone max
2. Asymmetric hero: darker on copy, lighter on art/sign zone
3. Section-specific scrims for Vision/Contact — no stacked duplicate globals
4. Mobile: disable `background-attachment: fixed`; tune `background-position`

---

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
