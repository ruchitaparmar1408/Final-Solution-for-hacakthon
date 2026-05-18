"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ApprovalStatusBadge } from "@/components/manager/approvals/approval-status-badge"
import { cn } from "@/lib/utils"
import {
  formatDueDate,
  type SubmittedGoal,
  type ApprovalStatus,
} from "@/lib/manager-approvals"

export type ApprovalAction = "approve" | "reject"

interface ApprovalActionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  goal: SubmittedGoal | null
  action: ApprovalAction | null
  onConfirm: (comment: string) => void
}

export function ApprovalActionModal({
  open,
  onOpenChange,
  goal,
  action,
  onConfirm,
}: ApprovalActionModalProps) {
  const [comment, setComment] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const isApprove = action === "approve"
  const nextStatus: ApprovalStatus = isApprove ? "approved" : "rejected"

  useEffect(() => {
    if (open && goal) {
      setComment(goal.managerComment || "")
      setError(null)
      setSubmitting(false)
    }
  }, [open, goal])

  function handleConfirm() {
    if (!isApprove && !comment.trim()) {
      setError("A comment is required when rejecting a goal")
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      onConfirm(comment.trim())
      setSubmitting(false)
      onOpenChange(false)
    }, 500)
  }

  if (!goal || !action) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div
            className={cn(
              "mb-2 flex h-10 w-10 items-center justify-center rounded-full",
              isApprove ? "bg-emerald-500/10" : "bg-red-500/10"
            )}
          >
            {isApprove ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
          </div>
          <DialogTitle>
            {isApprove ? "Approve goal" : "Reject goal"}
          </DialogTitle>
          <DialogDescription>
            {isApprove
              ? "Confirm approval and optionally leave feedback for the employee."
              : "Provide a reason so the employee can revise and resubmit."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 rounded-lg border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {goal.title}
              </p>
              <p className="text-sm text-slate-500">
                {goal.employeeName} · {goal.department}
              </p>
            </div>
            <ApprovalStatusBadge status={goal.status} />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {goal.description}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Weightage: {goal.weightage}%</span>
            <span>Due: {formatDueDate(goal.dueDate)}</span>
            <span>Progress: {goal.progress}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="approval-comment">
            Manager comment{!isApprove && " *"}
          </Label>
          <Textarea
            id="approval-comment"
            placeholder={
              isApprove
                ? "Optional feedback for the employee…"
                : "Explain what needs to change…"
            }
            value={comment}
            onChange={(e) => {
              setComment(e.target.value)
              if (error) setError(null)
            }}
            aria-invalid={!!error}
            rows={3}
            disabled={submitting}
          />
          {error && (
            <p
              className="animate-in fade-in slide-in-from-top-1 text-xs font-medium text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        <DialogFooter className="sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={submitting}
            className={cn(
              isApprove
                ? "bg-emerald-600 text-white hover:bg-emerald-500"
                : "bg-red-600 text-white hover:bg-red-500"
            )}
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" />
                Processing…
              </>
            ) : isApprove ? (
              "Confirm approval"
            ) : (
              "Confirm rejection"
            )}
          </Button>
        </DialogFooter>

        <p className="text-center text-xs text-slate-500">
          Status will change to{" "}
          <span className="font-medium capitalize">{nextStatus}</span>
        </p>
      </DialogContent>
    </Dialog>
  )
}
