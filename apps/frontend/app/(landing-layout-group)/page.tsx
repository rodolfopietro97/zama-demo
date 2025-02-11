import Link from "next/link";

export default function PlayPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 spaxe-y-5">
      <div>
        <h1 className="text-2xl md:text-4xl xl:text-6xl font-bold">
          🧙 Play the game!! 🧙
        </h1>
      </div>
      <div className="my-5">
        <h2 className="text-xl md:text-2xl xl:text-4xl max-w-3xl">
          Click on "Play Game" to start the ultimate riddle challenge on the
          blockchain! 🏆
        </h2>
      </div>
      <div>
        <Link href={"/play"}>
          <button className="px-5 py-3 bg-blue-500 hover:bg-blue-400 text-white hover:text-gray-300 rounded-md">
            Play game 🏆
          </button>
        </Link>
      </div>
    </div>
  );
}
