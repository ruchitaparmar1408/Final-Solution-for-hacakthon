"use client"

import { useEffect, useMemo, useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip } from "@/components/ui/tooltip"
import { GoalProgressBar } from "@/components/dashboard/ui/goal-progress-bar"
import { GoalsWeightageSummary } from "@/components/employee/goals/goals-weightage-summary"
import { GoalsEmptyState } from "@/components/employee/goals/goals-empty-state"
import { GoalFormDialog } from "@/components/employee/goals/goal-form-dialog"
import { DeleteGoalDialog } from "@/components/employee/goals/delete-goal-dialog"
import { GoalLockIndicator } from "@/components/employee/goals/goal-lock-indicator"
import { GoalLockAuditFeed } from "@/components/employee/goals/goal-lock-audit-feed"
import { cn } from "@/lib/utils"
import {
  GOAL_LOCKS_UPDATED_EVENT,
  LOCK_TOOLTIP_MESSAGE,
  applyLocksToGoals,
  isGoalLocked,
} from "@/lib/goal-lock"
import {
  type EmployeeGoal,
  type GoalFormValues,
  sampleEmployeeGoals,
  canAddGoal,
  formatGoalDueDate,
  GOAL_LIMITS,
} from "@/lib/employee-goals"

export function EmployeeGoalsModule() {
  const [goals, setGoals] = useState<EmployeeGoal[]>(sampleEmployeeGoals)
  const [lockVersion, setLockVersion] = useState(0)
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"add" | "edit">("add")
  const [editingGoal, setEditingGoal] = useState<EmployeeGoal | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingGoal, setDeletingGoal] = useState<EmployeeGoal | null>(null)
  const [bannerError, setBannerError] = useState<string | null>(null)
  const [summaryShake, setSummaryShake] = useState(false)

  const displayGoals = useMemo(
    () => applyLocksToGoals(goals),
    [goals, lockVersion]
  )

  useEffect(() => {
    const refreshLocks = () => setLockVersion((v) => v + 1)
    window.addEventListener(GOAL_LOCKS_UPDATED_EVENT, refreshLocks)
    window.addEventListener("storage", refreshLocks)
    return () => {
      window.removeEventListener(GOAL_LOCKS_UPDATED_EVENT, refreshLocks)
      window.removeEventListener("storage", refreshLocks)
    }
  }, [])

  const addBlockedMessage = canAddGoal(goals.length)
  const canAdd = !addBlockedMessage
  const lockedCount = displayGoals.filter(isGoalLocked).length

  const avgProgress = useMemo(() => {
    if (displayGoals.length === 0) return 0
    return Math.round(
      displayGoals.reduce((sum, g) => sum + g.progress, 0) / displayGoals.length
    )
  }, [displayGoals])

  function triggerBannerError(message: string) {
    setBannerError(message)
    setSummaryShake(true)
    setTimeout(() => setSummaryShake(false), 450)
    setTimeout(() => setBannerError(null), 5000)
  }

  function guardLocked(goal: EmployeeGoal, action: "edit" | "delete") {
    if (isGoalLocked(goal)) {
      triggerBannerError(
        `This goal is locked and cannot be ${action === "edit" ? "edited" : "deleted"}.`
      )
      return true
    }
    return false
  }

  function openAddDialog() {
    const block = canAddGoal(goals.length)
    if (block) {
      triggerBannerError(block)
      return
    }
    setFormMode("add")
    setEditingGoal(null)
    setFormOpen(true)
  }

  function openEditDialog(goal: EmployeeGoal) {
    if (guardLocked(goal, "edit")) return
    setFormMode("edit")
    setEditingGoal(goal)
    setFormOpen(true)
  }

  function openDeleteDialog(goal: EmployeeGoal) {
    if (guardLocked(goal, "delete")) return
    setDeletingGoal(goal)
    setDeleteOpen(true)
  }

  function handleSave(values: GoalFormValues) {
    if (formMode === "edit" && editingGoal && isGoalLocked(editingGoal)) {
      triggerBannerError("This goal is locked and cannot be edited.")
      return
    }

    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      weightage: Number(values.weightage),
      dueDate: values.dueDate,
    }

    if (formMode === "add") {
      setGoals((prev) => [
        ...prev,
        {
          ...payload,
          id: `eg-${Date.now()}`,
          progress: 0,
          approvalStatus: "draft",
        },
      ])
    } else if (editingGoal) {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === editingGoal.id
            ? { ...g, ...payload, progress: g.progress }
            : g
        )
      )
    }
    setBannerError(null)
  }

  function handleDeleteConfirm() {
    if (!deletingGoal) return
    if (isGoalLocked(deletingGoal)) {
      triggerBannerError("This goal is locked and cannot be deleted.")
      return
    }
    setGoals((prev) => prev.filter((g) => g.id !== deletingGoal.id))
    setDeletingGoal(null)
    setBannerError(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            My performance goals
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create and manage goals for this review cycle. Approved goals are
            locked by your manager.
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          disabled={!canAdd}
          className="shrink-0 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add goal
        </Button>
      </div>

      {bannerError && (
        <div
          className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 duration-300 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-300"
          role="alert"
        >
          {bannerError}
        </div>
      )}

      {lockedCount > 0 && (
        <div className="animate-in fade-in rounded-lg border border-emerald-200/80 bg-emerald-50/60 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-300">
          {lockedCount} goal{lockedCount > 1 ? "s are" : " is"} locked after
          manager approval. Editing and deletion are disabled.
        </div>
      )}

      <GoalsWeightageSummary
        goals={displayGoals}
        goalCount={displayGoals.length}
        shake={summaryShake}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
          {[
            { label: "Active goals", value: String(displayGoals.length) },
            { label: "Locked (approved)", value: String(lockedCount) },
            { label: "Avg. progress", value: `${avgProgress}%` },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <GoalLockAuditFeed />
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
        <CardHeader className="border-b border-slate-200 dark:border-slate-800">
          <CardTitle className="text-base">Goal portfolio</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {displayGoals.length === 0 ? (
            <div className="p-6">
              <GoalsEmptyState onAddGoal={openAddDialog} canAdd={canAdd} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 dark:bg-slate-900/40">
                    <TableHead className="min-w-[180px] pl-6">Goal</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead className="hidden sm:table-cell">Due</TableHead>
                    <TableHead className="min-w-[9rem]">Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayGoals.map((goal) => {
                    const locked = isGoalLocked(goal)
                    return (
                      <TableRow
                        key={goal.id}
                        className={cn(
                          "group transition-colors duration-200",
                          locked
                            ? "bg-slate-50/80 opacity-80 hover:bg-slate-50/80 dark:bg-slate-900/40"
                            : "hover:bg-slate-50/60 dark:hover:bg-slate-800/30"
                        )}
                      >
                        <TableCell className="pl-6 align-top font-medium text-slate-900 dark:text-white">
                          <span
                            className={cn(locked && "text-slate-600 dark:text-slate-400")}
                          >
                            {goal.title}
                          </span>
                        </TableCell>
                        <TableCell
                          className={cn(
                            "hidden max-w-xs truncate md:table-cell",
                            locked && "text-slate-400"
                          )}
                        >
                          {goal.description}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "align-top tabular-nums font-semibold",
                            locked && "text-slate-500"
                          )}
                        >
                          {goal.weightage}%
                        </TableCell>
                        <TableCell
                          className={cn(
                            "hidden align-top text-sm sm:table-cell",
                            locked
                              ? "text-slate-400"
                              : "text-slate-600 dark:text-slate-400"
                          )}
                        >
                          {formatGoalDueDate(goal.dueDate)}
                        </TableCell>
                        <TableCell className="align-top">
                          <GoalProgressBar
                            value={goal.progress}
                            className={cn(
                              "max-w-[8rem]",
                              locked && "opacity-60"
                            )}
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <GoalLockIndicator goal={goal} />
                        </TableCell>
                        <TableCell className="pr-6 text-right align-top">
                          <div className="flex justify-end gap-1">
                            <Tooltip
                              content={
                                locked
                                  ? LOCK_TOOLTIP_MESSAGE
                                  : `Edit ${goal.title}`
                              }
                            >
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                disabled={locked}
                                onClick={() => openEditDialog(goal)}
                                aria-label={`Edit ${goal.title}`}
                                className={cn(
                                  locked &&
                                    "cursor-not-allowed opacity-40 hover:bg-transparent"
                                )}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Tooltip>
                            <Tooltip
                              content={
                                locked
                                  ? LOCK_TOOLTIP_MESSAGE
                                  : `Delete ${goal.title}`
                              }
                            >
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                disabled={locked}
                                onClick={() => openDeleteDialog(goal)}
                                aria-label={`Delete ${goal.title}`}
                                className={cn(
                                  "text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40",
                                  locked &&
                                    "cursor-not-allowed opacity-40 hover:bg-transparent hover:text-red-600/50"
                                )}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <GoalFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        goals={displayGoals}
        editingGoal={editingGoal}
        onSave={handleSave}
      />

      <DeleteGoalDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        goal={deletingGoal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
