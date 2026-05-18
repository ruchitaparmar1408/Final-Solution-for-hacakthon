"use client"

import { cn } from "@/lib/utils"

interface GoalProgressBarProps {
  value: number
  className?: string
  showLabel?: boolean
}

function getProgressTone(value: number) {
  if (value >= 80) return "from-emerald-500 to-teal-500"
  if (value >= 50) return "from-blue-500 to-cyan-500"
  if (value >= 25) return "from-amber-400 to-orange-500"
  return "from-rose-500 to-red-500"
}

export function GoalProgressBar({
  value,
  className,
  showLabel = true,
}: GoalProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const tone = getProgressTone(clamped)

  return (
    <div className={cn("flex min-w-[7rem] items-center gap-3", className)}>
      <div
        className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100/80 ring-1 ring-slate-200/60 dark:bg-slate-800/80 dark:ring-slate-700/60"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-[width] duration-700 ease-out",
            tone
          )}
          style={{ width: `${clamped}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-white/20 opacity-60"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-9 shrink-0 text-right text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-300">
          {clamped}%
        </span>
      )}
    </div>
  )
}
