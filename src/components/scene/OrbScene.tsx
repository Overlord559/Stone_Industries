import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

export type OrbVariant = 'services' | 'contact' | 'hero' | 'minimal'
export type SatelliteMode = 'none' | 'standard' | 'network'
export type OrbIntensity = 'low' | 'medium' | 'high'

export type OrbSceneProps = {
  variant?: OrbVariant
  satelliteMode?: SatelliteMode
  satelliteCount?: number
  babySatelliteCount?: number
  showTrajectoryLines?: boolean
  interactive?: boolean
  pulseKey?: number
  hovered?: boolean
  intensity?: OrbIntensity
  pointer?: { x: number; y: number }
  heightClass?: string
  reducedMotion?: boolean
}

type OrbitPreset = {
  satelliteMode: SatelliteMode
  satelliteCount: number
  babySatelliteCount: number
  showTrajectoryLines: boolean
  intensity: OrbIntensity
  coreScale: number
}

const VARIANT_PRESETS: Record<OrbVariant, OrbitPreset> = {
  services: {
    satelliteMode: 'standard',
    satelliteCount: 2,
    babySatelliteCount: 4,
    showTrajectoryLines: true,
    intensity: 'low',
    coreScale: 0.62,
  },
  contact: {
    satelliteMode: 'network',
    satelliteCount: 3,
    babySatelliteCount: 6,
    showTrajectoryLines: true,
    intensity: 'medium',
    coreScale: 0.52,
  },
  hero: {
    satelliteMode: 'standard',
    satelliteCount: 2,
    babySatelliteCount: 3,
    showTrajectoryLines: true,
    intensity: 'low',
    coreScale: 0.58,
  },
  minimal: {
    satelliteMode: 'none',
    satelliteCount: 0,
    babySatelliteCount: 0,
    showTrajectoryLines: false,
    intensity: 'low',
    coreScale: 0.6,
  },
}

const INTENSITY_SPEED: Record<OrbIntensity, number> = {
  low: 1,
  medium: 1.25,
  high: 1.45,
}

type MainSatelliteConfig = {
  radius: number
  speed: number
  tilt: [number, number, number]
  size: number
  phase: number
}

type BabySatelliteConfig = {
  radius: number
  speed: number
  tilt: [number, number, number]
  size: number
  phase: number
  shape: 'sphere' | 'box' | 'tetra'
}

function resolvePreset(props: OrbSceneProps): OrbitPreset & { variant: OrbVariant } {
  const variant = props.variant ?? 'services'
  const base = VARIANT_PRESETS[variant]

  return {
    variant,
    satelliteMode: props.satelliteMode ?? base.satelliteMode,
    satelliteCount: props.satelliteCount ?? base.satelliteCount,
    babySatelliteCount: props.babySatelliteCount ?? base.babySatelliteCount,
    showTrajectoryLines: props.showTrajectoryLines ?? base.showTrajectoryLines,
    intensity: props.intensity ?? base.intensity,
    coreScale: base.coreScale,
  }
}

function OrbitalNetwork({
  preset,
  pointer,
  hovered,
  pulseKey,
  reducedMotion,
}: {
  preset: OrbitPreset & { variant: OrbVariant }
  pointer: { x: number; y: number }
  hovered: boolean
  pulseKey: number
  reducedMotion: boolean
}) {
  const coreRef = useRef<Group>(null)
  const mainSatRefs = useRef<(Group | null)[]>([])
  const babySatRefs = useRef<(Group | null)[]>([])
  const orbitLineRefs = useRef<(Mesh | null)[]>([])
  const signalArcRefs = useRef<(Mesh | null)[]>([])
  const pulseRingRef = useRef<Mesh | null>(null)
  const pulseStartRef = useRef(-1)
  const lastPulseKeyRef = useRef(0)

  const speedMultiplier = reducedMotion ? 0.08 : INTENSITY_SPEED[preset.intensity]
  const hoverBoost = hovered && !reducedMotion ? 1.35 : 1
  const motionScale = speedMultiplier * hoverBoost

  const mainSatellites = useMemo<MainSatelliteConfig[]>(() => {
    if (preset.satelliteMode === 'none' || preset.satelliteCount === 0) {
      return []
    }

    const configs: MainSatelliteConfig[] = []
    for (let index = 0; index < preset.satelliteCount; index += 1) {
      const radius = preset.variant === 'contact' ? 1.35 + index * 0.22 : 1.28 + index * 0.28
      configs.push({
        radius,
        speed: (preset.variant === 'contact' ? 0.22 : 0.18) + index * 0.04,
        tilt: [
          Math.PI / 2 + index * 0.35,
          index * 0.9,
          index * 0.25,
        ] as [number, number, number],
        size: preset.variant === 'contact' ? 0.075 : 0.065,
        phase: index * 1.7,
      })
    }
    return configs
  }, [preset])

  const babySatellites = useMemo<BabySatelliteConfig[]>(() => {
    if (preset.satelliteMode === 'none' || preset.babySatelliteCount === 0) {
      return []
    }

    const shapes: BabySatelliteConfig['shape'][] = ['sphere', 'box', 'tetra', 'sphere']
    const configs: BabySatelliteConfig[] = []
    for (let index = 0; index < preset.babySatelliteCount; index += 1) {
      configs.push({
        radius: 0.72 + (index % 3) * 0.18,
        speed: 0.32 + (index % 4) * 0.06,
        tilt: [
          Math.PI / 3 + index * 0.4,
          index * 1.1,
          index * 0.18,
        ] as [number, number, number],
        size: 0.028 + (index % 3) * 0.008,
        phase: index * 0.85,
        shape: shapes[index % shapes.length],
      })
    }
    return configs
  }, [preset])

  useEffect(() => {
    if (pulseKey > 0 && pulseKey !== lastPulseKeyRef.current) {
      lastPulseKeyRef.current = pulseKey
      pulseStartRef.current = performance.now()
    }
  }, [pulseKey])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const pulseAge =
      pulseStartRef.current >= 0
        ? (performance.now() - pulseStartRef.current) / 1200
        : -1
    const pulseActive = pulseAge >= 0 && pulseAge <= 1

    if (pulseRingRef.current) {
      if (pulseActive) {
        pulseRingRef.current.visible = true
        const scale = 0.35 + pulseAge * 2.4
        pulseRingRef.current.scale.setScalar(scale)
        const material = pulseRingRef.current.material as THREE.MeshBasicMaterial
        material.opacity = (1 - pulseAge) * 0.42
      } else {
        pulseRingRef.current.visible = false
      }
    }

    if (coreRef.current) {
      const coreSpeed = reducedMotion ? 0.02 : 0.12
      coreRef.current.rotation.y = time * coreSpeed + pointer.x * 0.38
      coreRef.current.rotation.x =
        Math.sin(time * 0.24) * 0.08 + 0.12 + pointer.y * 0.24

      if (pulseActive) {
        const pulseScale = 1 + Math.sin(pulseAge * Math.PI) * 0.06
        coreRef.current.scale.setScalar(preset.coreScale * pulseScale)
      } else {
        coreRef.current.scale.setScalar(preset.coreScale)
      }
    }

    mainSatRefs.current.forEach((group, index) => {
      if (!group) {
        return
      }
      const config = mainSatellites[index]
      group.rotation.y = time * config.speed * motionScale + config.phase
      const child = group.children[0] as Mesh | undefined
      if (child?.material && 'emissiveIntensity' in (child.material as THREE.MeshStandardMaterial)) {
        const material = child.material as THREE.MeshStandardMaterial
        const base = hovered ? 0.82 : 0.58
        const flash =
          pulseActive
            ? Math.max(0, Math.sin((pulseAge * Math.PI * 2 - index * 0.55) * 2)) * 0.85
            : 0
        material.emissiveIntensity = base + flash
      }
    })

    babySatRefs.current.forEach((group, index) => {
      if (!group) {
        return
      }
      const config = babySatellites[index]
      const direction = index % 2 === 0 ? 1 : -1
      group.rotation.y =
        time * config.speed * motionScale * direction + config.phase + pointer.x * 0.12
      const child = group.children[0] as Mesh | undefined
      if (child?.material && 'emissiveIntensity' in (child.material as THREE.MeshStandardMaterial)) {
        const material = child.material as THREE.MeshStandardMaterial
        const hoverPulse = hovered && index % 3 === 0 ? 0.18 : 0
        const clickPulse = pulseActive
          ? Math.max(0, Math.sin(pulseAge * Math.PI * 3 + index * 0.4)) * 0.55
          : 0
        material.emissiveIntensity = 0.42 + hoverPulse + clickPulse
      }
    })

    const lineBase = hovered ? 0.22 : 0.12
    const linePulse = pulseActive ? (1 - pulseAge) * 0.28 : 0
    orbitLineRefs.current.forEach((line, index) => {
      if (!line?.material || !('opacity' in line.material)) {
        return
      }
      const material = line.material as THREE.MeshBasicMaterial
      material.opacity = lineBase + linePulse + (index === 0 ? 0.02 : 0)
    })

    signalArcRefs.current.forEach((arc, index) => {
      if (!arc) {
        return
      }
      if (!pulseActive) {
        arc.visible = false
        return
      }
      const wave = (pulseAge * mainSatellites.length + index) % 1
      arc.visible = wave < 0.45
      arc.rotation.z = time * 0.5 + index
      if (arc.material && 'opacity' in arc.material) {
        ;(arc.material as THREE.MeshBasicMaterial).opacity =
          arc.visible ? (1 - wave / 0.45) * 0.55 : 0
      }
    })
  })

  const emissiveBoost = hovered ? 0.12 : 0

  return (
    <group>
      {preset.showTrajectoryLines &&
        mainSatellites.map((config, index) => (
          <group key={`orbit-${index}`} rotation={config.tilt}>
            <mesh ref={(node) => { orbitLineRefs.current[index] = node }}>
              <torusGeometry args={[config.radius, 0.0035, 6, 72]} />
              <meshBasicMaterial color="#67e8f9" transparent opacity={0.12} />
            </mesh>
          </group>
        ))}

      {mainSatellites.map((config, index) => (
        <group
          key={`main-sat-${index}`}
          ref={(node) => { mainSatRefs.current[index] = node }}
          rotation={config.tilt}
        >
          <group position={[config.radius, 0, 0]}>
            <mesh>
              <sphereGeometry args={[config.size, 14, 14]} />
              <meshStandardMaterial
                color="#a5f3fc"
                emissive="#0891b2"
                emissiveIntensity={0.58 + emissiveBoost}
                metalness={0.55}
                roughness={0.35}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[config.size * 1.55, 0.004, 6, 24]} />
              <meshBasicMaterial color="#67e8f9" transparent opacity={0.35} />
            </mesh>
          </group>
        </group>
      ))}

      {babySatellites.map((config, index) => (
        <group
          key={`baby-sat-${index}`}
          ref={(node) => { babySatRefs.current[index] = node }}
          rotation={config.tilt}
        >
          <group position={[config.radius, 0, 0]}>
            {config.shape === 'box' ? (
              <mesh scale={config.size * 2.2}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                  color="#bae6fd"
                  emissive="#0e7490"
                  emissiveIntensity={0.42}
                  metalness={0.4}
                  roughness={0.45}
                />
              </mesh>
            ) : config.shape === 'tetra' ? (
              <mesh scale={config.size * 2.4}>
                <tetrahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                  color="#cffafe"
                  emissive="#0891b2"
                  emissiveIntensity={0.48}
                  metalness={0.35}
                  roughness={0.4}
                />
              </mesh>
            ) : (
              <mesh>
                <sphereGeometry args={[config.size, 10, 10]} />
                <meshStandardMaterial
                  color="#e0f2fe"
                  emissive="#06b6d4"
                  emissiveIntensity={0.42}
                  metalness={0.35}
                  roughness={0.45}
                />
              </mesh>
            )}
          </group>
        </group>
      ))}

      {mainSatellites.map((config, index) => (
        <mesh
          key={`signal-arc-${index}`}
          ref={(node) => { signalArcRefs.current[index] = node }}
          rotation={[config.tilt[0], config.tilt[1], config.phase]}
          visible={false}
        >
          <torusGeometry args={[config.radius * 0.62, 0.0025, 4, 32, Math.PI * 0.55]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0} />
        </mesh>
      ))}

      <group ref={coreRef} scale={preset.coreScale}>
        <mesh rotation={[0.4, 0.2, 0]}>
          <torusGeometry args={[1.8, 0.02, 12, 180]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#155e75"
            emissiveIntensity={0.45 + emissiveBoost}
          />
        </mesh>
        <mesh rotation={[1, 0.9, 0.4]}>
          <torusGeometry args={[1.25, 0.02, 12, 180]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#0f172a"
            emissiveIntensity={0.35 + emissiveBoost}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#0891b2"
            emissiveIntensity={0.45 + emissiveBoost}
            metalness={0.7}
            roughness={0.25}
            wireframe
          />
        </mesh>
        <mesh position={[0, 0, -0.1]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial
            color="#dbeafe"
            emissive="#67e8f9"
            emissiveIntensity={0.35 + emissiveBoost}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>

      <mesh ref={pulseRingRef} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <torusGeometry args={[1.05, 0.012, 8, 96]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0} />
      </mesh>
    </group>
  )
}

export default function OrbScene({
  variant = 'services',
  satelliteMode,
  satelliteCount,
  babySatelliteCount,
  showTrajectoryLines,
  interactive = true,
  pulseKey = 0,
  hovered = false,
  intensity,
  pointer = { x: 0, y: 0 },
  heightClass = 'h-[200px] sm:h-[220px]',
  reducedMotion: reducedMotionProp,
}: OrbSceneProps) {
  const [isLiteMode, setIsLiteMode] = useState(false)

  const preset = resolvePreset({
    variant,
    satelliteMode,
    satelliteCount,
    babySatelliteCount,
    showTrajectoryLines,
    intensity,
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mobileQuery = window.matchMedia('(max-width: 768px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateMode = () => {
      setIsLiteMode(mobileQuery.matches || reducedMotionQuery.matches)
    }

    updateMode()
    mobileQuery.addEventListener('change', updateMode)
    reducedMotionQuery.addEventListener('change', updateMode)

    return () => {
      mobileQuery.removeEventListener('change', updateMode)
      reducedMotionQuery.removeEventListener('change', updateMode)
    }
  }, [])

  const reducedMotion = reducedMotionProp ?? isLiteMode
  const widthClass =
    variant === 'contact'
      ? 'w-[180px] sm:w-[200px]'
      : variant === 'hero'
        ? 'w-[176px] sm:w-[192px]'
        : 'w-[200px] sm:w-[220px]'

  return (
    <div
      className={`relative ${widthClass} ${heightClass} overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/20 shadow-[0_16px_48px_rgba(2,6,23,0.28)] backdrop-blur-[1px] ${
        hovered && interactive ? 'border-cyan-400/25' : ''
      } ${pulseKey > 0 ? 'si-orb-scene-active' : ''}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(148,163,184,0.05),rgba(15,23,42,0))]" />
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 38 }}
        dpr={isLiteMode ? [1, 1.1] : [1, 1.25]}
        frameloop={isLiteMode ? 'demand' : 'always'}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 2, 4]} intensity={1.2} color="#67e8f9" />
        <pointLight position={[-4, -2, 2]} intensity={0.65} color="#ffffff" />
        <OrbitalNetwork
          preset={preset}
          pointer={interactive ? pointer : { x: 0, y: 0 }}
          hovered={interactive && hovered}
          pulseKey={pulseKey}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  )
}
