import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Target,
  Users,
  BarChart3,
  FileText,
  Settings,
  ClipboardCheck,
  Shield,
  AlertTriangle,
  CalendarCheck,
} from "lucide-react"
import type { UserRole } from "@/lib/auth"

export interface NavItem {
  icon: LucideIcon
  label: string
  href: string
}

const employeeNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/employee/dashboard" },
  { icon: Target, label: "My Goals", href: "/goals" },
  { icon: CalendarCheck, label: "Check-ins", href: "/checkins" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const managerNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/manager/dashboard" },
  { icon: ClipboardCheck, label: "Goal Approvals", href: "/manager/approvals" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: Users, label: "Team Reviews", href: "/reviews" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: FileText, label: "Audit Logs", href: "/audit" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const adminNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Admin Console", href: "/admin/dashboard" },
  { icon: Target, label: "Organization Goals", href: "/goals" },
  { icon: Users, label: "Team Reviews", href: "/reviews" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: FileText, label: "Audit Logs", href: "/audit" },
  { icon: Shield, label: "User Management", href: "/admin/users" },
  { icon: AlertTriangle, label: "Escalations", href: "/admin/escalations" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function getNavItemsForRole(role: UserRole): NavItem[] {
  switch (role) {
    case "employee":
      return employeeNav
    case "manager":
      return managerNav
    case "admin":
      return adminNav
    default:
      return employeeNav
  }
}

export function getHomeRouteForRole(role: UserRole): string {
  switch (role) {
    case "employee":
      return "/employee/dashboard"
    case "manager":
      return "/manager/dashboard"
    case "admin":
      return "/admin/dashboard"
    default:
      return "/login"
  }
}
