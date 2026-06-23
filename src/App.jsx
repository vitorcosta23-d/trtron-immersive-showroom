import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import IntroEntry from './components/IntroEntry'
import Hero from './components/Hero'
import History from './components/History'
import Showroom from './components/Showroom'
import Footer from './components/Footer'

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const siteAudioRef = useRef(null)
  const audioUnlockAttemptedRef = useRef(false)

  const ensureAudioPlayback = () => {
    const audio = siteAudioRef.current

    if (!audio) {
      return
    }

    audio.volume = 0.42
    audio.loop = true
    audio.muted = false

    const playPromise = audio.play()
    if (playPromise?.catch) {
      playPromise.catch(() => {})
    }
  }

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [showIntro])

  useEffect(() => {
    const audio = siteAudioRef.current

    if (!audio) {
      return undefined
    }

    let cancelled = false

    const tryPlay = async () => {
      if (cancelled) {
        return
      }

      try {
        audio.volume = 0.42
        audio.loop = true
        audio.muted = false
        await audio.play()
      } catch (_error) {
        try {
          audio.defaultMuted = true
          audio.muted = true
          await audio.play()
        } catch (_fallbackError) {
          // Some browsers still require a user gesture for audible autoplay.
        }
      }
    }

    const retryPlayback = () => {
      if (!audioUnlockAttemptedRef.current) {
        audioUnlockAttemptedRef.current = true
        audio.defaultMuted = false
        audio.muted = false
      }

      if (audio.paused) {
        ensureAudioPlayback()
      } else if (audio.muted) {
        audio.muted = false
        audio.volume = 0.42
      }
    }

    tryPlay()

    window.addEventListener('pageshow', retryPlayback)
    window.addEventListener('focus', retryPlayback)
    document.addEventListener('visibilitychange', retryPlayback)
    window.addEventListener('pointerdown', retryPlayback)
    window.addEventListener('touchstart', retryPlayback)
    window.addEventListener('keydown', retryPlayback)

    return () => {
      cancelled = true
      window.removeEventListener('pageshow', retryPlayback)
      window.removeEventListener('focus', retryPlayback)
      document.removeEventListener('visibilitychange', retryPlayback)
      window.removeEventListener('pointerdown', retryPlayback)
      window.removeEventListener('touchstart', retryPlayback)
      window.removeEventListener('keydown', retryPlayback)
    }
  }, [])

  useEffect(() => {
    const interactiveSelector = 'button, a, [data-interactive="true"]'

    const updatePointerGlow = (event) => {
      const target = event.target.closest(interactiveSelector)
      if (!target) {
        return
      }

      const rect = target.getBoundingClientRect()
      target.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
      target.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
    }

    const spawnRipple = (event) => {
      const target = event.target.closest(interactiveSelector)
      if (!target) {
        return
      }

      const rect = target.getBoundingClientRect()
      const ripple = document.createElement('span')
      ripple.className = 'interaction-ripple'
      ripple.style.left = `${event.clientX - rect.left}px`
      ripple.style.top = `${event.clientY - rect.top}px`
      target.appendChild(ripple)

      ripple.addEventListener('animationend', () => {
        ripple.remove()
      })
    }

    document.addEventListener('pointermove', updatePointerGlow)
    document.addEventListener('pointerdown', spawnRipple)

    return () => {
      document.removeEventListener('pointermove', updatePointerGlow)
      document.removeEventListener('pointerdown', spawnRipple)
    }
  }, [])

  const handleEnterCatalog = () => {
    ensureAudioPlayback()
    setShowIntro(false)
    window.setTimeout(() => {
      scrollToSection('welcome')
    }, 120)
  }

  return (
    <div className="bg-trtron-950 text-white">
      <audio ref={siteAudioRef} src="/media/intro-theme.mp3" preload="auto" autoPlay loop playsInline />
      <AnimatePresence>
        {showIntro ? <IntroEntry onEnterCatalog={handleEnterCatalog} onPrimeAudio={ensureAudioPlayback} /> : null}
      </AnimatePresence>
      <Hero
        id="welcome"
        onExplore={() => scrollToSection('history')}
        onShowroom={() => scrollToSection('showroom')}
      />
      <FloatingWhatsApp />
      <main className="relative overflow-hidden">
        <History />
        <Showroom />
      </main>
      <Footer />
    </div>
  )
}

export default App
