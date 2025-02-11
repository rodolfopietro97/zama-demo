import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { Henny_Penny } from "next/font/google";
import Providers from "../components/Providers";
import "../globals.css";
import { PageLayout } from "./PageLayout";

/**
 * Dynamic import of the Providers
 */
// const Providers = dynamic(() => import("../components/Providers"));

/**
 * Init the font to use
 */
const layoutFontToUse = Henny_Penny({ weight: "400", subsets: ["latin"] });

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
      <body className={`${layoutFontToUse.className}`}>
        <Providers>
          <PageLayout>{children}</PageLayout>
        </Providers>
      </body>
    </html>
  );
}
