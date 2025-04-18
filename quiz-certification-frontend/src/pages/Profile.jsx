//quiz-certification-frontend/src/pages/Profile.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{user?.name || "John Doe"}</h2>
        <p className="text-gray-600">{user?.email || "johndoe@example.com"}</p>
        <p className="text-sm text-indigo-500 mt-1">{user?.role || "User"}</p>

        <button
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
