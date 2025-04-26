// quiz-certification-frontend/src/components/Navbar.jsx
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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-indigo-700 hover:text-purple-600 transition">
          Quizify
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-indigo-700 focus:outline-none"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
          } md:flex md:items-center md:space-x-6 w-full md:w-auto mt-6 md:mt-0 transition-all duration-300`}
        >
          <Link to="/" className="nav-link">Home</Link>

          {user && (
            <Link to="/quizzes" className="nav-link">Quizzes</Link>
          )}

          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="text-red-600 font-semibold px-3 py-2 hover:underline transition">
              Admin
            </Link>
          )}

          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-medium transition mt-3 md:mt-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition mt-3 md:mt-0"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Custom CSS inside JSX for reusability */}
      <style>{`
        .nav-link {
          display: block;
          padding: 8px 12px;
          font-weight: 500;
          color: #4B5563; /* gray-700 */
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: #4F46E5; /* indigo-700 */
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
