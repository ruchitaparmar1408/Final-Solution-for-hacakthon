import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { statusConfig, type ApprovalStatus } from "@/lib/manager-approvals"

interface ApprovalStatusBadgeProps {
  status: ApprovalStatus
  className?: string
}

export function ApprovalStatusBadge({ status, className }: ApprovalStatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge
      variant="outline"
      className={cn("font-medium transition-colors duration-200", config.className, className)}
    >
      <span
        className={cn(
          "mr-1.5 inline-block h-1.5 w-1.5 rounded-full",
          status === "pending" && "bg-amber-500",
          status === "approved" && "bg-emerald-500",
          status === "rejected" && "bg-red-500"
        )}
      />
      {config.label}
    </Badge>
  )
}
