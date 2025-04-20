//src/pages/admin/AdminDashBoard
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Admin Panel</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Link to="/admin/users" className="bg-indigo-100 p-6 rounded-lg text-center shadow hover:bg-indigo-200">
            Manage Users
          </Link>
          <Link to="/admin/questions" className="bg-green-100 p-6 rounded-lg text-center shadow hover:bg-green-200">
            Manage Questions
          </Link>
          <Link to="/admin/results" className="bg-yellow-100 p-6 rounded-lg text-center shadow hover:bg-yellow-200">
            View Results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
