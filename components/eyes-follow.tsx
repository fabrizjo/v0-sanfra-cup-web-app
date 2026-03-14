"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

const sizeMap = {
  sm: { eye: 50, pupil: 24, highlight: 7 },
  md: { eye: 80, pupil: 38, highlight: 10 },
  lg: { eye: 110, pupil: 52, highlight: 14 },
  xl: { eye: 150, pupil: 70, highlight: 18 },
}

export function EyesFollow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const eyesRef = useRef<HTMLDivElement>(null)
  const [showText, setShowText] = useState(false)

  const size = "xl"
  const dimensions = sizeMap[size]
  const eyeWidth = dimensions.eye * 0.75
  const eyeHeight = dimensions.eye
  const pupilWidth = dimensions.pupil * 0.85
  const pupilHeight = dimensions.pupil * 1.2
  const highlightSize = dimensions.highlight
  const maxMoveX = (eyeWidth - pupilWidth) / 2
  const maxMoveY = (eyeHeight - pupilHeight) / 2

  // Use motion values for smooth animation without re-renders
  const leftX = useMotionValue(0)
  const leftY = useMotionValue(0)
  const rightX = useMotionValue(0)
  const rightY = useMotionValue(0)

  // Spring config for smooth movement
  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 }
  const leftXSpring = useSpring(leftX, springConfig)
  const leftYSpring = useSpring(leftY, springConfig)
  const rightXSpring = useSpring(rightX, springConfig)
  const rightYSpring = useSpring(rightY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyesRef.current) return

      const rect = eyesRef.current.getBoundingClientRect()
      
      const gap = eyeWidth * 0.2
      const leftEyeCenterX = rect.left + eyeWidth / 2
      const leftEyeCenterY = rect.top + eyeHeight / 2
      const rightEyeCenterX = rect.left + eyeWidth + gap + eyeWidth / 2
      const rightEyeCenterY = rect.top + eyeHeight / 2

      // Left eye
      const leftDx = e.clientX - leftEyeCenterX
      const leftDy = e.clientY - leftEyeCenterY
      const leftAngle = Math.atan2(leftDy, leftDx)
      const leftDist = Math.hypot(leftDx, leftDy)
      const leftNorm = Math.min(leftDist / 200, 1)
      
      const newLeftX = Math.cos(leftAngle) * leftNorm * maxMoveX
      const newLeftY = Math.sin(leftAngle) * leftNorm * maxMoveY
      
      leftX.set(newLeftX)
      leftY.set(newLeftY)

      // Right eye
      const rightDx = e.clientX - rightEyeCenterX
      const rightDy = e.clientY - rightEyeCenterY
      const rightAngle = Math.atan2(rightDy, rightDx)
      const rightDist = Math.hypot(rightDx, rightDy)
      const rightNorm = Math.min(rightDist / 200, 1)
      
      const newRightX = Math.cos(rightAngle) * rightNorm * maxMoveX
      const newRightY = Math.sin(rightAngle) * rightNorm * maxMoveY
      
      rightX.set(newRightX)
      rightY.set(newRightY)

      // Show text when both eyes look down
      setShowText(newLeftY > maxMoveY * 0.5 && newRightY > maxMoveY * 0.5)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [eyeWidth, eyeHeight, maxMoveX, maxMoveY, leftX, leftY, rightX, rightY])

  const Eye = ({ xSpring, ySpring }: { xSpring: typeof leftXSpring; ySpring: typeof leftYSpring }) => (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: eyeWidth,
        height: eyeHeight,
        backgroundColor: "white",
        borderRadius: 9999,
      }}
    >
      <motion.div
        className="absolute"
        style={{
          width: pupilWidth,
          height: pupilHeight,
          backgroundColor: "black",
          borderRadius: "50%",
          x: xSpring,
          y: ySpring,
        }}
      >
        <div
          className="absolute"
          style={{
            width: highlightSize,
            height: highlightSize,
            backgroundColor: "white",
            borderRadius: "50%",
            top: "12%",
            left: "12%",
          }}
        />
      </motion.div>
    </div>
  )

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 bg-black flex flex-col items-center justify-center gap-12 min-h-[50vh]"
    >
      {/* Eyes container */}
      <div
        ref={eyesRef}
        className="flex items-center"
        style={{ gap: eyeWidth * 0.2 }}
      >
        <Eye xSpring={leftXSpring} ySpring={leftYSpring} />
        <Eye xSpring={rightXSpring} ySpring={rightYSpring} />
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
