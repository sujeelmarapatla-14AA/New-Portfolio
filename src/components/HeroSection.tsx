import React, { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?'

const PILL_OPTIONS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
]

export const HeroSection: React.FC = () => {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, {
    speed: 38,
    startDelay: 600,
  })

  const [pillsVisible, setPillsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@mainframe.co')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section className="relative z-[1] w-full h-screen min-h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-xl relative z-10 w-full text-left">
        {/* 1. Blurred intro label */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6 text-black font-normal"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
          aria-hidden="true"
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </div>

        {/* 2. Typewriter text */}
        <p
          className="text-black mb-5 sm:mb-6 font-normal"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          <span>{displayed}</span>
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] cursor-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          className="flex flex-wrap gap-y-1 items-center"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {PILL_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 font-normal leading-normal select-none"
            >
              {option}
            </button>
          ))}

          {/* 1 outline pill button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            title={copied ? 'Copied to clipboard!' : 'Copy email address'}
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 font-normal leading-normal select-none relative group"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">
                hello@mainframe.co
              </span>
            </span>

            {/* 12x12 copy icon (two overlapping rectangles) */}
            {copied ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <polyline points="2.5 6.5 4.5 8.5 9.5 3.5" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <rect x="4" y="4" width="7" height="7" rx="1" />
                <path d="M2 8V2.5A1.5 1.5 0 0 1 3.5 1H8" />
              </svg>
            )}

            {copied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[11px] px-2 py-0.5 rounded shadow pointer-events-none">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
