import React from "react";

export default function QuestionCard({
  data,
  onAnswer,
  current,
  total,
  selectedAnswer,
  disableOptions,
  timeLeft,
}) {
  const handleClick = (choice) => {
    if (disableOptions) return;
    onAnswer(choice);
  };

  const getButtonStyle = (choice) => {
    if (!selectedAnswer) return "bg-blue-500 hover:bg-blue-600 text-white";

    if (choice === data.answer) return "bg-green-500 text-white";
    if (choice === selectedAnswer && choice !== data.answer)
      return "bg-red-500 text-white";

    return "bg-gray-200 text-gray-700";
  };

  return (
    <div className="rounded-xl p-6 w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Question <span className="text-blue-600">{current}</span> of {total}
      </h2>
      <p className="text-right text-sm text-gray-600">Time left: {timeLeft}s</p>

      <p className="mb-6 text-lg text-gray-700 font-medium">{data.question}</p>

      <div className="space-y-3">
        {data.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleClick(choice)}
            disabled={disableOptions}
            className={`w-full py-3 px-4 rounded-lg shadow-sm transition duration-200 ease-in-out focus:outline-none ${getButtonStyle(
              choice
            )}`}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}
