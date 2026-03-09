"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function EyesFollow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 })
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      const maxMove = 12
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const clampedDistance = Math.min(distance, 200)
      const scale = clampedDistance / 200

      const angle = Math.atan2(deltaY, deltaX)
      const x = Math.cos(angle) * maxMove * scale
      const y = Math.sin(angle) * maxMove * scale

      setPupilPosition({ x, y })

      // Show text when eyes look down (y > threshold)
      setShowText(y > 6)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const Eye = ({ className = "" }: { className?: string }) => (
    <div className={`relative ${className}`}>
      {/* Eye white */}
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center shadow-[inset_0_4px_20px_rgba(0,0,0,0.1)]">
        {/* Iris */}
        <motion.div
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-amber-800 via-amber-600 to-amber-900 flex items-center justify-center"
          animate={{ x: pupilPosition.x, y: pupilPosition.y }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {/* Pupil */}
          <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-black relative">
            {/* Reflection */}
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </div>
    </div>
  )

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-black flex flex-col items-center justify-center gap-8 min-h-[50vh]"
    >
      {/* Eyes */}
      <div className="flex gap-6 md:gap-10">
        <Eye />
        <Eye />
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
