// //src/pages/admin/AdminResult
import React, { useEffect, useState } from "react";
import API from "../../api";

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

  const fetchResults = async () => {
    const { data } = await API.get("/admin/results");
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const openModal = (result) => {
    setSelectedResult(result);
  };

  const closeModal = () => {
    setSelectedResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-yellow-700 mb-4">Quiz Results</h2>

      <input
        type="text"
        placeholder="Search by user or category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 border rounded w-full max-w-md"
      />

      <table className="w-full bg-white rounded-xl shadow border">
        <thead>
          <tr className="bg-yellow-100">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Difficulty</th>
            <th className="p-3 text-left">Score</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results
            .filter((r) =>
              r.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              r.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((r, idx) => (
              <tr key={idx} className="border-b hover:bg-yellow-50">
                <td className="p-3">{r.user?.name}</td>
                <td className="p-3">{r.category}</td>
                <td className="p-3">{r.difficulty || "N/A"}</td>
                <td className="p-3">
                  {r.score}/{r.total}
                </td>
                <td className="p-3">
                  {new Date(r.timestamp).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => openModal(r)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

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

            <button
              onClick={closeModal}
              className="mt-6 w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResults;
