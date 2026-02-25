"use client"

import { useEffect, useRef, useState, useMemo } from "react"

type GridType = "6x4" | "8x8" | "8x3" | "4x6" | "3x8"

interface PixelImageProps {
  src: string
  alt?: string
  width?: number
  height?: number
  grid?: GridType
  customGrid?: { rows: number; cols: number }
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number
  maxAnimationDelay?: number
  colorRevealDelay?: number
  className?: string
}

const GRID_MAP: Record<GridType, { rows: number; cols: number }> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

export function PixelImage({
  src,
  alt = "",
  width = 1200,
  height = 800,
  grid = "8x8",
  customGrid,
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1500,
  className = "",
}: PixelImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showColor, setShowColor] = useState(!grayscaleAnimation)

  const { rows, cols } = customGrid || GRID_MAP[grid]

  const delays = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < rows * cols; i++) {
      arr.push(Math.random() * maxAnimationDelay)
    }
    return arr
  }, [rows, cols, maxAnimationDelay])

  // Preload image via JS Image object
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => setImageLoaded(true)
    img.src = src
  }, [src])

  // Intersection observer
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Color reveal timer
  useEffect(() => {
    if (!isVisible || !grayscaleAnimation || !imageLoaded) return
    const timer = setTimeout(() => setShowColor(true), colorRevealDelay)
    return () => clearTimeout(timer)
  }, [isVisible, grayscaleAnimation, colorRevealDelay, imageLoaded])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Real image underneath for sizing and fallback */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto block"
        style={{ visibility: imageLoaded ? "hidden" : "visible" }}
      />

      {/* Pixel grid overlay */}
      {imageLoaded && (
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => {
            const row = Math.floor(i / cols)
            const col = i % cols

            return (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity ${pixelFadeInDuration}ms ease-out`,
                  transitionDelay: isVisible ? `${delays[i]}ms` : "0ms",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: `${cols * 100}% ${rows * 100}%`,
                    backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
                    filter: showColor ? "grayscale(0)" : grayscaleAnimation ? "grayscale(1)" : "none",
                    transition: "filter 800ms ease-out",
                  }}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
