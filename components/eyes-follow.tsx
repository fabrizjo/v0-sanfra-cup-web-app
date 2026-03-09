"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const sizeMap = {
  sm: { eye: 50, pupil: 24, highlight: 7 },
  md: { eye: 80, pupil: 38, highlight: 10 },
  lg: { eye: 110, pupil: 52, highlight: 14 },
  xl: { eye: 150, pupil: 70, highlight: 18 },
}

export function EyesFollow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const eyesRef = useRef<HTMLDivElement>(null)
  const [leftPupilPos, setLeftPupilPos] = useState({ x: 0, y: 0 })
  const [rightPupilPos, setRightPupilPos] = useState({ x: 0, y: 0 })
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
      
      const leftX = Math.cos(leftAngle) * leftNorm * maxMoveX
      const leftY = Math.sin(leftAngle) * leftNorm * maxMoveY
      
      setLeftPupilPos({ x: leftX, y: leftY })

      // Right eye
      const rightDx = e.clientX - rightEyeCenterX
      const rightDy = e.clientY - rightEyeCenterY
      const rightAngle = Math.atan2(rightDy, rightDx)
      const rightDist = Math.hypot(rightDx, rightDy)
      const rightNorm = Math.min(rightDist / 200, 1)
      
      const rightX = Math.cos(rightAngle) * rightNorm * maxMoveX
      const rightY = Math.sin(rightAngle) * rightNorm * maxMoveY
      
      setRightPupilPos({ x: rightX, y: rightY })

      // Show text when both eyes look down
      setShowText(leftY > maxMoveY * 0.5 && rightY > maxMoveY * 0.5)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [eyeWidth, eyeHeight, maxMoveX, maxMoveY])

  const Eye = ({ pupilPos }: { pupilPos: { x: number; y: number } }) => (
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
        }}
        animate={{ x: pupilPos.x, y: pupilPos.y }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
        <Eye pupilPos={leftPupilPos} />
        <Eye pupilPos={rightPupilPos} />
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
