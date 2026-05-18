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
import type { DepartmentComparison } from "@/lib/analytics-dashboard"

interface DepartmentComparisonChartProps {
  data: DepartmentComparison[]
  delay?: number
}

export function DepartmentComparisonChart({
  data,
  delay = 0,
}: DepartmentComparisonChartProps) {
  return (
    <EnterpriseChartPanel animate delay={delay} className="p-5 sm:p-6">
      <ChartPanelHeader
        title="Department comparison"
        description="Goals volume, completion count, and approval rate by department"
      />
      <ChartContainer
        config={{
          goals: { label: "Total goals", color: "#8b5cf6" },
          completed: { label: "Completed", color: "#06b6d4" },
          approvalRate: { label: "Approval rate %", color: "#10b981" },
        }}
        className="h-[320px] w-full sm:h-[360px]"
      >
        <BarChart data={data} barGap={4} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} vertical={false} />
          <XAxis
            dataKey="department"
            tickLine={false}
            axisLine={false}
            tick={chartTickStyle}
            dy={8}
            interval={0}
            angle={-12}
            textAnchor="end"
            height={56}
          />
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tick={chartTickStyle}
            dx={-4}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={chartTickStyle}
            domain={[0, 100]}
            dx={4}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            yAxisId="left"
            dataKey="goals"
            fill="#8b5cf6"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
            animationDuration={1000}
          />
          <Bar
            yAxisId="left"
            dataKey="completed"
            fill="#06b6d4"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
            animationDuration={1200}
          />
          <Bar
            yAxisId="right"
            dataKey="approvalRate"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
            animationDuration={1400}
          />
        </BarChart>
      </ChartContainer>
    </EnterpriseChartPanel>
  )
}
