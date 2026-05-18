"use client"

import { AppShell } from "@/components/dashboard/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getSessionUserOrDefault } from "@/lib/session-user"

export default function SettingsPage() {
  const user = getSessionUserOrDefault()

  return (
    <AppShell
      title="Settings"
      description="Account preferences and notification configuration"
    >
      <div className="grid max-w-2xl gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" defaultValue={user.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept">Department</Label>
              <Input id="dept" defaultValue={user.department} />
            </div>
            <Button size="sm">Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              Goal approval updates
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              Quarterly check-in reminders
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              Manager comments
            </label>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}

