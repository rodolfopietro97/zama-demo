import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";

/**
 * Init the font to use
 */
const layoutFontToUse = Inter({ subsets: ["latin"] });

/**
 * Metadata of the page
 */
export const metadata: Metadata = {
  title: "Zama riddle demo - Landing page",
  description: "A great landing page for a great skill test!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${layoutFontToUse.className}`}>{children}</body>
    </html>
  );
}
