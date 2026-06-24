import { AlertTriangle } from "lucide-react"

export function StatusAlert({ message }: { message: string | null }) {
  if (!message) {
    return null
  }

  return (
    <div className="flex items-start gap-3 rounded-base border-2 border-border bg-secondary-background p-3 shadow-shadow sm:p-4">
      <AlertTriangle className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="font-heading">Prediksi belum bisa digunakan</p>
        <p className="mt-1 text-sm leading-6">{message}</p>
      </div>
    </div>
  )
}
