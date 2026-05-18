interface ChartPanelHeaderProps {
  title: string
  description?: string
}

export function ChartPanelHeader({ title, description }: ChartPanelHeaderProps) {
  return (
    <div className="mb-5 space-y-1">
      <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  )
}
