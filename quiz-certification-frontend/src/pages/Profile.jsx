// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const tabs = ["Overview", "Settings", "Change Password", "Activity"];

const Profile = () => {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("Overview");
  const [userInfo, setUserInfo] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', photoURL: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/users/profile');
        setUserInfo(data);
        setForm({ name: data.name, email: data.email, photoURL: data.photoURL });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "quizpreset");
  
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/quizcloud/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      const imageUrl = res.data.secure_url;
  
      // ✅ ONLY update form, not userInfo
      setForm(prev => ({ ...prev, photoURL: imageUrl }));
  
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    }
  };
  

  const handleSave = async () => {
    if (!window.confirm("Are you sure you want to save changes?")) return;
  
    try {
      await API.put('/users/profile', form);
  
      // ✅ Update userInfo state (for Overview section)
      setUserInfo(prev => ({
        ...prev,
        name: form.name,
        email: form.email,
        photoURL: form.photoURL,
      }));
  
      // ✅ Update user context (for global app)
      setUser(prev => ({
        ...prev,
        name: form.name,
        email: form.email,
        photoURL: form.photoURL,
      }));
  
      // ✅ Update LocalStorage (for persistence after reload)
      localStorage.setItem('user', JSON.stringify({
        ...form,
        role: user.role,
        _id: user._id,
        token: user.token,
      }));
      
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error during profile update:", err);
      toast.error("Failed to update profile");
    }
  };
  
    
  
  const hasChanges =
    form.name !== userInfo?.name ||
    form.email !== userInfo?.email ||
    form.photoURL !== userInfo?.photoURL;

  if (!userInfo) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div>
          {activeTab === "Overview" && (
            <div className="text-center space-y-2">
              <img
                src={userInfo.photoURL || 'https://i.pravatar.cc/100?img=12'}
                alt="profile"
                className="w-24 h-24 rounded-full mx-auto object-cover shadow-md"
              />
              <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
              <p className="text-gray-600">{userInfo.email}</p>
              <p className="text-sm text-indigo-500 capitalize">{userInfo.role}</p>
              <p className="text-sm text-gray-500">
                Joined: {new Date(userInfo.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}

          {activeTab === "Settings" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full border p-2 rounded"
                />
                {form.photoURL && (
                  <img
                    src={form.photoURL}
                    alt="preview"
                    className="w-16 h-16 rounded-full mt-2 object-cover mx-auto"
                  />
                )}
              </div>
              {hasChanges && (
                <div className="flex gap-4 justify-end pt-4">
                  <button
                    onClick={() =>
                      setForm({
                        name: userInfo.name,
                        email: userInfo.email,
                        photoURL: userInfo.photoURL,
                      })
                    }
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "Change Password" && (
            <div className="text-center">
              <p className="mb-4 text-gray-700">Want to update your password?</p>
              <button
                onClick={() => navigate("/forgot-password")}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
              >
                Go to Password Reset Page
              </button>
            </div>
          )}

{activeTab === "Activity" && (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-indigo-700 text-center mb-4">
      Activity Timeline
    </h3>
    <div className="relative border-l-2 border-indigo-200 pl-6">

      {/* Password Changed */}
      {userInfo.passwordChangedAt && (
        <div className="mb-8">
          <div className="absolute -left-3 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white"></div>
          <p className="text-sm text-gray-500">
            {new Date(userInfo.passwordChangedAt).toLocaleString()}
          </p>
          <h4 className="text-md font-semibold">Password Changed</h4>
          <p className="text-gray-600 text-sm">
            You updated your password for security reasons.
          </p>
        </div>
      )}

      {/* Profile Updated */}
      {userInfo.profileUpdatedAt && (
        <div className="mb-8">
          <div className="absolute -left-3 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
          <p className="text-sm text-gray-500">
            {new Date(userInfo.profileUpdatedAt).toLocaleString()}
          </p>
          <h4 className="text-md font-semibold">Profile Updated</h4>
          <p className="text-gray-600 text-sm">
            Name, email or photo was changed in profile settings.
          </p>
        </div>
      )}

      {/* Quiz Activity */}
      {userInfo?.quizHistory?.length > 0 ? (
        userInfo.quizHistory.slice(0, 5).map((quiz, idx) => (
          <div className="mb-8" key={idx}>
            <div className="absolute -left-3 w-6 h-6 bg-yellow-500 rounded-full border-4 border-white"></div>
            <p className="text-sm text-gray-500">
              {new Date(quiz.timestamp).toLocaleString()}
            </p>
            <h4 className="text-md font-semibold">Quiz Attempted</h4>
            <p className="text-gray-600 text-sm">
              {quiz.category} quiz ({quiz.difficulty}) – Score: {quiz.score}/{quiz.total}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">No quiz activity found.</p>
      )}
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
