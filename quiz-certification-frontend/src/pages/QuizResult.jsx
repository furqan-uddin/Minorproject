import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Button } from "../components/ui/button"; // Adjust path if needed

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuestions, correctAnswers, category } = location.state || {};

  // 🛡️ Guard: Prevent direct access to result page
  if (!location.state || totalQuestions === undefined || correctAnswers === undefined) {
    return <Navigate to="/" />;
  }

  const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);
  const isPassed = scorePercent >= 50;

  const handleDownloadCertificate = () => {
    alert("🎉 Certificate Download feature coming soon!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Quiz Result</h2>

        <p className="text-lg mb-2">Category: <span className="font-medium text-purple-600">{category}</span></p>
        <p className="mb-2">Total Questions: <strong>{totalQuestions}</strong></p>
        <p className="mb-2">Correct Answers: <strong>{correctAnswers}</strong></p>
        <p className="mb-4 text-xl font-semibold text-gray-800">
          Score: {scorePercent}%
        </p>

        {isPassed ? (
          <>
            <p className="text-green-600 font-bold mb-4">🎉 Congratulations! You passed!</p>
            <Button onClick={handleDownloadCertificate}>Download Certificate</Button>
          </>
        ) : (
          <p className="text-red-600 font-semibold mb-4">😓 Better luck next time!</p>
        )}

        <Button variant="outline" className="mt-6" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;
