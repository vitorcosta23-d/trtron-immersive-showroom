import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Html, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import BrandLogo from './BrandLogo'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const handleChange = (event) => setIsMobile(event.matches)
    setIsMobile(media.matches)

    if (media.addEventListener) {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    }

    media.addListener(handleChange)
    return () => media.removeListener(handleChange)
  }, [])

  return isMobile
}

function HeroGhostSwitch() {
  const { scene } = useGLTF('/models/trtron-switch-base.gltf')
  const base = useMemo(() => scene.clone(), [scene])
  const halo = useMemo(() => new THREE.Color('#caa15e'), [])

  useMemo(() => {
    base.traverse((child) => {
      if (child.isMesh) {
        child.geometry.computeVertexNormals()
        child.material = new THREE.MeshPhysicalMaterial({
          color: '#18110d',
          transparent: true,
          opacity: 0.34,
          roughness: 0.28,
          metalness: 0.18,
          clearcoat: 0.9,
          clearcoatRoughness: 0.18,
        })
      }
    })
  }, [base])

  useFrame((state) => {
    base.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.12
    base.rotation.x = Math.cos(state.clock.elapsedTime * 0.14) * 0.04
  })

  return (
    <group position={[1.35, 0.1, 0]} rotation={[0.16, -0.52, -0.04]}>
      <primitive object={base} scale={[3.15, 3.5, 2.2]} />
      <mesh rotation-x={-Math.PI / 2} position={[0.2, -1.95, -0.7]}>
        <ringGeometry args={[2.1, 4.25, 72]} />
        <meshBasicMaterial color={halo} transparent opacity={0.08} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
        Preparando experiência
      </div>
    </Html>
  )
}

function HeroScene({ isMobile }) {
  return (
    <Canvas
      camera={{ position: isMobile ? [0, 0.35, 5.8] : [0, 0.25, 4.8], fov: isMobile ? 38 : 34 }}
      dpr={[1, 1.7]}
    >
      <color attach="background" args={['#120b07']} />
      <fog attach="fog" args={['#120b07', 6, 14]} />
      <ambientLight intensity={0.72} />
      <spotLight position={[6, 6, 6]} intensity={48} angle={0.34} penumbra={0.75} color="#f5e8cf" />
      <spotLight position={[-5, 2, 4]} intensity={18} angle={0.3} penumbra={1} color="#c68d34" />
      <Suspense fallback={<Loader />}>
        <Float floatIntensity={0.45} rotationIntensity={0.2} speed={1.4}>
          <HeroGhostSwitch />
        </Float>
        <Environment resolution={64}>
          <mesh position={[0, 4, -4]}>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshBasicMaterial color="#d1b17c" />
          </mesh>
          <mesh position={[-4, 2, 1]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshBasicMaterial color="#8f5b15" />
          </mesh>
        </Environment>
      </Suspense>
    </Canvas>
  )
}

function Hero({ id, onExplore, onShowroom }) {
  const isMobile = useIsMobile()

  return (
    <header id={id} className="hero-grid relative min-h-screen overflow-hidden">
      <div className="ambient-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,154,67,0.24),transparent_36%),radial-gradient(circle_at_85%_20%,rgba(246,239,226,0.08),transparent_22%),linear-gradient(180deg,rgba(18,11,7,0.08),#120b07)]" />
      <div className="hero-light-sweep" />
      <div className="absolute inset-0">
        <HeroScene isMobile={isMobile} />
      </div>

      <div className="section-shell relative z-20 pt-4 sm:pt-6">
        <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 lg:left-0 lg:top-6 lg:translate-x-0">
          <div className="brand-shell">
            <BrandLogo className="scale-[0.84] sm:scale-100" />
          </div>
        </div>
      </div>

      <div className="section-shell relative z-10 flex min-h-screen items-center py-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.38em] text-white/75"
            >
              Automação residencial brasileira
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="max-w-3xl pt-20 font-serif text-5xl leading-[0.92] text-white sm:pt-24 sm:text-6xl lg:pt-12 lg:text-7xl"
            >
              Interruptores inteligentes com <span className="text-gradient">acabamento que valoriza o ambiente</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.24 }}
              className="mt-6 max-w-xl text-sm leading-7 text-white/72 sm:text-base"
            >
              Há 36 anos no setor eletrônico e desde 2009 como TRtron, a marca desenvolve no
              Brasil soluções de automação com design limpo, boa presença e confiança no dia a
              dia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.32 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <button
                type="button"
                onClick={onExplore}
                className="interactive-surface luxury-button rounded-full px-6 py-3 text-sm font-semibold text-night"
              >
                Conhecer a marca
              </button>
              <button
                type="button"
                onClick={onShowroom}
                className="interactive-surface luxury-button-outline rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                Ver modelos
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.24 }}
            className="sensor-card justify-self-end rounded-[2rem] border border-trtron-100/10 bg-trtron-100/5 p-6 backdrop-blur-xl md:max-w-md"
          >
            <div className="grid gap-4 text-sm text-white/70">
              <div className="flex items-start justify-between gap-6 border-b border-trtron-100/10 pb-4">
                <span className="uppercase tracking-[0.28em] text-trtron-100/50">36 anos</span>
                <span className="max-w-[14rem] text-right">
                  Experiência de fábrica e desenvolvimento aplicada ao segmento eletrônico.
                </span>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-trtron-100/10 pb-4">
                <span className="uppercase tracking-[0.28em] text-trtron-100/50">Desde 2009</span>
                <span className="max-w-[14rem] text-right">
                  A TRtron atua com foco em interruptores touch e automação residencial.
                </span>
              </div>
              <div className="flex items-start justify-between gap-6">
                <span className="uppercase tracking-[0.28em] text-trtron-100/50">5 anos</span>
                <span className="max-w-[14rem] text-right">
                  Garantia de fábrica para transmitir segurança a cada projeto.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

useGLTF.preload('/models/trtron-switch-base.gltf')

export default Hero
