"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import {
  actionColors,
  actionLabels,
  formatAuditTimestamp,
  getAuditLogs,
  type AuditLogEntry,
} from "@/lib/audit-log"

export function AuditLogTable() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([])
  const [query, setQuery] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")

  useEffect(() => {
    setLogs(getAuditLogs())
    const handler = () => setLogs(getAuditLogs())
    window.addEventListener("atomquest-audit-updated", handler)
    return () => window.removeEventListener("atomquest-audit-updated", handler)
  }, [])

  const filtered = useMemo(() => {
    return logs.filter((log) => {
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        log.actor.toLowerCase().includes(q) ||
        log.entity.toLowerCase().includes(q) ||
        log.department?.toLowerCase().includes(q)
      const matchesAction =
        actionFilter === "all" || log.action === actionFilter
      return matchesQuery && matchesAction
    })
  }, [logs, query, actionFilter])

  return (
    <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search actor, entity, department…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 pl-9"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="all">All actions</option>
            {Object.entries(actionLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-900/50">
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-slate-500">
                    No audit records match your filters
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((log) => (
                  <TableRow
                    key={log.id}
                    className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30"
                  >
                    <TableCell className="whitespace-nowrap text-xs text-slate-500">
                      {formatAuditTimestamp(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{log.actor}</p>
                      <p className="text-xs text-slate-500">{log.actorRole}</p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={actionColors[log.action]}
                      >
                        {actionLabels[log.action]}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] text-sm">
                      {log.entity}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {log.field ? (
                        <span>
                          {log.field}: {log.previousValue ?? "—"} →{" "}
                          {log.newValue ?? "—"}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {log.department ?? "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500">
          Showing {filtered.length} of {logs.length} records
        </p>
      </CardContent>
    </Card>
  )
}

