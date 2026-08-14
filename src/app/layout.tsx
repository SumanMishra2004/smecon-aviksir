import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMECON 2026 — International Conference on Smart Manufacturing, Sustainable Energy & Computational Intelligence",
  description:
    "Two-day international Hybrid conference (19 - 20 September 2026) on Smart Manufacturing, Sustainable Energy & Computational Intelligence. Jointly organized by Dept. of Chemistry, Sovarani Memorial College Howrah, India & IKC Trust. 6 Scopus-indexed publication tracks.",
  keywords: [
    "SMECON 2026",
    "international conference",
    "smart manufacturing",
    "sustainable energy",
    "computational intelligence",
    "Scopus indexed",
    "online conference",
    "IKC Trust",
    "Sovarani Memorial College",
  ],
  openGraph: {
    title: "SMECON 2026 — Smart Manufacturing, Sustainable Energy & Computational Intelligence",
    description:
      "Two-day international Hybrid conference. 6 Scopus-indexed publication tracks. 19–20 September 2026.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  verification: {
    google: "VniKeNDdir30ibmdCNczRepgoq-TjzOdZHswAB_ejlA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
