import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrthographicCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { environmentOptions, finishOptions, ledOptions, modelOptions, useConfiguratorStore } from '../store/Store'

const mixHex = (colorA, colorB, weight = 0.5) => {
  const normalize = (value) => value.replace('#', '')
  const a = normalize(colorA)
  const b = normalize(colorB)
  const ratio = Math.min(Math.max(weight, 0), 1)

  const toChannel = (hex, index) => Number.parseInt(hex.slice(index, index + 2), 16)
  const blend = (start, end) => Math.round(start + (end - start) * ratio)
  const toHex = (value) => value.toString(16).padStart(2, '0')

  const red = blend(toChannel(a, 0), toChannel(b, 0))
  const green = blend(toChannel(a, 2), toChannel(b, 2))
  const blue = blend(toChannel(a, 4), toChannel(b, 4))

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`
}

const softenRoomPalette = (room, finish) => ({
  wall: mixHex(room.wall, finish.plateColor, finish.id === 'black' ? 0.2 : 0.12),
  accent: mixHex(room.accent, finish.accentColor || finish.plateColor, finish.id === 'black' ? 0.24 : 0.18),
  frame: mixHex(room.wall, '#1a120d', 0.22),
})

const WallSwitch = ({ model, finish, led }) => (
  <group position={[0, 0, 0.12]}>
    <mesh scale={model.plateScale}>
      <boxGeometry args={[2.15, 2.9, 0.18]} />
      <meshPhysicalMaterial
        color={finish.plateColor}
        roughness={finish.id === 'white' ? 0.24 : 0.14}
        metalness={finish.id === 'graphite' ? 0.4 : 0.16}
        clearcoat={1}
        clearcoatRoughness={0.08}
      />
    </mesh>
    {model.positions.map((position, index) => (
      <group key={`${model.id}-${index}`} position={position}>
        <mesh>
          <boxGeometry args={[0.56, 0.84, 0.12]} />
          <meshPhysicalMaterial
            color={finish.keyColor}
            roughness={0.12}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.06}
          />
        </mesh>
        <mesh position={[0, -0.31, 0.08]}>
          <cylinderGeometry args={[0.05, 0.05, 0.05, 24]} />
          <meshBasicMaterial color={led.color} />
        </mesh>
      </group>
    ))}
  </group>
)

function EnvironmentCard({ room, active, onSelect, model, finish, led }) {
  const palette = softenRoomPalette(room, finish)

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -4 }}
      className={`interactive-surface group relative overflow-hidden rounded-[2rem] border p-0 text-left transition ${
        active
          ? 'border-trtron-300/70 bg-trtron-100/10 shadow-glow'
          : 'border-trtron-100/10 bg-trtron-100/[0.04] hover:border-trtron-100/20'
      }`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${palette.wall} 0%, ${palette.accent}18 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.01),rgba(0,0,0,0.22))]" />
      <div className="relative z-10 grid min-h-[20rem] grid-rows-[1fr_auto]">
        <div className="h-60">
          <Canvas dpr={[1, 1.5]}>
            <OrthographicCamera makeDefault position={[0, 0, 4]} zoom={95} />
            <ambientLight intensity={1.15} />
            <directionalLight position={[4, 5, 4]} intensity={1.6} color="#fff9f0" />
            <directionalLight position={[-4, 1, 4]} intensity={0.72} color="#f3d8ac" />
            <Environment resolution={32}>
              <mesh position={[0, 4, -2]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color={palette.accent} />
              </mesh>
            </Environment>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[6, 4.1, 0.18]} />
              <meshStandardMaterial color={palette.wall} roughness={0.98} />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <planeGeometry args={[2.9, 2.9]} />
              <meshBasicMaterial color={palette.frame} transparent opacity={0.06} />
            </mesh>
            <WallSwitch model={model} finish={finish} led={led} />
            <ContactShadows position={[0, -1.75, 0]} opacity={0.12} scale={3.2} blur={2.8} />
          </Canvas>
        </div>

        <div className="relative z-10 p-6 text-night">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-night/55">Sua casa</p>
              <h3 className="mt-2 text-2xl font-semibold">{room.label}</h3>
            </div>
            <span className="rounded-full bg-black/10 px-3 py-1 text-xs uppercase tracking-[0.26em] text-night/65">
              {active ? 'selecionado' : 'visualizar'}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-night/75">{room.copy}</p>
        </div>
      </div>
    </motion.button>
  )
}

function EnvironmentView() {
  const selectedEnvironment = useConfiguratorStore((state) => state.selectedEnvironment)
  const setEnvironment = useConfiguratorStore((state) => state.setEnvironment)
  const selectedModel = useConfiguratorStore((state) => state.selectedModel)
  const selectedFinish = useConfiguratorStore((state) => state.selectedFinish)
  const selectedLed = useConfiguratorStore((state) => state.selectedLed)

  const model = modelOptions.find((item) => item.id === selectedModel)
  const finish = finishOptions.find((item) => item.id === selectedFinish)
  const led = ledOptions.find((item) => item.id === selectedLed)

  return (
    <div className="mt-16">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.34em] text-white/50">Sua casa</span>
          <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">Veja no seu ambiente</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/68">
          O mesmo configurador agora aparece de forma mais suave e equilibrada para ajudar o
          cliente a imaginar a instalação pronta sem perder o foco no produto.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {environmentOptions.map((room) => (
          <EnvironmentCard
            key={room.id}
            room={room}
            active={selectedEnvironment === room.id}
            onSelect={() => setEnvironment(room.id)}
            model={model}
            finish={finish}
            led={led}
          />
        ))}
      </div>
    </div>
  )
}

export default EnvironmentView
