"use client"

import { AppShell } from "@/components/dashboard/app-shell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSessionUserOrDefault } from "@/lib/session-user"

export default function ProfilePage() {
  const user = getSessionUserOrDefault()

  return (
    <AppShell title="Profile" description="Your account and role information">
      <Card className="max-w-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-600 text-lg text-white">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-sm text-slate-500">{user.email}</p>
              <Badge variant="secondary" className="mt-2">
                {user.roleLabel}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-100 py-2 dark:border-slate-800">
            <span className="text-slate-500">Department</span>
            <span className="font-medium">{user.department}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 py-2 dark:border-slate-800">
            <span className="text-slate-500">Review cycle</span>
            <span className="font-medium">FY26 Q2</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-500">Manager</span>
            <span className="font-medium">Kalpana Gohil</span>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  )
}
