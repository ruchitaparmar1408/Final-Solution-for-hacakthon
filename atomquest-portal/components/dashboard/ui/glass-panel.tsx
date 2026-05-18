"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article"
  hover?: boolean
  animate?: boolean
  delay?: number
}

export function GlassPanel({
  className,
  children,
  as: Tag = "div",
  hover = true,
  animate = false,
  delay = 0,
  style,
  ...props
}: GlassPanelProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-white/60 bg-white/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.08)] backdrop-blur-xl backdrop-saturate-150",
        "dark:border-white/[0.08] dark:bg-slate-900/60 dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_32px_-8px_rgba(0,0,0,0.45)]",
        hover &&
          "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/80 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_40px_-6px_rgba(15,23,42,0.12)] dark:hover:border-white/[0.12]",
        animate && "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500",
        className
      )}
      style={{
        ...style,
        ...(animate ? { animationDelay: `${delay}ms` } : {}),
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}
