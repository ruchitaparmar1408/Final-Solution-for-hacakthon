"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: "top" | "bottom"
  className?: string
}

export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: TooltipProps) {
  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 w-max max-w-[240px] rounded-lg border border-slate-200 bg-slate-900 px-3 py-2 text-xs font-medium leading-snug text-white opacity-0 shadow-lg transition-all duration-200",
          "group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
          side === "top" &&
            "bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 group-hover/tooltip:translate-y-0",
          side === "bottom" &&
            "top-full left-1/2 mt-2 -translate-x-1/2 -translate-y-1 group-hover/tooltip:translate-y-0",
          "dark:border-slate-700 dark:bg-slate-800"
        )}
      >
        {content}
      </span>
    </span>
  )
}
