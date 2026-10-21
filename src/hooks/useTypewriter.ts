import { useEffect, useState } from 'react'

interface UseTypewriterOptions {
  speed?: number
  startDelay?: number
}

interface UseTypewriterResult {
  displayed: string
  done: boolean
}

export function useTypewriter(
  text: string,
  options?: UseTypewriterOptions | number,
  legacyStartDelay?: number
): UseTypewriterResult {
  // Support both useTypewriter(text, { speed, startDelay }) and useTypewriter(text, speed, startDelay)
  let speed = 38
  let startDelay = 600

  if (typeof options === 'number') {
    speed = options
    if (typeof legacyStartDelay === 'number') {
      startDelay = legacyStartDelay
    }
  } else if (options) {
    if (typeof options.speed === 'number') speed = options.speed
    if (typeof options.startDelay === 'number') startDelay = options.startDelay
  }

  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    let intervalId: ReturnType<typeof setInterval> | null = null
    let charIndex = 0

    const delayTimeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (charIndex < text.length) {
          charIndex++
          setDisplayed(text.slice(0, charIndex))
          if (charIndex >= text.length) {
            setDone(true)
            if (intervalId) clearInterval(intervalId)
          }
        } else {
          setDone(true)
          if (intervalId) clearInterval(intervalId)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(delayTimeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}
