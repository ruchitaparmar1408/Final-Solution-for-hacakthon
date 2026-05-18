"use client"

import { Target, CheckCircle2, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  gradient: string
}

function StatCard({ title, value, subtitle, icon, trend, gradient }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:shadow-slate-900/50">
      {/* Glassmorphism overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.06]",
          gradient
        )}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </h3>
            {trend && (
              <span
                className={cn(
                  "flex items-center text-xs font-medium",
                  trend.isPositive ? "text-emerald-600" : "text-red-500"
                )}
              >
                <TrendingUp
                  className={cn("mr-0.5 h-3 w-3", !trend.isPositive && "rotate-180")}
                />
                {trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            gradient
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

interface StatsCardsProps {
  stats: {
    totalGoals: number
    approvedGoals: number
    pendingReviews: number
    teamProgress: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards: StatCardProps[] = [
    {
      title: "Total Goals",
      value: stats.totalGoals,
      subtitle: "Across all departments",
      icon: <Target className="h-6 w-6 text-white" />,
      trend: { value: 12, isPositive: true },
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Approved Goals",
      value: stats.approvedGoals,
      subtitle: "Ready for tracking",
      icon: <CheckCircle2 className="h-6 w-6 text-white" />,
      trend: { value: 8, isPositive: true },
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      subtitle: "Awaiting approval",
      icon: <Clock className="h-6 w-6 text-white" />,
      trend: { value: 5, isPositive: false },
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      title: "Team Progress",
      value: `${stats.teamProgress}%`,
      subtitle: "Overall completion rate",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      trend: { value: 15, isPositive: true },
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-500",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  )
}
