import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type { Group } from 'three'

function OrbitalFrame() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.12 + 0.15
  })

  return (
    <group ref={groupRef}>
      <mesh rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[1.8, 0.02, 12, 180]} />
        <meshStandardMaterial color="#67e8f9" emissive="#155e75" />
      </mesh>
      <mesh rotation={[1, 0.9, 0.4]}>
        <torusGeometry args={[1.25, 0.02, 12, 180]} />
        <meshStandardMaterial color="#e2e8f0" emissive="#0f172a" />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#0891b2"
          emissiveIntensity={0.8}
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
          emissiveIntensity={0.55}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  const [isLiteMode, setIsLiteMode] = useState(false)

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

  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18),_rgba(2,6,23,0)_58%)] shadow-[0_30px_120px_rgba(2,6,23,0.65)] sm:h-[460px]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(148,163,184,0.12),rgba(15,23,42,0))]" />
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={isLiteMode ? [1, 1.15] : [1, 1.45]}
        frameloop={isLiteMode ? 'demand' : 'always'}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.72} />
        <directionalLight position={[3, 2, 4]} intensity={1.85} color="#67e8f9" />
        <pointLight position={[-4, -2, 2]} intensity={1.05} color="#ffffff" />
        <OrbitalFrame />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-slate-950/65 px-5 py-4 backdrop-blur sm:inset-x-8 sm:bottom-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
          Systems Direction
        </p>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
          A restrained 3D visual that signals modern capability without turning
          the site into a tech demo.
        </p>
      </div>
    </div>
  )
}
