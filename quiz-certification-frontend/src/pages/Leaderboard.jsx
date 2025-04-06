import React from "react";

const mockLeaderboard = [
  {
    name: "John Doe",
    category: "Tech",
    score: 9,
    total: 10,
  },
  {
    name: "Aisha Khan",
    category: "Aptitude",
    score: 8,
    total: 10,
  },
  {
    name: "Rahul Sharma",
    category: "Fundamentals",
    score: 7,
    total: 10,
  },
  {
    name: "Sneha Verma",
    category: "Interview",
    score: 6,
    total: 10,
  },
];

const Leaderboard = () => {
  const leaderboardData = [...mockLeaderboard].sort(
    (a, b) => b.score - a.score
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          🏆 Leaderboard
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-indigo-800">
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="p-3 font-semibold">{index + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.category}</td>
                  <td className="p-3">
                    {user.score}/{user.total}
                  </td>
                  <td className="p-3">
                    {Math.round((user.score / user.total) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
