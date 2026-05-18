"use client"

import { Shield, Users, FileText, Settings } from "lucide-react"
import { RoleDashboardLayout } from "@/components/dashboard/role-dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dashboardStats } from "@/lib/data"
import { roleLabels } from "@/lib/auth"

const adminActions = [
  {
    title: "User management",
    description: "Manage employees, managers, and access roles",
    icon: Users,
  },
  {
    title: "Audit logs",
    description: "Review system activity and compliance events",
    icon: FileText,
  },
  {
    title: "Organization settings",
    description: "Configure cycles, departments, and policies",
    icon: Settings,
  },
  {
    title: "Security & compliance",
    description: "SOC 2 controls and permission policies",
    icon: Shield,
  },
]

export default function AdminDashboardPage() {
  return (
    <RoleDashboardLayout roleLabel={roleLabels.admin}>
      <div className="mb-8 space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Admin Console
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Organization-wide controls and performance oversight
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total goals", value: dashboardStats.totalGoals },
          { label: "Approved", value: dashboardStats.approvedGoals },
          { label: "Pending reviews", value: dashboardStats.pendingReviews },
          { label: "Team progress", value: `${dashboardStats.teamProgress}%` },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {adminActions.map((action) => (
          <Card key={action.title} className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                <action.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base">{action.title}</CardTitle>
                <p className="text-sm text-slate-500">{action.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </RoleDashboardLayout>
  )
}
