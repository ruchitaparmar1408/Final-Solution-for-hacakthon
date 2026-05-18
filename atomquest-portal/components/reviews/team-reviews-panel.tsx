"use client"

import { teamMembers } from "@/lib/enterprise-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const checkinStyles = {
  complete: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  overdue: "bg-red-500/10 text-red-700 dark:text-red-300",
}

export function TeamReviewsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {teamMembers.map((member) => (
        <Card
          key={member.id}
          className="border-slate-200/80 transition-all duration-200 hover:shadow-md dark:border-slate-800"
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">{member.name}</CardTitle>
                <p className="text-xs text-slate-500">
                  {member.role} · {member.department}
                </p>
              </div>
              <Badge
                variant="secondary"
                className={checkinStyles[member.checkinStatus]}
              >
                {member.checkinStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Goal completion</span>
                <span className="tabular-nums">{member.completionRate}%</span>
              </div>
              <Progress value={member.completionRate} className="h-1.5" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md bg-slate-50 px-2 py-1.5 dark:bg-slate-900">
                <span className="text-slate-500">Goals</span>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {member.goalsCount}
                </p>
              </div>
              <div className="rounded-md bg-slate-50 px-2 py-1.5 dark:bg-slate-900">
                <span className="text-slate-500">Pending approval</span>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {member.pendingApprovals}
                </p>
              </div>
            </div>
            <Link
              href="/manager/approvals"
              className="inline-flex h-7 w-full items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Review goals
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

