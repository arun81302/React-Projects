import { useContext } from "react";
import { QuizContext } from "../Context/Context";
import questionBank from "../data";

export default function Endscreen() {
  const { score, setScore, setGameState } = useContext(QuizContext);

  function restartQuiz() {
    setScore(0);
    setGameState("quiz");
  }

  function goToMenu() {
    setScore(0);
    setGameState("menu");
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 text-center">

      <div className="mb-6">
        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Quiz Completed!
        </h2>

        <p className="text-slate-500 mt-2">
          Great job! Here is your final score.
        </p>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <p className="text-slate-500 text-sm">
          Your Score
        </p>

        <p className="text-4xl sm:text-5xl font-bold text-blue-600 mt-2">
          {score} / {questionBank.length}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={restartQuiz}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Restart Quiz
        </button>

        <button
          onClick={goToMenu}
          className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-8 py-3 rounded-lg transition"
        >
          Main Menu
        </button>
      </div>

    </div>
  );
}