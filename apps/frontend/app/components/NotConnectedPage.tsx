import { Title } from "./Typography";

/**
 * Component to display when the user is not connected with the wallet
 */
export function NotConnectedPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 gap-y-10">
      {/* Current riddle */}
      <div>
        <Title>Please connect your wallet to use the DAPP</Title>
      </div>
    </div>
  );
}
