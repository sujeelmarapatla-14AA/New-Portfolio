import React from 'react'

interface HeroContentProps {
  onLaunch: () => void
}

export const HeroContent: React.FC<HeroContentProps> = ({ onLaunch }) => {
  return (
    <section className="relative z-10 w-full h-screen min-h-screen flex flex-col justify-end items-end pl-4 pr-5 sm:pr-8 md:pr-10 lg:pr-12 xl:pr-14 pb-10 sm:pb-14 md:pb-16 lg:pb-20 pointer-events-none select-none">
      <div className="w-full max-w-[410px] sm:max-w-[440px] lg:max-w-[460px] text-left pointer-events-auto">
        {/* Eyebrow */}
        <div
          className="text-[12px] sm:text-[13px] font-semibold tracking-[0.24em] text-black/85 uppercase mb-3 sm:mb-4 select-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          HELLO, I&apos;M SUJEEL
        </div>

        {/* Heading */}
        <h1
          className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[56px] font-medium leading-[1.08] tracking-tight text-black mb-4 sm:mb-5 select-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Creative mind.
          <br />
          Developer at heart.
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] sm:text-[17px] md:text-[18px] font-normal leading-[1.42] text-black/85 max-w-[420px] mb-6 sm:mb-8 select-none">
          I build thoughtful digital experiences through code, design, and motion.
        </p>

        {/* Launch Portfolio Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onLaunch}
            className="inline-flex items-center gap-3 bg-white text-black px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-[14px] sm:text-[15px] font-medium hover:bg-black hover:text-white transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer select-none group"
            aria-label="Launch Portfolio"
          >
            <span>Launch Portfolio</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <line x1="3" y1="8" x2="13" y2="8" />
              <polyline points="9 4 13 8 9 12" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
