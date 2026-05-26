/**
 * Renders add-on explanation accordions on service detail pages from pricing catalog.
 */
(function () {
  function catalog() {
    return window.__SI_PRICING_CATALOG__ || { services: [] }
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function buildList(title, items) {
    if (!items || !items.length) return ''
    var lis = items
      .map(function (item) {
        return '<li>' + escapeHtml(item) + '</li>'
      })
      .join('')
    return '<p class="si-addon-detail-label">' + escapeHtml(title) + '</p><ul>' + lis + '</ul>'
  }

  function buildDetailBlock(addon, summaryLabel, note) {
    var detail = addon.detail
    if (!detail) return ''

    var html =
      '<details class="si-addon-details si-addon-details--compact">' +
      '<summary>' +
      escapeHtml(summaryLabel || 'Details') +
      '</summary>' +
      '<div class="si-addon-detail-body">'

    if (note) {
      html += '<p class="note-muted">' + escapeHtml(note) + '</p>'
    }

    html += '<p>' + escapeHtml(detail.whatThisIs) + '</p>'
    html += buildList('Includes', detail.includes)
    if (detail.notIncluded && detail.notIncluded.length) {
      html +=
        '<p class="note-muted si-addon-not-included">Not included: ' +
        escapeHtml(detail.notIncluded.join('; ')) +
        '.</p>'
    }

    html += '</div></details>'
    return html
  }

  function renderServiceAddons(root) {
    var slug = root.getAttribute('data-si-service-addons')
    if (!slug) return

    var service = (catalog().services || []).find(function (s) {
      return s.slug === slug
    })
    if (!service) {
      root.innerHTML = '<p class="note-muted">Add-on details loading — open from pricing page if empty.</p>'
      return
    }

    var html = ''

    service.addOns.forEach(function (addon) {
      html +=
        '<div class="si-service-addon-card">' +
        '<p class="si-service-addon-title"><strong>' +
        escapeHtml(addon.name) +
        '</strong> <em>' +
        escapeHtml(addon.priceLabel) +
        (addon.kind === 'monthly' ? ' · monthly' : addon.kind === 'hourly' ? ' · hourly' : '') +
        '</em></p>'

      if (addon.detail && addon.detail.shortDescription) {
        html += '<p class="note-muted">' + escapeHtml(addon.detail.shortDescription) + '</p>'
      }

      html += buildDetailBlock(addon, 'Details')
      html += '</div>'
    })

    root.innerHTML = html
  }

  function renderSeoNote(root) {
    var note = catalog().advancedSeoNote
    if (!note) return
    root.innerHTML = '<p class="note-muted">' + escapeHtml(note) + '</p>'
  }

  function render() {
    document.querySelectorAll('[data-si-service-addons]').forEach(renderServiceAddons)
    document.querySelectorAll('[data-si-seo-scope-note]').forEach(renderSeoNote)
  }

  document.addEventListener('DOMContentLoaded', render)
})()
