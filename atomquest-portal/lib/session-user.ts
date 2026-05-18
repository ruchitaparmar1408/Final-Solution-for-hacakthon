import type { UserRole } from "@/lib/auth"
import { getAuthSession } from "@/lib/auth"

export interface SessionUser {
  name: string
  email: string
  role: UserRole
  roleLabel: string
  department: string
  initials: string
}

const profiles: Record<
  UserRole,
  Omit<SessionUser, "email" | "role" | "roleLabel">
> = {
  employee: {
    name: "Ruchita Parmar",
    department: "Sales",
    initials: "RP",
  },
  manager: {
    name: "Kalpana Gohil",
    department: "Human Resources",
    initials: "KG",
  },
  admin: {
    name: "Nishant Singh",
    department: "Operations",
    initials: "NS",
  },
}

const roleLabels: Record<UserRole, string> = {
  employee: "Employee",
  manager: "Manager",
  admin: "Administrator",
}

export function getSessionUser(): SessionUser | null {
  const session = getAuthSession()
  if (!session) return null

  const profile = profiles[session.role]
  return {
    email: session.email,
    role: session.role,
    roleLabel: roleLabels[session.role],
    ...profile,
  }
}

export function getSessionUserOrDefault(): SessionUser {
  return (
    getSessionUser() ?? {
      name: "Guest User",
      email: "guest@atomquest.in",
      role: "employee",
      roleLabel: "Employee",
      department: "—",
      initials: "GU",
    }
  )
}
