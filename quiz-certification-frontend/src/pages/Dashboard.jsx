// // quiz-certification-frontend/src/pages/Dashboard.jsx
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
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-8">
          Welcome, {user?.name || 'User'} 👋
        </h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-indigo-100 p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <h4 className="text-lg font-semibold text-indigo-800 mb-2">Quizzes Taken</h4>
            <p className="text-3xl font-bold text-indigo-900">{totalQuizzes}</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <h4 className="text-lg font-semibold text-indigo-800 mb-2">Certificates Earned</h4>
            <p className="text-3xl font-bold text-indigo-900">{totalCertificates}</p>
          </div>
        </div>

        {/* Explore Button */}
        <div className="text-center mb-12">
          <Link to="/quizzes">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-5 text-lg">
              Explore Categories
            </Button>
          </Link>
        </div>

        {/* Quiz History */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">Quiz History</h3>

          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : history.length === 0 ? (
            <p className="text-gray-600 text-center">No quiz history yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-sm">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-indigo-100 text-indigo-700">
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Difficulty</th>
                    <th className="p-3 text-center">Score</th>
                    <th className="p-3 text-center">Total</th>
                    <th className="p-3 text-center">Date</th>
                    <th className="p-3 text-center">Actions</th>
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
                        <td className="p-3 text-center">{entry.score}</td>
                        <td className="p-3 text-center">{entry.total}</td>
                        <td className="p-3 text-center">{new Date(entry.timestamp).toLocaleDateString()}</td>
                        <td className="p-3 text-center">
                          {isPassed ? (
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                              onClick={() => handleDownload(entry)}
                            >
                              Certificate
                            </Button>
                          ) : (
                            <span className="text-red-500 font-semibold">Failed</span>
                          )}
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
    </div>
  );
};

export default Dashboard;
