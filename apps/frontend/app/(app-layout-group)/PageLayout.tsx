import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

/**
 * Page Layout component.
 */
export function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Main navbar */}
      <nav className="flex flex-col sm:flex-row justify-items-center sm:justify-between w-full py-5 text-center px-5 bg-[#f8d549] border-b-2 border-black">
        <div className="text-2xl font-bold">
          <Link href={"/play"}>Riddle game</Link>
        </div>
        <div className="flex justify-center items-center my-5 sm:my-0">
          <ConnectButton />
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow py-20">
        <div className="m-auto">{children}</div>
      </div>
    </div>
  );
}
