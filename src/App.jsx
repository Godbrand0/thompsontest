import "./App.css";
import React, { useEffect, useState } from "react";
import Result from "./Result";
import QuestionCard from "./QuestionCard";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [disableOptions, setDisableOptions] = useState(false);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/682b2a8f8960c979a59cdbef/latest")
      .then((res) => res.json())
      .then((data) => setQuestions(data.record))
      .catch((err) => console.error("failed", err));
  }, []);

  const handleAnswer = (selected) => {
    setSelectedAnswer(selected);
    const isCorrect = selected === questions[currentQuestion].answer;
    setIsAnswerCorrect(isCorrect);
    setDisableOptions(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setDisableOptions(false);

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  return (
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
              selectedAnswer={selectedAnswer}
              disableOptions={disableOptions}
            />
          )
        ) : (
          <p className="text-center">Loading questions...</p>
        )}
      </div>
    </div>
  );
}

export default App;
