//src/pages/admin/AdminResult
import React, { useEffect, useState } from "react";
import API from "../../api";

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const { data } = await API.get("/admin/results");
    setResults(data);
  };

  const openModal = (r) => setSelectedResult(r);
  const closeModal = () => setSelectedResult(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yellow-700">Quiz Results</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by user or category"
        className="p-2 border rounded w-full max-w-md"
      />

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow border">
          <thead>
            <tr className="bg-yellow-100 text-left">
              <th className="p-3">User</th>
              <th className="p-3">Category</th>
              <th className="p-3">Difficulty</th>
              <th className="p-3">Score</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results
              .filter(r =>
                r.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.category.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((r, idx) => (
                <tr key={idx} className="border-b hover:bg-yellow-50">
                  <td className="p-3">{r.user?.name}</td>
                  <td className="p-3">{r.category}</td>
                  <td className="p-3">{r.difficulty || "N/A"}</td>
                  <td className="p-3">{r.score}/{r.total}</td>
                  <td className="p-3">{new Date(r.timestamp).toLocaleDateString()}</td>
                  <td className="p-3">
                    <button onClick={() => openModal(r)} className="text-blue-600 hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <h3 className="text-xl font-semibold mb-4 text-center text-yellow-700">Result Details</h3>
            <p><strong>User:</strong> {selectedResult.user?.name}</p>
            <p><strong>Email:</strong> {selectedResult.user?.email}</p>
            <p><strong>Category:</strong> {selectedResult.category}</p>
            <p><strong>Difficulty:</strong> {selectedResult.difficulty}</p>
            <p><strong>Score:</strong> {selectedResult.score}/{selectedResult.total}</p>
            <p><strong>Percentage:</strong> {((selectedResult.score / selectedResult.total) * 100).toFixed(2)}%</p>
            <p><strong>Date:</strong> {new Date(selectedResult.timestamp).toLocaleString()}</p>
            <button onClick={closeModal} className="mt-6 w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResults;
