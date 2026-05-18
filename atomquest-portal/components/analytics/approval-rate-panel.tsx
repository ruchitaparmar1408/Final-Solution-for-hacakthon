"use client"

import { Cell, Pie, PieChart } from "recharts"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { DarkGlassPanel } from "@/components/analytics/ui/dark-glass-panel"
import { ChartPanelHeader } from "@/components/analytics/chart-panel-header"
import {
  chartGridStroke,
  chartTickStyle,
  type ApprovalMetrics,
  type ApprovalTrendPoint,
} from "@/lib/analytics-dashboard"

const PIE_COLORS = ["#10b981", "#f59e0b", "#ef4444"]

interface ApprovalRatePanelProps {
  metrics: ApprovalMetrics
  trend: ApprovalTrendPoint[]
  delay?: number
}

export function ApprovalRatePanel({
  metrics,
  trend,
  delay = 0,
}: ApprovalRatePanelProps) {
  const pieData = [
    { name: "Approved", value: metrics.approved, fill: PIE_COLORS[0] },
    { name: "Pending", value: metrics.pending, fill: PIE_COLORS[1] },
    { name: "Rejected", value: metrics.rejected, fill: PIE_COLORS[2] },
  ]

  return (
    <DarkGlassPanel animate delay={delay} glow="emerald" className="p-5 sm:p-6">
      <ChartPanelHeader
        title="Approval rate metrics"
        description="Manager decision distribution and monthly approval velocity"
      />

      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: "Approved", value: `${metrics.approvalRate}%`, color: "text-emerald-400" },
          { label: "Pending", value: `${metrics.pendingRate}%`, color: "text-amber-400" },
          { label: "Rejected", value: `${metrics.rejectionRate}%`, color: "text-red-400" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3 text-center"
          >
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
              {item.label}
            </p>
            <p className={cn("mt-1 text-xl font-bold tabular-nums", item.color)}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartContainer
          config={{
            approved: { label: "Approved", color: PIE_COLORS[0] },
            pending: { label: "Pending", color: PIE_COLORS[1] },
            rejected: { label: "Rejected", color: PIE_COLORS[2] },
          }}
          className="mx-auto h-[200px] w-full max-w-[220px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={3}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        <ChartContainer
          config={{
            rate: { label: "Approval rate %", color: "#10b981" },
          }}
          className="h-[200px] w-full"
        >
          <BarChart data={trend} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={chartTickStyle}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={chartTickStyle}
              domain={[60, 90]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="rate"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
              animationDuration={1200}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </DarkGlassPanel>
  )
}
