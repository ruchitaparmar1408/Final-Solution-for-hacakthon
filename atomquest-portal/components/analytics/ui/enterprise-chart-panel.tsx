"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface EnterpriseChartPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean
  delay?: number
}

export function EnterpriseChartPanel({
  className,
  children,
  animate = false,
  delay = 0,
  style,
  ...props
}: EnterpriseChartPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900",
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
    </div>
  )
}
