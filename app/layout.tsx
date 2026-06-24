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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://perceptron.kisara.my.id",
  ),
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
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
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
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    title: "Klasifikasi Bibit Padi",
    description: "Sistem klasifikasi kelayakan bibit padi berbasis perceptron",
    type: "website",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "Icon Klasifikasi Bibit Padi",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Klasifikasi Bibit Padi",
    description: "Sistem klasifikasi kelayakan bibit padi berbasis perceptron",
    images: ["/icons/icon-512.png"],
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
