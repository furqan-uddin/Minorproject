// src/layouts/AdminLayout.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/questions", label: "Questions" },
    { path: "/admin/results", label: "Results" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-6 space-y-6">
        <div className="flex items-center justify-between md:justify-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-700">Admin Panel</h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-md font-medium transition ${
                location.pathname === item.path
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t pt-4">
          <button
            onClick={logout}
            className="w-full text-left text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
