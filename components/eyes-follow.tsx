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

      // Limit pupil movement within the eye
      const maxMove = 18
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const scale = Math.min(distance / 150, 1)

      const angle = Math.atan2(deltaY, deltaX)
      const x = Math.cos(angle) * maxMove * scale
      const y = Math.sin(angle) * maxMove * scale

      setPupilPosition({ x, y })

      // Show text when eyes look down
      setShowText(y > 8)
    }

    // Listen on document for better iframe compatibility
    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const Eye = () => (
    <div className="relative">
      {/* White part of the eye - oval shape */}
      <div className="w-14 h-20 md:w-20 md:h-28 bg-white rounded-[50%] flex items-center justify-center">
        {/* Pupil - black circle */}
        <motion.div
          className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black"
          animate={{ x: pupilPosition.x, y: pupilPosition.y }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  )

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 bg-black flex flex-col items-center justify-center gap-12 min-h-[50vh]"
    >
      {/* Eyes container */}
      <div className="flex gap-4 md:gap-6">
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
