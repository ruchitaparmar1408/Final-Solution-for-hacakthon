import analyticsJson from "@/lib/analytics-dashboard.json"

export type KpiAccent = "blue" | "cyan" | "emerald" | "violet"

export interface AnalyticsKpi {
  id: string
  title: string
  value: string
  subtitle: string
  trend: { value: number; isPositive: boolean }
  accent: KpiAccent
}

export interface TeamPerformancePoint {
  month: string
  overall: number
  onTrack: number
  atRisk: number
}

export interface GoalCompletionPoint {
  month: string
  completed: number
  inProgress: number
  notStarted: number
}

export interface ApprovalMetrics {
  approved: number
  pending: number
  rejected: number
  approvalRate: number
  rejectionRate: number
  pendingRate: number
}

export interface ApprovalTrendPoint {
  month: string
  rate: number
  submitted: number
}

export interface DepartmentComparison {
  department: string
  goals: number
  completed: number
  approvalRate: number
  avgProgress: number
}

export interface AnalyticsDashboardData {
  kpis: AnalyticsKpi[]
  teamPerformance: TeamPerformancePoint[]
  goalCompletionTrend: GoalCompletionPoint[]
  approvalMetrics: ApprovalMetrics
  approvalTrend: ApprovalTrendPoint[]
  departmentComparison: DepartmentComparison[]
}

export const analyticsDashboardData =
  analyticsJson as AnalyticsDashboardData

export const chartTickStyle = { fill: "#94a3b8", fontSize: 11 }
export const chartGridStroke = "rgba(148,163,184,0.12)"
