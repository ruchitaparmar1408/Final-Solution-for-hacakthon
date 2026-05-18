import { Plus, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GoalsEmptyStateProps {
  onAddGoal: () => void
  canAdd: boolean
}

export function GoalsEmptyState({ onAddGoal, canAdd }: GoalsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900/30">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
        <Target className="h-7 w-7 text-blue-600 dark:text-cyan-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        No goals yet
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        Define your performance objectives for this cycle. Each goal needs at
        least 10% weightage, and the total cannot exceed 100%.
      </p>
      <Button
        className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400"
        onClick={onAddGoal}
        disabled={!canAdd}
      >
        <Plus className="h-4 w-4" />
        Create your first goal
      </Button>
    </div>
  )
}
