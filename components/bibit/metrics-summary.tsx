import { Activity, AlertTriangle, BarChart3, CheckCircle2, Database } from "lucide-react"

import { MetricTile } from "@/components/bibit/metric-tile"
import type { MetricsData } from "@/types/bibit"

export function MetricsSummary({
  metrics,
  loading,
}: {
  metrics: MetricsData | null
  loading: boolean
}) {
  return (
    <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <MetricTile
        label="Akurasi"
        value={loading ? null : metrics ? `${metrics.evaluation.accuracy}%` : "-"}
        icon={CheckCircle2}
      />
      <MetricTile
        label="Error Rate"
        value={loading ? null : metrics ? `${metrics.evaluation.error_rate}%` : "-"}
        icon={AlertTriangle}
      />
      <MetricTile
        label="MAE"
        value={loading ? null : metrics ? metrics.evaluation.mae.toFixed(4) : "-"}
        icon={BarChart3}
      />
      <MetricTile
        label="MSE"
        value={loading ? null : metrics ? metrics.evaluation.mse.toFixed(4) : "-"}
        icon={BarChart3}
      />
      <MetricTile
        label="RMSE"
        value={loading ? null : metrics ? metrics.evaluation.rmse.toFixed(4) : "-"}
        icon={BarChart3}
      />
      <MetricTile
        label="Total Data"
        value={loading ? null : metrics ? metrics.dataset.total_data.toString() : "-"}
        icon={Database}
      />
      <MetricTile
        label="Data Uji"
        value={loading ? null : metrics ? metrics.dataset.data_testing.toString() : "-"}
        icon={Database}
      />
      <MetricTile
        label="Epoch Training"
        value={
          loading
            ? null
            : metrics?.training
              ? metrics.training.epoch_dilakukan.toString()
              : "-"
        }
        description="epoch"
        icon={Activity}
      />
    </div>
  )
}
