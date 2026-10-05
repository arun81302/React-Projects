import { useState, useContext } from "react";
import questionBank from "../data";
import { QuizContext } from "../Context/Context";

export default function Quiz() {
  const { score, setScore, setGameState } = useContext(QuizContext);

  const [current, setCurrent] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  function handleClick() {
    if (questionBank[current].answer === optionChosen) {
      setScore((prev) => prev + 1);
    }

    setCurrent((prev) => prev + 1);
    setOptionChosen("");
  }

  function finishQuiz() {
    if (questionBank[current].answer === optionChosen) {
      setScore((prev) => prev + 1);
    }

    setGameState("endscreen");
  }

  const currentQuestion = questionBank[current];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8">

      {/* Question number */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm sm:text-base font-medium text-blue-600">
          Question {current + 1} of {questionBank.length}
        </span>

        <span className="text-sm text-slate-500">
          Score: {score}
        </span>
      </div>

      
      <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((current + 1) / questionBank.length) * 100}%`,
          }}
        ></div>
      </div>

      
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8">
        {currentQuestion.prompt}
      </h2>

      
      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setOptionChosen(option)}
            className={`w-full text-left px-4 py-3 sm:px-5 sm:py-4 rounded-lg border-2 transition duration-200
              ${
                optionChosen === option
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 hover:border-blue-400 hover:bg-slate-50 text-slate-700"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        {current === questionBank.length - 1 ? (
          <button
            onClick={finishQuiz}
            disabled={!optionChosen}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Finish Quiz
          </button>
        ) : (
          <button
            onClick={handleClick}
            disabled={!optionChosen}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Next Question
          </button>
        )}
      </div>

    </div>
  );
}