"use client"

import { useEffect, useState } from "react"
import { Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  GOAL_LOCKS_UPDATED_EVENT,
  formatLockDate,
  getEmployeeLockAuditLog,
  type GoalLockAuditEntry,
} from "@/lib/goal-lock"

interface GoalLockAuditFeedProps {
  className?: string
}

export function GoalLockAuditFeed({ className }: GoalLockAuditFeedProps) {
  const [entries, setEntries] = useState<GoalLockAuditEntry[]>([])

  function refresh() {
    setEntries(getEmployeeLockAuditLog())
  }

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    window.addEventListener(GOAL_LOCKS_UPDATED_EVENT, handler)
    window.addEventListener("storage", handler)
    return () => {
      window.removeEventListener(GOAL_LOCKS_UPDATED_EVENT, handler)
      window.removeEventListener("storage", handler)
    }
  }, [])

  return (
    <Card
      className={cn(
        "border-slate-200/80 shadow-sm dark:border-slate-800",
        className
      )}
    >
      <CardHeader className="border-b border-slate-200/80 pb-3 dark:border-slate-800">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Lock className="h-4 w-4 text-emerald-600" />
          Lock audit log
        </CardTitle>
        <p className="text-xs text-slate-500">
          Recorded when manager approval locks a goal
        </p>
      </CardHeader>
      <CardContent className="max-h-48 overflow-y-auto p-0">
        {entries.length === 0 ? (
          <p className="px-4 py-6 text-center text-xs text-slate-500">
            No locked goals yet. Entries appear after manager approval.
          </p>
        ) : (
          <ul className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {entries.map((entry, index) => (
              <li
                key={entry.id}
                className="animate-in fade-in slide-in-from-left-2 border-l-2 border-l-emerald-500 px-4 py-3 duration-300"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Goal locked
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
                  {entry.goalTitle}
                </p>
                <p className="mt-1 text-xs text-slate-500">{entry.details}</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  {entry.actor} · {formatLockDate(entry.timestamp)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
