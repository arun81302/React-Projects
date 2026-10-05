import MainMenu from "./Components/MainMenu";
import Endscreen from "./Components/EndScreen";
import Quiz from "./Components/Quiz";
import { QuizContext } from "./Context/Context";
import { useState } from "react";

export default function App() {
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider
      value={{ gameState, setGameState, score, setScore }}
    >
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-white mb-8">
            Quiz App
          </h1>

          {gameState === "menu" && <MainMenu />}
          {gameState === "quiz" && <Quiz />}
          {gameState === "endscreen" && <Endscreen />}

        </div>
      </div>
    </QuizContext.Provider>
  );
}