import { resolveServiceTitleFromSlug } from '../data/site'

export const INQUIRY_SERVICE_EVENT = 'si-inquiry-service'

export function scrollToContactSection(): void {
  const contact = document.getElementById('contact')
  if (!contact) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  contact.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

/** Same-page inquiry navigation — avoids full reload that breaks first #contact scroll. */
export function navigateToContactInquiry(slug: string): void {
  const title = resolveServiceTitleFromSlug(slug) ?? ''
  const url = new URL(window.location.href)

  url.searchParams.set('service', slug)
  url.hash = 'contact'

  window.history.pushState(
    { siContact: slug },
    '',
    `${url.pathname}${url.search}${url.hash}`,
  )

  window.dispatchEvent(
    new CustomEvent(INQUIRY_SERVICE_EVENT, { detail: { slug, title } }),
  )

  requestAnimationFrame(() => {
    scrollToContactSection()
  })
}

export function syncContactHashScroll(): void {
  if (window.location.hash !== '#contact') return

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToContactSection()
    })
  })
}
