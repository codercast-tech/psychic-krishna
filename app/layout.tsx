import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krishna's Karma | Spiritual Guidance & Sacred Goods",
  description:
    "Aura Photos, Tarot Readings, Crystals, Candles and Spiritual Services. Discover your spiritual path and unlock hidden truths.",
  keywords: ["tarot readings", "aura photos", "crystals", "spiritual guidance", "candles", "krishnas karma"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0e0a07] text-[#e8d5b5] antialiased">
        {children}
      </body>
    </html>
  );
}
