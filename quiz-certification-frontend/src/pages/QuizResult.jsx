// //quiz-certification-frontend/src/QuizResult.jsx
// import React from "react";
// import { useLocation, useNavigate, Navigate } from "react-router-dom";
// import { Button } from "../components/ui/button"; 

// const QuizResult = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { totalQuestions, correctAnswers, category , answers, questions } = location.state || {};

//   // 🛡️ Guard: Prevent direct access to result page
//   if (!location.state || totalQuestions === undefined || correctAnswers === undefined) {
//     return <Navigate to="/" />;
//   }

//   const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);
//   const isPassed = scorePercent >= 50;

//   const handleDownloadCertificate = () => {
//     alert("🎉 Certificate Download feature coming soon!");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 py-12">
//       <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
//         <h2 className="text-3xl font-bold text-indigo-700 mb-4">Quiz Result</h2>

//         <p className="text-lg mb-2">Category: <span className="font-medium text-purple-600">{category}</span></p>
//         <p className="mb-2">Total Questions: <strong>{totalQuestions}</strong></p>
//         <p className="mb-2">Correct Answers: <strong>{correctAnswers}</strong></p>
//         <p className="mb-4 text-xl font-semibold text-gray-800">
//           Score: {scorePercent}%
//         </p>

//         {isPassed ? (
//           <>
//             <p className="text-green-600 font-bold mb-4">🎉 Congratulations! You passed!</p>
//             <Button onClick={handleDownloadCertificate}>Download Certificate</Button>
//           </>
//         ) : (
//           <p className="text-red-600 font-semibold mb-4">😓 Better luck next time!</p>
//         )}

//         <Button variant="outline" className="mt-6" onClick={() => navigate("/dashboard")}>
//           Back to Dashboard
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default QuizResult;

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
        <h2 className="text-3xl font-bold mb-2 text-indigo-700 text-center">Quiz Result</h2>
        <p className="text-center text-lg mb-6">Category: <strong className="text-purple-600">{category}</strong></p>
        <p className="text-center mb-2">Score: <strong>{correctAnswers}/{totalQuestions}</strong> ({scorePercent}%)</p>

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
