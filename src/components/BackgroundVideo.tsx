import React, { useEffect, useRef, useCallback } from 'react'

const TOTAL_FRAMES = 76
const SENSITIVITY = 0.8

export interface BackgroundVideoProps {
  isActive?: boolean
  canvasRef?: React.RefObject<HTMLCanvasElement | null>
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ isActive = true, canvasRef: externalCanvasRef }) => {
  const localCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasRef = externalCanvasRef || localCanvasRef
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameIndexRef = useRef<number>(0)
  const prevXRef = useRef<number | null>(null)

  // Draw frame on canvas matching `object-fit: cover; object-position: 70% center;`
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const images = framesRef.current
    const clampedIdx = Math.min(Math.max(0, Math.round(frameIdx)), TOTAL_FRAMES - 1)
    const img = images[clampedIdx]
    if (!img || !img.complete) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const displayWidth = window.innerWidth
    const displayHeight = window.innerHeight

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr
    }

    ctx.save()
    ctx.scale(dpr, dpr)

    const imgW = img.naturalWidth || 1920
    const imgH = img.naturalHeight || 1080

    const canvasRatio = displayWidth / displayHeight
    const imgRatio = imgW / imgH

    let renderW: number
    let renderH: number

    if (canvasRatio > imgRatio) {
      renderW = displayWidth * 1.15
      renderH = renderW / imgRatio
    } else {
      renderH = displayHeight * 1.08
      renderW = renderH * imgRatio
    }

    // Anchor character on the left so character is on the left third
    const targetCharX = displayWidth >= 1024 ? 0.22 : displayWidth >= 768 ? 0.28 : 0.35
    let x = displayWidth * targetCharX - renderW * 0.46
    if (x + renderW < displayWidth) {
      x = displayWidth - renderW
    }
    const y = (displayHeight - renderH) * 0.35

    ctx.drawImage(img, x, y, renderW, renderH)
    ctx.restore()
  }, [])

  // Preload all 76 character frames
  useEffect(() => {
    const images: HTMLImageElement[] = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const padded = String(i).padStart(3, '0')
      img.src = `/frames/ezgif-frame-${padded}.jpg`
      img.onload = () => {
        if (i === 1) {
          drawFrame(0)
        }
      }
      images.push(img)
    }
    framesRef.current = images

    const handleResize = () => {
      drawFrame(currentFrameIndexRef.current)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawFrame])

  // Scrubbing logic via mousemove and touchmove (active while hero is in view)
  useEffect(() => {
    if (!isActive) return

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX

      if (prevXRef.current === null) {
        prevXRef.current = currentX
        return
      }

      const delta = currentX - prevXRef.current
      prevXRef.current = currentX

      const frameOffset = (delta / window.innerWidth) * SENSITIVITY * TOTAL_FRAMES
      const nextIndex = Math.min(
        Math.max(0, currentFrameIndexRef.current + frameOffset),
        TOTAL_FRAMES - 1
      )
      currentFrameIndexRef.current = nextIndex
      drawFrame(nextIndex)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const currentX = e.touches[0].clientX
        if (prevXRef.current === null) {
          prevXRef.current = currentX
          return
        }
        const delta = currentX - prevXRef.current
        prevXRef.current = currentX

        const frameOffset = (delta / window.innerWidth) * SENSITIVITY * TOTAL_FRAMES
        const nextIndex = Math.min(
          Math.max(0, currentFrameIndexRef.current + frameOffset),
          TOTAL_FRAMES - 1
        )
        currentFrameIndexRef.current = nextIndex
        drawFrame(nextIndex)
      }
    }

    const handleMouseLeave = () => {
      prevXRef.current = null
    }

    const handleTouchEnd = () => {
      prevXRef.current = null
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [drawFrame, isActive])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  )
}
