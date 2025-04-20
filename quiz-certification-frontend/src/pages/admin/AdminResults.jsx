//src/pages/admin/AdminResult
import React, { useEffect, useState } from "react";
import API from "../../api";

const AdminResults = () => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const { data } = await API.get("/admin/results");
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-yellow-700 mb-4">Quiz Results</h2>
      <table className="w-full bg-white rounded-xl shadow border">
        <thead>
          <tr className="bg-yellow-100">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Difficulty</th>
            <th className="p-3 text-left">Score</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx} className="border-b hover:bg-yellow-50">
              <td className="p-3">{r.user?.name}</td>
              <td className="p-3">{r.category}</td>
              <td className="p-3">{r.difficulty || "N/A"}</td>
              <td className="p-3">{r.score}/{r.total}</td>
              <td className="p-3">{new Date(r.timestamp).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminResults;
