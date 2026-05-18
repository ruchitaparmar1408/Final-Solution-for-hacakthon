"use client"

import { RoleDashboardLayout } from "@/components/dashboard/role-dashboard-layout"
import { EmployeeGoalsModule } from "@/components/employee/goals/employee-goals-module"
import { roleLabels } from "@/lib/auth"

export default function EmployeeDashboardPage() {
  return (
    <RoleDashboardLayout roleLabel={roleLabels.employee}>
      <div className="mb-8 space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Employee Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your performance goals for the current review cycle
        </p>
      </div>

      <EmployeeGoalsModule />
    </RoleDashboardLayout>
  )
}
