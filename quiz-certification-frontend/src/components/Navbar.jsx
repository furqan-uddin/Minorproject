import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          Quizify
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-700 transition font-medium">
            Home
          </Link>

          {user && (
            <Link to="/quizzes" className="text-gray-700 hover:text-indigo-700 transition font-medium">
              Quizzes
            </Link>
          )}

          <Link to="/leaderboard" className="text-gray-700 hover:text-indigo-700 transition font-medium">
            Leaderboard
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-700 transition font-medium">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-indigo-700 transition font-medium">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-700 transition font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
