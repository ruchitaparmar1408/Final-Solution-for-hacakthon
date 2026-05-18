import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ManagerApprovalModule } from "@/components/manager/approvals/manager-approval-module"

export default function ManagerDashboardPage() {
  return (
    <DashboardShell
      title="Manager Dashboard"
      description="Review employee-submitted goals, adjust progress, and approve or reject with audit trail"
    >
      <ManagerApprovalModule />
    </DashboardShell>
  )
}
