import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ManagerTeamOverview } from "@/components/manager/manager-team-overview"

export default function ManagerDashboardPage() {
  return (
    <DashboardShell
      title="Manager Dashboard"
      description="Team overview, pending reviews, and performance at a glance"
    >
      <ManagerTeamOverview />
    </DashboardShell>
  )
}
