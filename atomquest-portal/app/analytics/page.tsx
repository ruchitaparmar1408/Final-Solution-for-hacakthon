import { AppShell } from "@/components/dashboard/app-shell"
import { HrAnalyticsDashboard } from "@/components/analytics/hr-analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <AppShell
      title="HR Analytics"
      description="Goal tracking, approval velocity, and department performance"
    >
      <HrAnalyticsDashboard />
    </AppShell>
  )
}
