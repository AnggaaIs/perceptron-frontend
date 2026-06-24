"use client"

import { ClassificationScoreChart } from "@/components/bibit/classification-score-chart"
import { ConfusionMatrix } from "@/components/bibit/confusion-matrix"
import { DatasetDistributionChart } from "@/components/bibit/dataset-distribution-chart"
import { MetricsSummary } from "@/components/bibit/metrics-summary"
import { PageHeader } from "@/components/bibit/page-header"
import { PredictionForm } from "@/components/bibit/prediction-form"
import { PredictionPanel } from "@/components/bibit/prediction-panel"
import { StatusAlert } from "@/components/bibit/status-alert"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useBibitClassifier } from "@/hooks/use-bibit-classifier"

export function RiceSeedClassifier() {
  const {
    form,
    formErrors,
    metrics,
    prediction,
    loadingStatus,
    submitting,
    statusError,
    loadBackendStatus,
    resetForm,
    submitPrediction,
    updateField,
  } = useBibitClassifier()

  return (
    <TooltipProvider>
      <main className="min-h-screen overflow-x-hidden bg-background">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-3 py-4 sm:gap-6 sm:px-6 sm:py-5 lg:px-8">
          <PageHeader
            loadingStatus={loadingStatus}
            onRefresh={loadBackendStatus}
          />

          <StatusAlert message={statusError} />

          <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <PredictionForm
              form={form}
              errors={formErrors}
              submitting={submitting}
              onSubmit={submitPrediction}
              onReset={resetForm}
              onUpdateField={updateField}
            />

            <section className="grid min-w-0 gap-4 sm:gap-6">
              <PredictionPanel prediction={prediction} />
              <MetricsSummary metrics={metrics} loading={loadingStatus} />
            </section>
          </div>

          <section className="grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-2">
            <DatasetDistributionChart metrics={metrics} loading={loadingStatus} />
            <ClassificationScoreChart metrics={metrics} loading={loadingStatus} />
          </section>

          <ConfusionMatrix metrics={metrics} loading={loadingStatus} />
        </section>
      </main>
    </TooltipProvider>
  )
}
