import "./App.css";
import React, { useEffect, useState } from "react";
import Result from "./Result";
import QuestionCard from "./QuestionCard";

function App() {
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/682b2a8f8960c979a59cdbef")
      .then((res) => res.json())
      .then((data) => setQuestions(data.record))
      .catch((err) => console.error("failed", err));
  }, []);
  const handleAnswer = (selected) => {
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          {questions.length > 0 ? (
            showScore ? (
              <Result score={score} total={questions.length} />
            ) : (
              <QuestionCard
                data={questions[currentQuestion]}
                onAnswer={handleAnswer}
                current={currentQuestion + 1}
                total={questions.length}
              />
            )
          ) : (
            <p className="text-center">Loading questions</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
