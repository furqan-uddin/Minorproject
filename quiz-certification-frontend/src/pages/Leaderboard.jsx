import React from "react";

const Leaderboard = () => {
  const dummyData = [
    { name: "Alice", email: "alice@example.com", score: 95 },
    { name: "Bob", email: "bob@example.com", score: 90 },
    { name: "Charlie", email: "charlie@example.com", score: 85 },
    { name: "David", email: "david@example.com", score: 82 },
    { name: "Eva", email: "eva@example.com", score: 80 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Leaderboard
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="px-6 py-3 text-left font-semibold">#</th>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 font-medium text-indigo-600">
                    {user.score}
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
