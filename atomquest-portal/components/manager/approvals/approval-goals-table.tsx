"use client"

import { Check, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ApprovalStatusBadge } from "@/components/manager/approvals/approval-status-badge"
import { GoalProgressBar } from "@/components/dashboard/ui/goal-progress-bar"
import { cn } from "@/lib/utils"
import {
  clampProgress,
  formatDueDate,
  formatSubmittedDate,
  type SubmittedGoal,
} from "@/lib/manager-approvals"

interface ApprovalGoalsTableProps {
  goals: SubmittedGoal[]
  editingId: string | null
  draft: Partial<SubmittedGoal> | null
  onStartEdit: (goal: SubmittedGoal) => void
  onDraftChange: (patch: Partial<SubmittedGoal>) => void
  onSaveInline: (id: string) => void
  onCancelEdit: () => void
  onOpenApprove: (goal: SubmittedGoal) => void
  onOpenReject: (goal: SubmittedGoal) => void
}

export function ApprovalGoalsTable({
  goals,
  editingId,
  draft,
  onStartEdit,
  onDraftChange,
  onSaveInline,
  onCancelEdit,
  onOpenApprove,
  onOpenReject,
}: ApprovalGoalsTableProps) {
  return (
    <div className="relative max-h-[min(70vh,640px)] overflow-auto rounded-b-xl">
      <Table>
        <TableHeader className="sticky top-0 z-20 bg-slate-50/95 shadow-sm backdrop-blur-md dark:bg-slate-900/95">
          <TableRow className="border-slate-200 hover:bg-transparent dark:border-slate-800">
            <TableHead className="min-w-[180px] pl-6 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Employee
            </TableHead>
            <TableHead className="min-w-[200px] text-xs font-semibold uppercase tracking-wider text-slate-500">
              Goal
            </TableHead>
            <TableHead className="hidden text-xs font-semibold uppercase tracking-wider text-slate-500 lg:table-cell">
              Weight
            </TableHead>
            <TableHead className="hidden text-xs font-semibold uppercase tracking-wider text-slate-500 md:table-cell">
              Due
            </TableHead>
            <TableHead className="min-w-[8rem] text-xs font-semibold uppercase tracking-wider text-slate-500">
              Progress
            </TableHead>
            <TableHead className="min-w-[140px] text-xs font-semibold uppercase tracking-wider text-slate-500">
              Manager comment
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </TableHead>
            <TableHead className="pr-6 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => {
            const isEditing = editingId === goal.id
            const row = isEditing && draft ? { ...goal, ...draft } : goal
            const isPending = goal.status === "pending"

            return (
              <TableRow
                key={goal.id}
                className={cn(
                  "group border-slate-200/80 transition-colors duration-200 dark:border-slate-800",
                  isEditing && "bg-blue-50/40 dark:bg-blue-950/20",
                  !isEditing && "hover:bg-slate-50/70 dark:hover:bg-slate-800/30"
                )}
              >
                <TableCell className="pl-6 align-top">
                  <p className="font-medium text-slate-900 dark:text-white">
                    {goal.employeeName}
                  </p>
                  <p className="text-xs text-slate-500">{goal.department}</p>
                  <p className="mt-1 hidden text-[10px] text-slate-400 sm:block">
                    {formatSubmittedDate(goal.submittedAt)}
                  </p>
                </TableCell>

                <TableCell className="align-top">
                  <p className="font-medium text-slate-900 dark:text-white">
                    {goal.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                    {goal.description}
                  </p>
                </TableCell>

                <TableCell className="hidden align-top tabular-nums lg:table-cell">
                  {goal.weightage}%
                </TableCell>

                <TableCell className="hidden align-top text-sm text-slate-600 md:table-cell dark:text-slate-400">
                  {formatDueDate(goal.dueDate)}
                </TableCell>

                <TableCell className="align-top">
                  {isEditing ? (
                    <div className="flex max-w-[9rem] items-center gap-2">
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={row.progress}
                        onChange={(e) =>
                          onDraftChange({
                            progress: clampProgress(Number(e.target.value) || 0),
                          })
                        }
                        className="h-8 w-16 tabular-nums"
                        aria-label="Progress percentage"
                      />
                      <span className="text-xs text-slate-500">%</span>
                    </div>
                  ) : (
                    <GoalProgressBar value={goal.progress} className="max-w-[8rem]" />
                  )}
                </TableCell>

                <TableCell className="align-top">
                  {isEditing ? (
                    <Textarea
                      value={row.managerComment}
                      onChange={(e) =>
                        onDraftChange({ managerComment: e.target.value })
                      }
                      rows={2}
                      className="min-w-[160px] text-xs"
                      placeholder="Add manager comment…"
                    />
                  ) : (
                    <p className="max-w-[200px] text-xs text-slate-600 dark:text-slate-400">
                      {goal.managerComment || (
                        <span className="italic text-slate-400">No comment</span>
                      )}
                    </p>
                  )}
                </TableCell>

                <TableCell className="align-top">
                  <ApprovalStatusBadge status={goal.status} />
                </TableCell>

                <TableCell className="pr-6 align-top">
                  <div className="flex flex-wrap justify-end gap-1">
                    {isEditing ? (
                      <>
                        <Button
                          size="icon-sm"
                          variant="outline"
                          onClick={() => onSaveInline(goal.id)}
                          aria-label="Save changes"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={onCancelEdit}
                          aria-label="Cancel edit"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => onStartEdit(goal)}
                        >
                          Edit
                        </Button>
                        {isPending && (
                          <>
                            <Button
                              size="sm"
                              className="bg-emerald-600 text-xs text-white hover:bg-emerald-500"
                              onClick={() => onOpenApprove(goal)}
                            >
                              <Check className="h-3.5 w-3.5" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
                              onClick={() => onOpenReject(goal)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
