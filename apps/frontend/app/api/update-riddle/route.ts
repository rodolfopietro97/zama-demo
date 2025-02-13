import { onChainRiddleABI, onChainRiddleAddress } from "@repo/const";
import { createPublicClient, http } from "viem";
import { bscTestnet } from "viem/chains";

export async function GET(request: Request) {
  try {
    const viemClient = createPublicClient({
      chain: bscTestnet,
      transport: http(),
    });

    const currentRiddle = await viemClient.readContract({
      abi: onChainRiddleABI,
      address: onChainRiddleAddress,
      functionName: "riddle",
    });

    const isActiveRiddle = await viemClient.readContract({
      abi: onChainRiddleABI,
      address: onChainRiddleAddress,
      functionName: "isActive",
    });

    return new Response(`${currentRiddle} ${isActiveRiddle}`);
  } catch (e) {
    return new Response(e.message);
  }
}
