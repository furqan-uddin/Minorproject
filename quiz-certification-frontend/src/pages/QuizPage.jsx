// quiz-certification-frontend/src//pages/QuizPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
import Spinner from "../components/Spinner";

const QuizPage = () => {
  const { categoryId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const difficulty = queryParams.get("difficulty");
  const navigate = useNavigate();

  const QUESTION_TIMER = 10;

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(QUESTION_TIMER);

  const timerRef = useRef(null);

  useEffect(() => {
    setCurrentQ(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedOption("");
    setTimer(QUESTION_TIMER);
  }, [categoryId, difficulty]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/quizzes/${categoryId}?difficulty=${difficulty}`);
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load questions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId, difficulty]);

  useEffect(() => {
    if (!questions.length) return;

    clearInterval(timerRef.current);
    setTimer(QUESTION_TIMER);

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleSubmit(true);
          return QUESTION_TIMER;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQ, questions]);

  const handleSubmit = (autoSubmit = false) => {
    const currentQuestion = questions[currentQ];
    const answered = autoSubmit ? "" : selectedOption;
    const isCorrect = answered === currentQuestion.answer;

    if (answered) {
      isCorrect ? toast.success("Correct!") : toast.error("Oops! Wrong answer.");
    } else {
      toast.warning("Time's up!");
    }

    setUserAnswers((prev) => [...prev, answered]);
    setSelectedOption("");

    if (isCorrect) setScore((prev) => prev + 1);

    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      clearInterval(timerRef.current);
      submitFinal(score + (isCorrect ? 1 : 0), [...userAnswers, answered]);
    }
  };

  const submitFinal = async (finalScore, finalAnswers) => {
    try {
      await API.post("/results", {
        category: categoryId,
        score: finalScore,
        total: questions.length,
        difficulty,
      });
    } catch (err) {
      console.error("Error saving quiz result:", err);
    }

    navigate("/quiz-result", {
      state: {
        totalQuestions: questions.length,
        correctAnswers: finalScore,
        category: categoryId,
        answers: finalAnswers,
        questions: questions,
      },
    });
  };

  if (!difficulty) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        Please select a difficulty level.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        No quiz found. Try another!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8 md:py-12">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-1 text-sm">
            <span className="font-medium text-indigo-700">
              Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-gray-600">
              {Math.round((currentQ / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentQ / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Timer */}
        <div className="text-center text-sm mb-2 text-red-600 font-semibold">
          Time left: {timer}s
        </div>

        {/* Question */}
        <p className="text-lg text-gray-800 mb-6">
          {questions[currentQ].question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {questions[currentQ].options.map((option, idx) => (
            <label key={idx} className="block cursor-pointer">
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

        {/* Submit Button */}
        <button
          onClick={() => handleSubmit()}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {currentQ === questions.length - 1 ? "Submit Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
