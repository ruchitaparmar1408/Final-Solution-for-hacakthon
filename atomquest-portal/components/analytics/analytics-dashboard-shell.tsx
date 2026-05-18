import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"

interface AnalyticsDashboardShellProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function AnalyticsDashboardShell({
  title,
  description,
  children,
}: AnalyticsDashboardShellProps) {
  return (
    <div className="dark min-h-screen bg-[#060b14] text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-15%,rgba(59,130,246,0.14),transparent),radial-gradient(ellipse_50%_40%_at_100%_50%,rgba(6,182,212,0.08),transparent),radial-gradient(ellipse_40%_30%_at_0%_80%,rgba(139,92,246,0.06),transparent)]"
      />
      <Sidebar />
      <div className="relative pl-64 transition-all duration-300">
        <TopNav />
        <main className="relative p-4 sm:p-6 lg:p-8">
          <header className="mb-6 border-b border-white/[0.06] pb-6 sm:mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500/90">
              Executive insights
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
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
