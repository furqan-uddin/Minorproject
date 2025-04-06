import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // 🔐 If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in, allow access to the page
  return children;
};

export default ProtectedRoute;
