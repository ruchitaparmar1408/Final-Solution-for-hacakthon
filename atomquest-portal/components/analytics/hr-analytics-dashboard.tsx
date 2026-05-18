"use client"

import { AnalyticsKpiCards } from "@/components/analytics/analytics-kpi-cards"
import { TeamPerformanceChart } from "@/components/analytics/team-performance-chart"
import { GoalCompletionTrendChart } from "@/components/analytics/goal-completion-trend-chart"
import { ApprovalRatePanel } from "@/components/analytics/approval-rate-panel"
import { DepartmentComparisonChart } from "@/components/analytics/department-comparison-chart"
import { analyticsDashboardData } from "@/lib/analytics-dashboard"

export function HrAnalyticsDashboard() {
  const data = analyticsDashboardData

  return (
    <div className="space-y-6">
      <AnalyticsKpiCards kpis={data.kpis} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TeamPerformanceChart data={data.teamPerformance} delay={200} />
        </div>
        <ApprovalRatePanel
          metrics={data.approvalMetrics}
          trend={data.approvalTrend}
          delay={280}
        />
      </div>

      <GoalCompletionTrendChart data={data.goalCompletionTrend} delay={360} />

      <DepartmentComparisonChart
        data={data.departmentComparison}
        delay={440}
      />
    </div>
  )
}
