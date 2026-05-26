import { ArrowRight, Mail, MapPinned, Phone } from 'lucide-react'

import {
  buildMailto,
  capabilityBriefPath,
  contactEmail,
  contactPhone,
  contactPhoneHref,
  inquiryTypes,
  messageChecklist,
  serviceAreaContactLabel,
  serviceAreaOnSite,
  serviceAreaRemote,
} from '../../data/site'
import { InquiryForm } from '../InquiryForm'
import { InteractiveOrbAccent } from '../scene/InteractiveOrbAccent'
import { SectionHeading } from '../ui/SectionHeading'



const contactMethods = [

  {

    title: 'Email',

    value: contactEmail,

    href: buildMailto('Stone Industries Inquiry'),

    icon: Mail,

  },

  {

    title: 'Phone',

    value: contactPhone,

    href: contactPhoneHref,

    icon: Phone,

  },

  {

    title: 'Service area',

    value: serviceAreaContactLabel,

    href: '#contact',

    icon: MapPinned,

  },

]



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

            title="Email or call directly for the fastest response."

            description={`For IT support, small-business websites, Wi-Fi and POS help, AI automation and digital assistant systems, logistics coordination, or subcontracting discussions, contact Stone Industries directly. ${serviceAreaOnSite} ${serviceAreaRemote} Use the inquiry form, email, or phone below. No booking system or online checkout on this site.`}
          />



          <div className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.14)]">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">

              Choose an inquiry type

            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              {inquiryTypes.map((item) => (

                <a

                  key={item.label}

                  href={buildMailto(item.subject)}

                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium !text-slate-200 transition hover:border-cyan-400/30 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"

                >

                  {item.label}

                </a>

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

              href={buildMailto('Stone Industries Inquiry')}

              className="si-primary-cta inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"

            >

              Email Stone Industries

              <ArrowRight size={16} />

            </a>

            <a

              href={capabilityBriefPath}

              className="si-secondary-cta inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white [&_svg]:!stroke-white"

            >

              View Capability Brief

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



          {contactMethods.map((item) => {

            const Icon = item.icon



            return (

              <a

                key={item.title}

                href={item.href}

                className="si-section-glass rounded-[1.5rem] border border-white/[0.14] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.12)] transition hover:border-cyan-400/32 hover:shadow-[0_22px_70px_rgba(8,145,178,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"

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

