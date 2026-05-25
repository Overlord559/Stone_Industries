import { ArrowRight, Mail, MapPinned, Phone } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'

const contactMethods = [
  {
    title: 'Email',
    value: 'stoneindustries0.llc@gmail.com',
    href: 'mailto:stoneindustries0.llc@gmail.com',
    icon: Mail,
  },
  {
    title: 'Phone',
    value: '559-579-9376',
    href: 'tel:+15595799376',
    icon: Phone,
  },
  {
    title: 'Location',
    value: 'Sacramento, California',
    href: '#contact',
    icon: MapPinned,
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-white/10 bg-[linear-gradient(180deg,rgba(8,47,73,0.18),rgba(2,6,23,0.96))]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.88fr_1.12fr] lg:px-10">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Contact"
            title="A practical entry point for direct support and subcontracting discussions."
            description="If you need responsive operational support, dependable delivery, or a grounded starting point for scoped work, Stone Industries is available for direct contact and serious business conversations."
          />
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.28)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">
              What to expect
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                ['Direct contact', 'Reach Stone Industries directly by email or phone for support and subcontracting discussions.'],
                ['Response-oriented', 'Conversations stay focused on operational needs, realistic scope, and practical next steps.'],
                ['Professional follow-up', 'Responses are structured to move from inquiry to a workable path forward quickly.'],
              ].map(([title, copy]) => (
                <div key={title} className="space-y-2">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-sm leading-6 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <a
            href="mailto:stoneindustries0.llc@gmail.com"
            className="si-primary-cta inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"
          >
            Contact Stone Industries
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid gap-5 self-start">
          {contactMethods.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.title}
                href={item.href}
                className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.03))] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.2)] transition hover:border-cyan-400/30 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.035))]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {item.title}
                    </p>
                    <p className="mt-2 text-lg font-medium text-white">{item.value}</p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
