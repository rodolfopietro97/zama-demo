import { QueryClient } from "@tanstack/react-query";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";

/**
 * Wagmi configuration
 */
export const wagmiConfig = getDefaultConfig({
  appName: "Riddle Game",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, sepolia],
  ssr: true,
});

/**
 * Wagmi query client
 */
export const wagmiQueryClient = new QueryClient();
