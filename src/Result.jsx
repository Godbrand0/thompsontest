import React from "react";

export default function Result({ score, total }) {
  const percentage = ((score / total) * 100).toFixed(0);
  const isPass = percentage >= 70;

  return (
    <div className="text-center p-6 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-indigo-800">
        🎉 Quiz Complete!
      </h2>
      <p className="text-xl text-gray-800 font-medium mb-2">
        Your Score:{" "}
        <span
          className={`font-bold ${isPass ? "text-green-600" : "text-red-600"}`}
        >
          {score} / {total}
        </span>
      </p>
      <p className="text-md text-gray-600 mb-4">
        That's <span className="font-semibold">{percentage}%</span> —
        {isPass ? "Great job!" : "Keep practicing!"}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
