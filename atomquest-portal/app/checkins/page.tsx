"use client"

import { AppShell } from "@/components/dashboard/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const checkins = [
  { quarter: "Q1 FY26", progress: 40, status: "Completed", date: "Apr 15, 2026" },
  { quarter: "Q2 FY26", progress: 70, status: "In progress", date: "Due May 31" },
  { quarter: "Q3 FY26", progress: 0, status: "Upcoming", date: "Opens Aug 1" },
]

export default function CheckinsPage() {
  return (
    <AppShell
      title="Quarterly Check-ins"
      description="Submit and track quarterly goal progress updates"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Current window: <strong className="text-slate-900 dark:text-white">Q2 FY26</strong>
        </p>
        <Link
          href="/employee/dashboard"
          className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Submit check-in from goals
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {checkins.map((item) => (
          <Card key={item.quarter}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">{item.quarter}</CardTitle>
              <Badge variant="secondary">{item.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={item.progress} className="h-2" />
              <p className="text-2xl font-semibold tabular-nums">{item.progress}%</p>
              <p className="text-xs text-slate-500">{item.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  )
}
