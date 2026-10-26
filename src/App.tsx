import React, { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BackgroundVideo } from './components/BackgroundVideo'
import { Navbar } from './components/Navbar'
import { HeroContent } from './components/HeroContent'
import { FolderTabPortfolio } from './components/FolderTabPortfolio'
import { CustomCursor } from './components/CustomCursor'
import { WaveTransition, type WaveTransitionHandle } from './components/WaveTransition'

gsap.registerPlugin(ScrollTrigger)

export const App: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const portfolioSectionRef = useRef<HTMLDivElement | null>(null)
  const heroNavbarRef = useRef<HTMLElement | null>(null)
  const heroContentRef = useRef<HTMLDivElement | null>(null)
  const heroButtonRef = useRef<HTMLButtonElement | null>(null)
  const heroArrowRef = useRef<SVGSVGElement | null>(null)
  const heroRippleRef = useRef<HTMLSpanElement | null>(null)
  const waveTransitionRef = useRef<WaveTransitionHandle | null>(null)

  const lenisRef = useRef<Lenis | null>(null)
  const isTransitioningRef = useRef<boolean>(false)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [isHeroInView, setIsHeroInView] = useState<boolean>(true)

  // Initialize Lenis smooth scroll synchronized with GSAP ticker & ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Observe Hero visibility to pause character canvas mouse-scrubbing when out of viewport
  useEffect(() => {
    const heroEl = heroSectionRef.current
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  // Cinematic Abstract Red Wave Transition: Hero Launch Button -> Main Portfolio
  const handleLaunch = useCallback(() => {
    if (isTransitioningRef.current) return
    const portfolioEl = portfolioSectionRef.current
    if (!portfolioEl) return

    const heroContent = heroContentRef.current
    const heroNavbar = heroNavbarRef.current
    const heroButton = heroButtonRef.current
    const heroArrow = heroArrowRef.current
    const heroRipple = heroRippleRef.current

    // Accessibility: Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(portfolioEl, { immediate: true })
      } else {
        portfolioEl.scrollIntoView()
      }
      return
    }

    isTransitioningRef.current = true
    setIsTransitioning(true)

    // Locate the first main sheet / cover inside the portfolio for the settling reveal
    const portfolioCover =
      portfolioEl.querySelector<HTMLElement>('.ftp-sheet') || portfolioEl

    // 1. Immediate tactile click feedback on the Launch button
    if (heroButton) {
      gsap.to(heroButton, {
        scale: 0.94,
        duration: 0.18,
        ease: 'power2.out',
      })
    }
    if (heroArrow) {
      gsap.to(heroArrow, {
        x: 6,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
    if (heroRipple) {
      gsap.fromTo(
        heroRipple,
        { scale: 1, opacity: 0.7 },
        {
          scale: 1.8,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        }
      )
    }

    // 2. Animate the fluid abstract red waves across the viewport
    waveTransitionRef.current?.animateWaveTransition(
      // On Peak (t = 0.65s): Waves crest across the viewport
      () => {
        // Hero content lifts and fades behind the wave curtain
        if (heroContent) {
          gsap.to(heroContent, {
            y: -25,
            opacity: 0.2,
            duration: 0.5,
            ease: 'power2.inOut',
          })
        }
        if (heroNavbar) {
          gsap.to(heroNavbar, {
            y: -16,
            opacity: 0.2,
            duration: 0.45,
            ease: 'power2.inOut',
          })
        }

        // Viewport moves seamlessly to main portfolio section behind the cresting waves
        if (lenisRef.current) {
          lenisRef.current.scrollTo(portfolioEl, {
            duration: 0.85,
            easing: (t: number) =>
              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
            lock: true,
          })
        } else {
          portfolioEl.scrollIntoView({ behavior: 'smooth' })
        }

        // Prepare the first portfolio sheet to settle into view as waves part
        if (portfolioCover) {
          gsap.fromTo(
            portfolioCover,
            { y: 32, opacity: 0.65 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              delay: 0.2,
            }
          )
        }
      },
      // On Complete (t = 1.65s): Waves have swept off and dissolved cleanly
      () => {
        // Clean up temporary styles on hero so it remains pristine when scrolled back
        gsap.set([heroContent, heroNavbar, heroButton, heroArrow, heroRipple], {
          clearProps: 'all',
        })
        if (portfolioCover) {
          gsap.set(portfolioCover, { clearProps: 'all' })
        }
        isTransitioningRef.current = false
        setIsTransitioning(false)
      }
    )
  }, [])

  // Smooth scroll back to hero (invoked via Escape key or back trigger)
  const handleBackToHero = useCallback(() => {
    const heroEl = heroSectionRef.current
    if (!heroEl) return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(heroEl, {
        duration: 1.1,
        easing: (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      })
    } else {
      heroEl.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Smooth scroll to Contact sheet from hero Navbar
  const handleContactClick = useCallback(() => {
    const contactEl = document.querySelector<HTMLElement>('[data-sheet="contact"]')
    if (contactEl && lenisRef.current) {
      lenisRef.current.scrollTo(contactEl, {
        duration: 1.2,
        offset: -40,
      })
    } else if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = 'mailto:sujeelmarapatla@gmail.com'
    }
  }, [])

  return (
    <main className="relative w-full selection:bg-black selection:text-white">
      {/* Premium minimal rounded black custom cursor */}
      <CustomCursor />

      {/* Abstract Red Wave Cinematic Transition Layer */}
      <WaveTransition ref={waveTransitionRef} />

      {/* Hero Landing Section */}
      <section
        ref={heroSectionRef}
        id="hero-section"
        className="relative w-full h-screen min-h-screen overflow-hidden bg-[#f72c25]"
        style={{ backgroundColor: '#f72c25' }}
      >
        {/* Red character animation with 76 frames mouse-scrubbing */}
        <BackgroundVideo isActive={isHeroInView} />

        {/* Top Navbar with Sujeel_14_ & Get in touch */}
        <Navbar ref={heroNavbarRef} onContactClick={handleContactClick} />

        {/* Hero Content with Launch Portfolio trigger & focal ripple */}
        <HeroContent
          onLaunch={handleLaunch}
          isTransitioning={isTransitioning}
          contentRef={heroContentRef}
          buttonRef={heroButtonRef}
          arrowRef={heroArrowRef}
          rippleRef={heroRippleRef}
        />
      </section>

      {/* Main Portfolio Content Section */}
      <FolderTabPortfolio
        ref={portfolioSectionRef}
        onBack={handleBackToHero}
      />
    </main>
  )
}

export default App
