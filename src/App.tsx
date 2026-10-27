import React, { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BackgroundVideo } from './components/BackgroundVideo'
import { Navbar } from './components/Navbar'
import { HeroContent } from './components/HeroContent'
import { FolderTabPortfolio } from './components/FolderTabPortfolio'
import { CustomCursor } from './components/CustomCursor'
import SweepPageTransition from './components/ui/SweepPageTransition'

gsap.registerPlugin(ScrollTrigger)

export const App: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const portfolioSectionRef = useRef<HTMLDivElement | null>(null)
  const heroNavbarRef = useRef<HTMLElement | null>(null)
  const heroContentRef = useRef<HTMLDivElement | null>(null)
  const heroButtonRef = useRef<HTMLButtonElement | null>(null)
  const heroArrowRef = useRef<SVGSVGElement | null>(null)
  const heroRippleRef = useRef<HTMLSpanElement | null>(null)

  const lenisRef = useRef<Lenis | null>(null)
  const isTransitioningRef = useRef<boolean>(false)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [isHeroInView, setIsHeroInView] = useState<boolean>(true)
  const [sweepTrigger, setSweepTrigger] = useState<number>(0)

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

  // Great UI Sweep Page Transition: Hero Launch Button -> Main Portfolio
  const handleLaunch = useCallback(() => {
    if (isTransitioningRef.current) return
    const portfolioEl = portfolioSectionRef.current
    if (!portfolioEl) return

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

    // 1. Immediate tactile click feedback on the Launch button
    if (heroButton) {
      gsap.to(heroButton, {
        scale: 0.94,
        duration: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      })
    }
    if (heroArrow) {
      gsap.to(heroArrow, {
        x: 6,
        duration: 0.14,
        ease: 'power2.out',
      })
    }
    if (heroRipple) {
      gsap.fromTo(
        heroRipple,
        { scale: 0.9, opacity: 0.8 },
        {
          scale: 1.85,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
        }
      )
    }

    // 2. Trigger Great UI Sweep Page Transition
    setSweepTrigger((prev) => prev + 1)
  }, [])

  // Called when all sweep sheets have fully covered the viewport
  const handleViewSwap = useCallback(() => {
    const portfolioEl = portfolioSectionRef.current
    if (!portfolioEl) return

    // Seamlessly position viewport at main portfolio while screen is fully covered by sweep sheets
    if (lenisRef.current) {
      lenisRef.current.scrollTo(portfolioEl, {
        immediate: true,
      })
    } else {
      portfolioEl.scrollIntoView()
    }

    // Clear temporary button transforms
    if (heroButtonRef.current) {
      gsap.set(heroButtonRef.current, { clearProps: 'all' })
    }
    if (heroArrowRef.current) {
      gsap.set(heroArrowRef.current, { clearProps: 'all' })
    }

    // Restore interaction flag after exit animation finishes
    setTimeout(() => {
      isTransitioningRef.current = false
      setIsTransitioning(false)
    }, 480)
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

      {/* Great UI Sweep Page Transition Component (Fast, responsive sweep) */}
      <SweepPageTransition
        trigger={sweepTrigger}
        onViewSwap={handleViewSwap}
        colors={["#f72c25", "#c52a35", "#800a16", "#151112"]}
        direction="bottom"
        exitOpposite={true}
        duration={0.36}
        staggerDelay={0.035}
        ease={[0.76, 0, 0.24, 1]}
      />

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
