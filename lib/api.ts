import type { ApiResponse } from "@/types/bibit"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://api.perceptron.kisara.my.id"
    : "http://localhost:8000")

const normalizedApiBaseUrl = API_BASE_URL.replace(/\/$/, "")

export async function requestApi<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${normalizedApiBaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(readErrorMessage(payload, response.status))
  }

  return payload as ApiResponse<T>
}

function readErrorMessage(payload: unknown, status: number) {
  if (
    payload &&
    typeof payload === "object" &&
    "detail" in payload &&
    payload.detail &&
    typeof payload.detail === "object" &&
    "message" in payload.detail
  ) {
    return String(payload.detail.message)
  }

  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return payload.message
  }

  return `Request gagal dengan status ${status}.`
}
