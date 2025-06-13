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
  const [timeLeft, setTimeLeft] = useState(15);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/682b2a8f8960c979a59cdbef/latest")
      .then((res) => res.json())
      .then((data) => setQuestions(data.record))
      .catch((err) => console.error("failed", err));
  }, []);

  useEffect(() => {
    if (showScore || selectedAnswer !== null) return;

    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showScore, selectedAnswer]);

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
      setTimeLeft(15);

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const startQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setHasStarted(true);
    setTimeLeft(15);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        {!hasStarted ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to the Quiz Game!
            </h1>
            <p className="mb-6 text-gray-600">
              Test your knowledge across various topics. You have 15 seconds for
              each question!
            </p>
            <button
              onClick={startQuiz}
              className="bg-blue-600 text-white px-6 py-2 cursor-pointer rounded hover:bg-blue-700 transition"
            >
              Start Quiz
            </button>
          </div>
        ) : questions.length > 0 ? (
          <QuestionCard
            data={questions[currentQuestion]}
            onAnswer={handleAnswer}
            current={currentQuestion + 1}
            total={questions.length}
            selectedAnswer={selectedAnswer}
            timeLeft={timeLeft}
            disableOptions={disableOptions}
          />
        ) : (
          <p className="text-center">Loading questions...</p>
        )}
      </div>
    </div>
  );
}

export default App;
