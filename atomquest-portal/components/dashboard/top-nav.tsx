"use client"

import { Bell, Search, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MenuTriggerButton } from "@/components/dashboard/ui/menu-trigger-button"
import { currentUser } from "@/lib/data"

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="relative w-96 max-w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          placeholder="Search goals, employees, reviews..."
          className="h-10 w-full border-slate-200 bg-slate-50 pl-10 focus:bg-white dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <MenuTriggerButton
            size="icon"
            className="relative text-slate-500 hover:text-slate-900"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 p-0 text-[10px] text-white">
              3
            </Badge>
          </MenuTriggerButton>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">New goal submitted for review</span>
              <span className="text-xs text-slate-500">
                Dilipkumar Kalsariya submitted &quot;Product Launch&quot; — 2h ago
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Goal deadline approaching</span>
              <span className="text-xs text-slate-500">
                &quot;Q2 Sales Target&quot; due in 3 days
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Review cycle started</span>
              <span className="text-xs text-slate-500">
                Q2 Performance Review is now active
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <MenuTriggerButton variant="ghost" className="ml-2 gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-xs text-white">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start text-left md:flex">
              <span className="text-sm font-medium">{currentUser.name}</span>
              <span className="text-xs text-slate-500">{currentUser.role}</span>
            </div>
          </MenuTriggerButton>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
