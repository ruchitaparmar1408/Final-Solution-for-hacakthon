"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DarkGlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  animate?: boolean
  delay?: number
  glow?: "blue" | "cyan" | "emerald" | "violet" | "none"
}

const glowMap = {
  blue: "from-blue-500/10 via-transparent to-transparent",
  cyan: "from-cyan-500/10 via-transparent to-transparent",
  emerald: "from-emerald-500/10 via-transparent to-transparent",
  violet: "from-violet-500/10 via-transparent to-transparent",
  none: "",
}

export function DarkGlassPanel({
  className,
  children,
  hover = false,
  animate = false,
  delay = 0,
  glow = "none",
  style,
  ...props
}: DarkGlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.08]",
        "bg-slate-900/50 shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
        hover &&
          "transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
        animate && "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700",
        className
      )}
      style={{
        ...style,
        ...(animate ? { animationDelay: `${delay}ms` } : {}),
      }}
      {...props}
    >
      {glow !== "none" && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
            glowMap[glow]
          )}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}
