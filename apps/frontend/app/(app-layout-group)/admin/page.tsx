"use client";

import { simulateContract } from "@wagmi/core";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Button } from "../../components/Button";
import { NotConnectedPage } from "../../components/NotConnectedPage";
import { Subtitle, Title } from "../../components/Typography";
import {
  onChainRiddleABI,
  onChainRiddleAddress,
  wagmiConfig,
} from "../../utils/const";

/**
 * Component to display when the user is connected with the wallet
 */
function Connected({ walletAdress }: { walletAdress: string }) {
  // New riddle hook
  const [newRiddle, setNewRiddle] = useState<string>("");

  // New ridle answer hook
  const [newRiddleAnswer, setNewRiddleAnswer] = useState<string>("");

  // Memo with the hash of the answer
  const answerHash = useMemo<`0x${string}`>(() => {
    console.log(newRiddleAnswer);
    return ethers.keccak256(
      ethers.toUtf8Bytes(newRiddleAnswer)
    ) as `0x${string}`;
  }, [newRiddleAnswer]);

  // Get the admin address
  const adminAddress = useReadContract({
    abi: onChainRiddleABI,
    address: onChainRiddleAddress,
    functionName: "bot",
    config: wagmiConfig,
  });

  // Get the current riddle
  const currentRiddle = useReadContract({
    abi: onChainRiddleABI,
    address: onChainRiddleAddress,
    functionName: "riddle",
    config: wagmiConfig,
  });

  // Check if the riddle is active
  const isActiveRiddle = useReadContract({
    abi: onChainRiddleABI,
    address: onChainRiddleAddress,
    functionName: "isActive",
    config: wagmiConfig,
  });

  // Write contract hook
  const {
    data: writeContractResultTxId,
    isPending,
    writeContract,
  } = useWriteContract();

  /**
   * Submit the answer to the riddle.
   */
  async function changeRiddle() {
    // Estimate the gas
    const simulation = await simulateContract(wagmiConfig, {
      address: onChainRiddleAddress,
      abi: onChainRiddleABI,
      functionName: "setRiddle",
      args: [newRiddle, answerHash],
    });

    // Call the contract to submit the answer
    writeContract({
      address: onChainRiddleAddress,
      abi: onChainRiddleABI,
      functionName: "setRiddle",
      args: [newRiddle, answerHash],
      gas: simulation.request.gas,
    });

    // Reset
    setNewRiddle("");
    setNewRiddleAnswer("");
  }

  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10">
      {walletAdress !== adminAddress.data ? (
        // Not an admin
        <div>
          <Title>You are not an admin!</Title>
        </div>
      ) : (
        // User is the admin (the bot)
        <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10">
          {/* Current riddle */}
          <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10">
            <Title>Current riddle:</Title>
            <Subtitle>
              {currentRiddle.data === undefined ||
              currentRiddle.data === null ||
              currentRiddle.data === "" ? (
                <span className="animate-pulse">Loading the riddle...</span>
              ) : (
                currentRiddle.data
              )}
            </Subtitle>
          </div>
          {/* Change riddle */}
          {isActiveRiddle ? (
            <div className="py-10">
              <Subtitle>
                There is an active riddle!. <br />
                So you can't change it.
              </Subtitle>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10 mt-20">
              <Title>Change the riddle</Title>
              {/* New riddle */}
              <div>
                <input
                  type="text"
                  placeholder="Riddle"
                  className="px-5 py-3 bg-gray-100 text-black rounded-md"
                  onChange={(e) => setNewRiddle(e.target.value)}
                  value={newRiddle}
                />
              </div>
              {/* Answer */}
              <div>
                <input
                  type="text"
                  placeholder="Answer"
                  className="px-5 py-3 bg-gray-100 text-black rounded-md"
                  onChange={(e) => setNewRiddleAnswer(e.target.value)}
                  value={newRiddleAnswer}
                />
                {newRiddleAnswer !== "" && (
                  <p className="my-5">
                    Answer hash: <br />
                    <span className="text-xs font-bold">{answerHash}</span>
                  </p>
                )}
              </div>
            </div>
          )}
          {/* Submit button */}
          <div>
            <Button
              isLoading={isPending}
              disabled={newRiddle === "" || newRiddleAnswer === ""}
              onClick={() => changeRiddle()}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Admin page
 */
export default function AdminPage() {
  // Wagmi account hook
  const account = useAccount();

  if (!account.isConnected) {
    return <NotConnectedPage />;
  }

  if (account.address !== undefined)
    return <Connected walletAdress={account.address} />;
}
