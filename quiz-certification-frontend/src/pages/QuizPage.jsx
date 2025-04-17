//quiz-certification-frontend/src/pages/QuizPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

const QuizPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // useEffect(() => {
  //   const loadedQuestions = sampleQuestions[categoryId] || [];
  //   setQuestions(loadedQuestions);
  // }, [categoryId]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await API.get(`/quizzes/${categoryId}`);
        console.log("Fetched Questions:", data); // 🔍 See what you get
        setQuestions(data);
      } catch (err) {
        console.log('Failed to load questions', err);
      }
    };
  
    fetchQuestions();
  }, [categoryId]);
  

  useEffect(() => {
    if (completed) {
      const submitResult = async () => {
        try {
          await API.post('/results', {
            category: categoryId,
            score,
            total: questions.length,
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
        },
      });
    }
  }, [completed]);
  

  useEffect(() => {
    if (completed) {
      navigate("/quiz-result", {
        state: {
          totalQuestions: questions.length,
          correctAnswers: score,
          category: categoryId,
        },
      });
    }
  }, [completed, navigate, questions.length, score, categoryId]);

  const handleSubmit = () => {
    if (!selectedOption) {
      toast.warning("Please select an option!");
      return;
    }

    if (selectedOption === questions[currentQ].answer) {
      setScore((prev) => prev + 1);
      toast.success("Correct!");
    } else {
      toast.error("Oops! Wrong answer.");
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelectedOption("");
      } else {
        setCompleted(true);
      }
    }, 500); // delay for toast feedback
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
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          {`Question ${currentQ + 1} of ${questions.length}`}
        </h2>
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
