"use client"

import { cn } from "@/lib/utils"
import { Building2, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getAuthSession, type UserRole } from "@/lib/auth"
import { getNavItemsForRole, getHomeRouteForRole } from "@/lib/navigation"
import { getSessionUserOrDefault } from "@/lib/session-user"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [role, setRole] = useState<UserRole>("manager")

  useEffect(() => {
    const session = getAuthSession()
    if (session) setRole(session.role)
  }, [])

  const menuItems = getNavItemsForRole(role)
  const user = getSessionUserOrDefault()
  const homeHref = getHomeRouteForRole(role)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-slate-900 text-white shadow-xl transition-all duration-300 ease-out",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-slate-700/80 px-4">
        <Link
          href={homeHref}
          className={cn(
            "flex items-center gap-3 transition-opacity hover:opacity-90",
            collapsed && "mx-auto"
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-md shadow-blue-600/30">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="block text-sm font-semibold tracking-tight">
                AtomQuest
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Performance
              </span>
            </div>
          )}
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:bg-slate-800 hover:text-white"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-4">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href.length > 1 &&
              pathname.startsWith(item.href) &&
              item.href !== homeHref)

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600/15 text-blue-300 shadow-sm ring-1 ring-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-white",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-colors",
                  isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {collapsed && (
        <div className="border-t border-slate-700/80 p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-full text-slate-400 hover:bg-slate-800 hover:text-white"
            onClick={() => setCollapsed(false)}
          >
            <ChevronLeft className="h-4 w-4 rotate-180" />
          </Button>
        </div>
      )}

      {!collapsed && (
        <div className="border-t border-slate-700/80 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              {user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-slate-400">{user.roleLabel}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
