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
  const layerBaseRef = useRef<SVGPathElement | null>(null)
  const layerBackRef = useRef<SVGPathElement | null>(null)
  const layerMidRef = useRef<SVGPathElement | null>(null)
  const layerFrontRef = useRef<SVGPathElement | null>(null)
  const layerRibbonRef = useRef<SVGPathElement | null>(null)
  const layerCrestRef = useRef<SVGPathElement | null>(null)

  useImperativeHandle(ref, () => ({
    animateWaveTransition: (onPeak, onComplete) => {
      const container = containerRef.current
      const svg = svgRef.current
      const base = layerBaseRef.current
      const back = layerBackRef.current
      const mid = layerMidRef.current
      const front = layerFrontRef.current
      const ribbon = layerRibbonRef.current
      const crest = layerCrestRef.current

      if (!container || !svg) return null

      // Master Wave Transition Timeline
      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(container, { visibility: 'visible', opacity: 1 })
        },
        onComplete: () => {
          gsap.set(container, { visibility: 'hidden', opacity: 0 })
          // Clean up all transforms
          gsap.set([svg, base, back, mid, front, ribbon, crest], { clearProps: 'all' })
          onComplete()
        },
      })

      // Initial state: waves positioned offscreen toward the bottom-right
      gsap.set(svg, {
        xPercent: 32,
        yPercent: 62,
        scale: 1.15,
        rotation: -4,
        transformOrigin: '50% 50%',
      })
      gsap.set([back, mid, front, ribbon], {
        opacity: 0.95,
      })

      // Phase 1 (0.0s - 0.72s): Wave layers surge and sweep across viewport
      // Staggered easing creates liquid organic parallax between the silk curves
      tl.to(
        svg,
        {
          xPercent: 0,
          yPercent: 0,
          scale: 1.02,
          rotation: 0,
          duration: 0.72,
          ease: 'power2.inOut',
        },
        0
      )

      if (front) {
        tl.fromTo(
          front,
          { x: 60, y: 40 },
          { x: 0, y: 0, duration: 0.7, ease: 'power2.out' },
          0.02
        )
      }

      if (ribbon) {
        tl.fromTo(
          ribbon,
          { x: -50, y: 60, opacity: 0.6 },
          { x: 0, y: 0, opacity: 0.95, duration: 0.72, ease: 'power2.inOut' },
          0.04
        )
      }

      if (crest) {
        tl.fromTo(
          crest,
          { strokeDashoffset: 1200, opacity: 0.3 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          0.05
        )
      }

      // Midpoint trigger: waves are cresting across the viewport (full coverage)
      // Call onPeak so hero fades and Lenis scrolls viewport seamlessly to main portfolio
      tl.call(
        () => {
          onPeak()
        },
        [],
        0.65
      )

      // Phase 2 (0.85s - 1.58s): Waves gracefully sweep upward-left to reveal portfolio
      tl.to(
        svg,
        {
          xPercent: -35,
          yPercent: -68,
          scale: 1.12,
          rotation: 3,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0.85
      )

      if (ribbon) {
        tl.to(
          ribbon,
          { x: -80, y: -50, opacity: 0.7, duration: 0.7, ease: 'power2.in' },
          0.85
        )
      }

      // Phase 3 (1.45s - 1.65s): Smoothly dissolve the veil as main portfolio settles
      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.22,
          ease: 'power2.out',
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
        preserveAspectRatio="none"
        className="w-full h-full block will-change-transform"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Velvet Wine Gradient (Base & Back Wave) */}
          <linearGradient id="wave-grad-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#080204" />
            <stop offset="35%" stopColor="#2e0409" />
            <stop offset="70%" stopColor="#57060f" />
            <stop offset="100%" stopColor="#120205" />
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
            <stop offset="50%" stopColor="#b81222" />
            <stop offset="75%" stopColor="#db1c2f" />
            <stop offset="95%" stopColor="#45040a" />
          </linearGradient>

          {/* Radiant Scarlet & Ruby Foreground Wave Gradient */}
          <linearGradient id="wave-grad-front" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#290307" />
            <stop offset="22%" stopColor="#870a16" />
            <stop offset="48%" stopColor="#e3192d" />
            <stop offset="65%" stopColor="#f72c25" />
            <stop offset="85%" stopColor="#b31221" />
            <stop offset="100%" stopColor="#1f0205" />
          </linearGradient>

          {/* Upper Swirling Silk Ribbon Gradient */}
          <linearGradient id="wave-grad-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#300408" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#9c0d1c" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#f02436" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#780814" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1c0205" stopOpacity="0.75" />
          </linearGradient>

          {/* Luminous Wave Crest Highlight Gradient */}
          <linearGradient id="wave-grad-crest" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ff5e72" stopOpacity="0" />
            <stop offset="25%" stopColor="#ff7084" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="75%" stopColor="#ff475e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#b81222" stopOpacity="0" />
          </linearGradient>

          {/* Volumetric Drop Shadows for realistic fluid depth */}
          <filter id="wave-shadow-deep" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="16" stdDeviation="28" floodColor="#000000" floodOpacity="0.8" />
          </filter>
          <filter id="wave-shadow-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="#000000" floodOpacity="0.65" />
          </filter>
          <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Layer 0: Deep Handoff Bed (Ensures seamless background transition) */}
        <path
          ref={layerBaseRef}
          d="M-100,1250 C300,1050 650,1180 1100,900 C1550,620 1800,780 2050,480 L2050,1400 L-100,1400 Z"
          fill="url(#wave-grad-base)"
        />

        {/* Layer 1: Back Velvet Crimson Wave */}
        <path
          ref={layerBackRef}
          d="M-100,1180 C320,920 680,1080 1140,780 C1560,500 1820,680 2050,380 L2050,1400 L-100,1400 Z"
          fill="url(#wave-grad-back)"
          filter="url(#wave-shadow-deep)"
        />

        {/* Layer 2: Mid Rich Crimson Sinuous Wave */}
        <path
          ref={layerMidRef}
          d="M-100,1060 C360,780 720,960 1200,640 C1620,380 1860,540 2050,260 L2050,1400 L-100,1400 Z"
          fill="url(#wave-grad-mid)"
          filter="url(#wave-shadow-deep)"
        />

        {/* Layer 3: Upper Swirling Silk Ribbon (Volumetric diagonal fold) */}
        <path
          ref={layerRibbonRef}
          d="M-100,760 C380,500 780,820 1280,440 C1680,180 1900,320 2050,80 L2050,580 C1820,740 1500,560 1140,800 C740,1060 320,860 -100,1120 Z"
          fill="url(#wave-grad-ribbon)"
          filter="url(#wave-shadow-soft)"
        />

        {/* Layer 4: Foreground Radiant Scarlet & Ruby Wave */}
        <path
          ref={layerFrontRef}
          d="M-100,940 C320,620 680,840 1160,500 C1560,240 1820,400 2050,140 L2050,1400 L-100,1400 Z"
          fill="url(#wave-grad-front)"
          filter="url(#wave-shadow-deep)"
        />

        {/* Layer 5: Luminous Crest Edge Highlight Line */}
        <path
          ref={layerCrestRef}
          d="M-100,940 C320,620 680,840 1160,500 C1560,240 1820,400 2050,140"
          stroke="url(#wave-grad-crest)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#wave-glow)"
          strokeDasharray="2400"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  )
})

WaveTransition.displayName = 'WaveTransition'

export default WaveTransition
