import type { ComponentType } from "react"

import { Skeleton } from "@/components/ui/skeleton"

export function MetricTile({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string
  value: string | null
  description?: string
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="h-fit min-h-28 self-start rounded-base border-2 border-border bg-secondary-background p-3 shadow-shadow">
      <div className="flex items-start justify-between gap-3">
        <p className="font-heading text-sm leading-tight sm:text-base">{label}</p>
        <Icon className="size-5 shrink-0" />
      </div>
      {value === null ? (
        <Skeleton className="mt-4 h-9 w-24" />
      ) : (
        <>
          <p className="mt-3 whitespace-nowrap text-[clamp(1.65rem,2.1vw,2.25rem)] font-heading leading-tight">
            {value}
          </p>
          {description ? (
            <p className="mt-1 text-xs font-base sm:text-sm">{description}</p>
          ) : null}
        </>
      )}
    </div>
  )
}
