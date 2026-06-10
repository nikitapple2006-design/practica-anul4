import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AMDARIS | Echipe software dedicate și servicii digitale",
    template: "%s | AMDARIS",
  },
  description: site.description,
  openGraph: {
    title: "AMDARIS",
    description: site.description,
    url: site.url,
    siteName: "AMDARIS",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
