"use client"

import Link from "next/link"
import {
  Shield,
  Users,
  FileText,
  Settings,
  Target,
  AlertTriangle,
  Unlock,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { dashboardStats } from "@/lib/data"
import {
  escalations,
  performanceCycles,
  sharedGoals,
} from "@/lib/enterprise-data"

const actions = [
  {
    title: "User management",
    description: "Employees, managers, and role assignments",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Audit logs",
    description: "Compliance and system activity history",
    icon: FileText,
    href: "/audit",
  },
  {
    title: "Escalations",
    description: "Overdue submissions and pending approvals",
    icon: AlertTriangle,
    href: "/admin/escalations",
  },
  {
    title: "Analytics",
    description: "Organization-wide performance insights",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Organization settings",
    description: "Cycles, departments, and policies",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Security & compliance",
    description: "Access controls and audit policies",
    icon: Shield,
    href: "/settings",
  },
]

export function AdminConsole() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total goals", value: dashboardStats.totalGoals },
          { label: "Approved", value: dashboardStats.approvedGoals },
          { label: "Pending reviews", value: dashboardStats.pendingReviews },
          {
            label: "Org progress",
            value: `${dashboardStats.teamProgress}%`,
          },
        ].map((stat, i) => (
          <Card
            key={stat.label}
            className="border-slate-200/80 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <CardContent className="pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-slate-200/80 lg:col-span-2 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base">Performance cycles</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {performanceCycles.map((cycle) => (
              <Badge
                key={cycle.id}
                variant={cycle.status === "active" ? "default" : "secondary"}
                className="px-3 py-1"
              >
                {cycle.label}
                <span className="ml-1.5 capitalize opacity-70">
                  · {cycle.status}
                </span>
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Escalations</CardTitle>
            <Badge variant="destructive">{escalations.length}</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">
              {escalations.filter((e) => e.severity === "high").length} high
              priority items require attention
            </p>
            <Link
              href="/admin/escalations"
              className="mt-3 inline-flex h-7 w-full items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium hover:bg-muted"
            >
              View escalations
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-base">Shared organizational goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sharedGoals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 dark:border-slate-800"
            >
              <div>
                <p className="text-sm font-medium">{goal.title}</p>
                <p className="text-xs text-slate-500">
                  Owner: {goal.owner} · {goal.recipients} recipients
                </p>
              </div>
              <Badge variant="outline" className="text-emerald-600">
                Synced
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <Card
            key={action.title}
            className="border-slate-200/80 transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800"
          >
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                <action.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base">{action.title}</CardTitle>
                <p className="text-sm text-slate-500">{action.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Link
                href={action.href}
                className="inline-flex h-7 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium hover:bg-muted"
              >
                Open
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-200/60 bg-amber-50/30 dark:border-amber-900/40 dark:bg-amber-950/20">
        <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Unlock className="mt-0.5 h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Goal unlock requests
              </p>
              <p className="text-sm text-slate-500">
                2 locked goals pending admin review for cycle correction
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline">
            Manage locks
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

