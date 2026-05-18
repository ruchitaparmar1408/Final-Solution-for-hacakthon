"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { HelpCircle, LogOut, Search, Settings, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MenuTriggerButton } from "@/components/dashboard/ui/menu-trigger-button"
import { NotificationPanel } from "@/components/notifications/notification-panel"
import { clearAuthSession } from "@/lib/auth"
import { getSessionUserOrDefault } from "@/lib/session-user"

export function TopNav() {
  const router = useRouter()
  const user = getSessionUserOrDefault()

  function handleSignOut() {
    clearAuthSession()
    router.push("/login")
  }

  function navigate(path: string) {
    router.push(path)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md sm:px-6 dark:border-slate-800 dark:bg-slate-950/90">
      <div className="relative w-full max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          placeholder="Search goals, employees, reviews…"
          className="h-9 w-full border-slate-200 bg-slate-50/80 pl-9 text-sm transition-colors focus:bg-white dark:border-slate-700 dark:bg-slate-900/80"
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/help"
          aria-label="Help"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <HelpCircle className="h-5 w-5" />
        </Link>

        <NotificationPanel />

        <DropdownMenu>
          <MenuTriggerButton
            variant="ghost"
            className="ml-1 gap-2 px-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Avatar className="h-8 w-8 ring-2 ring-slate-200 dark:ring-slate-700">
              <AvatarFallback className="bg-blue-600 text-xs font-semibold text-white">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start text-left md:flex">
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {user.name}
              </span>
              <span className="text-xs text-slate-500">{user.roleLabel}</span>
            </div>
          </MenuTriggerButton>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs font-normal text-slate-500">
                    {user.email}
                  </span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => navigate("/profile")}
              >
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => navigate("/help")}
              >
                <HelpCircle className="h-4 w-4" />
                Help &amp; Support
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
