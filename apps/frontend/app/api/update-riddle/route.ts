import {
  deployAccount,
  onChainRiddleABI,
  onChainRiddleAddress,
} from "@repo/const";
import { ethers } from "ethers";
import { createPublicClient, createWalletClient, http } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { bscTestnet } from "viem/chains";

export async function GET(request: Request) {
  try {
    // Initialize the client
    const viemPublicClient = createPublicClient({
      chain: bscTestnet,
      transport: http(),
    });

    // Initialize the account
    const botAccount = mnemonicToAccount(deployAccount.mnemonics);

    // Create a wallet client
    const viemWalletClient = createWalletClient({
      account: botAccount,
      chain: bscTestnet,
      transport: http(),
    });

    // Read the data from the contract
    const currentRiddle = await viemPublicClient.readContract({
      abi: onChainRiddleABI,
      address: onChainRiddleAddress,
      functionName: "riddle",
    });

    const isActiveRiddle = await viemPublicClient.readContract({
      abi: onChainRiddleABI,
      address: onChainRiddleAddress,
      functionName: "isActive",
    });

    // Riddle is active. So, riddle cannot be changed
    if (isActiveRiddle) {
      return Response.json({
        isActiveRiddle,
      });
    }

    // Update the riddle
    const currentRiddleNumber = Number(currentRiddle);
    const newRiddle = currentRiddleNumber + 1;
    const newRidleAnswer = ethers.keccak256(
      ethers.toUtf8Bytes(`${newRiddle + 1}`)
    ) as `0x${string}`;

    const { request } = await viemPublicClient.simulateContract({
      address: onChainRiddleAddress,
      abi: onChainRiddleABI,
      functionName: "setRiddle",
      args: [`${newRiddle}`, newRidleAnswer],
      account: botAccount,
    });
    const result = await viemWalletClient.writeContract(request);

    return Response.json({
      newRiddle,
      newRidleAnswer,
      transaction: result,
    });
  } catch (e) {
    return Response.json({
      error: "An error occurred while updating the riddle",
      message: e.message,
    });
  }
}
