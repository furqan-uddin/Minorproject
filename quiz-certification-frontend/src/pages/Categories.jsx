// export default Categories;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get('/quizzes');
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-10">
        Choose a Quiz Category
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((category) => (
          <div
            key={category.category}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {category.category}
            </h3>
            <p className="text-gray-700 mb-4">{category.description}</p>
            <Link to={`/quizzes/${category.category}`}>
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
