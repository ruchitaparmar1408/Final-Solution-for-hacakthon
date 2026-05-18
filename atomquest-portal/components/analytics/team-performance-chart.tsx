"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { DarkGlassPanel } from "@/components/analytics/ui/dark-glass-panel"
import { ChartPanelHeader } from "@/components/analytics/chart-panel-header"
import { chartGridStroke, chartTickStyle } from "@/lib/analytics-dashboard"
import type { TeamPerformancePoint } from "@/lib/analytics-dashboard"

interface TeamPerformanceChartProps {
  data: TeamPerformancePoint[]
  delay?: number
}

export function TeamPerformanceChart({ data, delay = 0 }: TeamPerformanceChartProps) {
  return (
    <DarkGlassPanel animate delay={delay} glow="blue" className="p-5 sm:p-6">
      <ChartPanelHeader
        title="Team performance index"
        description="Overall progress vs on-track and at-risk goal distribution"
      />
      <ChartContainer
        config={{
          overall: { label: "Overall score", color: "#3b82f6" },
          onTrack: { label: "On track %", color: "#10b981" },
          atRisk: { label: "At risk %", color: "#f59e0b" },
        }}
        className="h-[300px] w-full sm:h-[320px]"
      >
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="overallFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={chartTickStyle}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={chartTickStyle}
            domain={[0, 100]}
            dx={-4}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="overall"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#overallFill)"
            animationDuration={1200}
            animationEasing="ease-out"
          />
          <Area
            type="monotone"
            dataKey="onTrack"
            stroke="#10b981"
            strokeWidth={2}
            fill="transparent"
            animationDuration={1400}
          />
          <Area
            type="monotone"
            dataKey="atRisk"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="transparent"
            animationDuration={1600}
          />
        </AreaChart>
      </ChartContainer>
    </DarkGlassPanel>
  )
}
