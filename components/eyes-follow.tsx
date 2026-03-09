"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function EyesFollow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Calculate angle in degrees
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
      setRotation(angle)

      // Show text when eyes look down (between 45 and 135 degrees)
      const normalizedAngle = angle > 0 ? angle : angle + 360
      setShowText(normalizedAngle > 45 && normalizedAngle < 135)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Minimalist curved eye shape (like the Framer component)
  const Eye = ({ mirror = false }: { mirror?: boolean }) => (
    <motion.svg
      width="40"
      height="80"
      viewBox="0 0 40 80"
      fill="none"
      animate={{ rotate: rotation + (mirror ? 180 : 0) }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="md:w-[60px] md:h-[120px]"
    >
      <path
        d="M35 10 C 10 25, 10 55, 35 70"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  )

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 bg-black flex flex-col items-center justify-center gap-12 min-h-[60vh]"
    >
      {/* Eyes */}
      <div className="flex gap-4 md:gap-6">
        <Eye />
        <Eye mirror />
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
