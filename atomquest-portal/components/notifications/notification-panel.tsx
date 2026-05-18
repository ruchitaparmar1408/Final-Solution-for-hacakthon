"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, CheckCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MenuTriggerButton } from "@/components/dashboard/ui/menu-trigger-button"
import {
  formatNotificationTime,
  getNotifications,
  getUnreadCount,
  markAllAsRead,
  markAsRead,
  type AppNotification,
} from "@/lib/notifications"
import { cn } from "@/lib/utils"

export function NotificationPanel() {
  const router = useRouter()
  const [items, setItems] = useState<AppNotification[]>([])
  const [unread, setUnread] = useState(0)

  function refresh() {
    setItems(getNotifications())
    setUnread(getUnreadCount())
  }

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    window.addEventListener("atomquest-notifications-updated", handler)
    return () => window.removeEventListener("atomquest-notifications-updated", handler)
  }, [])

  function handleOpenChange(open: boolean) {
    if (open) refresh()
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <MenuTriggerButton
        size="icon"
        className="relative text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <Badge className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full border-0 bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unread > 9 ? "9+" : unread}
          </Badge>
        )}
      </MenuTriggerButton>
      <DropdownMenuContent align="end" className="w-[360px] p-0">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Notifications
          </p>
          {unread > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs text-slate-500"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                markAllAsRead()
                refresh()
              }}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        <div className="max-h-[280px] overflow-y-auto">
          {items.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              No notifications
            </p>
          ) : (
            items.map((n) => (
              <NotificationRow
                key={n.id}
                notification={n}
                onRead={() => {
                  markAsRead(n.id)
                  refresh()
                }}
              />
            ))
          )}
        </div>

        <DropdownMenuGroup className="border-t border-slate-100 p-1 dark:border-slate-800">
          <DropdownMenuItem
            className="cursor-pointer justify-center text-center text-blue-600"
            onClick={() => router.push("/notifications")}
          >
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function NotificationRow({
  notification,
  onRead,
}: {
  notification: AppNotification
  onRead: () => void
}) {
  const content = (
    <div
      className={cn(
        "flex flex-col gap-0.5 px-4 py-3 transition-colors",
        !notification.read && "bg-blue-50/50 dark:bg-blue-950/20"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          {notification.title}
        </span>
        {!notification.read && (
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
        )}
      </div>
      <span className="text-xs text-slate-500">{notification.message}</span>
      <span className="text-[11px] text-slate-400">
        {formatNotificationTime(notification.timestamp)}
      </span>
    </div>
  )

  if (notification.href) {
    return (
      <Link
        href={notification.href}
        onClick={() => {
          if (!notification.read) onRead()
        }}
        className="block border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50"
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className="w-full border-b border-slate-100 text-left last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50"
      onClick={() => {
        if (!notification.read) onRead()
      }}
    >
      {content}
    </button>
  )
}

