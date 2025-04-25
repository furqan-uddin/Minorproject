// //quiz-certification-frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPasswordStrong = (password) => {
    const regex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.warning("All fields are required");
      return;
    }

    if (!isPasswordStrong(password)) {
      toast.error("Password must be at least 6 characters long and contain at least one special character.");
      return;
    }

    try {
      await register(formData);
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      console.error("REGISTER ERROR:", err.response);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                // type="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Create a password"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-sm text-indigo-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Must be 6+ characters & include 1 special character</p>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
