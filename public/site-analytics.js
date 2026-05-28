/**
 * Privacy-safe analytics for static HTML pages.
 * Loads with analytics-config.js (build-time env injection). No-op when unset.
 */
(function () {
  var config = window.__SI_ANALYTICS_CONFIG__ || {}
  var gaId = (config.gaMeasurementId || '').trim()
  var clarityId = (config.clarityProjectId || '').trim()

  function pagePath() {
    return window.location.pathname + window.location.hash
  }

  function track(event, params) {
    if (!gaId || typeof window.gtag !== 'function') return
    var payload = { page_path: pagePath() }
    if (params && params.cta_location) payload.cta_location = params.cta_location
    if (params && params.context) payload.context = params.context
    window.gtag('event', event, payload)
  }

  function initGa() {
    if (!gaId) return
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId, { send_page_view: false })
    var script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId)
    document.head.appendChild(script)
  }

  function initClarity() {
    if (!clarityId) return
    ;(function (c, l, a, r, i) {
      c[a] =
        c[a] ||
        function () {
          ;(c[a].q = c[a].q || []).push(arguments)
        }
      var t = l.createElement(r)
      t.async = 1
      t.src = 'https://www.clarity.ms/tag/' + i
      var y = l.getElementsByTagName(r)[0]
      y.parentNode.insertBefore(t, y)
    })(window, document, 'clarity', 'script', clarityId)
  }

  function inferLocation(el) {
    if (el.classList && el.classList.contains('cta-primary')) return 'static_primary'
    if (el.classList && el.classList.contains('cta-secondary')) return 'static_secondary'
    return 'static_page'
  }

  function initClickTracking() {
    document.addEventListener('click', function (event) {
      var target = event.target
      if (!target || !target.closest) return
      var link = target.closest('a')
      if (!link) return
      var href = (link.getAttribute('href') || '').toLowerCase()
      if (!href) return

      if (href.indexOf('revenue-leak-audit') !== -1) {
        track('audit_cta_click', { cta_location: inferLocation(link) })
        return
      }
      if (href.indexOf('pricing.html') !== -1 || href === '#package-estimator') {
        track('pricing_cta_click', { cta_location: inferLocation(link) })
        return
      }
      if (href.indexOf('services.html') !== -1 || href.indexOf('/services/') !== -1) {
        track('services_cta_click', { cta_location: inferLocation(link) })
      }
    })
  }

  initGa()
  initClarity()
  track('page_view')

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClickTracking)
  } else {
    initClickTracking()
  }
})()
