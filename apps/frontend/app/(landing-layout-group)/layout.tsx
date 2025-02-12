import type { Metadata } from "next";
import { Mystery_Quest } from "next/font/google";
import "../globals.css";

/**
 * Init the font to use
 */
const layoutFontToUse = Mystery_Quest({ weight: "400", subsets: ["latin"] });

/**
 * Metadata of the page
 */
export const metadata: Metadata = {
  title: "Zama riddle demo - Play page",
  description: "A great and misteryous riddle game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${layoutFontToUse.className} text-dark/90`}>
        {/* FIXED Div to have the gradient background */}
        <div className="fixed bg-gradient-to-t to-[#f8d549]/90 from-[#f2b559]/90  to-40% h-screen w-screen -z-10"></div>

        <div className="flex flex-col items-center justify-center min-h-screen px-5">
          {children}
        </div>
      </body>
    </html>
  );
}
