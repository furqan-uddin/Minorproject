// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
//         Welcome to the Quiz Certification System
//       </h1>
//       <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
//         Test your knowledge in various subjects and earn certificates to showcase your skills.
//       </p>
//       <Link to="/login">
//         <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
//           Get Started
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-10 py-20">
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 leading-tight">
            Test Your Knowledge. <br />
            Earn Your Certificate.
          </h2>
          <p className="mt-4 text-gray-700 text-lg">
            Participate in topic-wise quizzes, track your performance, and get certified instantly!
          </p>
          <Link
            to="/register"
            className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition"
          >
            Get Started
          </Link>
        </div>

        <div className="lg:w-1/2">
          <img
            src="https://storyset.com/images/education.svg"
            alt="Quiz Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="px-10 py-12 bg-white shadow-inner">
        <h3 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-indigo-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-indigo-700 mb-2">Multiple Categories</h4>
            <p className="text-gray-700">Access quizzes in tech, science, aptitude and more.</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-indigo-700 mb-2">Instant Certificates</h4>
            <p className="text-gray-700">Get downloadable certificates right after quiz completion.</p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-indigo-700 mb-2">Leaderboard</h4>
            <p className="text-gray-700">Track your score and compete with peers on the leaderboard.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Quizify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
