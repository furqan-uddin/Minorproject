//src/pages/admin/AdminQuizzes
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";

const AdminQuizzes = () => {
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ category: "", difficulty: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ category: "", difficulty: "", question: "", options: ["", "", "", ""], answer: "" });
  const [newQuestion, setNewQuestion] = useState({ category: "", difficulty: "", question: "", options: ["", "", "", ""], answer: "" });

  const fetchQuestions = async () => {
    const { data } = await API.get("/admin/questions");
    setQuestions(data);
    setFiltered(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const filteredList = questions.filter(q =>
      (!newFilters.category || q.category === newFilters.category) &&
      (!newFilters.difficulty || q.difficulty === newFilters.difficulty)
    );
    setFiltered(filteredList);
  };

  const handleClearFilters = () => {
    setFilters({ category: "", difficulty: "" });
    setFiltered(questions);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this question?")) {
      await API.delete(`/admin/questions/${id}`);
      fetchQuestions();
      toast.success("Deleted");
    }
  };

  const startEditing = (q) => {
    setEditingId(q._id);
    setEditData({ ...q });
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleOptionChange = (idx, value, isEdit = true) => {
    const opts = isEdit ? [...editData.options] : [...newQuestion.options];
    opts[idx] = value;
    isEdit
      ? setEditData({ ...editData, options: opts })
      : setNewQuestion({ ...newQuestion, options: opts });
  };

  const handleSave = async () => {
    try {
      await API.put(`/admin/questions/${editingId}`, editData);
      setEditingId(null);
      fetchQuestions();
      toast.success("Updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/questions", newQuestion);
      fetchQuestions();
      setNewQuestion({ category: "", difficulty: "", question: "", options: ["", "", "", ""], answer: "" });
      toast.success("Question added");
    } catch {
      toast.error("Add failed");
    }
  };

  const uniqueCategories = [...new Set(questions.map(q => q.category))];
  const uniqueDifficulties = [...new Set(questions.map(q => q.difficulty))];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-green-700">Manage Quiz Questions</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow">
        <select name="category" value={filters.category} onChange={handleFilterChange} className="border p-2 rounded w-full md:w-auto">
          <option value="">All Categories</option>
          {uniqueCategories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
        </select>
        <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange} className="border p-2 rounded w-full md:w-auto">
          <option value="">All Difficulties</option>
          {uniqueDifficulties.map((dif, i) => <option key={i} value={dif}>{dif}</option>)}
        </select>
        <button onClick={handleClearFilters} className="text-sm text-gray-600 hover:underline">Clear Filters</button>
      </div>

      {/* Add New Question */}
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="text-xl font-semibold text-green-700">Add Question</h3>
        <input className="w-full border p-2 rounded" value={newQuestion.category} onChange={e => setNewQuestion({ ...newQuestion, category: e.target.value })} placeholder="Category" required />
        <input className="w-full border p-2 rounded" value={newQuestion.difficulty} onChange={e => setNewQuestion({ ...newQuestion, difficulty: e.target.value })} placeholder="Difficulty" required />
        <textarea className="w-full border p-2 rounded" value={newQuestion.question} onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })} placeholder="Question" required />
        {newQuestion.options.map((opt, i) => (
          <input key={i} className="w-full border p-2 rounded" value={opt} onChange={e => handleOptionChange(i, e.target.value, false)} placeholder={`Option ${i + 1}`} required />
        ))}
        <input className="w-full border p-2 rounded" value={newQuestion.answer} onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })} placeholder="Answer" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
      </form>

      {/* Questions */}
      {filtered.map((q) => (
        <div key={q._id} className="bg-white p-4 rounded-xl shadow border space-y-2">
          {editingId === q._id ? (
            <div className="space-y-2">
              <input className="w-full border p-1" value={editData.category} onChange={e => handleEditChange("category", e.target.value)} />
              <input className="w-full border p-1" value={editData.difficulty} onChange={e => handleEditChange("difficulty", e.target.value)} />
              <textarea className="w-full border p-1" value={editData.question} onChange={e => handleEditChange("question", e.target.value)} />
              {editData.options.map((opt, i) => (
                <input key={i} className="w-full border p-1" value={opt} onChange={e => handleOptionChange(i, e.target.value)} />
              ))}
              <input className="w-full border p-1" value={editData.answer} onChange={e => handleEditChange("answer", e.target.value)} />
              <div className="space-x-3">
                <button onClick={handleSave} className="text-green-600 hover:underline">Save</button>
                <button onClick={() => setEditingId(null)} className="text-gray-600 hover:underline">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p><strong>Category:</strong> {q.category}</p>
              <p><strong>Difficulty:</strong> {q.difficulty}</p>
              <p><strong>Question:</strong> {q.question}</p>
              <p><strong>Answer:</strong> {q.answer}</p>
              <ul className="list-disc pl-6">{q.options.map((opt, i) => <li key={i}>{opt}</li>)}</ul>
              <div className="space-x-3 mt-2">
                <button onClick={() => startEditing(q)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(q._id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminQuizzes;
