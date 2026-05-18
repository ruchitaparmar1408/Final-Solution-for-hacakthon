"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/dashboard/app-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  formatNotificationTime,
  getNotifications,
  markAllAsRead,
  markAsRead,
  type AppNotification,
} from "@/lib/notifications"
import { cn } from "@/lib/utils"

export default function NotificationsPage() {
  const [items, setItems] = useState<AppNotification[]>([])

  useEffect(() => {
    setItems(getNotifications())
  }, [])

  return (
    <AppShell
      title="Notifications"
      description="Activity alerts for goals, approvals, and check-ins"
    >
      <div className="mb-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            markAllAsRead()
            setItems(getNotifications())
          }}
        >
          Mark all as read
        </Button>
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-sm text-slate-500">
              No notifications yet
            </CardContent>
          </Card>
        ) : (
          items.map((n) => (
            <Card
              key={n.id}
              className={cn(
                "transition-shadow hover:shadow-sm",
                !n.read && "border-blue-200/60 bg-blue-50/30 dark:border-blue-900/40 dark:bg-blue-950/20"
              )}
            >
              <CardContent className="flex items-start justify-between gap-4 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {n.title}
                    </p>
                    {!n.read && (
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{n.message}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {formatNotificationTime(n.timestamp)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  {n.href && (
                    <Link
                      href={n.href}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  )}
                  {!n.read && (
                    <button
                      type="button"
                      className="text-xs text-slate-500 hover:text-slate-900"
                      onClick={() => {
                        markAsRead(n.id)
                        setItems(getNotifications())
                      }}
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </AppShell>
  )
}
