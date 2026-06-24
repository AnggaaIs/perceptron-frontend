import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { EmptyState } from "@/components/bibit/empty-state"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import type { MetricsData } from "@/types/bibit"

const scoreChartConfig = {
  precision: {
    label: "Precision",
    color: "var(--color-chart-1)",
  },
  recall: {
    label: "Recall",
    color: "var(--color-chart-2)",
  },
  f1_score: {
    label: "F1-score",
    color: "var(--color-chart-5)",
  },
} satisfies ChartConfig

export function ClassificationScoreChart({
  metrics,
  loading,
}: {
  metrics: MetricsData | null
  loading: boolean
}) {
  const chartData = metrics
    ? [
        {
          label: "Tidak Unggul",
          ...metrics.evaluation.classification_report["Tidak Unggul"],
        },
        {
          label: "Unggul",
          ...metrics.evaluation.classification_report.Unggul,
        },
      ]
    : []

  return (
    <Card className="bg-secondary-background">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Skor Klasifikasi</CardTitle>
        <CardDescription>
          Ringkasan ketepatan hasil untuk kategori unggul dan tidak unggul.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[220px] sm:h-[260px]" />
        ) : metrics ? (
          <ChartContainer
            config={scoreChartConfig}
            className="h-[220px] w-full sm:h-[260px]"
          >
            <BarChart data={chartData} margin={{ top: 12, right: 8, left: -10 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                interval={0}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={28}
                domain={[0, 1]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="precision"
                fill="var(--color-precision)"
                radius={4}
              />
              <Bar dataKey="recall" fill="var(--color-recall)" radius={4} />
              <Bar
                dataKey="f1_score"
                fill="var(--color-f1_score)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <EmptyState text="Skor evaluasi belum tersedia." />
        )}
      </CardContent>
    </Card>
  )
}
