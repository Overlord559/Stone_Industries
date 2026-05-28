import { resolveServiceTitleFromSlug } from '../data/site'

export const INQUIRY_SERVICE_EVENT = 'si-inquiry-service'

export function syncContactHashScroll(): void {
  syncHashScroll()
}

export function syncHashScroll(): void {
  const hash = window.location.hash.replace('#', '')
  if (hash !== 'contact' && hash !== 'revenue-leak-audit') return

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToSection(hash)
    })
  })
}

function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId)
  if (!section) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  section.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

export function scrollToContactSection(): void {
  scrollToSection('contact')
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
