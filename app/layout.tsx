import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Building Systems That Scale",
  description:
    "Personal portfolio of a systems-oriented builder focused on AI-driven products and high-leverage tools. Quantitative Biology @ USC expanding into Computer Science.",
};

export const viewport: Viewport = {
  themeColor: "#0f0f12",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${_geist.className} ${_geistMono.className} flex min-h-screen flex-col font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
