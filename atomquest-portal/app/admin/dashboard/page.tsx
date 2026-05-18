import { AppShell } from "@/components/dashboard/app-shell"
import { AdminConsole } from "@/components/admin/admin-console"

export default function AdminDashboardPage() {
  return (
    <AppShell
      title="Admin Console"
      description="Organization-wide controls, cycles, and governance"
    >
      <AdminConsole />
    </AppShell>
  )
}
