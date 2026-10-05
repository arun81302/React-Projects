import { useContext } from "react";
import { QuizContext } from "../Context/Context";

export default function MainMenu() {
  const { setGameState } = useContext(QuizContext);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
        Welcome to the Quiz
      </h2>

      <p className="text-slate-500 mb-8">
        Test your knowledge and see how many questions you can answer correctly.
      </p>

      <button
        onClick={() => setGameState("quiz")}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
      >
        Start Quiz
      </button>
    </div>
  );
}