import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'

const layerCount = 35
const layerDepth = 1.2

function IntroLogoLayer({ type, zIndex }) {
  return (
    <div
      className={`intro-logo-layer intro-logo-layer-${type}`}
      style={{ transform: `translate(-50%, -50%) translateZ(${-zIndex * layerDepth}px)` }}
    >
      <div className="intro-logo-main">
        <div className="intro-logo-tr">TR</div>
        <div className="intro-logo-wifi" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="intro-logo-wifi-svg">
            <path className="intro-logo-wifi-arc" d="M 12 35 A 48 48 0 0 1 88 35" fill="none" strokeWidth="12" strokeLinecap="round" />
            <path className="intro-logo-wifi-arc" d="M 28 55 A 28 28 0 0 1 72 55" fill="none" strokeWidth="12" strokeLinecap="round" />
            <path className="intro-logo-wifi-arc" d="M 44 75 A 8 8 0 0 1 56 75" fill="none" strokeWidth="12" strokeLinecap="round" />
            <circle className="intro-logo-wifi-dot" cx="50" cy="94" r="10" />
          </svg>
        </div>
        <div className="intro-logo-tron-group">
          <div className="intro-logo-tron">tron</div>
          <div className="intro-logo-reg">®</div>
        </div>
      </div>
      <div className="intro-logo-sub">TECNOLOGIA ELETRÔNICA</div>
    </div>
  )
}

function IntroEntry({ onEnterCatalog, onPrimeAudio }) {
  const canvasRef = useRef(null)
  const pivotRef = useRef(null)
  const animationFrameRef = useRef(0)
  const particlesRef = useRef([])
  const rotationRef = useRef({ currentX: 5, currentY: -8, targetX: 5, targetY: -8 })

  const layers = useMemo(
    () =>
      Array.from({ length: layerCount }, (_, index) => ({
        key: index,
        type: index === 0 ? 'front' : index === layerCount - 1 ? 'back' : 'side',
      })),
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const pivot = pivotRef.current

    if (!canvas || !pivot) {
      return undefined
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return undefined
    }

    const createParticles = () => {
      const areaFactor = (window.innerWidth * window.innerHeight) / 12000
      particlesRef.current = Array.from({ length: Math.max(36, Math.floor(areaFactor)) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      }))
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    const handleMouseMove = (event) => {
      rotationRef.current.targetX = (window.innerWidth / 2 - event.pageX) / 90
      rotationRef.current.targetY = (window.innerHeight / 2 - event.pageY) / 90
    }

    const handleMouseLeave = () => {
      rotationRef.current.targetX = 5
      rotationRef.current.targetY = -8
    }

    const animate = () => {
      const rotation = rotationRef.current

      rotation.currentX += (rotation.targetX - rotation.currentX) * 0.028
      rotation.currentY += (rotation.targetY - rotation.currentY) * 0.028
      pivot.style.transform = `rotateX(${rotation.currentY}deg) rotateY(${-rotation.currentX}deg)`

      context.clearRect(0, 0, canvas.width, canvas.height)

      for (let index = 0; index < particlesRef.current.length; index += 1) {
        const particle = particlesRef.current[index]
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX
        }

        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY
        }

        context.fillStyle = 'rgba(199, 154, 44, 0.4)'
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()

        for (let inner = index; inner < particlesRef.current.length; inner += 1) {
          const connection = particlesRef.current[inner]
          const deltaX = particle.x - connection.x
          const deltaY = particle.y - connection.y
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

          if (distance < 140) {
            context.beginPath()
            context.strokeStyle = `rgba(199, 154, 44, ${0.15 - distance / 900})`
            context.lineWidth = 0.5
            context.moveTo(particle.x, particle.y)
            context.lineTo(connection.x, connection.y)
            context.stroke()
          }
        }
      }

      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.section
      className="intro-entry-section"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <canvas ref={canvasRef} className="intro-entry-canvas" />
      <motion.div
        ref={pivotRef}
        initial={{ opacity: 0, scale: 0.98, rotateX: -4, rotateY: 6 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
        transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
        className="intro-entry-scene"
      >
        <div className="intro-entry-float">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="intro-logo-anchor"
          >
            {layers.map((layer) => (
              <IntroLogoLayer key={layer.key} type={layer.type} zIndex={layer.key} />
            ))}
          </motion.div>

          <motion.button
            type="button"
            className="interactive-surface intro-catalog-button"
            onPointerDown={onPrimeAudio}
            onTouchStart={onPrimeAudio}
            onClick={onEnterCatalog}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.35, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            <svg className="intro-catalog-play" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Ver catálogo
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default IntroEntry
