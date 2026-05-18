"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { EmployeeGoal } from "@/lib/employee-goals"

interface DeleteGoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  goal: EmployeeGoal | null
  onConfirm: () => void
}

export function DeleteGoalDialog({
  open,
  onOpenChange,
  goal,
  onConfirm,
}: DeleteGoalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <DialogTitle>Delete this goal?</DialogTitle>
          <DialogDescription>
            {goal ? (
              <>
                You are about to remove{" "}
                <span className="font-medium text-foreground">
                  &quot;{goal.title}&quot;
                </span>
                . This action cannot be undone and will free up{" "}
                {goal.weightage}% weightage.
              </>
            ) : (
              "This action cannot be undone."
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            Delete goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
