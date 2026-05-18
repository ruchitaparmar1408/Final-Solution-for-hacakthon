"use client"

import type { ReactNode } from "react"
import { Shield, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/auth"
import { roleLabels } from "@/lib/auth"

const roles: {
  value: UserRole
  label: string
  description: string
  icon: typeof User
}[] = [
  {
    value: "employee",
    label: roleLabels.employee,
    description: "View goals & submit updates",
    icon: User,
  },
  {
    value: "manager",
    label: roleLabels.manager,
    description: "Team reviews & approvals",
    icon: Users,
  },
  {
    value: "admin",
    label: roleLabels.admin,
    description: "Org-wide settings & audit",
    icon: Shield,
  },
]

interface RoleSelectorProps {
  value: UserRole
  onChange: (role: UserRole) => void
  error?: string
}

export function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <LabelRow>Sign in as</LabelRow>
      <div
        className="grid gap-2 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Select your role"
        aria-invalid={!!error}
      >
        {roles.map((role) => {
          const selected = value === role.value
          const Icon = role.icon
          return (
            <button
              key={role.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(role.value)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border px-3 py-3 text-left transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50",
                selected
                  ? "border-cyan-500/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  selected ? "text-cyan-400" : "text-slate-400"
                )}
              />
              <span
                className={cn(
                  "text-sm font-semibold",
                  selected ? "text-white" : "text-slate-200"
                )}
              >
                {role.label}
              </span>
              <span className="text-[11px] leading-snug text-slate-500">
                {role.description}
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <p className="text-xs font-medium text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function LabelRow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-medium text-slate-300">{children}</p>
  )
}
