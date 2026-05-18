import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"

interface DashboardShellProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function DashboardShell({
  title,
  description,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <TopNav />
        <main className="p-4 sm:p-6 lg:p-8">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                {description}
              </p>
            )}
          </header>
          {children}
        </main>
      </div>
    </div>
  )
}
