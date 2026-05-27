import { ArrowRight } from 'lucide-react'

import {
  capabilityBriefPath,
  inquiryTypes,
  messageChecklist,
  serviceAreaOnSite,
  serviceAreaRemote,
} from '../../data/site'
import { InquiryForm } from '../InquiryForm'
import { InteractiveOrbAccent } from '../scene/InteractiveOrbAccent'
import { SectionHeading } from '../ui/SectionHeading'



export function Contact() {

  return (

    <section

      id="contact"

      className="relative border-t border-white/10"

    >

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.88fr_1.12fr] lg:px-10">

        <div className="space-y-8">

          <SectionHeading

            eyebrow="Contact"

            title="Submit an inquiry for the fastest response."

            description={`For custom PC builds, Tier 1 IT support, business websites, Wi-Fi and POS help, AI receptionist workflows, mobile MVP prototypes, operations coordination, or subcontracting discussions, use the inquiry form first. ${serviceAreaOnSite} ${serviceAreaRemote} Email copy and phone fallback are with the form. No booking system or online checkout on this site.`}
          />



          <div className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.14)]">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">

              Choose an inquiry type

            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              {inquiryTypes.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200"
                >
                  {item.label}
                </span>
              ))}

            </div>

          </div>



          <div className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.14)]">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">

              Include in your message

            </p>

            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">

              {messageChecklist.map((item) => (

                <li key={item} className="flex gap-2">

                  <span className="text-cyan-300/80">•</span>

                  <span>{item}</span>

                </li>

              ))}

            </ul>

          </div>



          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={capabilityBriefPath}
              className="si-secondary-cta inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white [&_svg]:!stroke-white"
            >
              View Capability Brief
              <ArrowRight size={16} />
            </a>
          </div>

        </div>



        <div className="grid gap-5 self-start">
          <InquiryForm sourcePage="/" defaultService="General Inquiry" />

          <div className="hidden justify-end lg:flex">

            <InteractiveOrbAccent
              variant="contact"
              label="Interactive contact signal network visual"
            />

          </div>



        </div>

      </div>

    </section>

  )

}

