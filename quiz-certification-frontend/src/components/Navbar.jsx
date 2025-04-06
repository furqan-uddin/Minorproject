import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          Quizify
        </Link>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-700 transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/quizzes"
            className="text-gray-700 hover:text-indigo-700 transition font-medium"
          >
            Quizzes
          </Link>
          <Link to="/leaderboard" className="text-gray-700 hover:text-indigo-700 transition font-medium">
            Leaderboard
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-indigo-700 transition font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-indigo-700 transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
