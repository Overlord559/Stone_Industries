/**
 * Package + add-on estimator — package-scoped add-ons, page limits, included items.
 */
(function () {
  var EXTRA_PAGE_RATE = 125
  var LARGE_SITE_PAGE_THRESHOLD = 10

  function catalog() {
    return (
      window.__SI_PRICING_CATALOG__ || {
        services: [],
        outOfScopeHourlyNote: '',
        competitorPositioningNote: '',
        secureLeadCaptureHelp: null,
        cyberTier1Help: null,
        cyberTier2Help: null,
      }
    )
  }

  function formatMoney(n) {
    return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }

  function parseQuery() {
    var params = new URLSearchParams(window.location.search)
    return {
      service: params.get('service') || '',
      package: params.get('package') || '',
      addons: params.get('addons') ? params.get('addons').split(',').filter(Boolean) : [],
    }
  }

  function includedIds(pkg) {
    return pkg && pkg.includedAddOnIds ? pkg.includedAddOnIds : []
  }

  function isIncluded(pkg, addonId) {
    return includedIds(pkg).indexOf(addonId) !== -1
  }

  function isVisibleForPackage(addon, packageId) {
    if (!addon.showForPackages || !addon.showForPackages.length) return true
    return addon.showForPackages.indexOf(packageId) !== -1
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function appendDetailList(parent, title, items) {
    if (!items || !items.length) return
    var label = document.createElement('p')
    label.className = 'si-addon-detail-label'
    label.textContent = title
    parent.appendChild(label)
    var ul = document.createElement('ul')
    items.forEach(function (item) {
      var li = document.createElement('li')
      li.textContent = item
      ul.appendChild(li)
    })
    parent.appendChild(ul)
  }

  function buildAddOnDetailsEl(addon) {
    var detail = addon.detail
    if (!detail) return null

    var details = document.createElement('details')
    details.className = 'si-addon-details si-addon-details--compact'

    var summary = document.createElement('summary')
    summary.textContent = 'Details'
    details.appendChild(summary)

    var body = document.createElement('div')
    body.className = 'si-addon-detail-body'

    var what = document.createElement('p')
    what.textContent = detail.whatThisIs
    body.appendChild(what)

    appendDetailList(body, 'Includes', detail.includes)
    if (detail.notIncluded && detail.notIncluded.length) {
      var not = document.createElement('p')
      not.className = 'note-muted si-addon-not-included'
      not.textContent = 'Not included: ' + detail.notIncluded.join('; ') + '.'
      body.appendChild(not)
    }

    details.appendChild(body)
    return details
  }

  function buildAddOnRow(addon, svc) {
    var row = document.createElement('div')
    row.className = 'si-estimator-addon-row'

    var id = 'addon-' + svc.slug + '-' + addon.id
    var label = document.createElement('label')
    label.className = 'si-estimator-addon-item'
    var kindTag =
      addon.kind === 'monthly' ? 'monthly' : addon.kind === 'hourly' ? 'hourly' : 'one-time'
    label.innerHTML =
      '<input type="checkbox" name="addon" value="' +
      addon.id +
      '" data-addon-kind="' +
      kindTag +
      '" id="' +
      id +
      '"> <span class="si-estimator-addon-name">' +
      addon.name +
      '</span> <em class="si-estimator-addon-price">' +
      addon.priceLabel +
      (addon.kind === 'monthly' ? ' · monthly' : addon.kind === 'hourly' ? ' · hourly' : '') +
      '</em>'
    row.appendChild(label)

    if (addon.detail && addon.detail.shortDescription) {
      var desc = document.createElement('p')
      desc.className = 'si-estimator-addon-short note-muted'
      desc.textContent = addon.detail.shortDescription
      row.appendChild(desc)
    }

    var detailEl = buildAddOnDetailsEl(addon)
    if (detailEl) row.appendChild(detailEl)

    return row
  }

  function appendAddonGroup(container, title, rows) {
    if (!rows.length) return
    var heading = document.createElement('p')
    heading.className = 'si-estimator-group-label'
    heading.textContent = title
    container.appendChild(heading)
    rows.forEach(function (row) {
      container.appendChild(row)
    })
  }

  function buildMailto(svc, pkg, breakdown) {
    var lines = [
      'Package interest (estimate):',
      'Service: ' + svc.title,
      'Package: ' + pkg.name + ' (' + pkg.priceLabel + ')',
    ]

    if (breakdown.estimatedPages != null) {
      lines.push('Estimated pages: ' + breakdown.estimatedPages)
      if (pkg.pagesIncludedLabel) lines.push('Pages included in package: ' + pkg.pagesIncludedLabel)
    } else if (pkg.pagesIncludedLabel) {
      lines.push('Pages included: ' + pkg.pagesIncludedLabel)
    }

    if (breakdown.extraPagesLine) lines.push(breakdown.extraPagesLine)

    if (pkg.pageLimitNote && breakdown.estimatedPages == null) lines.push('Page note: ' + pkg.pageLimitNote)

    lines.push('', 'Package price: ' + breakdown.packageLabel)

    if (breakdown.includedAddons.length) {
      lines.push('Included in package (not charged again):')
      breakdown.includedAddons.forEach(function (n) {
        lines.push('  - ' + n)
      })
    }

    if (breakdown.oneTimeAddons.length) {
      lines.push('Selected one-time add-ons:')
      breakdown.oneTimeAddons.forEach(function (row) {
        lines.push('  - ' + row.label)
      })
    } else {
      lines.push('Selected one-time add-ons: None')
    }

    if (breakdown.hourlyNotes.length) {
      lines.push('Hourly / variable (not in one-time total):')
      breakdown.hourlyNotes.forEach(function (n) {
        lines.push('  - ' + n)
      })
    }

    if (breakdown.monthlyNotes.length) {
      lines.push('Monthly care (billed separately):')
      breakdown.monthlyNotes.forEach(function (n) {
        lines.push('  - ' + n)
      })
    }

    if (breakdown.customNotes.length) {
      lines.push('Notes:')
      breakdown.customNotes.forEach(function (n) {
        lines.push('  - ' + n)
      })
    }

    lines.push('', 'Estimated one-time total: ' + breakdown.totalLabel)
    lines.push('', 'Estimate only — final quote depends on scope, content readiness, and timeline.')
    lines.push('', 'What I need:')
    lines.push('Location (city/area — on-site or remote):')
    lines.push('Timeline/deadline:')
    lines.push('Best callback time:')

    var params = new URLSearchParams()
    params.set('subject', svc.inquirySubject)
    params.set('body', lines.join('\n'))
    return 'mailto:stoneindustries0.llc@gmail.com?' + params.toString()
  }

  function render() {
    var root = document.querySelector('[data-si-pricing-estimator]')
    if (!root) return

    var data = catalog()
    var services = data.services || []

    root.innerHTML =
      '<section class="page-section si-estimator" id="package-estimator">' +
      '<h2><span class="label">Estimate</span> Build your package</h2>' +
      '<p class="page-lead">Select a service and package, then add optional services. ' +
      '<strong>Estimate only</strong> — final quote depends on scope, content readiness, and timeline.</p>' +
      '<div class="si-estimator-grid">' +
      '<label>Service<select data-estimator-service><option value="">Choose a service</option></select></label>' +
      '<label>Package<select data-estimator-package disabled><option value="">Choose a package</option></select></label>' +
      '</div>' +
      '<div class="si-estimator-page-count" data-estimator-page-count-wrap hidden>' +
      '<label for="estimator-page-count">How many pages do you estimate?' +
      '<input type="number" id="estimator-page-count" data-estimator-page-count min="1" max="30" value="1" step="1">' +
      '</label>' +
      '<p class="note-muted" data-estimator-page-hint></p>' +
      '</div>' +
      '<p class="note-muted" data-estimator-page-note hidden></p>' +
      '<fieldset class="si-estimator-addons" data-estimator-addons hidden>' +
      '<legend>Optional add-ons</legend>' +
      '<p class="note-muted" data-estimator-addon-hint hidden>Choose a package to see add-ons for that service.</p>' +
      '<div data-estimator-addon-list></div>' +
      '</fieldset>' +
      '<div class="si-estimator-included-wrap" data-estimator-included-wrap hidden>' +
      '<p class="si-estimator-included-heading">Included in this package (not charged again)</p>' +
      '<ul class="si-estimator-included" data-estimator-included></ul>' +
      '</div>' +
      '<div class="si-estimator-breakdown" data-estimator-breakdown hidden>' +
      '<dl class="si-estimator-lines" data-estimator-lines></dl>' +
      '<div class="si-estimator-total">' +
      '<p class="si-estimator-total-label">Estimated one-time total</p>' +
      '<p class="si-estimator-total-value" data-estimator-total-value>—</p>' +
      '</div>' +
      '<p class="note-muted" data-estimator-notes></p>' +
      '</div>' +
      '<div class="cta-band si-estimator-ctas" data-estimator-ctas hidden>' +
      '<a class="cta cta-primary" data-estimator-mailto href="#">Request This Package</a>' +
      '<a class="cta cta-call" href="tel:+15595799376">Text to Confirm</a>' +
      '<a class="cta cta-secondary" href="#how-payment-works">Deposit &amp; payment info</a>' +
      '</div>' +
      '<p class="note-muted">' +
      (data.outOfScopeHourlyNote || '') +
      ' No card data collected on this site. No instant checkout.</p>' +
      '</section>'

    var serviceSelect = root.querySelector('[data-estimator-service]')
    var packageSelect = root.querySelector('[data-estimator-package]')
    var pageCountWrap = root.querySelector('[data-estimator-page-count-wrap]')
    var pageCountInput = root.querySelector('[data-estimator-page-count]')
    var pageHint = root.querySelector('[data-estimator-page-hint]')
    var pageNote = root.querySelector('[data-estimator-page-note]')
    var addonsWrap = root.querySelector('[data-estimator-addons]')
    var addonHint = root.querySelector('[data-estimator-addon-hint]')
    var addonList = root.querySelector('[data-estimator-addon-list]')
    var includedWrap = root.querySelector('[data-estimator-included-wrap]')
    var includedList = root.querySelector('[data-estimator-included]')
    var breakdownWrap = root.querySelector('[data-estimator-breakdown]')
    var linesEl = root.querySelector('[data-estimator-lines]')
    var totalValue = root.querySelector('[data-estimator-total-value]')
    var notesEl = root.querySelector('[data-estimator-notes]')
    var ctasWrap = root.querySelector('[data-estimator-ctas]')
    var mailtoLink = root.querySelector('[data-estimator-mailto]')

    services.forEach(function (svc) {
      var opt = document.createElement('option')
      opt.value = svc.slug
      opt.textContent = svc.title
      serviceSelect.appendChild(opt)
    })

    var q = parseQuery()

    function currentService() {
      return services.find(function (s) {
        return s.slug === serviceSelect.value
      })
    }

    function currentPackage() {
      var svc = currentService()
      if (!svc) return null
      return svc.packages.find(function (p) {
        return p.id === packageSelect.value
      })
    }

    function getEstimatedPageCount() {
      if (!pageCountInput || pageCountWrap.hidden) return null
      var n = parseInt(pageCountInput.value, 10)
      if (isNaN(n) || n < 1) return 1
      return n
    }

    function syncPageCountControl() {
      var svc = currentService()
      var pkg = currentPackage()

      if (!svc || svc.slug !== 'business-websites' || !pkg || pkg.pagesIncluded == null) {
        pageCountWrap.hidden = true
        return
      }

      pageCountWrap.hidden = false
      var included = pkg.pagesIncluded
      pageCountInput.min = '1'
      pageCountInput.max = '30'
      if (!pageCountInput.dataset.userEdited) {
        pageCountInput.value = String(included)
      }
      pageHint.textContent =
        pkg.name +
        ' includes ' +
        included +
        ' page' +
        (included === 1 ? '' : 's') +
        '. Extra pages beyond that are +' +
        formatMoney(EXTRA_PAGE_RATE) +
        '/page. Sites with 10+ pages may need a final quote after scope review.'
    }

    function fillPackages() {
      packageSelect.innerHTML = '<option value="">Choose a package</option>'
      var svc = currentService()
      packageSelect.disabled = !svc
      addonList.innerHTML = ''
      includedList.innerHTML = ''
      includedWrap.hidden = true
      pageNote.hidden = true
      pageCountWrap.hidden = true
      if (pageCountInput) pageCountInput.dataset.userEdited = ''
      addonsWrap.hidden = !svc
      addonHint.hidden = !!svc
      breakdownWrap.hidden = true
      ctasWrap.hidden = true
      if (!svc) return

      svc.packages.forEach(function (pkg) {
        var opt = document.createElement('option')
        opt.value = pkg.id
        var pages = pkg.pagesIncludedLabel ? ' · ' + pkg.pagesIncludedLabel : ''
        opt.textContent = pkg.name + ' — ' + pkg.priceLabel + pages
        packageSelect.appendChild(opt)
      })
      packageSelect.disabled = false
    }

    function fillAddons() {
      var svc = currentService()
      var pkg = currentPackage()
      addonList.innerHTML = ''
      includedList.innerHTML = ''
      includedWrap.hidden = true
      pageNote.hidden = true

      if (!svc) {
        addonsWrap.hidden = true
        pageCountWrap.hidden = true
        return
      }

      addonsWrap.hidden = false
      addonHint.hidden = true

      if (!pkg) {
        pageCountWrap.hidden = true
        addonHint.hidden = false
        addonHint.textContent = 'Choose a package to see add-ons for ' + svc.title + '.'
        return
      }

      syncPageCountControl()

      if (pkg.pagesIncludedLabel && svc.slug !== 'business-websites') {
        pageNote.hidden = false
        pageNote.textContent = [pkg.pagesIncludedLabel, pkg.pageLimitNote].filter(Boolean).join(' — ')
      } else if (svc.serviceDisclaimer && svc.slug !== 'business-websites') {
        pageNote.hidden = false
        pageNote.textContent = svc.serviceDisclaimer
      }

      var includedIdsList = includedIds(pkg)
      var oneTimeRows = []
      var hourlyRows = []
      var monthlyRows = []

      svc.addOns.forEach(function (addon) {
        if (includedIdsList.indexOf(addon.id) !== -1) return
        if (!isVisibleForPackage(addon, pkg.id)) return

        var row = buildAddOnRow(addon, svc)
        if (addon.kind === 'monthly') monthlyRows.push(row)
        else if (addon.kind === 'hourly') hourlyRows.push(row)
        else oneTimeRows.push(row)
      })

      appendAddonGroup(addonList, 'One-time add-ons', oneTimeRows)
      appendAddonGroup(addonList, 'Hourly / variable (not in one-time total)', hourlyRows)
      appendAddonGroup(addonList, 'Monthly care (billed separately)', monthlyRows)

      if (includedIdsList.length) {
        includedWrap.hidden = false
        includedIdsList.forEach(function (addonId) {
          var addon = svc.addOns.find(function (a) {
            return a.id === addonId
          })
          if (!addon) return

          var li = document.createElement('li')
          li.className = 'si-estimator-included-item'
          li.innerHTML =
            '<span class="si-estimator-included-title">' +
            escapeHtml(addon.name) +
            ' <em>(' +
            escapeHtml(addon.priceLabel) +
            ')</em></span>'

          var includedDetail = buildAddOnDetailsEl(addon)
          if (includedDetail) li.appendChild(includedDetail)

          includedList.appendChild(li)
        })
      }
    }

    function computeBreakdown() {
      var svc = currentService()
      var pkg = currentPackage()
      if (!svc || !pkg) return null

      var breakdown = {
        packageLabel:
          pkg.baseEstimate == null ? 'Quote required' : formatMoney(pkg.baseEstimate) + (pkg.isFrom ? '+' : ''),
        pagesLabel: pkg.pagesIncludedLabel || null,
        estimatedPages: null,
        extraPagesLine: '',
        includedAddons: [],
        oneTimeAddons: [],
        hourlyNotes: [],
        monthlyNotes: [],
        customNotes: [],
        total: pkg.baseEstimate != null ? pkg.baseEstimate : null,
        totalLabel: '',
        extraNotes: [],
      }

      if (pkg.isFrom) breakdown.extraNotes.push('Base package shows “+” — final quote may be higher.')

      if (svc.slug === 'business-websites' && pkg.pagesIncluded != null) {
        var estimatedPages = getEstimatedPageCount()
        if (estimatedPages != null) {
          breakdown.estimatedPages = estimatedPages
          var included = pkg.pagesIncluded
          var extraPages = Math.max(0, estimatedPages - included)
          if (extraPages > 0 && breakdown.total != null) {
            var extraCost = extraPages * EXTRA_PAGE_RATE
            var extraLabel =
              'Extra pages beyond included count: ' +
              extraPages +
              ' × ' +
              formatMoney(EXTRA_PAGE_RATE) +
              ' (' +
              formatMoney(extraCost) +
              ')'
            breakdown.oneTimeAddons.push({ label: extraLabel })
            breakdown.extraPagesLine = extraLabel
            breakdown.total += extraCost
          }
          if (estimatedPages >= LARGE_SITE_PAGE_THRESHOLD) {
            breakdown.customNotes.push('Larger websites may require final quote after scope review.')
          }
        }
      }

      svc.addOns.forEach(function (addon) {
        if (isIncluded(pkg, addon.id)) {
          breakdown.includedAddons.push(addon.name + ' ' + addon.priceLabel)
          return
        }

        if (!isVisibleForPackage(addon, pkg.id)) return

        var input = addonList.querySelector('input[value="' + addon.id + '"]')
        var checked = input && input.checked
        if (!checked) return

        if (addon.kind === 'monthly') {
          breakdown.monthlyNotes.push(addon.name + ' — ' + (addon.estimateNote || addon.priceLabel))
          return
        }

        if (addon.kind === 'hourly') {
          breakdown.hourlyNotes.push(addon.name + ' — ' + (addon.estimateNote || addon.priceLabel))
          return
        }

        breakdown.oneTimeAddons.push({ label: addon.name + ' ' + addon.priceLabel })

        if (addon.estimateAdd != null && breakdown.total != null) {
          breakdown.total += addon.estimateAdd
        } else if (addon.estimateNote) {
          breakdown.extraNotes.push(addon.estimateNote)
        }
      })

      breakdown.totalLabel =
        breakdown.total == null ? 'Quote required' : formatMoney(breakdown.total) + (pkg.isFrom ? '+' : '')

      return breakdown
    }

    function renderBreakdown() {
      var svc = currentService()
      var pkg = currentPackage()
      if (!svc || !pkg) {
        breakdownWrap.hidden = true
        ctasWrap.hidden = true
        return
      }

      var breakdown = computeBreakdown()
      if (!breakdown) return

      linesEl.innerHTML = ''

      function addLine(term, value) {
        var dt = document.createElement('dt')
        dt.textContent = term
        var dd = document.createElement('dd')
        dd.textContent = value
        linesEl.appendChild(dt)
        linesEl.appendChild(dd)
      }

      addLine('Package', breakdown.packageLabel)
      if (breakdown.estimatedPages != null) {
        addLine('Estimated pages', String(breakdown.estimatedPages))
        if (breakdown.pagesLabel) addLine('Pages included', breakdown.pagesLabel)
      } else if (breakdown.pagesLabel) {
        addLine('Pages included', breakdown.pagesLabel)
      }

      breakdown.includedAddons.forEach(function (name) {
        addLine('Included', name)
      })

      breakdown.oneTimeAddons.forEach(function (row) {
        addLine('Add-on', row.label)
      })

      if (breakdown.hourlyNotes.length) {
        addLine('Hourly / variable', breakdown.hourlyNotes.join('; '))
      }

      if (breakdown.monthlyNotes.length) {
        addLine('Monthly (separate)', breakdown.monthlyNotes.join('; '))
      }

      if (breakdown.customNotes.length) {
        addLine('Note', breakdown.customNotes.join(' '))
      }

      totalValue.textContent = breakdown.totalLabel
      var noteParts = breakdown.extraNotes.slice()
      notesEl.textContent = noteParts.length ? noteParts.join(' ') : ''
      breakdownWrap.hidden = false
      ctasWrap.hidden = false
      mailtoLink.href = buildMailto(svc, pkg, breakdown)
    }

    function onServiceChange() {
      fillPackages()
      packageSelect.value = ''
      fillAddons()
      renderBreakdown()
    }

    function onPackageChange() {
      if (pageCountInput) pageCountInput.dataset.userEdited = ''
      fillAddons()
      renderBreakdown()
    }

    serviceSelect.addEventListener('change', onServiceChange)
    packageSelect.addEventListener('change', onPackageChange)
    addonList.addEventListener('change', renderBreakdown)
    if (pageCountInput) {
      pageCountInput.addEventListener('input', function () {
        pageCountInput.dataset.userEdited = '1'
        renderBreakdown()
      })
    }

    if (q.service) {
      serviceSelect.value = q.service
      fillPackages()
      if (q.package) {
        packageSelect.value = q.package
        fillAddons()
        if (q.addons.length) {
          q.addons.forEach(function (id) {
            var input = addonList.querySelector('input[value="' + id + '"]')
            if (input && !input.disabled) input.checked = true
          })
        }
      } else {
        fillAddons()
      }
      renderBreakdown()
    }
  }

  document.addEventListener('DOMContentLoaded', render)
})()
