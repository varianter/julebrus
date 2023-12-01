import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Variant: Julebrussmaking",
  description: "Variants offisielle julebrussmakingsapplikasjon 🎄",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className="bg-[#bc4749]">
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎄</text></svg>"
      />
      <body className={inter.className}>
        <div id="lights"></div>
        {children}
        <div className="absolute bottom-0 overflow-hidden w-full">
          <span className="inline-block text-center text-black/30 animate-marquee w-max">
            <span className="animate-spin animate-reverse inline-block text-3xl">
              🎄
            </span>
            Kan du se at denne siden er designet av utviklere?
            <span className="animate-spin animate-reverse inline-block text-3xl">
              🎄
            </span>
          </span>
        </div>
      </body>
    </html>
  );
}
