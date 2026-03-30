# Stone Industries Website

Standalone marketing site for Stone Industries built with React, TypeScript, Vite, Tailwind CSS, React Three Fiber, Three.js, framer-motion, and lucide-react.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## GitHub Pages

Set your GitHub Pages repo base path before pushing.

```ts
const repoBasePath = process.env.VITE_BASE_PATH ?? '/Stone_Industries/'
```

Recommended approach:

1. Copy `.env.example` to `.env.local`
2. Keep `/Stone_Industries/` for this repository, or change it only if you deploy under a different repo name

You can also hardcode the value directly in `vite.config.ts` if you prefer.
