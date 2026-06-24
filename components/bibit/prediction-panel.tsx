import { CheckCircle2, Sprout, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { PredictionData } from "@/types/bibit"

export function PredictionPanel({
  prediction,
}: {
  prediction: PredictionData | null
}) {
  const isUnggul = prediction?.prediction.status === "Unggul"
  const Icon = prediction ? (isUnggul ? CheckCircle2 : XCircle) : Sprout

  return (
    <Card
      className={
        isUnggul
          ? "bg-main"
          : prediction
            ? "bg-chart-4 text-main-foreground"
            : "bg-secondary-background"
      }
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Icon className="size-5 sm:size-6" />
          Hasil Prediksi
        </CardTitle>
        <CardAction>
          {prediction ? (
            <Badge variant="neutral">Label {prediction.prediction.label_code}</Badge>
          ) : null}
        </CardAction>
        <CardDescription>
          {prediction
            ? "Status kelayakan berdasarkan data yang dimasukkan."
            : "Belum ada prediksi pada sesi ini."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-heading leading-none sm:text-5xl">
          {prediction?.prediction.status ?? "-"}
        </div>
        {prediction ? (
          <div className="mt-4 grid gap-3 text-sm sm:mt-5 sm:grid-cols-3">
            <ResultInput
              label="Berat Jenis"
              value={prediction.input.berat_jenis}
              unit="g/ml"
            />
            <ResultInput
              label="Panjang Benih"
              value={prediction.input.panjang_benih}
              unit="mm"
            />
            <ResultInput
              label="Usia Simpan"
              value={prediction.input.usia_simpan}
              unit="bulan"
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function ResultInput({
  label,
  value,
  unit,
}: {
  label: string
  value: number
  unit: string
}) {
  return (
    <div className="rounded-base border-2 border-border bg-secondary-background p-3 text-foreground">
      <p className="text-xs font-heading uppercase">{label}</p>
      <p className="mt-1 text-base font-heading sm:text-lg">
        {value} <span className="text-sm font-base">{unit}</span>
      </p>
    </div>
  )
}
