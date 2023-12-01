import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Variant: Julebrussmaking",
  description: "Variants offisielle julebrussmakingsapplikasjon 🎅",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='no'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
