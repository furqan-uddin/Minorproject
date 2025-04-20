//quiz-certification-frontend/src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, adminOnly = false  }) => {
  const { user } = useAuth();

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== "admin") {
    toast.error('Unauthorized access: Admins only')
    return <Navigate to="/" />;
  }
  // If logged in, allow access to the page
  return children;
};

export default ProtectedRoute;
