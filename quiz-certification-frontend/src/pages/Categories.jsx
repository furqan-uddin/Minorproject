// quiz-certification-frontend/src/pages/Categories.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Spinner from "../components/Spinner";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get('/quizzes');
        setCategories(data);

        const defaultDiffs = {};
        data.forEach(cat => (defaultDiffs[cat.category] = "medium"));
        setDifficulties(defaultDiffs);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleStartQuiz = (categoryId) => {
    const diff = difficulties[categoryId] || "medium";
    navigate(`/quizzes/${categoryId}?difficulty=${diff}`);
  };

  const handleDifficultyChange = (categoryId, value) => {
    setDifficulties((prev) => ({ ...prev, [categoryId]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        Choose a Quiz Category
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.category}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                {category.category}
              </h3>
              <p className="text-gray-700 mb-4">{category.description}</p>

              <select
                value={difficulties[category.category]}
                onChange={(e) =>
                  handleDifficultyChange(category.category, e.target.value)
                }
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <button
                onClick={() => handleStartQuiz(category.category)}
                className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
