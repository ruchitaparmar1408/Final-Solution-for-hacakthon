"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { EnterpriseChartPanel } from "@/components/analytics/ui/enterprise-chart-panel"
import { ChartPanelHeader } from "@/components/analytics/chart-panel-header"
import { chartGridStroke, chartTickStyle } from "@/lib/analytics-dashboard"
import type { GoalCompletionPoint } from "@/lib/analytics-dashboard"

interface GoalCompletionTrendChartProps {
  data: GoalCompletionPoint[]
  delay?: number
}

export function GoalCompletionTrendChart({
  data,
  delay = 0,
}: GoalCompletionTrendChartProps) {
  return (
    <EnterpriseChartPanel animate delay={delay} className="p-5 sm:p-6">
      <ChartPanelHeader
        title="Goal completion trends"
        description="Completed vs in-progress vs not started by month"
      />
      <ChartContainer
        config={{
          completed: { label: "Completed", color: "#10b981" },
          inProgress: { label: "In progress", color: "#06b6d4" },
          notStarted: { label: "Not started", color: "#64748b" },
        }}
        className="h-[300px] w-full sm:h-[320px]"
      >
        <BarChart data={data} barGap={2} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={chartTickStyle}
            dy={8}
          />
          <YAxis tickLine={false} axisLine={false} tick={chartTickStyle} dx={-4} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="completed"
            stackId="goals"
            fill="#10b981"
            radius={[0, 0, 0, 0]}
            animationDuration={1000}
          />
          <Bar
            dataKey="inProgress"
            stackId="goals"
            fill="#06b6d4"
            animationDuration={1200}
          />
          <Bar
            dataKey="notStarted"
            stackId="goals"
            fill="#475569"
            radius={[6, 6, 0, 0]}
            animationDuration={1400}
          />
        </BarChart>
      </ChartContainer>
    </EnterpriseChartPanel>
  )
}
