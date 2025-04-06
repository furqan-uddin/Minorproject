import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Sample question bank (later will come from backend or database)
const sampleQuestions = {
  tech: [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Trainer Marking Language"],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "JQuery", "CSS", "XML"],
      answer: "CSS",
    },
  ],
  aptitude: [
    {
      question: "What is the next number in the sequence: 2, 4, 8, 16?",
      options: ["18", "20", "32", "24"],
      answer: "32",
    },
    {
      question: "If A = 1, B = 2, ..., Z = 26, what is the value of DOG?",
      options: ["26", "19", "27", "26+15+7 = 48"],
      answer: "48",
    },
  ],
  // Add CS Fundamentals, Interview Prep, etc similarly...
};

const QuizPage = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const loadedQuestions = sampleQuestions[categoryId] || [];
    setQuestions(loadedQuestions);
  }, [categoryId]);

  const handleSubmit = () => {
    if (!selectedOption) {
      toast.warning("Please select an option!");
      return;
    }

    if (selectedOption === questions[currentQ].answer) {
      setScore(score + 1);
      toast.success("Correct!");
    } else {
      toast.error("Oops! Wrong answer.");
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption("");
    } else {
      setCompleted(true);
    }
  };

  if (!questions.length) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        No quiz found for this category. Coming soon!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl">
        {!completed ? (
          <>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              {`Question ${currentQ + 1} of ${questions.length}`}
            </h2>
            <p className="text-lg text-gray-800 mb-6">
              {questions[currentQ].question}
            </p>
            <div className="space-y-3">
              {questions[currentQ].options.map((option, idx) => (
                <label key={idx} className="block">
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {currentQ === questions.length - 1 ? "Submit Quiz" : "Next Question"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Completed!</h2>
            <p className="text-xl text-gray-800">
              Your Score: <span className="font-bold">{score}</span> / {questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
