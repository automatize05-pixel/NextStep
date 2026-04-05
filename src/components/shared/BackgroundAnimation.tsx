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
        // Using the exact filename pattern from the source directory
        img.src = `/bg-animation/African_professional_smiling_202604051322_${frameNumber}.jpg`
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
        
        if (currentFrame && currentFrame.complete) {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          
          // Calculate "object-fit: cover" logic for the canvas
          const canvasAspect = canvas.width / canvas.height
          const imageAspect = currentFrame.width / currentFrame.height
          
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
        }
        
        currentFrameRef.current = (currentFrameRef.current + 1) % frameCount
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
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050A15]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover opacity-40 grayscale contrast-125 brightness-75 transition-opacity duration-1000"
      />
      {/* Premium Gradient Overlay to blend with the app's dark theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050A15]/95 via-[#050A15]/70 to-[#050A15]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]" />
    </div>
  )
}
