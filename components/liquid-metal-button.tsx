"use client"

import { useRef, useEffect, useState } from "react"

interface LiquidMetalButtonProps {
  label: string
  onClick: () => void
}

export function LiquidMetalButton({ label, onClick }: LiquidMetalButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    const animate = () => {
      timeRef.current += isHovered ? 0.03 : 0.015
      const time = timeRef.current

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      
      if (isPressed) {
        gradient.addColorStop(0, "#1a1a1a")
        gradient.addColorStop(0.5, "#2d2d2d")
        gradient.addColorStop(1, "#1a1a1a")
      } else if (isHovered) {
        gradient.addColorStop(0, "#3d3d3d")
        gradient.addColorStop(0.3, "#4a4a4a")
        gradient.addColorStop(0.5, "#5a5a5a")
        gradient.addColorStop(0.7, "#4a4a4a")
        gradient.addColorStop(1, "#3d3d3d")
      } else {
        gradient.addColorStop(0, "#2a2a2a")
        gradient.addColorStop(0.3, "#3a3a3a")
        gradient.addColorStop(0.5, "#454545")
        gradient.addColorStop(0.7, "#3a3a3a")
        gradient.addColorStop(1, "#2a2a2a")
      }

      // Draw rounded rectangle
      const radius = 30
      ctx.beginPath()
      ctx.moveTo(radius, 0)
      ctx.lineTo(width - radius, 0)
      ctx.quadraticCurveTo(width, 0, width, radius)
      ctx.lineTo(width, height - radius)
      ctx.quadraticCurveTo(width, height, width - radius, height)
      ctx.lineTo(radius, height)
      ctx.quadraticCurveTo(0, height, 0, height - radius)
      ctx.lineTo(0, radius)
      ctx.quadraticCurveTo(0, 0, radius, 0)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      // Liquid metal effect - moving highlights
      const highlightCount = 3
      for (let i = 0; i < highlightCount; i++) {
        const phase = (time + i * 2) % (Math.PI * 2)
        const x = width * 0.2 + Math.sin(phase) * width * 0.3
        const y = height * 0.3 + Math.cos(phase * 0.7) * height * 0.2
        
        const highlightGradient = ctx.createRadialGradient(x, y, 0, x, y, 80)
        highlightGradient.addColorStop(0, isHovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)")
        highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        
        ctx.fillStyle = highlightGradient
        ctx.fill()
      }

      // Top edge highlight
      const topHighlight = ctx.createLinearGradient(0, 0, 0, 20)
      topHighlight.addColorStop(0, isHovered ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.15)")
      topHighlight.addColorStop(1, "rgba(255, 255, 255, 0)")
      
      ctx.beginPath()
      ctx.moveTo(radius, 0)
      ctx.lineTo(width - radius, 0)
      ctx.quadraticCurveTo(width, 0, width, radius)
      ctx.lineTo(width, 20)
      ctx.lineTo(0, 20)
      ctx.lineTo(0, radius)
      ctx.quadraticCurveTo(0, 0, radius, 0)
      ctx.closePath()
      ctx.fillStyle = topHighlight
      ctx.fill()

      // Inner shadow at bottom
      const bottomShadow = ctx.createLinearGradient(0, height - 20, 0, height)
      bottomShadow.addColorStop(0, "rgba(0, 0, 0, 0)")
      bottomShadow.addColorStop(1, "rgba(0, 0, 0, 0.3)")
      
      ctx.beginPath()
      ctx.moveTo(0, height - 20)
      ctx.lineTo(width, height - 20)
      ctx.lineTo(width, height - radius)
      ctx.quadraticCurveTo(width, height, width - radius, height)
      ctx.lineTo(radius, height)
      ctx.quadraticCurveTo(0, height, 0, height - radius)
      ctx.closePath()
      ctx.fillStyle = bottomShadow
      ctx.fill()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, isPressed])

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className="relative group focus:outline-none"
      style={{
        transform: isPressed ? "scale(0.98) translateY(2px)" : isHovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.15s ease-out"
      }}
    >
      {/* Canvas for liquid metal effect */}
      <canvas
        ref={canvasRef}
        width={200}
        height={60}
        className="rounded-full"
        style={{
          boxShadow: isPressed 
            ? "inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)"
            : isHovered
            ? "0 8px 30px rgba(0,0,0,0.4), 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 4px 15px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
      />
      
      {/* Text overlay */}
      <span 
        className="absolute inset-0 flex items-center justify-center text-lg font-semibold tracking-wide pointer-events-none"
        style={{
          color: isPressed ? "#888" : isHovered ? "#fff" : "#ccc",
          textShadow: isHovered ? "0 0 10px rgba(255,255,255,0.3)" : "none",
          transition: "color 0.15s ease-out, text-shadow 0.15s ease-out"
        }}
      >
        {label}
      </span>
    </button>
  )
}
