// //quiz-certification-frontend/src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          Quizify
        </Link>

        {/* Toggle for mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 w-full md:w-auto mt-4 md:mt-0`}
        >
          <Link to="/" className="block md:inline text-gray-700 hover:text-indigo-700 font-medium px-2 py-1">
            Home
          </Link>

          {user && (
            <Link to="/quizzes" className="block md:inline text-gray-700 hover:text-indigo-700 font-medium px-2 py-1">
              Quizzes
            </Link>
          )}

          <Link to="/leaderboard" className="block md:inline text-gray-700 hover:text-indigo-700 font-medium px-2 py-1">
            Leaderboard
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="block md:inline text-red-600 font-semibold px-2 py-1 hover:underline">
              Admin
            </Link>
          )}

          {user ? (
            <>
              <Link to="/dashboard" className="block md:inline text-gray-700 hover:text-indigo-700 font-medium px-2 py-1">
                Dashboard
              </Link>
              <Link to="/profile" className="block md:inline text-gray-700 hover:text-indigo-700 font-medium px-2 py-1">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block md:inline bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 font-medium mt-2 md:mt-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block md:inline text-gray-700 hover:text-indigo-700 font-medium px-2 py-1">
                Login
              </Link>
              <Link
                to="/register"
                className="block md:inline bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 font-medium mt-2 md:mt-0"
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
