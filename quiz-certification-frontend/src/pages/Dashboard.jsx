import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = {
    name: "Mohammed Furqanuddin",
    email: "mohammedfurqanuddin@gmail.com",
    quizzesTaken: 3,
    certificatesEarned: 2,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Welcome, {user.name} 👋
        </h2>

        {/* User Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-100 p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-indigo-700 mb-1">Email</h4>
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-indigo-700 mb-1">Quizzes Taken</h4>
            <p className="text-gray-700">{user.quizzesTaken}</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-indigo-700 mb-1">Certificates Earned</h4>
            <p className="text-gray-700">{user.certificatesEarned}</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-xl shadow flex items-center justify-center">
            <Link
              to="/categories"
              className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
