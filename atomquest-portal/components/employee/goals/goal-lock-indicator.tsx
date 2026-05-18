import { Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { LOCK_TOOLTIP_MESSAGE, isGoalLocked } from "@/lib/goal-lock"
import type { EmployeeGoal } from "@/lib/employee-goals"
import { employeeGoalStatusConfig } from "@/lib/employee-goals"

interface GoalLockIndicatorProps {
  goal: EmployeeGoal
  showLabel?: boolean
  className?: string
}

export function GoalLockIndicator({
  goal,
  showLabel = true,
  className,
}: GoalLockIndicatorProps) {
  const locked = isGoalLocked(goal)
  const status = employeeGoalStatusConfig[goal.approvalStatus]

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      <Badge variant="outline" className={cn("font-medium", status.className)}>
        {status.label}
      </Badge>
      {locked && (
        <Tooltip content={LOCK_TOOLTIP_MESSAGE}>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600",
              "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            )}
          >
            <Lock className="h-3 w-3" aria-hidden />
            {showLabel && "Locked"}
          </span>
        </Tooltip>
      )}
    </div>
  )
}
