export type NotificationType =
  | "goal_submitted"
  | "goal_approved"
  | "goal_rejected"
  | "checkin_pending"
  | "manager_comment"
  | "goal_unlocked"
  | "escalation"

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  href?: string
}

const STORAGE_KEY = "atomquest-notifications"

const seedNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "goal_submitted",
    title: "Goal submitted for review",
    message: "Dilipkumar Kalsariya submitted Product Launch Q2",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    href: "/manager/approvals",
  },
  {
    id: "n2",
    type: "checkin_pending",
    title: "Quarterly check-in due",
    message: "Q2 check-in window closes in 5 days",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
    href: "/checkins",
  },
  {
    id: "n3",
    type: "goal_approved",
    title: "Goal approved",
    message: "Revenue Growth Target was approved by Kalpana Gohil",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    href: "/goals",
  },
  {
    id: "n4",
    type: "manager_comment",
    title: "Manager comment added",
    message: "Comment on Customer Satisfaction KPI",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
    href: "/employee/dashboard",
  },
]

function load(): AppNotification[] {
  if (typeof window === "undefined") return seedNotifications
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedNotifications))
    return seedNotifications
  }
  try {
    return JSON.parse(raw) as AppNotification[]
  } catch {
    return seedNotifications
  }
}

function save(items: AppNotification[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent("atomquest-notifications-updated"))
}

export function getNotifications(): AppNotification[] {
  return load().sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

export function getUnreadCount(): number {
  return getNotifications().filter((n) => !n.read).length
}

export function markAsRead(id: string) {
  const items = load().map((n) =>
    n.id === id ? { ...n, read: true } : n
  )
  save(items)
}

export function markAllAsRead() {
  save(load().map((n) => ({ ...n, read: true })))
}

export function addNotification(
  notification: Omit<AppNotification, "id" | "read" | "timestamp"> & {
    timestamp?: string
  }
) {
  const items = load()
  const entry: AppNotification = {
    ...notification,
    id: `n-${Date.now()}`,
    read: false,
    timestamp: notification.timestamp ?? new Date().toISOString(),
  }
  save([entry, ...items].slice(0, 50))
}

export function formatNotificationTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${Math.max(1, mins)}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return days === 1 ? "Yesterday" : `${days}d ago`
}
