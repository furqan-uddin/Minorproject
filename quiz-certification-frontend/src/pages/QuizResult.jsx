// quiz-certification-frontend/src/QuizResult.jsx
import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuestions, correctAnswers, category, answers, questions } = location.state || {};

  if (!location.state || totalQuestions === undefined || correctAnswers === undefined) {
    return <Navigate to="/" />;
  }

  const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);
  const isPassed = scorePercent >= 50;

  const handleDownloadCertificate = () => {
    alert("🎉 Certificate Download feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700 text-center">Quiz Result</h2>

        {/* Circular Score Progress */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-current text-gray-200"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className={`stroke-current ${isPassed ? "text-green-500" : "text-red-500"}`}
                strokeWidth="10"
                strokeDasharray="282.6"
                strokeDashoffset={`${282.6 - (282.6 * scorePercent) / 100}`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-indigo-800">
              {scorePercent}%
            </div>
          </div>
        </div>

        <p className="text-center text-lg mb-2">Category: <strong className="text-purple-600">{category}</strong></p>
        <p className="text-center mb-2">Score: <strong>{correctAnswers}/{totalQuestions}</strong></p>

        {isPassed ? (
          <p className="text-green-600 text-center font-bold mb-6">🎉 Congratulations! You passed!</p>
        ) : (
          <p className="text-red-600 text-center font-bold mb-6">😓 Better luck next time!</p>
        )}

        {/* Answer Review Section */}
        <div className="space-y-6">
          {questions?.map((q, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <p className="font-semibold mb-2">{idx + 1}. {q.question}</p>
              <ul className="space-y-1">
                {q.options.map((opt, i) => {
                  const isCorrect = opt === q.answer;
                  const isSelected = opt === answers?.[idx];
                  const isWrong = isSelected && !isCorrect;

                  return (
                    <li
                      key={i}
                      className={`px-3 py-1 rounded ${
                        isCorrect ? "bg-green-100 text-green-800 font-semibold" :
                        isWrong ? "bg-red-100 text-red-800 font-medium" : "text-gray-800"
                      }`}
                    >
                      {opt}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          {isPassed && (
            <Button onClick={handleDownloadCertificate}>Download Certificate</Button>
          )}
          <Button variant="outline" className="mt-4 ml-2" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;

