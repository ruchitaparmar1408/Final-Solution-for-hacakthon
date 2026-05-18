"use client"

import { ArrowDownRight, ArrowUpRight, Target, TrendingUp, CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { DarkGlassPanel } from "@/components/analytics/ui/dark-glass-panel"
import type { AnalyticsKpi, KpiAccent } from "@/lib/analytics-dashboard"

const iconMap = {
  "total-goals": Target,
  completion: TrendingUp,
  "approval-rate": CheckCircle2,
  "review-sla": Clock,
}

const accentStyles: Record<
  KpiAccent,
  { ring: string; icon: string; glow: "blue" | "cyan" | "emerald" | "violet" }
> = {
  blue: {
    ring: "ring-blue-500/20",
    icon: "bg-blue-500/15 text-blue-400",
    glow: "blue",
  },
  cyan: {
    ring: "ring-cyan-500/20",
    icon: "bg-cyan-500/15 text-cyan-400",
    glow: "cyan",
  },
  emerald: {
    ring: "ring-emerald-500/20",
    icon: "bg-emerald-500/15 text-emerald-400",
    glow: "emerald",
  },
  violet: {
    ring: "ring-violet-500/20",
    icon: "bg-violet-500/15 text-violet-400",
    glow: "violet",
  },
}

interface AnalyticsKpiCardsProps {
  kpis: AnalyticsKpi[]
}

export function AnalyticsKpiCards({ kpis }: AnalyticsKpiCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi, index) => {
        const Icon = iconMap[kpi.id as keyof typeof iconMap] ?? Target
        const accent = accentStyles[kpi.accent]
        return (
          <DarkGlassPanel
            key={kpi.id}
            hover
            animate
            delay={index * 80}
            glow={accent.glow}
            className={cn("p-5 ring-1", accent.ring)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {kpi.title}
                </p>
                <p className="text-3xl font-bold tabular-nums tracking-tight text-white">
                  {kpi.value}
                </p>
                <p className="text-xs text-slate-500">{kpi.subtitle}</p>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                    kpi.trend.isPositive
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-red-500/15 text-red-400"
                  )}
                >
                  {kpi.trend.isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {kpi.trend.value}%
                </span>
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  accent.icon
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </DarkGlassPanel>
        )
      })}
    </div>
  )
}
