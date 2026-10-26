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
  const ribbon1Ref = useRef<SVGPathElement | null>(null)
  const ribbon2Ref = useRef<SVGPathElement | null>(null)
  const ribbon3Ref = useRef<SVGPathElement | null>(null)
  const ribbon4Ref = useRef<SVGPathElement | null>(null)
  const ribbon5Ref = useRef<SVGPathElement | null>(null)
  const rim1Ref = useRef<SVGPathElement | null>(null)
  const rim2Ref = useRef<SVGPathElement | null>(null)
  const rim3Ref = useRef<SVGPathElement | null>(null)
  const tailRimRef = useRef<SVGPathElement | null>(null)

  useImperativeHandle(ref, () => ({
    animateWaveTransition: (onPeak, onComplete) => {
      const container = containerRef.current
      const svg = svgRef.current
      const r1 = ribbon1Ref.current
      const r2 = ribbon2Ref.current
      const r3 = ribbon3Ref.current
      const r4 = ribbon4Ref.current
      const r5 = ribbon5Ref.current
      const rim1 = rim1Ref.current
      const rim2 = rim2Ref.current
      const rim3 = rim3Ref.current
      const tailRim = tailRimRef.current

      if (!container || !svg) return null

      // Master Bouncy Silk Wave Timeline
      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(container, { visibility: 'visible', opacity: 1 })
        },
        onComplete: () => {
          gsap.set(container, { visibility: 'hidden', opacity: 0 })
          gsap.set([svg, r1, r2, r3, r4, r5, rim1, rim2, rim3, tailRim], { clearProps: 'all' })
          onComplete()
        },
      })

      // Initial state: The wave formation sits completely below the viewport
      // Stretched slightly vertically to prepare for the buoyant liquid upward surge
      gsap.set(container, { opacity: 1, visibility: 'visible' })
      gsap.set(svg, {
        yPercent: 110,
        scaleY: 1.14,
        scaleX: 0.94,
        transformOrigin: '50% 50%',
      })

      // 1. Upward Wave Surge (0.0s - 0.72s)
      // The wave's leading WAVY CRESTS roll up into view with buoyant liquid acceleration
      tl.to(
        svg,
        {
          yPercent: 0,
          duration: 0.72,
          ease: 'power2.inOut',
        },
        0
      )

      // Liquid Squash & Stretch:
      // As the wave surges up, it cushions into center with a juicy, bouncy rebound
      tl.to(
        svg,
        {
          scaleY: 0.93,
          scaleX: 1.05,
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

      // Individual Silk Ribbon Parallax Bounces:
      // Front ribbons spring ahead with fluid elasticity, creating real liquid surface tension
      if (r1) {
        tl.fromTo(
          r1,
          { y: 70, scaleY: 1.08 },
          { y: 0, scaleY: 1, duration: 0.72, ease: 'back.out(1.3)' },
          0
        )
      }

      if (r2) {
        tl.fromTo(
          r2,
          { y: 50 },
          { y: 0, duration: 0.72, ease: 'back.out(1.15)' },
          0.03
        )
      }

      if (r3) {
        tl.fromTo(
          r3,
          { y: 35 },
          { y: 0, duration: 0.72, ease: 'sine.inOut' },
          0.05
        )
      }

      if (r4) {
        tl.fromTo(
          r4,
          { y: 20 },
          { y: 0, duration: 0.72, ease: 'sine.inOut' },
          0.07
        )
      }

      // Specular rim light shimmer
      if (rim1) {
        tl.fromTo(
          rim1,
          { opacity: 0.3 },
          { opacity: 1, duration: 0.45, ease: 'power2.out' },
          0.12
        )
      }

      // 2. Viewport Handoff at Peak Coverage (t = 0.65s)
      // The wave formation completely covers the screen in rich 3D red silk ribbons.
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
      // The trailing WAVY EDGES roll smoothly up from the bottom of the screen,
      // revealing the main portfolio cleanly beneath!
      tl.to(
        svg,
        {
          yPercent: -112,
          scaleY: 1.1,
          scaleX: 0.95,
          duration: 0.85,
          ease: 'power2.inOut',
        },
        0.80
      )

      if (r1) {
        tl.to(
          r1,
          { y: -60, duration: 0.85, ease: 'power2.in' },
          0.80
        )
      }

      if (tailRim) {
        tl.fromTo(
          tailRim,
          { opacity: 0.3 },
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
          {/* Base Silk Background Gradient */}
          <linearGradient id="silk-base-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#240105" />
            <stop offset="25%" stopColor="#5c0610" />
            <stop offset="55%" stopColor="#a30e1d" />
            <stop offset="85%" stopColor="#54050e" />
            <stop offset="100%" stopColor="#170104" />
          </linearGradient>

          {/* Ribbon 1: Primary Upper Silk S-Curve Gradient */}
          <linearGradient id="silk-grad-1" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#4a0209" />
            <stop offset="20%" stopColor="#8c0a16" />
            <stop offset="48%" stopColor="#e6192d" />
            <stop offset="68%" stopColor="#ff2e44" />
            <stop offset="88%" stopColor="#ad101f" />
            <stop offset="100%" stopColor="#2e0206" />
          </linearGradient>

          {/* Ribbon 2: Cascading Silk Fold 2 Gradient */}
          <linearGradient id="silk-grad-2" x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#3b0207" />
            <stop offset="22%" stopColor="#7a0813" />
            <stop offset="52%" stopColor="#cf1527" />
            <stop offset="75%" stopColor="#f02438" />
            <stop offset="92%" stopColor="#910b17" />
            <stop offset="100%" stopColor="#240104" />
          </linearGradient>

          {/* Ribbon 3: Cascading Silk Fold 3 Gradient */}
          <linearGradient id="silk-grad-3" x1="5%" y1="0%" x2="95%" y2="100%">
            <stop offset="0%" stopColor="#2b0205" />
            <stop offset="25%" stopColor="#630710" />
            <stop offset="55%" stopColor="#b51222" />
            <stop offset="80%" stopColor="#d61a2d" />
            <stop offset="100%" stopColor="#1a0103" />
          </linearGradient>

          {/* Ribbon 4: Lower Shadow Fold Gradient */}
          <linearGradient id="silk-grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f0104" />
            <stop offset="30%" stopColor="#4f050d" />
            <stop offset="65%" stopColor="#940e1b" />
            <stop offset="100%" stopColor="#140102" />
          </linearGradient>

          {/* Ribbon 5: Deep Bottom Foundation Fold */}
          <linearGradient id="silk-grad-5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#140103" />
            <stop offset="35%" stopColor="#3d040a" />
            <stop offset="70%" stopColor="#6e0914" />
            <stop offset="100%" stopColor="#0d0002" />
          </linearGradient>

          {/* Luminous Specular Rim Light Gradient (Matches photo's bright glowing ribbon lip) */}
          <linearGradient id="silk-rim-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff5e72" stopOpacity="0.25" />
            <stop offset="18%" stopColor="#ffa6b4" stopOpacity="0.85" />
            <stop offset="42%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="65%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#ffa6b4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c40f22" stopOpacity="0.2" />
          </linearGradient>

          {/* Luminous Trailing Edge Rim Light Gradient */}
          <linearGradient id="silk-rim-tail" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff5e72" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#ffa6b4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#ff7a8d" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8a0c18" stopOpacity="0.2" />
          </linearGradient>

          {/* Deep Crevice Volumetric Drop Shadows (Creates the realistic 3D silk layering) */}
          <filter id="silk-shadow-deep" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-4" dy="22" stdDeviation="28" floodColor="#000000" floodOpacity="0.92" />
          </filter>
          <filter id="silk-shadow-mid" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="-2" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.8" />
          </filter>
          <filter id="silk-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 
          IMPORTANT: ZERO RECTANGLES / ZERO BOX SHAPES!
          All paths extend from x = -1000 to x = 3000 (wide beyond any screen width).
          Both the top (leading) and bottom (trailing) curves are pure, undulating S-curves.
          Side lines are thousands of pixels offscreen and can NEVER enter the viewport.
        */}

        {/* Layer 5: Foundation Deep Silk Fold (Bottom-most anchor) */}
        <path
          ref={ribbon5Ref}
          d="M-1000,740 C-200,740 200,1040 600,1040 C1050,1040 1300,490 1700,490 C2100,490 2500,690 3000,690 L3000,1850 C2500,1850 2100,1650 1700,1650 C1300,1650 1050,2100 600,2100 C200,2100 -200,1850 -1000,1850 Z"
          fill="url(#silk-grad-5)"
        />

        {/* Layer 4: Lower Shadow Fold 4 */}
        <path
          ref={ribbon4Ref}
          d="M-1000,660 C-200,660 200,960 600,960 C1050,960 1300,410 1700,410 C2100,410 2500,610 3000,610 L3000,1780 C2500,1780 2100,1580 1700,1580 C1300,1580 1050,2030 600,2030 C200,2030 -200,1780 -1000,1780 Z"
          fill="url(#silk-grad-4)"
          filter="url(#silk-shadow-deep)"
        />

        {/* Layer 3: Cascading Silk Fold 3 */}
        <path
          ref={ribbon3Ref}
          d="M-1000,580 C-200,580 200,880 600,880 C1050,880 1300,330 1700,330 C2100,330 2500,530 3000,530 L3000,1700 C2500,1700 2100,1500 1700,1500 C1300,1500 1050,1950 600,1950 C200,1950 -200,1700 -1000,1700 Z"
          fill="url(#silk-grad-3)"
          filter="url(#silk-shadow-deep)"
        />
        <path
          ref={rim3Ref}
          d="M-1000,580 C-200,580 200,880 600,880 C1050,880 1300,330 1700,330 C2100,330 2500,530 3000,530"
          stroke="url(#silk-rim-light)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#silk-glow)"
        />

        {/* Layer 2: Cascading Silk Fold 2 */}
        <path
          ref={ribbon2Ref}
          d="M-1000,500 C-200,500 200,800 600,800 C1050,800 1300,250 1700,250 C2100,250 2500,450 3000,450 L3000,1620 C2500,1620 2100,1420 1700,1420 C1300,1420 1050,1870 600,1870 C200,1870 -200,1620 -1000,1620 Z"
          fill="url(#silk-grad-2)"
          filter="url(#silk-shadow-deep)"
        />
        <path
          ref={rim2Ref}
          d="M-1000,500 C-200,500 200,800 600,800 C1050,800 1300,250 1700,250 C2100,250 2500,450 3000,450"
          stroke="url(#silk-rim-light)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#silk-glow)"
        />

        {/* Layer 1: Primary Forefront Silk Ribbon (Main S-Curve from reference photo) */}
        <path
          ref={ribbon1Ref}
          d="M-1000,420 C-200,420 200,720 600,720 C1050,720 1300,170 1700,170 C2100,170 2500,370 3000,370 L3000,1540 C2500,1540 2100,1340 1700,1340 C1300,1340 1050,1790 600,1790 C200,1790 -200,1540 -1000,1540 Z"
          fill="url(#silk-grad-1)"
          filter="url(#silk-shadow-deep)"
        />

        {/* Luminous Specular Rim Light along Leading Edge of Ribbon 1 */}
        <path
          ref={rim1Ref}
          d="M-1000,420 C-200,420 200,720 600,720 C1050,720 1300,170 1700,170 C2100,170 2500,370 3000,370"
          stroke="url(#silk-rim-light)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#silk-glow)"
        />

        {/* Luminous Specular Rim Light along Trailing Edge (Unveiling edge) */}
        <path
          ref={tailRimRef}
          d="M3000,1540 C2500,1540 2100,1340 1700,1340 C1300,1340 1050,1790 600,1790 C200,1790 -200,1540 -1000,1540"
          stroke="url(#silk-rim-tail)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#silk-glow)"
        />
      </svg>
    </div>
  )
})

WaveTransition.displayName = 'WaveTransition'

export default WaveTransition
