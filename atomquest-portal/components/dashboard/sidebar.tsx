"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Target,
  Users,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  Building2,
  ClipboardCheck,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { currentUser } from "@/lib/data"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/manager/dashboard" },
  { icon: ClipboardCheck, label: "Goal Approvals", href: "/manager/approvals" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: Users, label: "Team Reviews", href: "/reviews" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: FileText, label: "Audit Logs", href: "/audit" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-700 px-4">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold tracking-tight">AtomQuest HR</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 text-slate-400 hover:bg-slate-800 hover:text-white",
              collapsed && "hidden"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/manager/dashboard" &&
                pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-cyan-400 shadow-lg shadow-blue-500/10"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-cyan-400")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Collapse Toggle (when collapsed) */}
        {collapsed && (
          <div className="border-t border-slate-700 p-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-8 text-slate-400 hover:bg-slate-800 hover:text-white"
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        )}

        {/* User Section */}
        {!collapsed && (
          <div className="border-t border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-semibold">
                {currentUser.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-slate-400">{currentUser.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
