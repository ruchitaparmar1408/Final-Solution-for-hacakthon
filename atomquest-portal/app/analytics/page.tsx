import { AnalyticsDashboardShell } from "@/components/analytics/analytics-dashboard-shell"
import { HrAnalyticsDashboard } from "@/components/analytics/hr-analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <AnalyticsDashboardShell
      title="HR Analytics"
      description="Goal tracking, approval velocity, and department performance for leadership reporting"
    >
      <HrAnalyticsDashboard />
    </AnalyticsDashboardShell>
  )
}
