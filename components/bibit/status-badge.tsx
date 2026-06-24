import { Loader2 } from "lucide-react"
import type { ComponentType } from "react"

import { Badge } from "@/components/ui/badge"

export function StatusBadge({
  icon: Icon,
  label,
  active,
  loading,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  active: boolean | undefined
  loading: boolean
}) {
  if (loading) {
    return (
      <Badge variant="neutral" className="h-9 gap-2 px-3">
        <Loader2 className="size-3.5 animate-spin" />
        Memuat
      </Badge>
    )
  }

  return (
    <Badge variant={active ? "default" : "neutral"} className="h-9 gap-2 px-3">
      <Icon className="size-3.5" />
      {label}
    </Badge>
  )
}
