export function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex min-h-[180px] items-center justify-center rounded-base border-2 border-dashed border-border p-6 text-center font-heading">
      {text}
    </div>
  )
}
