"use client"

import { useState, useEffect } from "react"

export function RealTimeClock({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!time) return <div className={className}>...</div>

  const formattedDate = time.toLocaleDateString('pt-AO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase()

  const formattedTime = time.toLocaleTimeString('pt-AO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <div className={className}>
      <span className="opacity-70">{formattedDate}</span>
      <span className="mx-2 opacity-30">|</span>
      <span className="font-black text-primary">{formattedTime}</span>
    </div>
  )
}
