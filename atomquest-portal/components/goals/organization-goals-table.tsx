"use client"

import { goals } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const statusStyles: Record<string, string> = {
  "on-track": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "at-risk": "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  behind: "bg-red-500/10 text-red-700 dark:text-red-300",
  completed: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
}

export function OrganizationGoalsTable() {
  return (
    <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Organization goals — FY26 Q2
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 dark:bg-slate-900/50">
                <TableHead>Goal</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approval</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((goal) => (
                <TableRow
                  key={goal.id}
                  className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30"
                >
                  <TableCell className="max-w-[220px] font-medium">
                    {goal.name}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">
                    {goal.assignee}
                  </TableCell>
                  <TableCell>{goal.department}</TableCell>
                  <TableCell>{goal.weightage}%</TableCell>
                  <TableCell className="min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <Progress value={goal.progress} className="h-1.5 flex-1" />
                      <span className="w-9 text-xs tabular-nums text-slate-500">
                        {goal.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusStyles[goal.status] ?? ""}
                    >
                      {goal.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {goal.approvalStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
