"use client"

import { AppShell } from "@/components/dashboard/app-shell"
import { escalations } from "@/lib/enterprise-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const severityStyles = {
  high: "bg-red-500/10 text-red-700 dark:text-red-300",
  medium: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  low: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
}

const typeLabels = {
  submission: "Goal submission",
  approval: "Manager approval",
  checkin: "Quarterly check-in",
}

export default function AdminEscalationsPage() {
  return (
    <AppShell
      title="Escalations"
      description="Overdue submissions, pending approvals, and check-in alerts"
    >
      <div className="grid gap-4">
        {escalations.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base">{item.employee}</CardTitle>
                <p className="text-sm text-slate-500">{item.department}</p>
              </div>
              <Badge variant="secondary" className={severityStyles[item.severity]}>
                {item.severity}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <Badge variant="outline">{typeLabels[item.type]}</Badge>
                <span>{item.daysOverdue} days overdue</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  )
}
