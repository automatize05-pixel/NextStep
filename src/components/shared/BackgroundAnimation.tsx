"use client"

import { useEffect, useRef } from "react"

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const frameCount = 80
  const currentFrameRef = useRef(0)

  useEffect(() => {
    // Preload images
    const loadFrames = () => {
      const loadedFrames: HTMLImageElement[] = []
      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        const frameNumber = i.toString().padStart(3, '0')
        img.src = `/bg-animation/African_professional_smiling_202604051322_${frameNumber}.jpg`
        img.onload = () => { if (i === 0) console.log("First frame loaded successfully") }
        img.onerror = () => console.error(`Failed to load frame ${frameNumber} at ${img.src}`)
        loadedFrames.push(img)
      }
      framesRef.current = loadedFrames
    }

    loadFrames()

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let lastTime = 0
    const fps = 24 // Target frame rate for a smooth professional animation

    const render = (time: number) => {
      if (!lastTime) lastTime = time
      const delta = time - lastTime

      if (delta > 1000 / fps) {
        lastTime = time
        const currentFrame = framesRef.current[currentFrameRef.current]
        
        // Safety check for currentFrame properties
        if (currentFrame && currentFrame.complete && currentFrame.naturalWidth > 0) {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          
          // Calculate "object-fit: cover" logic for the canvas
          const canvasAspect = canvas.width / canvas.height
          const imageAspect = currentFrame.naturalWidth / currentFrame.naturalHeight
          
          let drawWidth, drawHeight, offsetX, offsetY
          
          if (canvasAspect > imageAspect) {
            drawWidth = canvas.width
            drawHeight = canvas.width / imageAspect
            offsetX = 0
            offsetY = (canvas.height - drawHeight) / 2
          } else {
            drawHeight = canvas.height
            drawWidth = canvas.height * imageAspect
            offsetY = 0
            offsetX = (canvas.width - drawWidth) / 2
          }
          
          ctx.drawImage(currentFrame, offsetX, offsetY, drawWidth, drawHeight)
          currentFrameRef.current = (currentFrameRef.current + 1) % frameCount
        }
      }
      
      animationId = requestAnimationFrame(render)
    }

    const handleResize = () => {
      if (canvas) {
        // Set internal resolution to match logical size
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Test Image - If you see this, the path is correct */}
      <img 
        src="/bg-animation/African_professional_smiling_202604051322_000.jpg" 
        className="w-full h-full object-cover opacity-100"
        alt="Animation Test"
      />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover opacity-0"
      />
      {/* Lightened Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050A15]/40 via-transparent to-[#050A15]/20" />
    </div>
  )
}
