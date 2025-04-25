//quiz-certification-frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(formData);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);

      if (message.toLowerCase().includes("user not found")) {
        setTimeout(() => navigate("/register"), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">
          Login to Quizify
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-sm text-indigo-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <p
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-indigo-600 hover:underline cursor-pointer text-right mt-1"
          >
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 hover:underline cursor-pointer font-medium"
            >
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
