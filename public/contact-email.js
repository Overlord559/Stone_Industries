/**
 * Static-page email fallback — copy + standard mailto (no Gmail web-login URLs).
 */
(function () {
  var EMAIL = 'edward@stoneindustriesusa.com'
  var DEFAULT_SUBJECT = 'Stone Industries Inquiry'
  var CALENDLY_AUDIT = 'https://calendly.com/edward-stoneindustriesusa/30min'
  var CALENDLY_GENERAL =
    'https://calendly.com/edward-stoneindustriesusa/general-business-tech-consultation'

  function mailtoHref(subject) {
    var params = new URLSearchParams()
    params.set('subject', subject || DEFAULT_SUBJECT)
    return 'mailto:' + EMAIL + '?' + params.toString()
  }

  function copyEmail(button) {
    var root = button.closest('.si-email-actions') || button.parentElement
    var status = root ? root.querySelector('[data-si-copy-status]') : null

    function showCopied() {
      if (status) {
        status.hidden = false
        status.textContent = 'Email copied.'
      }
    }

    function legacyCopy() {
      try {
        var ta = document.createElement('textarea')
        ta.value = EMAIL
        ta.setAttribute('readonly', 'true')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        var ok = document.execCommand('copy')
        document.body.removeChild(ta)
        if (ok) showCopied()
      } catch (_error) {
        /* no-op */
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(showCopied).catch(legacyCopy)
    } else {
      legacyCopy()
    }
  }

  window.__SI_CONTACT_EMAIL__ = EMAIL
  window.__SI_MAILTO_INQUIRY__ = mailtoHref(DEFAULT_SUBJECT)
  window.__SI_CALENDLY_AUDIT__ = CALENDLY_AUDIT
  window.__SI_CALENDLY_GENERAL__ = CALENDLY_GENERAL

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-si-copy-email]').forEach(function (button) {
      button.addEventListener('click', function () {
        copyEmail(button)
      })
    })

    document.querySelectorAll('[data-si-mailto-inquiry]').forEach(function (link) {
      if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
        link.setAttribute('href', mailtoHref(DEFAULT_SUBJECT))
      }
    })
  })
})()
