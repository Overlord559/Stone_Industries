# Stone Industries — Visual Primitives

**Last updated:** 2026-05-25  
**Load when:** Orb, orbit, 3D accent work

---

## Active primitives on site

| Primitive | Location | Behavior |
|-----------|----------|----------|
| **Interactive orb accent** | Section empty space (e.g. Services, Contact) | Satellite/orbit signal pattern — desktop emphasis |
| **Orb scene / R3F** | `src/components/scene/` | Restrained WebGL; fail-closed |
| **Parallax backgrounds** | `src/index.css` | Option A: main + lower WebP |

---

## Placement rules (STONE-002)

- Inspect focal points in background art before placing orbs
- **Never** over: embedded signs, logos, faces, primary CTAs
- Below `lg`: hide or minimize WebGL accents

---

## Factory extraction target

Reusable patterns live in SaaS Factory:

- `@saas-factory/visual-world/interactive-orb`
- `@saas-factory/visual-world/orbital-scene`
- Docs: `docs/visual-engines/INTERACTIVE_ORB_SATELLITE_NETWORK.md`, `ORBITAL_SYSTEM_SCENE_PRIMITIVE.md`

**Do not** copy Stone paths into factory — use presets + integration checklist.

---

## Fallback chain

1. Full orb (desktop, motion OK)
2. Reduced motion → slow/static CSS
3. Mobile → CSS-only or hidden WebGL
4. WebGL error → HTML conversion path unaffected (DESIGN-016)

Checklist: [`../../priv-saas-factory/docs/visual-primitives/integration-checklist.md`](../../priv-saas-factory/docs/visual-primitives/integration-checklist.md)
