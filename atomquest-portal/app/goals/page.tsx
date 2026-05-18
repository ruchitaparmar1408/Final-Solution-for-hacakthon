import { AppShell } from "@/components/dashboard/app-shell"
import { OrganizationGoalsTable } from "@/components/goals/organization-goals-table"

export default function GoalsPage() {
  return (
    <AppShell
      title="Organization Goals"
      description="FY26 Q2 performance goals across departments"
    >
      <OrganizationGoalsTable />
    </AppShell>
  )
}
