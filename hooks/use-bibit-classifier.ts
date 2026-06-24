"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { requestApi } from "@/lib/api";
import {
  HealthData,
  initialFormInput,
  MetricsData,
  PredictionData,
  FormInputErrors,
  FormInputValues,
  FormValues,
} from "@/types/bibit";

export function useBibitClassifier() {
  const [form, setForm] = useState<FormInputValues>(initialFormInput);
  const [formErrors, setFormErrors] = useState<FormInputErrors>({});
  const [health, setHealth] = useState<HealthData | null>(null);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);

  const loadBackendStatus = useCallback(async () => {
    setLoadingStatus(true);
    setStatusError(null);

    try {
      const [healthResponse, metricsResponse] = await Promise.all([
        requestApi<HealthData>("/health"),
        requestApi<MetricsData>("/metrics"),
      ]);

      setHealth(healthResponse.data);
      setMetrics(metricsResponse.data);
    } catch {
      const message = "Layanan prediksi belum bisa digunakan.";

      setStatusError(message);
      toast.error("Layanan belum siap", {
        description: message,
      });
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadBackendStatus();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadBackendStatus]);

  async function submitPrediction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { payload, errors } = validateForm(form);

    if (!payload) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmitting(true);

    try {
      const response = await requestApi<PredictionData>("/predict", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setPrediction(response.data);
      toast.success(response.message, {
        description: `Bibit diklasifikasikan sebagai ${response.data.prediction.status}.`,
      });
    } catch {
      toast.error("Prediksi gagal", {
        description: "Coba periksa kembali data yang dimasukkan.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(field: keyof FormInputValues, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setFormErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function resetForm() {
    setForm(initialFormInput);
    setFormErrors({});
    setPrediction(null);
  }

  return {
    form,
    formErrors,
    health,
    metrics,
    prediction,
    loadingStatus,
    submitting,
    statusError,
    loadBackendStatus,
    resetForm,
    submitPrediction,
    updateField,
  };
}

function validateForm(form: FormInputValues): {
  payload: FormValues | null
  errors: FormInputErrors
} {
  const errors: FormInputErrors = {};
  const payload = {
    berat_jenis: parseInputNumber(form.berat_jenis),
    panjang_benih: parseInputNumber(form.panjang_benih),
    usia_simpan: parseInputNumber(form.usia_simpan),
  };

  if (Number.isNaN(payload.berat_jenis)) {
    errors.berat_jenis = "Berat jenis wajib diisi dengan angka.";
  } else if (payload.berat_jenis <= 0) {
    errors.berat_jenis = "Berat jenis harus lebih dari 0 g/ml.";
  }

  if (Number.isNaN(payload.panjang_benih)) {
    errors.panjang_benih = "Panjang benih wajib diisi dengan angka.";
  } else if (payload.panjang_benih <= 0) {
    errors.panjang_benih = "Panjang benih harus lebih dari 0 mm.";
  }

  if (Number.isNaN(payload.usia_simpan)) {
    errors.usia_simpan = "Usia penyimpanan wajib diisi dengan angka.";
  } else if (payload.usia_simpan < 0) {
    errors.usia_simpan = "Usia penyimpanan tidak boleh negatif.";
  }

  return {
    payload: Object.keys(errors).length ? null : payload,
    errors,
  };
}

function parseInputNumber(value: string) {
  const normalizedValue = value.trim().replace(",", ".");

  if (normalizedValue === "") {
    return Number.NaN;
  }

  return Number(normalizedValue);
}
