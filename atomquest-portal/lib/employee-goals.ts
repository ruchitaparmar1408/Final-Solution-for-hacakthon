export type GoalApprovalStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"

export interface EmployeeGoal {
  id: string
  title: string
  description: string
  weightage: number
  dueDate: string
  progress: number
  approvalStatus: GoalApprovalStatus
  lockedAt?: string
  lockedBy?: string
}

export const employeeGoalStatusConfig: Record<
  GoalApprovalStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className:
      "border-slate-200/70 bg-slate-50 text-slate-700 dark:border-slate-600/30 dark:bg-slate-800/50 dark:text-slate-300",
  },
  pending: {
    label: "Pending approval",
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
      "border-red-200/70 bg-red-50 text-red-700 dark:border-red-500/25 dark:bg-red-500/15 dark:text-red-300",
  },
}

export interface GoalFormValues {
  title: string
  description: string
  weightage: string
  dueDate: string
}

export type GoalFormErrors = Partial<Record<keyof GoalFormValues, string>>

export const GOAL_LIMITS = {
  maxGoals: 8,
  maxTotalWeightage: 100,
  minWeightagePerGoal: 10,
} as const

export const sampleEmployeeGoals: EmployeeGoal[] = [
  {
    id: "eg-1",
    title: "Improve Q2 customer onboarding NPS",
    description:
      "Reduce onboarding drop-off by 15% through workflow automation and bi-weekly review sessions with customer success leads.",
    weightage: 25,
    dueDate: "2026-06-30",
    progress: 42,
    approvalStatus: "pending",
  },
  {
    id: "eg-2",
    title: "Complete advanced Excel & analytics certification",
    description:
      "Finish the internal L&D analytics track and apply learnings to monthly performance reporting templates.",
    weightage: 15,
    dueDate: "2026-05-31",
    progress: 78,
    approvalStatus: "approved",
    lockedAt: "2026-05-10T14:30:00+05:30",
    lockedBy: "Kalpana Gohil",
  },
  {
    id: "eg-3",
    title: "Lead cross-functional sprint for mobile app feedback",
    description:
      "Coordinate with product and engineering to close the top 10 user-reported issues from the last release cycle.",
    weightage: 20,
    dueDate: "2026-07-15",
    progress: 25,
    approvalStatus: "draft",
  },
  {
    id: "eg-4",
    title: "Mentor two junior analysts",
    description:
      "Conduct fortnightly 1:1s, review deliverables, and document a shared playbook for quarterly business reviews.",
    weightage: 20,
    dueDate: "2026-08-31",
    progress: 55,
    approvalStatus: "pending",
  },
]

export function calculateTotalWeightage(
  goals: EmployeeGoal[],
  excludeId?: string
): number {
  return goals
    .filter((g) => g.id !== excludeId)
    .reduce((sum, g) => sum + g.weightage, 0)
}

export function getRemainingWeightage(
  goals: EmployeeGoal[],
  excludeId?: string
): number {
  return GOAL_LIMITS.maxTotalWeightage - calculateTotalWeightage(goals, excludeId)
}

export function createEmptyFormValues(): GoalFormValues {
  return {
    title: "",
    description: "",
    weightage: "",
    dueDate: "",
  }
}

export function goalToFormValues(goal: EmployeeGoal): GoalFormValues {
  return {
    title: goal.title,
    description: goal.description,
    weightage: String(goal.weightage),
    dueDate: goal.dueDate,
  }
}

export function validateGoalForm(
  values: GoalFormValues,
  goals: EmployeeGoal[],
  editingId?: string
): GoalFormErrors {
  const errors: GoalFormErrors = {}

  if (!values.title.trim()) {
    errors.title = "Goal title is required"
  } else if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters"
  }

  if (!values.description.trim()) {
    errors.description = "Description is required"
  } else if (values.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters"
  }

  const weightage = Number(values.weightage)
  if (!values.weightage.trim()) {
    errors.weightage = "Weightage is required"
  } else if (Number.isNaN(weightage) || !Number.isInteger(weightage)) {
    errors.weightage = "Enter a whole number percentage"
  } else if (weightage < GOAL_LIMITS.minWeightagePerGoal) {
    errors.weightage = `Minimum weightage is ${GOAL_LIMITS.minWeightagePerGoal}% per goal`
  } else if (weightage > GOAL_LIMITS.maxTotalWeightage) {
    errors.weightage = `Weightage cannot exceed ${GOAL_LIMITS.maxTotalWeightage}%`
  } else {
    const otherTotal = calculateTotalWeightage(goals, editingId)
    if (otherTotal + weightage > GOAL_LIMITS.maxTotalWeightage) {
      const remaining = GOAL_LIMITS.maxTotalWeightage - otherTotal
      errors.weightage =
        remaining > 0
          ? `Total weightage cannot exceed 100%. You can allocate up to ${remaining}% more`
          : "Total weightage is already 100%. Reduce other goals before adding weightage"
    }
  }

  if (!values.dueDate) {
    errors.dueDate = "Due date is required"
  } else {
    const [y, m, d] = values.dueDate.split("-").map(Number)
    const due = new Date(y, m - 1, d)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (due < today) {
      errors.dueDate = "Due date cannot be in the past"
    }
  }

  return errors
}

export function canAddGoal(currentCount: number): string | null {
  if (currentCount >= GOAL_LIMITS.maxGoals) {
    return `Maximum ${GOAL_LIMITS.maxGoals} goals allowed. Delete an existing goal to add a new one.`
  }
  return null
}

export function formatGoalDueDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
