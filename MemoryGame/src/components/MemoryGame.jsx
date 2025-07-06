import React, { useState, useRef } from "react";
import GameScreen from "./GameScreen";

function MemoryGame() {
  const audioRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    setGameStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/bgvideo.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop>
        <source src="/assets/comeridewithme.mp3" type="audio/mpeg" />
      </audio>

      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-70 p-6">
        <div className="w-full max-w-2xl text-center space-y-8">
          <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-lg">
            Memory Game
          </h1>

          {gameStarted ? (
            <GameScreen
              difficulty={difficulty}
              onRestart={() => setGameStarted(false)}
            />
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Select Difficulty
                </h2>
                <div className="flex justify-center gap-6 mt-4">
                  {["easy", "medium", "hard"].map((level) => (
                    <label
                      key={level}
                      className={`relative px-4 py-2 rounded-lg border-2 cursor-pointer transition duration-300 text-white font-semibold capitalize
        ${
          difficulty === level
            ? "border-yellow-400 bg-yellow-500 text-black shadow-[0_0_20px_rgba(255,255,0,0.5)]"
            : "border-gray-500 hover:border-yellow-400 hover:shadow-[0_0_10px_rgba(255,255,0,0.3)]"
  // ? "border-blue-400 bg-blue-500 text-black shadow-[0_0_20px_rgba(0,191,255,0.6)]"
  // : "border-gray-600 hover:border-blue-400 hover:shadow-[0_0_10px_rgba(0,191,255,0.4)]"

        }`}
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={difficulty === level}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="sr-only"
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
              <button onClick={handleStart} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-semibold shadow-md transition duration-300 border-2 border-yellow-400 hover:shadow-[0_0_20px_rgba(255,255,0,0.7)]">
                Start Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemoryGame;
