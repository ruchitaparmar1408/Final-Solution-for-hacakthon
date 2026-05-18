"use client"

import { CheckCircle2, Clock, FileText, Lock, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  formatSubmittedDate,
  type ApprovalActivity,
  type ApprovalStatus,
} from "@/lib/manager-approvals"

interface ApprovalActivityFeedProps {
  activities: ApprovalActivity[]
}

function ActivityIcon({ status }: { status: ApprovalActivity["status"] }) {
  const className = "h-4 w-4 shrink-0"
  switch (status) {
    case "approved":
      return <CheckCircle2 className={cn(className, "text-emerald-500")} />
    case "rejected":
      return <XCircle className={cn(className, "text-red-500")} />
    case "pending":
      return <Clock className={cn(className, "text-amber-500")} />
    case "locked":
      return <Lock className={cn(className, "text-emerald-600")} />
    default:
      return <FileText className={cn(className, "text-blue-500")} />
  }
}

function statusAccent(status: ApprovalActivity["status"]) {
  switch (status) {
    case "approved":
    case "locked":
      return "border-l-emerald-500"
    case "rejected":
      return "border-l-red-500"
    case "pending":
      return "border-l-amber-500"
    default:
      return "border-l-blue-500"
  }
}

export function ApprovalActivityFeed({ activities }: ApprovalActivityFeedProps) {
  return (
    <Card className="h-full border-slate-200/80 shadow-sm dark:border-slate-800">
      <CardHeader className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4 text-slate-500" />
          Approval audit log
        </CardTitle>
        <p className="text-xs text-slate-500">
          Chronological record of submissions and decisions
        </p>
      </CardHeader>
      <CardContent className="max-h-[520px] overflow-y-auto p-0">
        {activities.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">
            No activity yet
          </p>
        ) : (
          <ul className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {activities.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "animate-in fade-in slide-in-from-right-2 border-l-2 px-4 py-4 duration-300",
                  statusAccent(item.status),
                  "fill-mode-both"
                )}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="flex gap-3">
                  <ActivityIcon status={item.status} />
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm text-slate-900 dark:text-white">
                      <span className="font-semibold">{item.actor}</span>{" "}
                      <span className="text-slate-600 dark:text-slate-400">
                        {item.action}
                      </span>
                    </p>
                    <p className="truncate text-xs font-medium text-blue-600 dark:text-cyan-400">
                      {item.goalTitle}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.employeeName} · {formatSubmittedDate(item.timestamp)}
                    </p>
                    {item.details && (
                      <p className="mt-1 rounded-md bg-slate-50 px-2 py-1.5 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                        {item.details}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
