import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "R2R Doors & Windows - Precision Doors. Perfect Fit.",
  description:
    "Custom-built doors & windows crafted with premium materials, modern pricing, and fast delivery across India. R2R Doors & Windows is your trusted manufacturer for quality and endurance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
