import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { GoalsTable } from "@/components/dashboard/goals-table"
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import {
  dashboardStats,
  goals,
  recentActivities,
  analyticsData,
} from "@/lib/data"

interface HrDashboardProps {
  title?: string
  description?: string
}

export function HrDashboard({
  title = "Performance Dashboard",
  description = "Track and manage employee goals and team performance",
}: HrDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <TopNav />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">{description}</p>
          </div>

          <div className="mb-8">
            <StatsCards stats={dashboardStats} />
          </div>

          <div className="mb-8">
            <GoalsTable goals={goals} />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AnalyticsCharts data={analyticsData} />
            </div>
            <div>
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
