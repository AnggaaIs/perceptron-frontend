"use client";

import { useEffect } from "react";
import { WifiOff } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfflinePage() {
  useEffect(() => {
    if (navigator.onLine) {
      window.location.replace("/");
      return;
    }

    const handleOnline = () => {
      window.location.replace("/");
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center bg-background px-4 py-8">
      <Card className="mx-auto w-full max-w-md bg-secondary-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <WifiOff className="size-6" />
            Sedang Offline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-7">
            Aplikasi masih bisa dibuka, tetapi data prediksi dan metrik perlu
            koneksi ke server.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
