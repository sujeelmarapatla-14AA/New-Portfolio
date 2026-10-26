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
  const layerDeepBackRef = useRef<SVGPathElement | null>(null)
  const layerMidRef = useRef<SVGPathElement | null>(null)
  const layerFrontRef = useRef<SVGPathElement | null>(null)
  const layerSilkFoldRef = useRef<SVGPathElement | null>(null)
  const layerCrestRef = useRef<SVGPathElement | null>(null)
  const layerTailCrestRef = useRef<SVGPathElement | null>(null)

  useImperativeHandle(ref, () => ({
    animateWaveTransition: (onPeak, onComplete) => {
      const container = containerRef.current
      const svg = svgRef.current
      const deepBack = layerDeepBackRef.current
      const mid = layerMidRef.current
      const front = layerFrontRef.current
      const silkFold = layerSilkFoldRef.current
      const crest = layerCrestRef.current
      const tailCrest = layerTailCrestRef.current

      if (!container || !svg) return null

      // Master Bouncy Wavy Transition Timeline
      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(container, { visibility: 'visible', opacity: 1 })
        },
        onComplete: () => {
          gsap.set(container, { visibility: 'hidden', opacity: 0 })
          // Clean up all transforms
          gsap.set([svg, deepBack, mid, front, silkFold, crest, tailCrest], { clearProps: 'all' })
          onComplete()
        },
      })

      // Initial state: Wave sits completely below viewport (yPercent: 105)
      // Stretched slightly vertically to prepare for liquid upward surge
      gsap.set(container, { opacity: 1, visibility: 'visible' })
      gsap.set(svg, {
        yPercent: 105,
        xPercent: 0,
        scaleY: 1.1,
        scaleX: 0.95,
        rotation: -1.5,
        transformOrigin: '50% 50%',
      })

      // 1. Upward Wave Surge (0.0s - 0.72s)
      // The wave's leading WAVY CREST rolls up into view with buoyant liquid acceleration
      tl.to(
        svg,
        {
          yPercent: 0,
          rotation: 0,
          duration: 0.72,
          ease: 'power2.inOut',
        },
        0
      )

      // Liquid Squash & Stretch:
      // As the wave surges up, it cushions into peak center with a juicy bouncy rebound
      tl.to(
        svg,
        {
          scaleY: 0.94,
          scaleX: 1.04,
          duration: 0.38,
          ease: 'power2.out',
        },
        0.34
      )
      tl.to(
        svg,
        {
          scaleY: 1.02,
          scaleX: 0.99,
          duration: 0.28,
          ease: 'sine.inOut',
        },
        0.72
      )

      // Layer Parallax Bounces (Front wave springs slightly ahead with fluid elasticity)
      if (front) {
        tl.fromTo(
          front,
          { y: 60, scaleY: 1.06 },
          { y: 0, scaleY: 1, duration: 0.72, ease: 'back.out(1.2)' },
          0
        )
      }

      if (mid) {
        tl.fromTo(
          mid,
          { y: 40 },
          { y: 0, duration: 0.72, ease: 'sine.inOut' },
          0.04
        )
      }

      if (silkFold) {
        tl.fromTo(
          silkFold,
          { x: -35, y: 50, opacity: 0.75 },
          { x: 0, y: 0, opacity: 0.95, duration: 0.72, ease: 'power2.out' },
          0.02
        )
      }

      if (crest) {
        tl.fromTo(
          crest,
          { opacity: 0.3 },
          { opacity: 1, duration: 0.45, ease: 'power2.out' },
          0.15
        )
      }

      // 2. Viewport Handoff at Peak Coverage (t = 0.65s)
      // The wave body covers the viewport completely with its undulating silk crimson curves.
      // Trigger onPeak so Lenis smoothly scrolls the viewport to main portfolio invisibly behind the wave.
      tl.call(
        () => {
          onPeak()
        },
        [],
        0.65
      )

      // 3. Fluid Wave Exit & Reveal (0.80s - 1.65s)
      // The wave continues upward with bouncy momentum.
      // The trailing WAVY EDGE rolls smoothly up from the bottom of the screen,
      // uncovering the main portfolio cleanly beneath!
      tl.to(
        svg,
        {
          yPercent: -108,
          scaleY: 1.08,
          scaleX: 0.96,
          rotation: 1.5,
          duration: 0.85,
          ease: 'power2.inOut',
        },
        0.80
      )

      if (front) {
        tl.to(
          front,
          { y: -50, duration: 0.85, ease: 'power2.in' },
          0.80
        )
      }

      if (tailCrest) {
        tl.fromTo(
          tailCrest,
          { opacity: 0.4 },
          { opacity: 1, duration: 0.45, ease: 'sine.inOut' },
          0.82
        )
      }

      // 4. Clean Dissolve at the Very End (1.50s - 1.70s)
      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.22,
          ease: 'sine.inOut',
        },
        1.48
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
        viewBox="0 0 1920 1800"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block will-change-transform"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Velvet Wine Gradient (Base & Back Wave) */}
          <linearGradient id="wave-grad-deep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#080204" />
            <stop offset="28%" stopColor="#2b0308" />
            <stop offset="60%" stopColor="#570610" />
            <stop offset="100%" stopColor="#120205" />
          </linearGradient>

          {/* Deep Crimson Silk Wave Gradient (Mid Wave) */}
          <linearGradient id="wave-grad-mid" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#240306" />
            <stop offset="22%" stopColor="#690812" />
            <stop offset="52%" stopColor="#aa0f1f" />
            <stop offset="82%" stopColor="#630711" />
            <stop offset="100%" stopColor="#1a0205" />
          </linearGradient>

          {/* Radiant Scarlet & Ruby Foreground Wave Gradient */}
          <linearGradient id="wave-grad-front" x1="5%" y1="15%" x2="95%" y2="85%">
            <stop offset="0%" stopColor="#290307" />
            <stop offset="18%" stopColor="#7d0a15" />
            <stop offset="46%" stopColor="#dd182b" />
            <stop offset="66%" stopColor="#f72c25" />
            <stop offset="86%" stopColor="#b31221" />
            <stop offset="100%" stopColor="#240306" />
          </linearGradient>

          {/* Upper Swirling Silk Ribbon Gradient (3D Fold) */}
          <linearGradient id="wave-grad-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b0409" stopOpacity="0.85" />
            <stop offset="28%" stopColor="#9e0e1e" stopOpacity="0.95" />
            <stop offset="58%" stopColor="#f22638" stopOpacity="0.95" />
            <stop offset="82%" stopColor="#7a0815" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1c0205" stopOpacity="0.8" />
          </linearGradient>

          {/* Luminous Leading Wave Crest Highlight Line */}
          <linearGradient id="wave-grad-crest" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ff5e72" stopOpacity="0" />
            <stop offset="22%" stopColor="#ff7084" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="78%" stopColor="#ff475e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b81222" stopOpacity="0" />
          </linearGradient>

          {/* Luminous Trailing Wave Edge Highlight Line */}
          <linearGradient id="wave-grad-tail" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#ff5e72" stopOpacity="0" />
            <stop offset="25%" stopColor="#ff7084" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#ff475e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8a0c18" stopOpacity="0" />
          </linearGradient>

          {/* Volumetric Drop Shadows for rich 3D silk depth */}
          <filter id="wave-shadow-deep" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="20" stdDeviation="32" floodColor="#000000" floodOpacity="0.88" />
          </filter>
          <filter id="wave-shadow-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="14" stdDeviation="22" floodColor="#000000" floodOpacity="0.72" />
          </filter>
          <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 
          IMPORTANT: ZERO BOX / RECTANGLE SHAPES!
          Every single path has undulating, sinuous WAVY EDGES on BOTH the top (leading) and bottom (trailing) sides.
        */}

        {/* Layer 1: Back Velvet Crimson Sinuous Wave Band */}
        <path
          ref={layerDeepBackRef}
          d="M-100,360 C280,160 620,480 960,240 C1300,20 1640,360 2020,140 L2020,1500 C1640,1720 1300,1380 960,1600 C620,1820 280,1500 -100,1680 Z"
          fill="url(#wave-grad-deep)"
          filter="url(#wave-shadow-deep)"
        />

        {/* Layer 2: Mid Rich Crimson Flowing Ribbon Wave */}
        <path
          ref={layerMidRef}
          d="M-100,420 C340,200 700,520 1060,280 C1380,60 1680,400 2020,190 L2020,1550 C1680,1760 1380,1420 1060,1650 C700,1860 340,1540 -100,1720 Z"
          fill="url(#wave-grad-mid)"
          filter="url(#wave-shadow-deep)"
        />

        {/* Layer 3: Upper Swirling Silk Fold Ribbon (Diagonal 3D Wave Accent) */}
        <path
          ref={layerSilkFoldRef}
          d="M-100,520 C320,260 750,620 1200,300 C1620,40 1860,220 2020,20 L2020,240 C1860,440 1620,260 1200,520 C750,840 320,480 -100,740 Z"
          fill="url(#wave-grad-ribbon)"
          filter="url(#wave-shadow-soft)"
        />

        {/* Layer 4: Foreground Radiant Scarlet Wave (Volumetric Sinuous Band) */}
        <path
          ref={layerFrontRef}
          d="M-100,300 C260,80 600,420 940,160 C1280,-80 1620,280 2020,80 L2020,1440 C1620,1660 1280,1320 940,1540 C600,1760 260,1420 -100,1620 Z"
          fill="url(#wave-grad-front)"
          filter="url(#wave-shadow-deep)"
        />

        {/* Layer 5: Glowing Specular Leading Wave Crest Line */}
        <path
          ref={layerCrestRef}
          d="M-100,300 C260,80 600,420 940,160 C1280,-80 1620,280 2020,80"
          stroke="url(#wave-grad-crest)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#wave-glow)"
        />

        {/* Layer 6: Glowing Specular Trailing Wave Edge Line */}
        <path
          ref={layerTailCrestRef}
          d="M2020,1440 C1620,1660 1280,1320 940,1540 C600,1760 260,1420 -100,1620"
          stroke="url(#wave-grad-tail)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#wave-glow)"
        />
      </svg>
    </div>
  )
})

WaveTransition.displayName = 'WaveTransition'

export default WaveTransition
