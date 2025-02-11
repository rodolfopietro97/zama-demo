"use client";

import { useAccount } from "wagmi";
import { Button } from "../../components/Button";
import { Title } from "../../components/Typography";

/**
 * Component to display when the user is not connected with the wallet
 */
function NotConnected() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10">
      {/* Current riddle */}
      <div>
        <Title>Please connect your wallet to use the DAPP</Title>
      </div>
    </div>
  );
}

/**
 * Component to display when the user is connected with the wallet
 */
function Connected() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10">
      {/* Current riddle */}
      <div>
        <Title>Riddle question</Title>
      </div>

      {/* Riddle answer */}
      <div>
        <input
          type="text"
          placeholder="Your answer"
          className="px-5 py-3 bg-gray-100 text-black rounded-md"
        />
      </div>

      <div>
        <Button>Submit</Button>
      </div>
    </div>
  );
}

/**
 * Play page
 */
export default function PlayPage() {
  // Wagmi account hook
  const account = useAccount();

  if (!account.isConnected) {
    return <NotConnected />;
  }

  return <Connected />;
}
