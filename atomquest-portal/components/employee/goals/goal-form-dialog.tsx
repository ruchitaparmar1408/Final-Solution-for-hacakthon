"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { cn } from "@/lib/utils"
import {
  type EmployeeGoal,
  type GoalFormErrors,
  type GoalFormValues,
  GOAL_LIMITS,
  createEmptyFormValues,
  getRemainingWeightage,
  goalToFormValues,
  validateGoalForm,
} from "@/lib/employee-goals"

interface GoalFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  goals: EmployeeGoal[]
  editingGoal?: EmployeeGoal | null
  onSave: (values: GoalFormValues) => void
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p
      className="animate-in fade-in slide-in-from-top-1 text-xs font-medium text-red-600 duration-200 dark:text-red-400"
      role="alert"
    >
      {message}
    </p>
  )
}

export function GoalFormDialog({
  open,
  onOpenChange,
  mode,
  goals,
  editingGoal,
  onSave,
}: GoalFormDialogProps) {
  const [values, setValues] = useState<GoalFormValues>(createEmptyFormValues())
  const [errors, setErrors] = useState<GoalFormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [shakeFields, setShakeFields] = useState(false)

  const editingId = mode === "edit" ? editingGoal?.id : undefined
  const remaining = getRemainingWeightage(goals, editingId)

  useEffect(() => {
    if (open) {
      setValues(
        mode === "edit" && editingGoal
          ? goalToFormValues(editingGoal)
          : createEmptyFormValues()
      )
      setErrors({})
      setShakeFields(false)
    }
  }, [open, mode, editingGoal])

  function updateField<K extends keyof GoalFormValues>(
    key: K,
    value: GoalFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validateGoalForm(values, goals, editingId)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setShakeFields(true)
      setTimeout(() => setShakeFields(false), 450)
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      onSave(values)
      setSubmitting(false)
      onOpenChange(false)
    }, 400)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add performance goal" : "Edit performance goal"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? `You can allocate up to ${remaining}% more weightage (min ${GOAL_LIMITS.minWeightagePerGoal}% per goal).`
              : "Update goal details. Total weightage across all goals cannot exceed 100%."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div
            className={cn(
              "space-y-2",
              shakeFields && errors.title && "animate-[shake_0.4s_ease-in-out]"
            )}
          >
            <Label htmlFor="goal-title">Goal title</Label>
            <Input
              id="goal-title"
              placeholder="e.g. Improve Q2 customer onboarding NPS"
              value={values.title}
              onChange={(e) => updateField("title", e.target.value)}
              aria-invalid={!!errors.title}
              disabled={submitting}
            />
            <FieldError message={errors.title} />
          </div>

          <div
            className={cn(
              "space-y-2",
              shakeFields &&
                errors.description &&
                "animate-[shake_0.4s_ease-in-out]"
            )}
          >
            <Label htmlFor="goal-description">Description</Label>
            <Textarea
              id="goal-description"
              placeholder="Describe measurable outcomes and success criteria…"
              value={values.description}
              onChange={(e) => updateField("description", e.target.value)}
              aria-invalid={!!errors.description}
              disabled={submitting}
              rows={3}
            />
            <FieldError message={errors.description} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className={cn(
                "space-y-2",
                shakeFields &&
                  errors.weightage &&
                  "animate-[shake_0.4s_ease-in-out]"
              )}
            >
              <Label htmlFor="goal-weightage">Weightage (%)</Label>
              <Input
                id="goal-weightage"
                type="number"
                min={GOAL_LIMITS.minWeightagePerGoal}
                max={GOAL_LIMITS.maxTotalWeightage}
                placeholder="10–100"
                value={values.weightage}
                onChange={(e) => updateField("weightage", e.target.value)}
                aria-invalid={!!errors.weightage}
                disabled={submitting}
              />
              <FieldError message={errors.weightage} />
            </div>

            <div
              className={cn(
                "space-y-2",
                shakeFields &&
                  errors.dueDate &&
                  "animate-[shake_0.4s_ease-in-out]"
              )}
            >
              <Label htmlFor="goal-due-date">Due date</Label>
              <Input
                id="goal-due-date"
                type="date"
                value={values.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
                aria-invalid={!!errors.dueDate}
                disabled={submitting}
              />
              <FieldError message={errors.dueDate} />
            </div>
          </div>

          <DialogFooter className="pt-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving…
                </>
              ) : mode === "add" ? (
                "Add goal"
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
