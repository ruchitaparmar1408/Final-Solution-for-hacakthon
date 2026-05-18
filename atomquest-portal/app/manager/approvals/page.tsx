import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ManagerApprovalModule } from "@/components/manager/approvals/manager-approval-module"

export default function ManagerApprovalsPage() {
  return (
    <DashboardShell
      title="Goal approvals"
      description="Enterprise workflow for reviewing and deciding on employee performance goals"
    >
      <ManagerApprovalModule />
    </DashboardShell>
  )
}
