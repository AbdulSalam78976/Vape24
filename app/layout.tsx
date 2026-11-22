import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { ViewTransition } from "react";
import { AgeGate } from "@/components/AgeGate";
import { CartToast } from "@/components/CartToast";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Best Online Vape Store: Vapes from $8.99 | Vape24", template: "%s | Vape24" },
  description: "Shop disposable vapes, e-liquids, nicotine pouches and hemp products at Vape24. Authentic brands, low prices, fast shipping. 21+ only.",
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to Content</a>
        <Header />
        {/* Route changes crossfade + rise (.page in globals.css); header stays pinned. */}
        <ViewTransition default="page">
          <main id="main" className="flex-1">{children}</main>
        </ViewTransition>
        <Footer />
        <CartToast />
        <AgeGate />
      </body>
    </html>
  );
}
