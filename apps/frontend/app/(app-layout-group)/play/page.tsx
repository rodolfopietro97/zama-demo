"use client";

import { simulateContract } from "@wagmi/core";
import { useState } from "react";
import {
  useAccount,
  useReadContract,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
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
  // Winner hook
  const [isWinner, setIsWinner] = useState<boolean>(false);

  // Current riddle hook
  const {
    // Final transaction id of the write contract operation
    data: writeContractResultTxId,

    // Is the contract call pending
    isPending,

    // Error of the contract call
    error,

    // Function to read the contract state
    writeContract,
  } = useWriteContract();

  // Events list
  const [attemptsEvents, setAttemptsEvents] = useState<{ logs: any[] }[]>([]);

  // Current answer hook
  const [answer, setAnswer] = useState<string>("");

  // Submission errors
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Listen to the AnswerAttempt event
  useWatchContractEvent({
    address: onChainRiddleAddress,
    abi: onChainRiddleABI,
    eventName: "AnswerAttempt",
    onLogs(logs) {
      setAttemptsEvents((prevEvents) => [...prevEvents, { logs }]);

      // Check if the user is the winner
      const mySubmission = logs[0]?.args["user"] === walletAdress;
      const isWinnerSubmission = logs[0]?.args["correct"];

      if (mySubmission && isWinnerSubmission) {
        setIsWinner(true);
      }
    },
  });

  // Get the current riddle
  const currentRiddle = useReadContract({
    abi: onChainRiddleABI,
    address: onChainRiddleAddress,
    functionName: "riddle",
    config: wagmiConfig,
  });

  // Get the active riddle status
  const isActiveRiddle = useReadContract({
    abi: onChainRiddleABI,
    address: onChainRiddleAddress,
    functionName: "isActive",
    config: wagmiConfig,
  });

  /**
   * Submit the answer to the riddle.
   */
  async function submitAnswer() {
    // Reset the submission error
    setSubmissionError(null);

    // Estimate the gas
    try {
      // Simulate the contract call
      const simulation = await simulateContract(wagmiConfig, {
        address: onChainRiddleAddress,
        abi: onChainRiddleABI,
        functionName: "submitAnswer",
        args: [answer],
      });

      // Call the contract to submit the answer
      writeContract({
        address: onChainRiddleAddress,
        abi: onChainRiddleABI,
        functionName: "submitAnswer",
        args: [answer],
        gas: simulation.request.gas,
      });
    } catch (error) {
      setSubmissionError(error.shortMessage);
    }

    // Reset the answer
    setAnswer("");
  }

  /**
   * Component to display when there is an active riddle
   */
  const IsActiveRiddleComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10">
        {/* Current riddle */}
        <div>
          <Title>
            {currentRiddle.data === undefined ||
            currentRiddle.data === null ||
            currentRiddle.data === "" ? (
              <span className="animate-pulse">Loading the riddle...</span>
            ) : (
              currentRiddle.data
            )}
          </Title>
        </div>
        {/* Riddle answer */}
        <div>
          <input
            type="text"
            placeholder="Your answer"
            className="px-5 py-3 bg-gray-100 text-black rounded-md"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          />
        </div>
        {/* Submit button */}
        <div>
          <Button
            isLoading={isPending}
            disabled={answer === ""}
            onClick={() => submitAnswer()}
          >
            Submit
          </Button>
        </div>
        {/* Transaction id */}
        {writeContractResultTxId === undefined && (
          <div>
            <Subtitle>{writeContractResultTxId}</Subtitle>
          </div>
        )}

        {/* Submission error (if any)*/}
        {submissionError !== null && (
          <div>
            <p className="text-red-300">{submissionError}</p>
          </div>
        )}

        {/* Events board */}
        <div>
          <Subtitle>Attempts</Subtitle>
          <ul>
            {attemptsEvents.map((event, index) => {
              const mySubmission = event.logs[0].args["user"] === walletAdress;
              const isWinnerSubmission = event.logs[0].args["correct"];

              if (mySubmission) {
                if (!isWinnerSubmission) {
                  return (
                    <li key={index}>
                      <p className="my-2">You have not win 😭</p>
                    </li>
                  );
                }
              } else {
                return (
                  <li key={index}>
                    <p className="my-2">
                      {event.logs[0].args["user"] as string}:
                    </p>
                    <p>
                      {event.logs[0].args["answer"] as string} -{" "}
                      {event.logs[0].args["riddle"] as string}
                    </p>
                  </li>
                );
              }

              return (
                <li key={index}>
                  <p>{event.logs[0].args["answer"] as string}</p>
                  <p>{event.logs[0].args["correct"] as string}</p>
                  <p>{event.logs[0].args["riddle"] as string}</p>
                  <p>{event.logs[0].args["user"] as string}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  /**
   * Component to display when there is NO active riddle OR the riddle is not loaded yet
   */
  const NoActiveRiddleComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10">
        <Title>
          <p className="animate-pulse">Searching for a riddle...</p>
        </Title>
      </div>
    );
  };

  /**
   * Component to display when the user is the winner
   */
  const WinnerComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10">
        <Title>You are the winner! 🎉</Title>
      </div>
    );
  };

  if (
    isActiveRiddle.data !== undefined &&
    isActiveRiddle.data !== null &&
    isActiveRiddle.data
  ) {
    return isWinner ? <WinnerComponent /> : <IsActiveRiddleComponent />;
  } else {
    return <NoActiveRiddleComponent />;
  }
}

/**
 * Play page
 */
export default function PlayPage() {
  // Wagmi account hook
  const account = useAccount();

  if (!account.isConnected) {
    return <NotConnectedPage />;
  }

  if (account.address !== undefined)
    return <Connected walletAdress={account.address} />;
}
