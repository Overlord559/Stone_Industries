import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import type { OrbVariant } from './OrbScene'

const OrbScene = lazy(async () => import('./OrbScene'))

type InteractiveOrbAccentProps = {
  variant?: OrbVariant
  className?: string
  label?: string
}

export function InteractiveOrbAccent({
  variant = 'services',
  className = '',
  label = 'Interactive logistics network visual',
}: InteractiveOrbAccentProps) {
  const prefersReducedMotion = useReducedMotion()
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [pulseKey, setPulseKey] = useState(0)
  const [pulseActive, setPulseActive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const pulseTimerRef = useRef<number | null>(null)

  const tiltX = useSpring(useMotionValue(0), { stiffness: 140, damping: 22 })
  const tiltY = useSpring(useMotionValue(0), { stiffness: 140, damping: 22 })

  const heightClass =
    variant === 'contact'
      ? 'h-[168px] sm:h-[188px]'
      : variant === 'hero'
        ? 'h-[176px] sm:h-[192px]'
        : 'h-[200px] sm:h-[220px]'

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current !== null) {
        window.clearTimeout(pulseTimerRef.current)
      }
    }
  }, [])

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) {
        return
      }

      const rect = event.currentTarget.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5

      tiltY.set(x * 12)
      tiltX.set(-y * 12)
      setPointer({ x: x * 2, y: y * 2 })
    },
    [prefersReducedMotion, tiltX, tiltY],
  )

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0)
    tiltY.set(0)
    setPointer({ x: 0, y: 0 })
    setHovered(false)
  }, [tiltX, tiltY])

  const triggerPulse = useCallback(() => {
    setPulseKey((current) => current + 1)
    setPulseActive(true)

    if (pulseTimerRef.current !== null) {
      window.clearTimeout(pulseTimerRef.current)
    }

    pulseTimerRef.current = window.setTimeout(() => {
      setPulseActive(false)
      pulseTimerRef.current = null
    }, 1200)
  }, [])

  return (
    <motion.div
      className={`si-interactive-orb group relative ${className}`}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={triggerPulse}
      role="img"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          triggerPulse()
        }
      }}
    >
      <div
        className={`pointer-events-none absolute -inset-3 rounded-[1.75rem] transition duration-500 ${
          hovered ? 'bg-cyan-400/8' : 'bg-cyan-400/0'
        } ${pulseActive ? 'si-orb-pulse-ring si-orb-signal-burst' : ''}`}
        aria-hidden="true"
      />
      <Suspense
        fallback={
          <div
            className={`relative w-[200px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/20 ${heightClass}`}
          />
        }
      >
        <OrbScene
          variant={variant}
          pointer={pointer}
          pulseKey={pulseKey}
          hovered={hovered}
          reducedMotion={Boolean(prefersReducedMotion)}
          heightClass={heightClass}
        />
      </Suspense>
      <p className="pointer-events-none mt-2 text-center text-[0.62rem] font-medium uppercase tracking-[0.28em] text-slate-500 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
        {variant === 'contact' ? 'Signal network' : 'Infrastructure node'}
      </p>
    </motion.div>
  )
}
