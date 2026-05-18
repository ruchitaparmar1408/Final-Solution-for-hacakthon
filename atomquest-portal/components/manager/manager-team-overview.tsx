"use client"

import Link from "next/link"
import { Users, ClipboardCheck, AlertCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { teamMembers } from "@/lib/enterprise-data"
import { dashboardStats } from "@/lib/data"

export function ManagerTeamOverview() {
  const pendingTotal = teamMembers.reduce((s, m) => s + m.pendingApprovals, 0)
  const overdueCheckins = teamMembers.filter(
    (m) => m.checkinStatus === "overdue"
  ).length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Direct reports",
            value: teamMembers.length,
            icon: Users,
          },
          {
            label: "Pending approvals",
            value: pendingTotal,
            icon: ClipboardCheck,
          },
          {
            label: "Team progress",
            value: `${dashboardStats.teamProgress}%`,
            icon: TrendingUp,
          },
          {
            label: "Overdue check-ins",
            value: overdueCheckins,
            icon: AlertCircle,
          },
        ].map((stat) => (
          <Card
            key={stat.label}
            className="border-slate-200/80 transition-shadow hover:shadow-md dark:border-slate-800"
          >
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <stat.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="text-xl font-semibold tabular-nums">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Team progress</CardTitle>
          <Link
            href="/reviews"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.slice(0, 4).map((member) => (
            <div key={member.id} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{member.name}</span>
                <span className="tabular-nums text-slate-500">
                  {member.completionRate}%
                </span>
              </div>
              <Progress value={member.completionRate} className="h-1.5" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/manager/approvals"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Review pending goals
        </Link>
        <Link
          href="/analytics"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          Team analytics
        </Link>
      </div>
    </div>
  )
}
