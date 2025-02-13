"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { bscTestnet, zetachainAthensTestnet } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { wagmiQueryClient } from "../../utils/const";

/**
 * Wagmi configuration
 */
export const wagmiConfig = getDefaultConfig({
  appName: "Riddle Game",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    // mainnet,
    // sepolia,
    // Zetachain testnet
    zetachainAthensTestnet,
    // BNB testnet
    bscTestnet,
    // @NOTE: Use it if you want to use hardhat or your local blockchain
    // {
    //   id: 31337,
    //   name: "GoChain Testnet",
    //   nativeCurrency: {
    //     decimals: 18,
    //     name: "GO",
    //     symbol: "GO",
    //   },
    //   rpcUrls: {
    //     default: { http: ["http://127.0.0.1:8545"] },
    //   },
    // },
  ],
  ssr: true,
});

/**
 * Providers component. Used to wrap the app with the providers
 */
export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={wagmiQueryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
