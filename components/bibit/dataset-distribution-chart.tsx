import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"

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

const distributionChartConfig = {
  jumlah: {
    label: "Jumlah data",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

export function DatasetDistributionChart({
  metrics,
  loading,
}: {
  metrics: MetricsData | null
  loading: boolean
}) {
  const chartData = metrics
    ? [
        {
          label: "Data Latih",
          jumlah: metrics.dataset.data_training,
          fill: "var(--color-chart-2)",
        },
        {
          label: "Data Uji",
          jumlah: metrics.dataset.data_testing,
          fill: "var(--color-chart-5)",
        },
      ]
    : []

  return (
    <Card className="bg-secondary-background">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Distribusi Dataset</CardTitle>
        <CardDescription>
          Pembagian data latih dan data uji yang dipakai untuk penilaian.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[220px] sm:h-[260px]" />
        ) : metrics ? (
          <ChartContainer
            config={distributionChartConfig}
            className="h-[220px] w-full sm:h-[260px]"
          >
            <BarChart data={chartData} margin={{ top: 18, right: 8, left: -10 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                interval={0}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} width={28} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="jumlah" radius={4}>
                <LabelList
                  dataKey="jumlah"
                  position="top"
                  className="fill-foreground font-heading"
                />
                {chartData.map((item) => (
                  <Cell key={item.label} fill={item.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <EmptyState text="Data penilaian belum tersedia." />
        )}
      </CardContent>
    </Card>
  )
}
