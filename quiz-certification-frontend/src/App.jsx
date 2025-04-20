//quiz-certification-frontend/src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import QuizPage from './pages/QuizPage';
import Leaderboard from './pages/Leaderboard';
import QuizResult from './pages/QuizResult';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import CertificatePreview from './pages/CertificatePreview';

import AdminLayout from './layouts/AdminLayout'; // ✅ Add this
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminQuizzes from './pages/admin/AdminQuizzes';
import AdminResults from './pages/admin/AdminResults';
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quizzes" 
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quizzes/:categoryId" 
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quiz-result" 
          element={
            <ProtectedRoute>
              <QuizResult />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/certificate" 
          element={
            <ProtectedRoute>
              <CertificatePreview />
            </ProtectedRoute>
          }
        />
        {/* Leaderboard is public */}
        <Route path="/leaderboard" element={<Leaderboard />} />

        // Inside your Routes
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="questions" element={<AdminQuizzes />} />
          <Route path="results" element={<AdminResults />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
