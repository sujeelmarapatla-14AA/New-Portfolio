import { forwardRef, useImperativeHandle, useRef } from 'react'
import gsap from 'gsap'

export interface WaveTransitionHandle {
  animateWaveTransition: (
    onPeak: () => void,
    onComplete: () => void
  ) => gsap.core.Timeline | null
}

export const WaveTransition = forwardRef<WaveTransitionHandle, {}>((_props, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const layerAmbientRef = useRef<SVGRectElement | null>(null)
  const layerDeepBackRef = useRef<SVGPathElement | null>(null)
  const layerMidRef = useRef<SVGPathElement | null>(null)
  const layerFrontRef = useRef<SVGPathElement | null>(null)
  const layerSilkFoldRef = useRef<SVGPathElement | null>(null)
  const layerCrestRef = useRef<SVGPathElement | null>(null)

  useImperativeHandle(ref, () => ({
    animateWaveTransition: (onPeak, onComplete) => {
      const container = containerRef.current
      const svg = svgRef.current
      const ambient = layerAmbientRef.current
      const deepBack = layerDeepBackRef.current
      const mid = layerMidRef.current
      const front = layerFrontRef.current
      const silkFold = layerSilkFoldRef.current
      const crest = layerCrestRef.current

      if (!container || !svg) return null

      // Master Wave Transition Timeline with continuous fluid momentum
      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(container, { visibility: 'visible', opacity: 1 })
        },
        onComplete: () => {
          gsap.set(container, { visibility: 'hidden', opacity: 0 })
          // Clean up all transforms
          gsap.set([svg, ambient, deepBack, mid, front, silkFold, crest], { clearProps: 'all' })
          onComplete()
        },
      })

      // Initial state: wave container starts with smooth opacity
      gsap.set(container, { opacity: 0, visibility: 'visible' })

      // 1. Container fade-in and smooth out
      tl.to(container, {
        opacity: 1,
        duration: 0.28,
        ease: 'sine.out',
      }, 0)

      // 2. Continuous, unbroken fluid sweep across the entire viewport
      // By using a single fromTo with power2.inOut, there is ZERO stutter or pause.
      // The wave accelerates into view, glides through peak coverage, and decelerates cleanly off.
      tl.fromTo(
        svg,
        {
          xPercent: 26,
          yPercent: 46,
          scale: 1.15,
          rotation: -3,
          transformOrigin: '50% 50%',
        },
        {
          xPercent: -26,
          yPercent: -48,
          scale: 1.12,
          rotation: 3,
          duration: 1.75,
          ease: 'power2.inOut',
        },
        0
      )

      // 3. Ambient Velvet Crimson Veil:
      // Fades in to ensure 100% full backdrop coverage at peak, completely hiding any scroll seam,
      // then dissolves gracefully as the waves sweep off.
      if (ambient) {
        tl.fromTo(
          ambient,
          { opacity: 0 },
          {
            opacity: 0.96,
            duration: 0.58,
            ease: 'sine.inOut',
          },
          0.1
        )
        tl.to(
          ambient,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'sine.inOut',
          },
          1.15
        )
      }

      // 4. Subtle liquid layer parallax between the silk ribbons
      if (front) {
        tl.fromTo(
          front,
          { x: 50, y: 35 },
          { x: -50, y: -35, duration: 1.75, ease: 'sine.inOut' },
          0
        )
      }

      if (silkFold) {
        tl.fromTo(
          silkFold,
          { x: -40, y: 50, opacity: 0.7 },
          { x: 40, y: -40, opacity: 0.95, duration: 1.75, ease: 'sine.inOut' },
          0
        )
      }

      if (mid) {
        tl.fromTo(
          mid,
          { x: 30, y: 20 },
          { x: -30, y: -20, duration: 1.75, ease: 'sine.inOut' },
          0
        )
      }

      if (crest) {
        tl.fromTo(
          crest,
          { opacity: 0.4 },
          { opacity: 1, duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: 1 },
          0.2
        )
      }

      // 5. Peak coverage trigger at t = 0.68s:
      // The wave and ambient veil have fully draped the screen in rich red and velvet dark tones.
      // Trigger onPeak so Lenis smoothly scrolls the viewport to main portfolio invisibly behind the waves.
      tl.call(
        () => {
          onPeak()
        },
        [],
        0.68
      )

      // 6. Smooth container fade-out as the parting waves finish revealing the main portfolio
      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'sine.inOut',
        },
        1.45
      )

      return tl
    },
  }))

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[100]"
      style={{
        visibility: 'hidden',
        opacity: 0,
      }}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block will-change-transform"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ambient Deep Crimson & Charcoal Velvet Veil Gradient */}
          <linearGradient id="wave-ambient-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#151112" />
            <stop offset="35%" stopColor="#300408" />
            <stop offset="68%" stopColor="#6e0813" />
            <stop offset="100%" stopColor="#151112" />
          </linearGradient>

          {/* Deep Velvet Wine Gradient (Base & Back Wave) */}
          <linearGradient id="wave-grad-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#080204" />
            <stop offset="30%" stopColor="#2e0409" />
            <stop offset="65%" stopColor="#5c0711" />
            <stop offset="100%" stopColor="#140205" />
          </linearGradient>

          {/* Deep Crimson Silk Wave Gradient (Mid Wave) */}
          <linearGradient id="wave-grad-back" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d0309" />
            <stop offset="25%" stopColor="#7a0814" />
            <stop offset="55%" stopColor="#a80f1e" />
            <stop offset="85%" stopColor="#52050e" />
            <stop offset="100%" stopColor="#0f0204" />
          </linearGradient>

          {/* Rich Sinuous Crimson Wave Gradient */}
          <linearGradient id="wave-grad-mid" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#1a0205" />
            <stop offset="20%" stopColor="#6e0712" />
            <stop offset="48%" stopColor="#b81222" />
            <stop offset="75%" stopColor="#db1c2f" />
            <stop offset="95%" stopColor="#45040a" />
          </linearGradient>

          {/* Radiant Scarlet & Ruby Foreground Wave Gradient */}
          <linearGradient id="wave-grad-front" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#290307" />
            <stop offset="20%" stopColor="#870a16" />
            <stop offset="48%" stopColor="#e3192d" />
            <stop offset="68%" stopColor="#f72c25" />
            <stop offset="88%" stopColor="#b31221" />
            <stop offset="100%" stopColor="#1f0205" />
          </linearGradient>

          {/* Upper Swirling Silk Ribbon Gradient */}
          <linearGradient id="wave-grad-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#300408" stopOpacity="0.85" />
            <stop offset="28%" stopColor="#9c0d1c" stopOpacity="0.95" />
            <stop offset="58%" stopColor="#f02436" stopOpacity="0.95" />
            <stop offset="82%" stopColor="#780814" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1c0205" stopOpacity="0.8" />
          </linearGradient>

          {/* Luminous Wave Crest Highlight Gradient */}
          <linearGradient id="wave-grad-crest" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ff5e72" stopOpacity="0" />
            <stop offset="25%" stopColor="#ff7084" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#ff475e" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#b81222" stopOpacity="0" />
          </linearGradient>

          {/* Volumetric Drop Shadows for realistic fluid depth */}
          <filter id="wave-shadow-deep" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="18" stdDeviation="30" floodColor="#000000" floodOpacity="0.85" />
          </filter>
          <filter id="wave-shadow-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#000000" floodOpacity="0.7" />
          </filter>
          <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Layer 0: Ambient Deep Crimson Veil (Guarantees zero background gap during scroll) */}
        <rect
          ref={layerAmbientRef}
          width="1920"
          height="1080"
          fill="url(#wave-ambient-grad)"
          opacity="0"
        />

        {/* Layer 1: Deep Wine Under-Wave Bed */}
        <path
          ref={layerDeepBackRef}
          d="M-200,1280 C250,950 650,1120 1100,820 C1550,520 1850,700 2150,380 L2150,1500 L-200,1500 Z"
          fill="url(#wave-grad-base)"
        />

        {/* Layer 2: Back Velvet Crimson Wave */}
        <path
          d="M-200,1180 C280,880 680,1050 1140,740 C1580,440 1860,620 2150,300 L2150,1500 L-200,1500 Z"
          fill="url(#wave-grad-back)"
          filter="url(#wave-shadow-deep)"
        />

        {/* Layer 3: Mid Rich Crimson Sinuous Wave */}
        <path
          ref={layerMidRef}
          d="M-200,1040 C320,740 720,920 1200,580 C1620,300 1880,480 2150,180 L2150,1500 L-200,1500 Z"
          fill="url(#wave-grad-mid)"
          filter="url(#wave-shadow-deep)"
        />

        {/* Layer 4: Upper Swirling Silk Ribbon (Volumetric diagonal fold) */}
        <path
          ref={layerSilkFoldRef}
          d="M-200,720 C360,440 780,780 1280,380 C1680,120 1920,260 2150,20 L2150,520 C1820,700 1500,520 1140,760 C740,1020 320,820 -200,1080 Z"
          fill="url(#wave-grad-ribbon)"
          filter="url(#wave-shadow-soft)"
        />

        {/* Layer 5: Foreground Radiant Scarlet & Ruby Wave */}
        <path
          ref={layerFrontRef}
          d="M-200,900 C300,560 680,780 1160,420 C1580,140 1840,320 2150,40 L2150,1500 L-200,1500 Z"
          fill="url(#wave-grad-front)"
          filter="url(#wave-shadow-deep)"
        />

        {/* Layer 6: Luminous Crest Edge Highlight Line */}
        <path
          ref={layerCrestRef}
          d="M-200,900 C300,560 680,780 1160,420 C1580,140 1840,320 2150,40"
          stroke="url(#wave-grad-crest)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#wave-glow)"
        />
      </svg>
    </div>
  )
})

WaveTransition.displayName = 'WaveTransition'

export default WaveTransition
