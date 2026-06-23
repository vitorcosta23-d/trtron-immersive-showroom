import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { finishOptions, ledOptions, modelOptions, useConfiguratorStore } from '../store/Store'

const previewModels = {
  1: {
    id: 1,
    name: '1 tecla',
    label: 'Vertical',
    width: 150,
    height: 230,
    buttonPositions: [{ x: 0, y: 0 }],
  },
  2: {
    id: 2,
    name: '2 teclas',
    label: 'Vertical',
    width: 150,
    height: 230,
    buttonPositions: [
      { x: 0, y: -34 },
      { x: 0, y: 34 },
    ],
  },
  4: {
    id: 4,
    name: '4 teclas',
    label: 'Quadrado',
    width: 230,
    height: 230,
    buttonPositions: [
      { x: -42, y: -42 },
      { x: 42, y: -42 },
      { x: -42, y: 42 },
      { x: 42, y: 42 },
    ],
  },
  6: {
    id: 6,
    name: '6 teclas',
    label: 'Quadrado',
    width: 230,
    height: 230,
    buttonPositions: [
      { x: -42, y: -58 },
      { x: 42, y: -58 },
      { x: -42, y: 0 },
      { x: 42, y: 0 },
      { x: -42, y: 58 },
      { x: 42, y: 58 },
    ],
  },
}

const finishAccent = {
  black: 'Vidro preto com brilho elegante',
  white: 'Acabamento claro e minimalista',
  marble: 'Mármore com leitura premium',
  wood: 'Textura quente e sofisticada',
}

const houseStyleVideo =
  'https://www.trtron.com.br/wp-content/uploads/2025/01/Video-do-WhatsApp-de-2025-01-18-as-19.15.45_157e1773.mp4'

const houseStyleMedia = [
  'https://www.trtron.com.br/wp-content/uploads/2024/08/BANNER-2-TRTRON.png',
  'https://www.trtron.com.br/wp-content/uploads/2024/08/BANNER-2.1-TRTRON.png',
  'https://www.trtron.com.br/wp-content/uploads/2024/08/BANNER-2.2-TRTRON.png',
  'https://www.trtron.com.br/wp-content/uploads/2024/08/BANNER-2.3-TRTRON.png',
  'https://www.trtron.com.br/wp-content/uploads/2024/08/BANNER-2.4-TRTRON.png',
  'https://www.trtron.com.br/wp-content/uploads/2024/08/BANNER-2.6-TRTRON.png',
]

const icons = {
  format:
    'M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z',
  finish:
    'M12 3.5 4 8v8l8 4.5 8-4.5V8z M12 3.5v8.5 M4 8l8 4.5L20 8',
  drag: 'M12 3v18m9-9H3m3.5-3.5L3 12l3.5 3.5M17.5 8.5 21 12l-3.5 3.5',
}

function BrandMark({ className = '' }) {
  return (
    <svg viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="5" y="65" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="62" fontWeight="900" letterSpacing="-3">
        TR
      </text>
      <g transform="translate(133, 64) scale(0.70)">
        <circle cx="0" cy="-6" r="7.5" fill="currentColor" />
        <path d="M -16 -22 A 22 22 0 0 1 16 -22" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M -30 -35 A 40 40 0 0 1 30 -35" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M -45 -48 A 60 60 0 0 1 45 -48" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
      <text x="165" y="65" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="62" fontWeight="800" letterSpacing="-1.5">
        tron
      </text>
      <text x="295" y="28" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="14" fontWeight="bold">
        ®
      </text>
      <text x="70" y="88" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" fontWeight="500" letterSpacing="1.2">
        TECNOLOGIA ELETRÔNICA
      </text>
    </svg>
  )
}

function ConfigIcon({ type }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.9rem] w-[0.9rem]" fill="none" aria-hidden="true">
      <path
        d={icons[type]}
        stroke="#d8c6ab"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PreviewProduct({ model, finish, led }) {
  const [rotation, setRotation] = useState({ x: 15, y: -25 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const preview = previewModels[model.id]

  const startDrag = (clientX, clientY) => {
    setIsDragging(true)
    dragStart.current = { x: clientX, y: clientY }
  }

  const moveDrag = (clientX, clientY) => {
    if (!isDragging) {
      return
    }

    const deltaX = clientX - dragStart.current.x
    const deltaY = clientY - dragStart.current.y

    setRotation((current) => ({
      x: Math.max(-70, Math.min(70, current.x - deltaY * 0.45)),
      y: current.y + deltaX * 0.45,
    }))

    dragStart.current = { x: clientX, y: clientY }
  }

  const buttonWidth = preview.width <= 150 ? 44 : 42
  const buttonHeight = preview.width <= 150 ? 44 : 42
  const baseGlow = finish.id === 'black' ? '0 0 10px rgba(255,255,255,0.45)' : 'inset 0 1px 3px rgba(0,0,0,0.12)'
  const layerEdge = finish.edgeColor || finish.plateColor

  return (
    <div
      className={`relative flex min-h-[34rem] flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-neutral-950 p-8 md:min-h-[42rem] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ perspective: '1200px' }}
      onMouseDown={(event) => startDrag(event.clientX, event.clientY)}
      onMouseMove={(event) => moveDrag(event.clientX, event.clientY)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={(event) => {
        const touch = event.touches[0]
        if (touch) {
          startDrag(touch.clientX, touch.clientY)
        }
      }}
      onTouchMove={(event) => {
        const touch = event.touches[0]
        if (touch) {
          moveDrag(touch.clientX, touch.clientY)
        }
      }}
      onTouchEnd={() => setIsDragging(false)}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute h-[400px] w-[400px] rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute aspect-square w-[120%] md:w-[900px]" style={{ transform: 'rotateX(65deg) rotateY(15deg)' }}>
          <div className="h-full w-full rounded-full border border-amber-500/10 border-t-amber-400/40 animate-[spin_20s_linear_infinite]" />
        </div>
        <div className="absolute aspect-square w-[100%] md:w-[700px]" style={{ transform: 'rotateX(45deg) rotateY(-25deg)' }}>
          <div className="h-full w-full rounded-full border border-amber-500/10 border-b-amber-300/50 animate-[spin_15s_linear_infinite_reverse]" />
        </div>
        <div className="absolute aspect-square w-[150%] md:w-[1100px]" style={{ transform: 'rotateX(75deg)' }}>
          <div className="h-full w-full rounded-full border border-amber-600/5 border-l-amber-500/30 animate-[spin_30s_linear_infinite]" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-6 z-20 md:right-10 md:top-8">
        <BrandMark className="h-12 text-white/90 drop-shadow-md md:h-16" />
      </div>

      <div
        className={`relative z-10 transition-transform ${isDragging ? 'duration-75' : 'duration-700 ease-out animate-[float-organic_6s_ease-in-out_infinite]'}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => {
          const isFront = index === 0
          const isBack = index === 5
          const layerZ = index * -2

          return (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 rounded-md transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                width: preview.width,
                height: preview.height,
                marginLeft: -(preview.width / 2),
                marginTop: -(preview.height / 2),
                transform: `translateZ(${layerZ}px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-md transition-colors duration-500"
                style={{
                  backgroundColor: isFront ? finish.plateColor : layerEdge,
                  backgroundImage: isFront && finish.texture !== 'none' ? finish.texture : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {isFront ? (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0 opacity-60"
                      style={{ backgroundImage: finish.reflection }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      {preview.buttonPositions.map((position, buttonIndex) => (
                        <div
                          key={`${model.id}-${buttonIndex}`}
                          className="absolute rounded-[0.38rem] transition-all duration-300"
                          style={{
                            width: buttonWidth,
                            height: buttonHeight,
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                            border: `1px solid ${finish.buttonBorder}`,
                            background: 'transparent',
                            boxShadow:
                              finish.id === 'black'
                                ? `${baseGlow}, 0 0 18px ${led.bloom}22`
                                : baseGlow,
                          }}
                        >
                          <span
                            className="absolute inset-0 rounded-[0.38rem]"
                            style={{
                              boxShadow: finish.id === 'black' ? `inset 0 0 1px rgba(255,255,255,0.55)` : 'none',
                            }}
                          />
                          <span
                            className="absolute left-1/2 top-[84%] h-[0.3rem] w-[0.3rem] -translate-x-1/2 rounded-full"
                            style={{
                              background: led.color,
                              opacity: finish.id === 'black' ? 0.78 : 0.58,
                              boxShadow: `0 0 12px ${led.bloom}, 0 0 24px ${led.bloom}`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {isBack ? (
                  <div
                    className="absolute inset-0 rounded-md bg-black/60 blur-2xl"
                    style={{ transform: 'translateZ(-20px) scale(0.95)' }}
                  />
                ) : null}
              </div>
            </div>
          )
        })}
      </div>

      <div className="pointer-events-none absolute bottom-8 z-20 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 opacity-60">
        <ConfigIcon type="drag" />
        <span>Clique e arraste para girar em 3D</span>
      </div>
    </div>
  )
}

function SectionLabel({ type, title, hint }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
      <ConfigIcon type={type} />
      <span>{title}</span>
      <span className="ml-auto text-[0.65rem] font-normal uppercase tracking-[0.18em] text-neutral-600">
        {hint}
      </span>
    </div>
  )
}

function ModelSelector({ selectedModel, setModel }) {
  return (
    <div className="mb-10">
      <SectionLabel type="format" title="Formato" hint="Vertical e quadrado" />
      <div className="grid grid-cols-2 gap-3">
        {modelOptions.map((item) => {
          const active = selectedModel === item.id
          const preview = previewModels[item.id]
          const outlineWidth = preview.width <= 150 ? 14 : 22
          const outlineHeight = preview.width <= 150 ? 24 : 22

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setModel(item.id)}
              className={`interactive-surface relative flex flex-col items-center gap-2 rounded-lg border px-3 py-4 text-sm font-medium transition-all duration-300 ${
                active
                  ? 'border-white bg-white/10 text-white'
                  : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:bg-white/5'
              }`}
            >
              <div className="flex h-7 items-center justify-center opacity-70">
                <div
                  className={`grid ${preview.width <= 150 ? 'grid-cols-1 gap-1.5' : 'grid-cols-2 gap-1.5'}`}
                >
                  {preview.buttonPositions.slice(0, preview.width <= 150 ? Math.min(item.id, 2) : Math.min(item.id, 4)).map((_, index) => (
                    <span
                      key={index}
                      className="rounded-[2px] border border-current"
                      style={{ width: outlineWidth, height: outlineHeight }}
                    />
                  ))}
                </div>
              </div>
              {item.label}
              {active ? <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-white" /> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FinishSelector({ selectedFinish, setFinish }) {
  return (
    <div className="mb-10">
      <SectionLabel type="finish" title="Acabamento" hint="Vidro e textura" />
      <div className="space-y-3">
        {finishOptions.map((finish) => {
          const active = selectedFinish === finish.id

          return (
            <button
              key={finish.id}
              type="button"
              onClick={() => setFinish(finish.id)}
              className={`interactive-surface flex w-full items-center rounded-lg border p-3 transition-all duration-300 ${
                active
                  ? 'border-white bg-white/10'
                  : 'border-neutral-800 hover:border-neutral-600 hover:bg-white/5'
              }`}
            >
              <div
                className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 shadow-inner"
                style={{
                  backgroundColor: finish.plateColor,
                  backgroundImage: finish.texture !== 'none' ? finish.texture : 'none',
                  backgroundSize: 'cover',
                }}
              >
                <div className="absolute inset-0 opacity-65" style={{ backgroundImage: finish.reflection }} />
              </div>
              <div className="ml-4 flex-1 text-left">
                <span className={`block text-sm font-medium ${active ? 'text-white' : 'text-neutral-300'}`}>
                  {finish.label}
                </span>
                <span className="mt-1 block text-xs text-neutral-500">{finishAccent[finish.id]}</span>
              </div>
              {active ? <span className="h-4 w-4 rounded-full border border-white/60 bg-white" /> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function QuoteSummary() {
  const summary = useConfiguratorStore((state) => state.budgetCapture)

  if (!summary) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.03] p-6 text-sm leading-7 text-white/60">
        Selecione a composição e clique em <strong className="text-white">Solicitar orçamento</strong>{' '}
        para registrar um resumo pronto para atendimento.
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] border border-trtron-300/35 bg-trtron-400/10 p-6"
    >
      <p className="text-xs uppercase tracking-[0.34em] text-trtron-100/70">Resumo do orçamento</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sensor-card rounded-2xl border border-white/10 bg-black/15 p-4">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Modelo</span>
          <p className="mt-2 text-lg font-semibold text-white">{summary.model}</p>
        </div>
        <div className="sensor-card rounded-2xl border border-white/10 bg-black/15 p-4">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Acabamento</span>
          <p className="mt-2 text-lg font-semibold text-white">{summary.finish}</p>
        </div>
      </div>
    </motion.div>
  )
}

function HouseWithStyleSection() {
  const videoRef = useRef(null)
  const [videoMuted, setVideoMuted] = useState(true)
  const [videoPaused, setVideoPaused] = useState(false)

  const toggleVideoAudio = async () => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const nextMuted = !videoMuted
    video.muted = nextMuted
    setVideoMuted(nextMuted)

    try {
      await video.play()
    } catch (_error) {
      // Browsers may still require an explicit media gesture flow.
    }
  }

  const toggleVideoPlayback = async () => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (video.paused) {
      try {
        await video.play()
        setVideoPaused(false)
      } catch (_error) {
        // Ignore play interruptions from the browser.
      }
      return
    }

    video.pause()
    setVideoPaused(true)
  }

  return (
    <div className="mt-16">
      <div className="rounded-[2rem] border border-trtron-100/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-panel sm:p-8">
        <div className="mb-8 max-w-3xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.34em] text-white/68">
            Casa com estilo
          </span>
          <h3 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl">
            Tecnologia residencial apresentada em movimento.
          </h3>
          <p className="mt-5 text-base leading-8 text-white/68">
            Agora essa área usa o vídeo oficial da TRtron, com leitura mais limpa e foco total na
            experiência visual do produto aplicado ao ambiente.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#120d09]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,154,67,0.18),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.22))]" />
          <div className="relative grid gap-6 p-5 lg:grid-cols-[0.45fr_0.55fr] lg:p-7">
            <div className="relative mx-auto w-full max-w-[24rem]">
              <div className="overflow-hidden rounded-[1.7rem] border border-white/12 bg-black shadow-[0_24px_60px_rgba(0,0,0,0.36)]">
                <video
                  ref={videoRef}
                  className="h-[34rem] w-full object-cover sm:h-[42rem]"
                  src={houseStyleVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
              <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/24 px-3 py-2 text-[0.62rem] uppercase tracking-[0.26em] text-white/70 backdrop-blur-md">
                Vídeo oficial
              </div>
              <div className="absolute right-4 top-4 z-10 flex gap-2">
                <button
                  type="button"
                  onClick={toggleVideoAudio}
                  className="interactive-surface rounded-full border border-white/15 bg-black/28 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur-md transition hover:border-trtron-300/40 hover:text-white"
                >
                  {videoMuted ? 'Ouvir som' : 'Silenciar'}
                </button>
                <button
                  type="button"
                  onClick={toggleVideoPlayback}
                  className="interactive-surface rounded-full border border-white/15 bg-black/28 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur-md transition hover:border-trtron-300/40 hover:text-white"
                >
                  {videoPaused ? 'Reproduzir' : 'Pausar'}
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.34em] text-trtron-100/48">
                Experiência visual
              </span>
              <h4 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl">
                Um enquadramento vertical maior para valorizar melhor a linguagem da marca.
              </h4>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                O vídeo agora fica mais alto, mais limpo e mais organizado dentro da página,
                preservando a leitura premium da automação e deixando o conteúdo respirar melhor.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="sensor-card rounded-[1.4rem] border border-white/10 bg-black/18 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-trtron-100/45">Design</p>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    Uma apresentação mais vertical e elegante para reforçar o aspecto autoral dos
                    interruptores.
                  </p>
                </div>
                <div className="sensor-card rounded-[1.4rem] border border-white/10 bg-black/18 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-trtron-100/45">Aplicação</p>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    Conteúdo visual pensado para mostrar o produto em uso com mais impacto e
                    organização.
                  </p>
                </div>
              </div>

              <a
                href="https://www.trtron.com.br/"
                target="_blank"
                rel="noreferrer"
                className="interactive-surface luxury-button mt-8 inline-flex w-fit items-center justify-center rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-night"
              >
                Ver no site oficial
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-5">
          <span className="text-xs uppercase tracking-[0.34em] text-trtron-100/48">
            Alguns dos nossos produtos
          </span>
          <h4 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
            Destaques da linha TRtron em composições maiores e mais visíveis.
          </h4>
        </div>

        <div className="house-style-marquee overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/15 py-4">
          <div className="house-style-marquee-track">
            {[...houseStyleMedia, ...houseStyleMedia].map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="house-style-marquee-card overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#18110d]"
              >
                <img
                  src={src}
                  alt={`Banner TRtron ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Showroom() {
  const selectedModel = useConfiguratorStore((state) => state.selectedModel)
  const selectedFinish = useConfiguratorStore((state) => state.selectedFinish)
  const selectedLed = useConfiguratorStore((state) => state.selectedLed)
  const setModel = useConfiguratorStore((state) => state.setModel)
  const setFinish = useConfiguratorStore((state) => state.setFinish)
  const captureBudget = useConfiguratorStore((state) => state.captureBudget)

  const model = useMemo(
    () => modelOptions.find((item) => item.id === selectedModel) ?? modelOptions[2],
    [selectedModel],
  )
  const finish = useMemo(
    () => finishOptions.find((item) => item.id === selectedFinish) ?? finishOptions[0],
    [selectedFinish],
  )
  const led = useMemo(
    () => ledOptions.find((item) => item.id === selectedLed) ?? ledOptions[2],
    [selectedLed],
  )

  return (
    <section id="showroom" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,154,67,0.24),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(246,239,226,0.1),transparent_18%)]" />
      <div className="section-shell relative z-10">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.36em] text-white/70">
            Modelos e acabamentos
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl">
            Um configurador mais próximo do produto real, com forma e acabamento mais fiel.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
            Refiz o terceiro bloco com base no modelo que você enviou para deixar a peça mais
            alinhada ao interruptor real da TRtron, especialmente no vidro frontal, nas teclas e
            na leitura premium dos acabamentos.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[2rem] border border-trtron-100/10 shadow-panel">
          <div className="flex min-h-[34rem] flex-col overflow-hidden bg-neutral-950 text-white md:min-h-[42rem] md:flex-row">
            <PreviewProduct model={model} finish={finish} led={led} />

            <div className="w-full border-t border-neutral-800 bg-neutral-950/85 p-8 backdrop-blur-xl md:w-96 md:border-l md:border-t-0">
              <ModelSelector selectedModel={selectedModel} setModel={setModel} />
              <FinishSelector selectedFinish={selectedFinish} setFinish={setFinish} />

              <div className="sensor-card mt-8 rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.28em] text-trtron-100/45">Configuração ativa</span>
                    <p className="mt-2 text-lg font-semibold text-white">{model.label}</p>
                  </div>
                  <span className="rounded-full border border-trtron-100/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-trtron-100/75">
                    {finish.label}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  Uma leitura mais próxima do produto final para facilitar a apresentação do projeto
                  e a decisão do cliente.
                </p>
              </div>
            </div>
          </div>
        </div>

        <HouseWithStyleSection />

        <div className="mt-16 grid gap-8 rounded-[2rem] border border-trtron-100/10 bg-trtron-100/[0.04] p-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.34em] text-trtron-100/45">Orçamento</span>
            <h3 className="mt-4 font-serif text-4xl text-white">Gostou desta composição?</h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
              Registre a configuração escolhida para seguir o atendimento com mais contexto e
              agilidade.
            </p>
            <button
              type="button"
              onClick={captureBudget}
              className="interactive-surface luxury-button mt-8 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-night"
            >
              Solicitar orçamento
            </button>
          </div>

          <QuoteSummary />
        </div>
      </div>
    </section>
  )
}

export default Showroom
