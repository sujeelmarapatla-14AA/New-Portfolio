import React, { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BackgroundVideo } from './components/BackgroundVideo'
import { Navbar } from './components/Navbar'
import { HeroContent } from './components/HeroContent'
import { FolderTabPortfolio } from './components/FolderTabPortfolio'
import { CustomCursor } from './components/CustomCursor'

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

  // Cinematic Transition: Hero Launch Button -> Main Portfolio
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

    // Master Cinematic Transition Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Clear inline properties on completion to keep hero in pristine state when scrolling back
        gsap.set([heroContent, heroNavbar, heroButton, heroArrow, heroRipple], {
          clearProps: 'all',
        })
        gsap.set(portfolioCover, { clearProps: 'all' })
        isTransitioningRef.current = false
        setIsTransitioning(false)
      },
    })

    // Phase 1 (0.0s - 0.2s): Immediate tactile click response on Launch button
    if (heroButton) {
      tl.to(
        heroButton,
        {
          scale: 0.94,
          duration: 0.18,
          ease: 'power2.out',
        },
        0
      )
    }
    if (heroArrow) {
      tl.to(
        heroArrow,
        {
          x: 6,
          duration: 0.2,
          ease: 'power2.out',
        },
        0
      )
    }
    if (heroRipple) {
      tl.fromTo(
        heroRipple,
        { scale: 1, opacity: 0.7 },
        {
          scale: 1.8,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.02
      )
    }

    // Phase 2 (0.12s - 0.65s): Hero content gently gives way
    // Subtle lift and gentle fade to guide focus downward
    if (heroContent) {
      tl.to(
        heroContent,
        {
          y: -30,
          opacity: 0.35,
          duration: 0.55,
          ease: 'power2.inOut',
        },
        0.12
      )
    }
    if (heroNavbar) {
      tl.to(
        heroNavbar,
        {
          y: -18,
          opacity: 0.35,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        0.12
      )
    }

    // Phase 3 (0.15s - 1.25s): Synchronized Lenis camera glide into main portfolio
    tl.call(
      () => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(portfolioEl, {
            duration: 1.1,
            easing: (t: number) =>
              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
            lock: true,
          })
        } else {
          portfolioEl.scrollIntoView({ behavior: 'smooth' })
        }
      },
      [],
      0.15
    )

    // Phase 4 (0.65s - 1.25s): Portfolio content reveal and natural settle
    if (portfolioCover) {
      tl.fromTo(
        portfolioCover,
        { y: 36, opacity: 0.65 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.65
      )
    }
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
