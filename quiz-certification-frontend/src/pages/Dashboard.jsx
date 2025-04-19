// quiz-certification-frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import Spinner from "../components/Spinner";
import { Button } from "../components/ui/button";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get("/results/history");
        setHistory(data);
      } catch (err) {
        console.error("Failed to load quiz history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDownload = (entry) => {
    navigate("/certificate", {
      state: {
        name: user?.name || "User",
        category: entry.category,
        score: `${entry.score}/${entry.total}`,
        date: new Date(entry.timestamp).toLocaleDateString(),
      },
    });
  };

  const totalQuizzes = history.length;
  const totalCertificates = history.filter((q) => (q.score / q.total) * 100 >= 50).length;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Welcome, {user?.name || 'User'} 👋🎯
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-100 p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-indigo-700 mb-1">Quizzes Taken</h4>
            <p className="text-gray-700">{totalQuizzes}</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-indigo-700 mb-1">Certificates Earned</h4>
            <p className="text-gray-700">{totalCertificates}</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-xl shadow flex items-center justify-center col-span-2">
            <Link
              to="/quizzes"
              className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition"
            >
              Explore Categories
            </Link>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-indigo-700 mb-4">Quiz History</h3>
        {loading ? (
          <Spinner />
        ) : history.length === 0 ? (
          <p className="text-gray-600">No quiz history yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="p-3">Category</th>
                  <th className="p-3">Difficulty</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, idx) => {
                  const scorePercent = (entry.score / entry.total) * 100;
                  const isPassed = scorePercent >= 50;

                  return (
                    <tr key={idx} className="border-b hover:bg-indigo-50">
                      <td className="p-3">{entry.category}</td>
                      <td className="p-3 capitalize">{entry.difficulty || 'N/A'}</td>
                      <td className="p-3">{entry.score}</td>
                      <td className="p-3">{entry.total}</td>
                      <td className="p-3">{new Date(entry.timestamp).toLocaleDateString()}</td>
                      <td className="p-3">
                        {isPassed ? (
                          <Button size="sm" onClick={() => handleDownload(entry)}>
                            Certificate
                          </Button>
                        ): <p className="text-red-500 text-lg">Failed !</p>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


// {/* Quiz History */}
// {/* <div>
// <h3 className="text-2xl font-bold text-indigo-700 mb-4">Quiz History</h3>
// {history.length === 0 ? (
//   <p className="text-gray-600">No quiz history found.</p>
// ) : (
//   <ul className="space-y-4">
//     {history.map((entry, index) => (
//       <li
//         key={index}
//         className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center"
//       >
//         <div>
//           <p><strong>Category:</strong> {entry.category}</p>
//           <p><strong>Score:</strong> {entry.score}/{entry.total}</p>
//           <p><strong>Difficulty:</strong> {entry.difficulty || "N/A"}</p>
//           <p><strong>Date:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
//         </div>
//       </li>
//     ))}
//   </ul>
// )}
// </div> */}
