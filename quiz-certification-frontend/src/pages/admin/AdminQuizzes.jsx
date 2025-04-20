//src/pages/admin/AdminQuizzes
import React, { useEffect, useState } from "react";
import API from "../../api";

const AdminQuizzes = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const { data } = await API.get("/admin/questions");
    setQuestions(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await API.delete(`/admin/questions/${id}`);
      fetchQuestions();
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">All Quiz Questions</h2>
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q._id} className="bg-white p-4 rounded-xl shadow border">
            <p><strong>Category:</strong> {q.category}</p>
            <p><strong>Difficulty:</strong> {q.difficulty}</p>
            <p><strong>Question:</strong> {q.question}</p>
            <p><strong>Answer:</strong> {q.answer}</p>
            <ul className="list-disc pl-6 mt-2">
              {q.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
            <div className="mt-2">
              <button
                onClick={() => handleDelete(q._id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
              {/* You can add edit logic later here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQuizzes;
