import { AppShell } from "@/components/dashboard/app-shell"
import { AuditLogTable } from "@/components/audit/audit-log-table"

export default function AuditPage() {
  return (
    <AppShell
      title="Audit Logs"
      description="System activity trail for compliance and governance"
    >
      <AuditLogTable />
    </AppShell>
  )
}
