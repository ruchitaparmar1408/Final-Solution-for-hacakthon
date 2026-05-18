"use client"

import { useMemo, useState } from "react"
import { ClipboardList, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApprovalGoalsTable } from "@/components/manager/approvals/approval-goals-table"
import { ApprovalActivityFeed } from "@/components/manager/approvals/approval-activity-feed"
import {
  ApprovalActionModal,
  type ApprovalAction,
} from "@/components/manager/approvals/approval-action-modal"
import { cn } from "@/lib/utils"
import { currentUser } from "@/lib/data"
import { lockEmployeeGoal } from "@/lib/goal-lock"
import {
  type ApprovalActivity,
  type ApprovalFilter,
  type SubmittedGoal,
  mockInitialActivities,
  mockSubmittedGoals,
} from "@/lib/manager-approvals"

const filterOptions: { value: ApprovalFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

export function ManagerApprovalModule() {
  const [goals, setGoals] = useState<SubmittedGoal[]>(mockSubmittedGoals)
  const [activities, setActivities] = useState<ApprovalActivity[]>(
    mockInitialActivities
  )
  const [filter, setFilter] = useState<ApprovalFilter>("pending")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<SubmittedGoal> | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalGoal, setModalGoal] = useState<SubmittedGoal | null>(null)
  const [modalAction, setModalAction] = useState<ApprovalAction | null>(null)

  const filteredGoals = useMemo(() => {
    if (filter === "all") return goals
    return goals.filter((g) => g.status === filter)
  }, [goals, filter])

  const counts = useMemo(
    () => ({
      all: goals.length,
      pending: goals.filter((g) => g.status === "pending").length,
      approved: goals.filter((g) => g.status === "approved").length,
      rejected: goals.filter((g) => g.status === "rejected").length,
    }),
    [goals]
  )

  function prependActivity(
    goal: SubmittedGoal,
    action: string,
    status: ApprovalActivity["status"],
    details?: string
  ) {
    const entry: ApprovalActivity = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentUser.name,
      action,
      goalTitle: goal.title,
      employeeName: goal.employeeName,
      status,
      details,
    }
    setActivities((prev) => [entry, ...prev])
  }

  function handleStartEdit(goal: SubmittedGoal) {
    setEditingId(goal.id)
    setDraft({
      progress: goal.progress,
      managerComment: goal.managerComment,
    })
  }

  function handleSaveInline(id: string) {
    if (!draft) return
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              progress: draft.progress ?? g.progress,
              managerComment: draft.managerComment ?? g.managerComment,
            }
          : g
      )
    )
    const goal = goals.find((g) => g.id === id)
    if (goal) {
      prependActivity(
        { ...goal, ...draft },
        "updated inline fields",
        "updated",
        `Progress set to ${draft.progress ?? goal.progress}%`
      )
    }
    setEditingId(null)
    setDraft(null)
  }

  function handleCancelEdit() {
    setEditingId(null)
    setDraft(null)
  }

  function openModal(goal: SubmittedGoal, action: ApprovalAction) {
    setModalGoal(goal)
    setModalAction(action)
    setModalOpen(true)
  }

  function handleModalConfirm(comment: string) {
    if (!modalGoal || !modalAction) return

    const status = modalAction === "approve" ? "approved" : "rejected"
    setGoals((prev) =>
      prev.map((g) =>
        g.id === modalGoal.id
          ? { ...g, status, managerComment: comment || g.managerComment }
          : g
      )
    )
    prependActivity(
      modalGoal,
      modalAction === "approve" ? "approved goal" : "rejected goal",
      status,
      comment || undefined
    )

    if (modalAction === "approve" && modalGoal.employeeGoalId) {
      lockEmployeeGoal({
        goalId: modalGoal.employeeGoalId,
        goalTitle: modalGoal.title,
        lockedBy: currentUser.name,
      })
      prependActivity(
        modalGoal,
        "locked employee goal after approval",
        "locked",
        `Portfolio goal ${modalGoal.employeeGoalId} is now read-only for the employee.`
      )
    }

    setModalGoal(null)
    setModalAction(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Pending review", value: counts.pending, tone: "text-amber-600" },
          { label: "Approved", value: counts.approved, tone: "text-emerald-600" },
          { label: "Rejected", value: counts.rejected, tone: "text-red-600" },
          { label: "Total submissions", value: counts.all, tone: "text-slate-900 dark:text-white" },
        ].map((stat) => (
          <Card
            key={stat.label}
            className="animate-in fade-in slide-in-from-bottom-2 border-slate-200/80 shadow-sm duration-500 dark:border-slate-800"
          >
            <CardContent className="pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className={cn("mt-1 text-2xl font-bold tabular-nums", stat.tone)}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden border-slate-200/80 shadow-sm xl:col-span-2 dark:border-slate-800">
          <CardHeader className="flex flex-col gap-4 border-b border-slate-200/80 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
              <div>
                <CardTitle className="text-base">Submitted goals</CardTitle>
                <p className="text-xs text-slate-500">
                  Review, edit progress, and approve or reject inline
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Filter className="mr-1 hidden h-4 w-4 text-slate-400 sm:block" />
              {filterOptions.map((opt) => (
                <Button
                  key={opt.value}
                  size="sm"
                  variant={filter === opt.value ? "default" : "outline"}
                  className={cn(
                    "text-xs",
                    filter === opt.value &&
                      "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  )}
                  onClick={() => setFilter(opt.value)}
                >
                  {opt.label}
                  <span className="ml-1 tabular-nums opacity-70">
                    ({counts[opt.value]})
                  </span>
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredGoals.length === 0 ? (
              <div className="animate-in fade-in px-6 py-16 text-center">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  No goals in this view
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Try another filter or wait for employee submissions
                </p>
              </div>
            ) : (
              <ApprovalGoalsTable
                goals={filteredGoals}
                editingId={editingId}
                draft={draft}
                onStartEdit={handleStartEdit}
                onDraftChange={(patch) =>
                  setDraft((prev) => ({ ...prev, ...patch }))
                }
                onSaveInline={handleSaveInline}
                onCancelEdit={handleCancelEdit}
                onOpenApprove={(g) => openModal(g, "approve")}
                onOpenReject={(g) => openModal(g, "reject")}
              />
            )}
          </CardContent>
        </Card>

        <ApprovalActivityFeed activities={activities} />
      </div>

      <ApprovalActionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        goal={modalGoal}
        action={modalAction}
        onConfirm={handleModalConfirm}
      />
    </div>
  )
}
