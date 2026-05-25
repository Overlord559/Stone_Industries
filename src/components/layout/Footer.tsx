const legalBasePath = import.meta.env.BASE_URL

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div className="space-y-3">
          <p className="font-display text-lg font-semibold tracking-[-0.03em] text-white">
            Stone Industries
          </p>
          <p className="max-w-xl leading-6">
            Operational support, modern web systems, and logistics planning with
            a long-term view toward autonomous infrastructure.
          </p>
        </div>
        <div className="space-y-2 text-left lg:text-right">
          <p className="text-slate-200">Reliable Today. Autonomous Tomorrow.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 lg:justify-end">
            <a
              href={`${legalBasePath}privacy.html`}
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Privacy
            </a>
            <a
              href={`${legalBasePath}terms.html`}
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Terms
            </a>
          </div>
          <p>Built with React, TypeScript, Vite, Tailwind CSS, and Three.js.</p>
        </div>
      </div>
    </footer>
  )
}
