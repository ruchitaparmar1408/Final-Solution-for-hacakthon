"use client"

import * as React from "react"

interface DashboardContextValue {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  isMobile: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const DashboardContext = React.createContext<DashboardContextValue | null>(null)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    const update = () => {
      const mobile = mq.matches
      setIsMobile(mobile)
      if (!mobile) setMobileMenuOpen(false)
    }
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setMobileMenuOpen((prev) => !prev)
    } else {
      setSidebarCollapsed((prev) => !prev)
    }
  }, [isMobile])

  const value = React.useMemo(
    () => ({
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebar,
      isMobile,
      mobileMenuOpen,
      setMobileMenuOpen,
    }),
    [sidebarCollapsed, toggleSidebar, isMobile, mobileMenuOpen]
  )

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  )
}

export function useDashboard() {
  const ctx = React.useContext(DashboardContext)
  if (!ctx) {
    throw new Error("useDashboard must be used within DashboardProvider")
  }
  return ctx
}
