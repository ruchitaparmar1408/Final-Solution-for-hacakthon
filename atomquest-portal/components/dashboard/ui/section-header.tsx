import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
  size?: "page" | "section"
}

export function SectionHeader({
  title,
  description,
  className,
  size = "section",
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h2
        className={cn(
          "font-semibold tracking-tight text-slate-900 dark:text-white",
          size === "page"
            ? "text-2xl sm:text-3xl"
            : "text-lg sm:text-xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  )
}
