"use client"

import React from "react"

import { useRef, useEffect, useState } from "react"

interface MetallicButtonProps {
  label: string
  onClick: () => void
  color?: "gold" | "silver"
}

export function MetallicButton({ label, onClick, color = "gold" }: MetallicButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [ripple, setRipple] = useState<{ x: number; y: number; time: number } | null>(null)
  const animationRef = useRef<number>()
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `

  const fragmentShaderSource = `
    precision highp float;
    varying vec2 v_uv;
    uniform float u_time;
    uniform float u_hover;
    uniform float u_press;
    uniform vec2 u_ripple;
    uniform float u_rippleTime;
    uniform vec2 u_resolution;
    uniform int u_colorMode;

    // Noise function for liquid effect
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 5; i++) {
        value += amplitude * smoothNoise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 uv = v_uv;
      float time = u_time * 0.3;
      
      // Liquid distortion
      float distort = fbm(uv * 3.0 + time * 0.5) * 0.1;
      distort += fbm(uv * 5.0 - time * 0.3) * 0.05;
      distort *= (1.0 + u_hover * 0.5);
      
      vec2 distortedUV = uv + vec2(distort, distort * 0.5);
      
      // Base metallic colors
      vec3 darkColor, midColor, lightColor, highlightColor;
      
      if (u_colorMode == 0) {
        // Gold/Yellow metallic
        darkColor = vec3(0.15, 0.12, 0.05);
        midColor = vec3(0.4, 0.32, 0.1);
        lightColor = vec3(0.7, 0.55, 0.15);
        highlightColor = vec3(1.0, 0.85, 0.3);
      } else {
        // Silver/Gray metallic
        darkColor = vec3(0.1, 0.1, 0.12);
        midColor = vec3(0.3, 0.3, 0.35);
        lightColor = vec3(0.6, 0.6, 0.65);
        highlightColor = vec3(0.9, 0.9, 0.95);
      }
      
      // Create metallic gradient layers
      float layer1 = fbm(distortedUV * 4.0 + time);
      float layer2 = fbm(distortedUV * 8.0 - time * 0.7);
      float layer3 = fbm(distortedUV * 2.0 + time * 0.2);
      
      // Combine layers for liquid metal effect
      float metallic = layer1 * 0.4 + layer2 * 0.3 + layer3 * 0.3;
      metallic = smoothstep(0.2, 0.8, metallic);
      
      // Add specular highlights
      float specular = pow(fbm(distortedUV * 10.0 + time * 2.0), 3.0);
      specular *= (1.0 + u_hover * 2.0);
      
      // Create 3D depth illusion
      float depth = 1.0 - length(uv - 0.5) * 0.8;
      depth = pow(depth, 0.5);
      
      // Edge highlight for 3D effect
      float edge = 1.0 - abs(uv.y - 0.5) * 2.0;
      edge = pow(edge, 0.3);
      float topLight = smoothstep(0.0, 0.3, uv.y) * (1.0 - uv.y);
      
      // Mix colors based on metallic value
      vec3 color = mix(darkColor, midColor, metallic);
      color = mix(color, lightColor, metallic * edge);
      color += highlightColor * specular * 0.3;
      color += highlightColor * topLight * 0.2;
      
      // Hover glow effect
      float glow = u_hover * 0.3 * (1.0 - length(uv - 0.5));
      color += highlightColor * glow;
      
      // Press effect (darken and shift)
      color *= (1.0 - u_press * 0.2);
      
      // Ripple effect
      if (u_rippleTime > 0.0 && u_rippleTime < 1.0) {
        float dist = length(uv - u_ripple);
        float rippleWave = sin(dist * 30.0 - u_rippleTime * 10.0) * 0.5 + 0.5;
        rippleWave *= smoothstep(u_rippleTime, 0.0, dist) * smoothstep(0.0, 0.3, u_rippleTime);
        rippleWave *= (1.0 - u_rippleTime);
        color += highlightColor * rippleWave * 0.4;
      }
      
      // Add subtle vignette for depth
      float vignette = 1.0 - length(uv - 0.5) * 0.5;
      color *= vignette;
      
      // Rounded corners alpha
      vec2 cornerDist = abs(uv - 0.5) * 2.0;
      float cornerRadius = 0.15;
      float corner = smoothstep(1.0, 1.0 - cornerRadius, max(cornerDist.x, cornerDist.y));
      
      gl_FragColor = vec4(color * depth, corner);
    }
  `

  const initGL = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    glRef.current = gl

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    // Create program
    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    programRef.current = program

    // Create buffer
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Enable blending for transparency
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  }

  useEffect(() => {
    initGL()
    return () => {
      const gl = glRef.current
      const program = programRef.current
      if (gl && program) {
        gl.deleteProgram(program)
      }
    }
  }, [])

  useEffect(() => {
    const gl = glRef.current
    const program = programRef.current
    const canvas = canvasRef.current
    if (!gl || !program || !canvas) return

    const render = () => {
      const time = (Date.now() - startTimeRef.current) / 1000
      
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)
      gl.uniform1f(gl.getUniformLocation(program, "u_time"), time)
      gl.uniform1f(gl.getUniformLocation(program, "u_hover"), isHovered ? 1.0 : 0.0)
      gl.uniform1f(gl.getUniformLocation(program, "u_press"), isPressed ? 1.0 : 0.0)
      gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), canvas.width, canvas.height)
      gl.uniform1i(gl.getUniformLocation(program, "u_colorMode"), color === "gold" ? 0 : 1)
      
      if (ripple) {
        const rippleProgress = Math.min((Date.now() - ripple.time) / 1000, 1.0)
        gl.uniform2f(gl.getUniformLocation(program, "u_ripple"), ripple.x, ripple.y)
        gl.uniform1f(gl.getUniformLocation(program, "u_rippleTime"), rippleProgress)
        if (rippleProgress >= 1.0) {
          setRipple(null)
        }
      } else {
        gl.uniform1f(gl.getUniformLocation(program, "u_rippleTime"), 0.0)
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, isPressed, ripple, color])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width
      const y = 1 - (e.clientY - rect.top) / rect.height
      setRipple({ x, y, time: Date.now() })
    }
    onClick()
  }

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer select-none transform transition-transform duration-150"
      style={{ 
        transform: isPressed ? "scale(0.97) translateY(2px)" : isHovered ? "scale(1.02)" : "scale(1)",
        filter: isHovered ? "drop-shadow(0 0 20px rgba(250, 204, 21, 0.4))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.5))"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={120}
        className="w-full h-full rounded-2xl"
        style={{ maxWidth: "400px", height: "120px" }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span 
          className="text-3xl md:text-4xl font-bold tracking-wider"
          style={{ 
            color: color === "gold" ? "#1a1a1a" : "#1a1a1a",
            textShadow: "0 1px 2px rgba(255,255,255,0.3)",
            transform: isPressed ? "translateY(1px)" : "translateY(0)"
          }}
        >
          {label}
        </span>
      </div>
      {/* 3D layered border effect */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: isHovered 
            ? "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)"
            : "inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.2)"
        }}
      />
    </div>
  )
}
