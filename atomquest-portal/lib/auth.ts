export type UserRole = "employee" | "manager" | "admin"

export interface AuthSession {
  email: string
  role: UserRole
}

const AUTH_STORAGE_KEY = "atomquest-auth"

export const roleRoutes: Record<UserRole, string> = {
  employee: "/employee/dashboard",
  manager: "/manager/dashboard",
  admin: "/admin/dashboard",
}

export const roleLabels: Record<UserRole, string> = {
  employee: "Employee",
  manager: "Manager",
  admin: "Admin",
}

export function saveAuthSession(session: AuthSession) {
  if (typeof window === "undefined") return
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null
  const raw = sessionStorage.getItem(AUTH_STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

export function clearAuthSession() {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(AUTH_STORAGE_KEY)
}
