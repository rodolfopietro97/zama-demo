import { Button } from "../components/Button";
import { Subtitle, Title } from "../components/Typography";

export default function PlayPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-y-10">
      <div>
        <Title>🧙 Play the game!! 🧙</Title>
      </div>
      <div className="my-5">
        <Subtitle>
          Click on "Play Game" to start the ultimate riddle challenge on the
          blockchain! 🏆
        </Subtitle>
      </div>
      <div>
        <Button href={"/play"}>Play game 🏆</Button>
      </div>
    </div>
  );
}
