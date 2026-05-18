import mockData from "@/lib/manager-approvals.json"

export type ApprovalStatus = "pending" | "approved" | "rejected"

export type ApprovalFilter = "all" | ApprovalStatus

export interface SubmittedGoal {
  id: string
  employeeId: string
  employeeName: string
  department: string
  title: string
  description: string
  weightage: number
  dueDate: string
  progress: number
  status: ApprovalStatus
  submittedAt: string
  managerComment: string
  /** Links to employee portfolio goal for lock sync */
  employeeGoalId?: string
}

export interface ApprovalActivity {
  id: string
  timestamp: string
  actor: string
  action: string
  goalTitle: string
  employeeName: string
  status: ApprovalStatus | "updated" | "locked"
  details?: string
}

export const statusConfig: Record<
  ApprovalStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending review",
    className:
      "border-amber-200/70 bg-amber-50 text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/15 dark:text-amber-300",
  },
  approved: {
    label: "Approved",
    className:
      "border-emerald-200/70 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  rejected: {
    label: "Rejected",
    className:
      "border-red-200/70 bg-red-50 text-red-800 dark:border-red-500/25 dark:bg-red-500/15 dark:text-red-300",
  },
}

export const mockSubmittedGoals = mockData.submittedGoals as SubmittedGoal[]
export const mockInitialActivities =
  mockData.initialActivities as ApprovalActivity[]

export function formatSubmittedDate(iso: string) {
  const date = new Date(iso)
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDueDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function clampProgress(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)))
}
