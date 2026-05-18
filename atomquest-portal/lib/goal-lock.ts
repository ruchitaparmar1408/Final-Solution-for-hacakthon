import type { EmployeeGoal, GoalApprovalStatus } from "@/lib/employee-goals"

export const GOAL_LOCKS_STORAGE_KEY = "atomquest-goal-locks"
export const GOAL_LOCK_AUDIT_STORAGE_KEY = "atomquest-employee-goal-audit"
export const GOAL_LOCKS_UPDATED_EVENT = "goal-locks-updated"

export interface GoalLockRecord {
  goalId: string
  goalTitle: string
  lockedAt: string
  lockedBy: string
}

export interface GoalLockAuditEntry {
  id: string
  timestamp: string
  goalId: string
  goalTitle: string
  action: "goal_locked"
  actor: string
  details: string
}

export function isGoalLocked(goal: EmployeeGoal): boolean {
  return goal.approvalStatus === "approved" && Boolean(goal.lockedAt)
}

export function getStoredLocks(): Record<string, GoalLockRecord> {
  if (typeof window === "undefined") return {}
  try {
    const raw = sessionStorage.getItem(GOAL_LOCKS_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, GoalLockRecord>) : {}
  } catch {
    return {}
  }
}

export function getEmployeeLockAuditLog(): GoalLockAuditEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = sessionStorage.getItem(GOAL_LOCK_AUDIT_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as GoalLockAuditEntry[]) : []
  } catch {
    return []
  }
}

export function lockEmployeeGoal(params: {
  goalId: string
  goalTitle: string
  lockedBy: string
}): GoalLockRecord {
  const record: GoalLockRecord = {
    goalId: params.goalId,
    goalTitle: params.goalTitle,
    lockedAt: new Date().toISOString(),
    lockedBy: params.lockedBy,
  }

  if (typeof window !== "undefined") {
    const locks = getStoredLocks()
    locks[params.goalId] = record
    sessionStorage.setItem(GOAL_LOCKS_STORAGE_KEY, JSON.stringify(locks))

    const auditEntry: GoalLockAuditEntry = {
      id: `lock-audit-${Date.now()}`,
      timestamp: record.lockedAt,
      goalId: params.goalId,
      goalTitle: params.goalTitle,
      action: "goal_locked",
      actor: params.lockedBy,
      details:
        "Goal approved by manager and locked. Editing and deletion are disabled until the next review cycle.",
    }

    const audit = getEmployeeLockAuditLog()
    sessionStorage.setItem(
      GOAL_LOCK_AUDIT_STORAGE_KEY,
      JSON.stringify([auditEntry, ...audit])
    )

    window.dispatchEvent(new CustomEvent(GOAL_LOCKS_UPDATED_EVENT))
  }

  return record
}

export function applyLocksToGoals(goals: EmployeeGoal[]): EmployeeGoal[] {
  const locks = getStoredLocks()
  return goals.map((goal) => {
    const lock = locks[goal.id]
    if (!lock) return goal
    return {
      ...goal,
      approvalStatus: "approved" as GoalApprovalStatus,
      lockedAt: lock.lockedAt,
      lockedBy: lock.lockedBy,
    }
  })
}

export function formatLockDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const LOCK_TOOLTIP_MESSAGE =
  "This goal was approved by your manager and is locked. You cannot edit or delete it until the next review cycle."
