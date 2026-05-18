"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { GlassPanel } from "@/components/dashboard/ui/glass-panel"
import { SectionHeader } from "@/components/dashboard/ui/section-header"

interface AnalyticsChartsProps {
  data: {
    goalsByDepartment: Array<{
      department: string
      goals: number
      completed: number
    }>
    monthlyProgress: Array<{
      month: string
      progress: number
    }>
  }
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      <GlassPanel hover animate delay={0} className="p-5 sm:p-6">
        <div className="mb-6">
          <SectionHeader
            title="Goals by Department"
            description="Total goals vs completed goals"
          />
        </div>
        <ChartContainer
          config={{
            goals: { label: "Total Goals", color: "#3b82f6" },
            completed: { label: "Completed", color: "#10b981" },
          }}
          className="h-[260px] w-full sm:h-[280px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.goalsByDepartment} barGap={6}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.25)"
                vertical={false}
              />
              <XAxis
                dataKey="department"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                dy={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                dx={-8}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="goals"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                maxBarSize={36}
              />
              <Bar
                dataKey="completed"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </GlassPanel>

      <GlassPanel hover animate delay={100} className="p-5 sm:p-6">
        <div className="mb-6">
          <SectionHeader
            title="Monthly Progress Trend"
            description="Team completion rate over time"
          />
        </div>
        <ChartContainer
          config={{
            progress: { label: "Progress %", color: "#06b6d4" },
          }}
          className="h-[260px] w-full sm:h-[280px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.monthlyProgress}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.25)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                dy={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                dx={-8}
                domain={[0, 100]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#06b6d4"
                strokeWidth={2.5}
                dot={{ fill: "#06b6d4", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2, fill: "#06b6d4" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </GlassPanel>
    </div>
  )
}
