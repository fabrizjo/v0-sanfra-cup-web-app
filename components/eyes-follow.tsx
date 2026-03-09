"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function EyesFollow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Normalize and limit movement
      const maxMove = 15
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const scale = Math.min(distance / 300, 1)
      
      const angle = Math.atan2(deltaY, deltaX)
      const x = Math.cos(angle) * maxMove * scale
      const y = Math.sin(angle) * maxMove * scale

      setEyeOffset({ x, y })

      // Show text when looking down
      setShowText(y > 8)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 bg-black flex flex-col items-center justify-center gap-12 min-h-[60vh]"
    >
      {/* Eyes container */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Left eye - ) shape */}
        <motion.svg
          width="24"
          height="48"
          viewBox="0 0 24 48"
          fill="none"
          animate={{ x: eyeOffset.x, y: eyeOffset.y }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="md:w-[36px] md:h-[72px]"
        >
          <path
            d="M6 4 Q 20 24, 6 44"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </motion.svg>

        {/* Right eye - ( shape */}
        <motion.svg
          width="24"
          height="48"
          viewBox="0 0 24 48"
          fill="none"
          animate={{ x: eyeOffset.x, y: eyeOffset.y }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="md:w-[36px] md:h-[72px]"
        >
          <path
            d="M18 4 Q 4 24, 18 44"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </motion.svg>
      </div>

      {/* Text that appears when eyes look down */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-spacema tracking-tight">
              <span className="text-white">SUMMER EDITION</span>{' '}
              <span className="text-yellow-400">IN ARRIVO</span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
