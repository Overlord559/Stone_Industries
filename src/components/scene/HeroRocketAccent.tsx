import { useReducedMotion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'

type HeroRocketAccentProps = {
  className?: string
}

const ARIA_LABEL =
  'Interactive retro-futuristic rocket in hero sky zone — move pointer to tilt, hold to ignite propulsion'

export function HeroRocketAccent({ className = '' }: HeroRocketAccentProps) {
  const uid = useId().replace(/:/g, '')
  const prefersReducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLButtonElement>(null)
  const rafRef = useRef<number | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [thrusting, setThrusting] = useState(false)
  const [hovering, setHovering] = useState(false)

  const bodyGradId = `si-rocket-body-${uid}`
  const noseGradId = `si-rocket-nose-${uid}`
  const windowGradId = `si-rocket-window-${uid}`
  const flameGradId = `si-rocket-flame-${uid}`

  const applyPointerVars = useCallback(() => {
    const el = rootRef.current
    if (!el) {
      return
    }
    const { x, y } = pointerRef.current
    el.style.setProperty('--si-rocket-tilt-x', `${(-y * 14).toFixed(2)}deg`)
    el.style.setProperty('--si-rocket-tilt-y', `${(x * 16).toFixed(2)}deg`)
    el.style.setProperty('--si-rocket-shift-x', `${(x * 10).toFixed(1)}px`)
    el.style.setProperty('--si-rocket-shift-y', `${(y * 6).toFixed(1)}px`)
  }, [])

  const resetPointerVars = useCallback(() => {
    const el = rootRef.current
    if (!el) {
      return
    }
    pointerRef.current = { x: 0, y: 0 }
    el.style.setProperty('--si-rocket-tilt-x', '0deg')
    el.style.setProperty('--si-rocket-tilt-y', '0deg')
    el.style.setProperty('--si-rocket-shift-x', '0px')
    el.style.setProperty('--si-rocket-shift-y', '0px')
  }, [])

  const stopThrust = useCallback(() => {
    setThrusting(false)
  }, [])

  const startThrust = useCallback(() => {
    setThrusting(true)
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!thrusting) {
      return
    }

    const handleGlobalRelease = () => {
      stopThrust()
    }

    window.addEventListener('pointerup', handleGlobalRelease)
    window.addEventListener('pointercancel', handleGlobalRelease)
    window.addEventListener('blur', handleGlobalRelease)

    return () => {
      window.removeEventListener('pointerup', handleGlobalRelease)
      window.removeEventListener('pointercancel', handleGlobalRelease)
      window.removeEventListener('blur', handleGlobalRelease)
    }
  }, [thrusting, stopThrust])

  const queuePointerUpdate = useCallback(
    (x: number, y: number) => {
      pointerRef.current = { x, y }
      if (rafRef.current !== null) {
        return
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        applyPointerVars()
      })
    },
    [applyPointerVars],
  )

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (prefersReducedMotion) {
        return
      }
      const rect = event.currentTarget.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const x = Math.max(-1, Math.min(1, (event.clientX - cx) / (rect.width * 0.45)))
      const y = Math.max(-1, Math.min(1, (event.clientY - cy) / (rect.height * 0.45)))
      queuePointerUpdate(x, y)
    },
    [prefersReducedMotion, queuePointerUpdate],
  )

  const handlePointerLeave = useCallback(() => {
    setHovering(false)
    resetPointerVars()
    stopThrust()
  }, [resetPointerVars, stopThrust])

  return (
    <button
      ref={rootRef}
      type="button"
      className={`si-hero-rocket group ${thrusting ? 'si-hero-rocket--thrust' : ''} ${
        hovering ? 'si-hero-rocket--hover' : ''
      } ${prefersReducedMotion ? 'si-hero-rocket--static' : ''} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={handlePointerLeave}
      onPointerDown={(event) => {
        if (event.button !== 0) {
          return
        }
        event.preventDefault()
        event.currentTarget.setPointerCapture(event.pointerId)
        startThrust()
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId)
        }
        stopThrust()
      }}
      onPointerCancel={stopThrust}
      aria-label={ARIA_LABEL}
      aria-pressed={thrusting}
      onKeyDown={(event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault()
          startThrust()
        }
      }}
      onKeyUp={(event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault()
          stopThrust()
        }
      }}
    >
      <span className="si-hero-rocket__hitbox" aria-hidden="true" />
      <span className="si-hero-rocket__halo" aria-hidden="true" />
      <span className="si-hero-rocket__bob" aria-hidden="true">
        <span className="si-hero-rocket__craft">
          <svg
            viewBox="0 0 64 148"
            className="si-hero-rocket__svg"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={bodyGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="35%" stopColor="#94a3b8" />
                <stop offset="55%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id={noseGradId} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <radialGradient id={windowGradId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a5f3fc" />
                <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0e7490" stopOpacity="0.35" />
              </radialGradient>
              <linearGradient id={flameGradId} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#f0fdfa" />
                <stop offset="35%" stopColor="#67e8f9" />
                <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g className="si-hero-rocket__flame-svg">
              <ellipse cx="32" cy="128" rx="9" ry="14" fill={`url(#${flameGradId})`} />
              <ellipse cx="32" cy="138" rx="5" ry="8" fill="#a5f3fc" opacity="0.55" />
            </g>

            <path
              d="M32 6 L40 26 L38 30 L32 34 L26 30 L24 26 Z"
              fill={`url(#${noseGradId})`}
              stroke="rgba(148,163,184,0.45)"
              strokeWidth="0.8"
            />
            <path
              d="M26 30 C22 32 20 40 20 52 L20 88 C20 96 24 100 32 100 C40 100 44 96 44 88 L44 52 C44 40 42 32 38 30 Z"
              fill={`url(#${bodyGradId})`}
              stroke="rgba(103,232,249,0.28)"
              strokeWidth="0.9"
            />
            <ellipse
              cx="32"
              cy="54"
              rx="7.5"
              ry="9"
              fill={`url(#${windowGradId})`}
              stroke="rgba(103,232,249,0.55)"
              strokeWidth="1"
            />
            <ellipse cx="32" cy="54" rx="3" ry="3.5" fill="#ecfeff" opacity="0.35" />
            <path
              d="M20 88 L8 98 L14 104 L22 96 Z"
              fill="#475569"
              stroke="rgba(103,232,249,0.35)"
              strokeWidth="0.7"
            />
            <path
              d="M44 88 L56 98 L50 104 L42 96 Z"
              fill="#475569"
              stroke="rgba(103,232,249,0.35)"
              strokeWidth="0.7"
            />
            <path
              d="M26 100 L22 108 L28 110 L30 102 Z"
              fill="#334155"
              stroke="rgba(103,232,249,0.25)"
              strokeWidth="0.6"
            />
            <path
              d="M38 100 L42 108 L36 110 L34 102 Z"
              fill="#334155"
              stroke="rgba(103,232,249,0.25)"
              strokeWidth="0.6"
            />
            <ellipse
              cx="32"
              cy="102"
              rx="11"
              ry="4"
              fill="#1e293b"
              stroke="rgba(148,163,184,0.4)"
              strokeWidth="0.8"
            />
            <ellipse cx="32" cy="104" rx="6" ry="2.2" fill="#0f172a" opacity="0.85" />
            <path
              d="M28 104 L32 108 L36 104"
              fill="none"
              stroke="rgba(103,232,249,0.35)"
              strokeWidth="0.8"
            />
          </svg>
          <span className="si-hero-rocket__plume" aria-hidden="true" />
        </span>
      </span>
      <span className="si-hero-rocket__hint">Hold to ignite</span>
    </button>
  )
}
