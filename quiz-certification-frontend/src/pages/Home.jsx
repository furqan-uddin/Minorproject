import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
        Welcome to the Quiz Certification System
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
        Test your knowledge in various subjects and earn certificates to showcase your skills.
      </p>
      <Link to="/login">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
