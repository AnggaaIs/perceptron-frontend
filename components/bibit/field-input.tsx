import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function FieldInput({
  id,
  label,
  unit,
  value,
  error,
  onChange,
}: {
  id: string
  label: string
  unit: string
  value: string
  error?: string
  onChange: (value: string) => void
}) {
  const errorId = `${id}-error`

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        <Badge variant="neutral">{unit}</Badge>
      </div>
      <Input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          error &&
            "border-red-950 bg-red-100 text-red-950 focus-visible:ring-red-950",
        )}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} className="text-sm font-heading leading-5 text-red-950">
          {error}
        </p>
      ) : null}
    </div>
  )
}
