import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "tech",
    title: "Tech",
    description: "Explore quizzes on programming, web dev, and more.",
  },
  {
    id: "aptitude",
    title: "Aptitude",
    description: "Test your logical, verbal, and numerical reasoning.",
  },
  {
    id: "gk",
    title: "General Knowledge",
    description: "Stay updated with current affairs and world knowledge.",
  },
  {
    id: "science",
    title: "Science",
    description: "Dive into physics, chemistry, biology quizzes.",
  },
  {
    id: "cs-fundamentals",
    title: "Computer Science Fundamentals",
    description: "Quizzes on DBMS, OS, CN, DSA, and core CS concepts.",
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    description: "Practice HR and technical questions for placements.",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-10">
        Choose a Quiz Category
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {category.title}
            </h3>
            <p className="text-gray-700 mb-4">{category.description}</p>
            <Link to={`/quizzes/${category.id}`}>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
                Start Quiz
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
