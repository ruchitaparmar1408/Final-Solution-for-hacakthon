"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Activity {
  id: string
  user: string
  action: string
  target: string
  time: string
  avatar: string
}

interface RecentActivityProps {
  activities: Activity[]
}

const avatarGradients = [
  "bg-gradient-to-br from-blue-500 to-cyan-400",
  "bg-gradient-to-br from-emerald-500 to-teal-400",
  "bg-gradient-to-br from-amber-500 to-orange-400",
  "bg-gradient-to-br from-pink-500 to-rose-400",
  "bg-gradient-to-br from-indigo-500 to-purple-400",
]

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Recent Activity
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Latest updates from your team
        </p>
      </div>
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback
                className={`${avatarGradients[index % avatarGradients.length]} text-white text-sm font-medium`}
              >
                {activity.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-900 dark:text-white">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  {activity.action}
                </span>{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {activity.target}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 px-6 py-3 dark:border-slate-800">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          View all activity
        </button>
      </div>
    </div>
  )
}
