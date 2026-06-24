import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PwaRegistrar } from "@/components/pwa/pwa-registrar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klasifikasi Bibit Padi",
  description: "Sistem klasifikasi kelayakan bibit padi berbasis perceptron",
  manifest: "/manifest.webmanifest",
  applicationName: "Klasifikasi Bibit Padi",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bibit Padi",
  },
  icons: {
    icon: [
      {
        url: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        url: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
    apple: "/icons/icon-192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#fc64ab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <PwaRegistrar />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
