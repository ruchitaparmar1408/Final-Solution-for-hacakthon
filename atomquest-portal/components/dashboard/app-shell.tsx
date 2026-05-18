"use client"

import { AuthGuard } from "@/components/dashboard/auth-guard"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"

interface AppShellProps {
  title?: string
  description?: string
  children: React.ReactNode
  fullWidth?: boolean
}

export function AppShell({
  title,
  description,
  children,
  fullWidth = false,
}: AppShellProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50/80 dark:bg-slate-950">
        <Sidebar />
        <div className="pl-64 transition-all duration-300 ease-out">
          <TopNav />
          <main
            className={`animate-in fade-in duration-500 fill-mode-both p-4 sm:p-6 lg:p-8 ${
              fullWidth ? "" : "mx-auto max-w-[1600px]"
            }`}
          >
            {(title || description) && (
              <header className="mb-6 border-b border-slate-200/80 pb-6 sm:mb-8 dark:border-slate-800">
                {title && (
                  <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                    {description}
                  </p>
                )}
              </header>
            )}
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
