"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { clearAuthSession, getAuthSession } from "@/lib/auth"

interface RoleDashboardLayoutProps {
  children: React.ReactNode
  roleLabel: string
}

export function RoleDashboardLayout({
  children,
  roleLabel,
}: RoleDashboardLayoutProps) {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    setEmail(getAuthSession()?.email ?? null)
  }, [])

  function handleSignOut() {
    clearAuthSession()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 sm:px-6">
        <Link href="/login" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            AtomQuest HR
          </span>
          <span className="hidden rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 sm:inline dark:bg-slate-800 dark:text-slate-400">
            {roleLabel}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {email && (
            <span className="hidden text-xs text-slate-500 sm:inline">{email}</span>
          )}
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}
