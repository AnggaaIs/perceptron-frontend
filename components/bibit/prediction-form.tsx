import { Activity, Loader2, ScanSearch } from "lucide-react"
import type { FormEvent } from "react"

import { FieldInput } from "@/components/bibit/field-input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { FormInputErrors, FormInputValues } from "@/types/bibit"

export function PredictionForm({
  form,
  errors,
  submitting,
  onSubmit,
  onReset,
  onUpdateField,
}: {
  form: FormInputValues
  errors: FormInputErrors
  submitting: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onReset: () => void
  onUpdateField: (field: keyof FormInputValues, value: string) => void
}) {
  return (
    <Card className="bg-secondary-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <ScanSearch className="size-5 sm:size-6" />
          Data Bibit
        </CardTitle>
        <CardDescription>
          Isi nilai sesuai hasil pengukuran benih.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={onSubmit}>
          <FieldInput
            id="berat-jenis"
            label="Berat jenis"
            unit="g/ml"
            value={form.berat_jenis}
            error={errors.berat_jenis}
            onChange={(value) => onUpdateField("berat_jenis", value)}
          />
          <FieldInput
            id="panjang-benih"
            label="Panjang benih"
            unit="mm"
            value={form.panjang_benih}
            error={errors.panjang_benih}
            onChange={(value) => onUpdateField("panjang_benih", value)}
          />
          <FieldInput
            id="usia-simpan"
            label="Usia penyimpanan"
            unit="bulan"
            value={form.usia_simpan}
            error={errors.usia_simpan}
            onChange={(value) => onUpdateField("usia_simpan", value)}
          />

          <div className="grid gap-3 pt-1 sm:grid-cols-[1fr_auto] sm:pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full"
            >
              {submitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Activity />
              )}
              Prediksi Bibit
            </Button>
            <Button
              type="button"
              size="lg"
              variant="neutral"
              onClick={onReset}
              className="w-full sm:w-auto"
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
