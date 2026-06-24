import { EmptyState } from "@/components/bibit/empty-state"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { MetricsData } from "@/types/bibit"

export function ConfusionMatrix({
  metrics,
  loading,
}: {
  metrics: MetricsData | null
  loading: boolean
}) {
  const description = metrics?.evaluation.confusion_matrix.description

  return (
    <Card className="bg-secondary-background">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Confusion Matrix</CardTitle>
        <CardDescription>
          Perbandingan hasil perhitungan dengan data uji.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[220px]" />
        ) : metrics && description ? (
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid gap-3 sm:hidden">
              <p className="text-sm font-heading">Aktual vs Prediksi</p>
              <div className="grid grid-cols-2 gap-3">
                <MatrixCell
                  actual="Tidak Unggul"
                  predicted="Tidak Unggul"
                  value={metrics.evaluation.confusion_matrix.matrix[0][0]}
                />
                <MatrixCell
                  actual="Tidak Unggul"
                  predicted="Unggul"
                  value={metrics.evaluation.confusion_matrix.matrix[0][1]}
                />
                <MatrixCell
                  actual="Unggul"
                  predicted="Tidak Unggul"
                  value={metrics.evaluation.confusion_matrix.matrix[1][0]}
                />
                <MatrixCell
                  actual="Unggul"
                  predicted="Unggul"
                  value={metrics.evaluation.confusion_matrix.matrix[1][1]}
                />
              </div>
            </div>
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[520px] border-separate border-spacing-0 text-left">
                <thead>
                  <tr>
                    <th className="border-b-2 border-border p-3" />
                    <th className="border-b-2 border-border p-3 font-heading">
                      Prediksi Tidak Unggul
                    </th>
                    <th className="border-b-2 border-border p-3 font-heading">
                      Prediksi Unggul
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <MatrixRow
                    label="Aktual Tidak Unggul"
                    first={metrics.evaluation.confusion_matrix.matrix[0][0]}
                    second={metrics.evaluation.confusion_matrix.matrix[0][1]}
                  />
                  <MatrixRow
                    label="Aktual Unggul"
                    first={metrics.evaluation.confusion_matrix.matrix[1][0]}
                    second={metrics.evaluation.confusion_matrix.matrix[1][1]}
                  />
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MatrixStat label="TN" value={description.tn} />
              <MatrixStat label="FP" value={description.fp} />
              <MatrixStat label="FN" value={description.fn} />
              <MatrixStat label="TP" value={description.tp} />
            </div>
          </div>
        ) : (
          <EmptyState text="Confusion matrix belum tersedia." />
        )}
      </CardContent>
    </Card>
  )
}

function MatrixCell({
  actual,
  predicted,
  value,
}: {
  actual: string
  predicted: string
  value: number
}) {
  return (
    <div className="rounded-base border-2 border-border bg-background p-3">
      <p className="text-[11px] font-heading uppercase leading-4">
        Aktual {actual}
      </p>
      <p className="text-[11px] leading-4">Prediksi {predicted}</p>
      <p className="mt-2 text-2xl font-heading">{value}</p>
    </div>
  )
}

function MatrixRow({
  label,
  first,
  second,
}: {
  label: string
  first: number
  second: number
}) {
  return (
    <tr>
      <th className="border-b-2 border-border p-3 font-heading">{label}</th>
      <td className="border-b-2 border-border p-3 text-2xl font-heading">
        {first}
      </td>
      <td className="border-b-2 border-border p-3 text-2xl font-heading">
        {second}
      </td>
    </tr>
  )
}

function MatrixStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-base border-2 border-border bg-background p-3 sm:p-4">
      <p className="text-sm font-heading">{label}</p>
      <p className="mt-2 text-2xl font-heading sm:text-3xl">{value}</p>
    </div>
  )
}
