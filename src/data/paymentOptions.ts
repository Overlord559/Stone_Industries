/** Customer-facing payment options — aligned with PAYMENT_OPTIONS_POLICY.md */

export type PaymentBand = {
  band: string
  offers: string
  options: string[]
}

export const paymentBands: PaymentBand[] = [
  {
    band: 'Under $300',
    offers: 'Remote Quick Fix · Remote Business Tech Session',
    options: ['Paid upfront before session'],
  },
  {
    band: '$297–$750',
    offers: 'AI Revenue Leak Audit · partial starter scope',
    options: [
      'Paid upfront',
      '100% credited toward sprint if sprint starts within 7 days (when applicable)',
    ],
  },
  {
    band: '$750–$1,500',
    offers: 'Starter Fix Sprint',
    options: [
      '50% upfront / 50% before launch',
      'Or 40% start / 30% midpoint / 30% launch',
    ],
  },
  {
    band: '$1,500–$2,500',
    offers: 'AI Customer Engine Sprint · Website / Lead Capture Sprint',
    options: [
      '50% upfront / 50% before launch',
      'Or 40% start / 30% midpoint / 30% before launch',
    ],
  },
  {
    band: '$2,500+',
    offers: 'AI Receptionist / Automation Sprint',
    options: [
      '30% deposit / 40% build approval / 30% before launch',
      'Usage and subscription costs quoted separately or capped on quote',
    ],
  },
  {
    band: 'Monthly',
    offers: 'Managed AI Ops ($299–$997/mo)',
    options: ['First month upfront', 'Recurring invoiced before each service period'],
  },
]

export const paymentDisclaimer =
  'No online checkout on this site. Written quote or Wave/Stripe payment link after scope confirmation. We scope down before discounting.'
