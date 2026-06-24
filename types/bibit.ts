export type ApiResponse<T> = {
  success: boolean
  status_code: number
  message: string
  data: T
  errors?: unknown
}

export type HealthData = {
  status: string
  model_loaded: boolean
  metrics_available: boolean
}

export type PredictionData = {
  input: FormValues
  prediction: {
    status: "Unggul" | "Tidak Unggul"
    label_code: 0 | 1
  }
}

export type MetricsData = {
  training?: {
    model: string
    epoch_dilakukan: number
    maksimal_epoch: number
    testing_setelah_training: boolean
  }
  dataset: {
    total_data: number
    data_training: number
    data_testing: number
    test_size: number
  }
  evaluation: {
    accuracy: number
    error_rate: number
    mae: number
    mse: number
    rmse: number
    confusion_matrix: {
      labels: ["Tidak Unggul", "Unggul"]
      matrix: [[number, number], [number, number]]
      description: {
        tn: number
        fp: number
        fn: number
        tp: number
      }
    }
    classification_report: {
      "Tidak Unggul": ClassificationScore
      Unggul: ClassificationScore
    }
  }
}

export type ClassificationScore = {
  precision: number
  recall: number
  f1_score: number
}

export type FormValues = {
  berat_jenis: number
  panjang_benih: number
  usia_simpan: number
}

export type FormInputValues = {
  berat_jenis: string
  panjang_benih: string
  usia_simpan: string
}

export type FormInputErrors = Partial<Record<keyof FormInputValues, string>>

export const initialForm: FormValues = {
  berat_jenis: 1.25,
  panjang_benih: 8.2,
  usia_simpan: 3,
}

export const initialFormInput: FormInputValues = {
  berat_jenis: "1,25",
  panjang_benih: "8,2",
  usia_simpan: "3",
}
