// export default QuizPage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
import Spinner from "../components/Spinner"; // Make sure this exists

const QuizPage = () => {
  const { categoryId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const difficulty = queryParams.get('difficulty');
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true); // Spinner logic

  useEffect(() => {
    setCurrentQ(0);
    setScore(0);
    setCompleted(false);
    setUserAnswers([]);
    setSelectedOption("");
  }, [categoryId, difficulty]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/quizzes/${categoryId}?difficulty=${difficulty}`);
        setQuestions(data);
      } catch (err) {
        console.error('Failed to load questions', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId, difficulty]);

  useEffect(() => {
    if (completed) {
      const submitResult = async () => {
        try {
          await API.post('/results', {
            category: categoryId,
            score,
            total: questions.length,
            difficulty,
          });
        } catch (err) {
          console.error('Error saving quiz result:', err);
        }
      };

      submitResult();

      navigate("/quiz-result", {
        state: {
          totalQuestions: questions.length,
          correctAnswers: score,
          category: categoryId,
          answers: userAnswers,
          questions: questions
        },
      });
    }
  }, [completed, score, categoryId, navigate, questions, userAnswers]);

  const handleSubmit = () => {
    if (!selectedOption) {
      toast.warning("Please select an option!");
      return;
    }

    const isCorrect = selectedOption === questions[currentQ].answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      toast.success("Correct!");
    } else {
      toast.error("Oops! Wrong answer.");
    }

    setUserAnswers((prev) => [...prev, selectedOption]);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelectedOption("");
      } else {
        setCompleted(true);
      }
    }, 500);
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
        No quiz found for this category and difficulty. Try another!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-indigo-700">
              Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQ) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQ) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <p className="text-lg text-gray-800 mb-6">{questions[currentQ].question}</p>

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

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {currentQ === questions.length - 1 ? "Submit Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
