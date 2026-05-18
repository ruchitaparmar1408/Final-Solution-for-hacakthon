export type AuditAction =
  | "create"
  | "update"
  | "approve"
  | "reject"
  | "lock"
  | "unlock"
  | "submit"
  | "checkin"
  | "escalation"

export interface AuditLogEntry {
  id: string
  actor: string
  actorRole: string
  action: AuditAction
  entity: string
  field?: string
  previousValue?: string
  newValue?: string
  timestamp: string
  department?: string
}

const STORAGE_KEY = "atomquest-audit-logs"

export const seedAuditLogs: AuditLogEntry[] = [
  {
    id: "a1",
    actor: "Kalpana Gohil",
    actorRole: "Manager",
    action: "approve",
    entity: "Revenue Growth Target",
    field: "status",
    previousValue: "pending",
    newValue: "approved",
    timestamp: "2026-05-17T09:15:00Z",
    department: "Sales",
  },
  {
    id: "a2",
    actor: "Dilipkumar Kalsariya",
    actorRole: "Employee",
    action: "submit",
    entity: "Product Launch Q2",
    timestamp: "2026-05-17T08:42:00Z",
    department: "Engineering",
  },
  {
    id: "a3",
    actor: "Nishant Singh",
    actorRole: "Admin",
    action: "unlock",
    entity: "Incident Reduction Goal",
    field: "locked",
    previousValue: "true",
    newValue: "false",
    timestamp: "2026-05-16T14:20:00Z",
    department: "Operations",
  },
  {
    id: "a4",
    actor: "Prachi Shukla",
    actorRole: "Employee",
    action: "checkin",
    entity: "Customer Satisfaction KPI",
    field: "progress",
    previousValue: "62%",
    newValue: "78%",
    timestamp: "2026-05-16T11:05:00Z",
    department: "Customer Success",
  },
  {
    id: "a5",
    actor: "Kalpana Gohil",
    actorRole: "Manager",
    action: "reject",
    entity: "Support SLA Improvement",
    field: "status",
    previousValue: "pending",
    newValue: "rejected",
    timestamp: "2026-05-15T16:30:00Z",
    department: "Support",
  },
  {
    id: "a6",
    actor: "Harshitha Chaudhary",
    actorRole: "Employee",
    action: "create",
    entity: "Hiring Efficiency Q2",
    timestamp: "2026-05-15T10:00:00Z",
    department: "HR",
  },
  {
    id: "a7",
    actor: "System",
    actorRole: "System",
    action: "escalation",
    entity: "Quarterly check-in overdue",
    newValue: "Bobby Prashant — Delivery SLA",
    timestamp: "2026-05-14T08:00:00Z",
    department: "IT",
  },
  {
    id: "a8",
    actor: "Bobby Prashant",
    actorRole: "Employee",
    action: "update",
    entity: "Delivery SLA Compliance",
    field: "progress",
    previousValue: "45%",
    newValue: "58%",
    timestamp: "2026-05-13T13:22:00Z",
    department: "IT",
  },
]

function load(): AuditLogEntry[] {
  if (typeof window === "undefined") return seedAuditLogs
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAuditLogs))
    return seedAuditLogs
  }
  try {
    return JSON.parse(raw) as AuditLogEntry[]
  } catch {
    return seedAuditLogs
  }
}

function save(entries: AuditLogEntry[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  window.dispatchEvent(new CustomEvent("atomquest-audit-updated"))
}

export function getAuditLogs(): AuditLogEntry[] {
  return load().sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

export function appendAuditLog(
  entry: Omit<AuditLogEntry, "id" | "timestamp"> & { timestamp?: string }
) {
  const logs = load()
  const newEntry: AuditLogEntry = {
    ...entry,
    id: `a-${Date.now()}`,
    timestamp: entry.timestamp ?? new Date().toISOString(),
  }
  save([newEntry, ...logs].slice(0, 200))
}

export function formatAuditTimestamp(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const actionLabels: Record<AuditAction, string> = {
  create: "Created",
  update: "Updated",
  approve: "Approved",
  reject: "Rejected",
  lock: "Locked",
  unlock: "Unlocked",
  submit: "Submitted",
  checkin: "Check-in",
  escalation: "Escalation",
}

export const actionColors: Record<AuditAction, string> = {
  create: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  update: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
  approve: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  reject: "bg-red-500/10 text-red-700 dark:text-red-300",
  lock: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  unlock: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  submit: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  checkin: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  escalation: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
}
