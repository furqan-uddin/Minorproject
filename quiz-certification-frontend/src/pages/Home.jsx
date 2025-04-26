// quiz-certification-frontend/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import illustration from "../assets/img.png";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      
      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-24">
        
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 leading-tight mb-4 animate-fadeInUp">
            Test Your Skills. <br /> Achieve Your Goals.
          </h1>
          <p className="text-gray-600 text-lg mb-6 animate-fadeIn delay-100">
            Explore quizzes, earn certificates, and showcase your talent to the world.
          </p>
          <Link
            to="/register"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 animate-fadeIn delay-200"
          >
            Get Started
          </Link>
        </div>

        {/* Illustration */}
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src={illustration}
            alt="Quiz Illustration"
            className="w-full max-w-sm md:max-w-md animate-fadeInUp"
          />
        </div>

      </main>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-12 bg-white shadow-inner">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-12">
          Why Choose Quizify?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature Card */}
          <div className="bg-indigo-100 hover:scale-105 hover:shadow-xl transition-all rounded-xl p-6 text-center">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Multiple Categories</h3>
            <p className="text-gray-700 text-sm">
              Explore quizzes across technology, science, aptitude, and more.
            </p>
          </div>

          <div className="bg-indigo-100 hover:scale-105 hover:shadow-xl transition-all rounded-xl p-6 text-center">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Instant Certificates</h3>
            <p className="text-gray-700 text-sm">
              Download your achievement certificates immediately after passing quizzes.
            </p>
          </div>

          <div className="bg-indigo-100 hover:scale-105 hover:shadow-xl transition-all rounded-xl p-6 text-center">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Leaderboard Ranking</h3>
            <p className="text-gray-700 text-sm">
              Compete with others and climb the leaderboard to showcase your knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white text-center py-5">
        <p className="text-sm">&copy; {new Date().getFullYear()} Quizify. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;


