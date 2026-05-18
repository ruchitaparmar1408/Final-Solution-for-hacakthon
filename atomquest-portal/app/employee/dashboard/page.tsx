"use client"

import { AppShell } from "@/components/dashboard/app-shell"
import { EmployeeGoalsModule } from "@/components/employee/goals/employee-goals-module"

export default function EmployeeDashboardPage() {
  return (
    <AppShell
      title="My Goals"
      description="Manage your performance goals for the FY26 Q2 review cycle"
    >
      <EmployeeGoalsModule />
    </AppShell>
  )
}
