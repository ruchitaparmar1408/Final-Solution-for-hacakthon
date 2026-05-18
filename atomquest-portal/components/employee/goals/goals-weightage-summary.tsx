"use client"

import { AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  GOAL_LIMITS,
  calculateTotalWeightage,
  type EmployeeGoal,
} from "@/lib/employee-goals"

interface GoalsWeightageSummaryProps {
  goals: EmployeeGoal[]
  goalCount: number
  shake?: boolean
}

export function GoalsWeightageSummary({
  goals,
  goalCount,
  shake,
}: GoalsWeightageSummaryProps) {
  const total = calculateTotalWeightage(goals)
  const remaining = GOAL_LIMITS.maxTotalWeightage - total
  const isFull = total === GOAL_LIMITS.maxTotalWeightage
  const isOver = total > GOAL_LIMITS.maxTotalWeightage

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all duration-300",
        shake && "animate-[shake_0.4s_ease-in-out]",
        isOver
          ? "border-red-300/60 bg-red-50/80 dark:border-red-500/30 dark:bg-red-950/20"
          : isFull
            ? "border-emerald-300/60 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-950/20"
            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50"
      )}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isOver ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : isFull ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-amber-500" />
          )}
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            Weightage allocation
          </span>
        </div>
        <span className="text-xs text-slate-500">
          {goalCount} / {GOAL_LIMITS.maxGoals} goals
        </span>
      </div>

      <div className="mb-2 flex items-baseline justify-between">
        <span
          className={cn(
            "text-2xl font-bold tabular-nums",
            isOver ? "text-red-600" : "text-slate-900 dark:text-white"
          )}
        >
          {total}%
        </span>
        <span className="text-sm text-slate-500">
          {remaining > 0 ? `${remaining}% remaining` : "Fully allocated"}
        </span>
      </div>

      <div className="relative h-2.5 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/80 dark:bg-slate-800 dark:ring-slate-700">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out",
            isOver
              ? "bg-gradient-to-r from-red-500 to-rose-500"
              : isFull
                ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                : "bg-gradient-to-r from-blue-500 to-cyan-500"
          )}
          style={{ width: `${Math.min(total, 100)}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Min {GOAL_LIMITS.minWeightagePerGoal}% per goal · Max{" "}
        {GOAL_LIMITS.maxTotalWeightage}% total
      </p>
    </div>
  )
}
