"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { MenuTriggerButton } from "@/components/dashboard/ui/menu-trigger-button"
import { cn } from "@/lib/utils"

interface Goal {
  id: string
  name: string
  weightage: number
  status: string
  progress: number
  dueDate: string
  approvalStatus: string
  assignee: string
  department: string
}

interface GoalsTableProps {
  goals: Goal[]
}

const statusConfig: Record<string, { label: string; className: string }> = {
  "on-track": {
    label: "On Track",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
  "at-risk": {
    label: "At Risk",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  },
  behind: {
    label: "Behind",
    className: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  },
}

const approvalConfig: Record<string, { label: string; className: string }> = {
  approved: {
    label: "Approved",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
  pending: {
    label: "Pending",
    className: "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  },
}

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function GoalsTable({ goals }: GoalsTableProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Goal Tracking
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor and manage employee goals across departments
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600">
          Add New Goal
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 hover:bg-transparent dark:border-slate-800">
            <TableHead className="text-slate-500 dark:text-slate-400">Goal Name</TableHead>
            <TableHead className="text-slate-500 dark:text-slate-400">Weightage</TableHead>
            <TableHead className="text-slate-500 dark:text-slate-400">Status</TableHead>
            <TableHead className="text-slate-500 dark:text-slate-400">Progress</TableHead>
            <TableHead className="text-slate-500 dark:text-slate-400">Due Date</TableHead>
            <TableHead className="text-slate-500 dark:text-slate-400">Approval</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => {
            const status = statusConfig[goal.status] || statusConfig["on-track"]
            const approval = approvalConfig[goal.approvalStatus] || approvalConfig["pending"]

            return (
              <TableRow
                key={goal.id}
                className="group border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {goal.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {goal.assignee} &bull; {goal.department}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {goal.weightage}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn("font-medium", status.className)}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Progress
                      value={goal.progress}
                      className="h-2 w-20 bg-slate-200 dark:bg-slate-700"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {goal.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">
                  {formatDate(goal.dueDate)}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn("font-medium", approval.className)}>
                    {approval.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <MenuTriggerButton
                      size="icon"
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </MenuTriggerButton>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Goal
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
