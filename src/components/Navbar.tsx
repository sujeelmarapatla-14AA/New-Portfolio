import React from 'react'

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center select-none">
      {/* Logo (left) */}
      <div className="flex flex-row items-center gap-3">
        <a
          href="/"
          className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium leading-none"
          style={{ fontFamily: 'var(--font-heading)' }}
          aria-label="Sujeel_14_ Home"
        >
          Sujeel_14_
        </a>
        <span
          className="text-[25px] sm:text-[30px] text-black select-none leading-none inline-flex items-center"
          style={{ letterSpacing: '-0.02em' }}
          aria-hidden="true"
        >
          ✳︎
        </span>
      </div>

      {/* Get in touch button-like text (top right) */}
      <div className="flex items-center">
        <a
          href="mailto:contact@sujeel.me"
          className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 text-[14px] sm:text-[16px] text-black bg-white/90 hover:bg-black hover:text-white border border-black/15 rounded-full transition-all duration-200 tracking-tight font-medium shadow-sm hover:shadow active:scale-95 cursor-pointer backdrop-blur-sm"
          aria-label="Get in touch"
        >
          Get in touch
        </a>
      </div>
    </header>
  )
}
