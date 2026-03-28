"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconOnly?: boolean
  white?: boolean
}

export function Logo({ className, iconOnly = false, white = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 group cursor-pointer select-none", className)}>
      {/* Icon Part */}
      <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
        <div className={cn(
          "absolute inset-0 rounded-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg",
          white ? "bg-white" : "bg-primary shadow-[0_0_20px_rgba(37,99,235,0.4)]"
        )} />
        <div className="relative z-10 flex flex-col items-center justify-center">
            <span className={cn(
                "font-black text-xl leading-none tracking-tighter",
                white ? "text-primary" : "text-primary-foreground"
            )}>N</span>
            {/* Minimalist step line */}
            <div className={cn(
                "h-0.5 w-3 mt-0.5 rounded-full transition-all duration-500 group-hover:w-4",
                white ? "bg-primary" : "bg-primary-foreground/80"
            )} />
        </div>
      </div>

      {/* Text Part */}
      {!iconOnly && (
        <span className={cn(
          "font-black text-2xl tracking-tighter transition-all duration-300",
          white ? "text-white" : "text-foreground"
        )}>
          Next<span className="italic text-primary">Step</span>
        </span>
      )}
    </div>
  )
}
