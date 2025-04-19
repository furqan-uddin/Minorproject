// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import Spinner from '../components/Spinner.jsx';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [preview, setPreview] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/users/profile');
        setUserInfo(data);
        setForm({
          name: data.name || '',
          email: data.email || '',
        });
        setPreview(data.photoURL || '');
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const { data } = await API.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserInfo(data);
      setUser(data);
      setEditMode(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  // if (!userInfo) return <p>Loading...</p>;
  if (!userInfo) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <img
          src={preview  ? 
            preview.startsWith('http') ? preview : `http://localhost:5000${preview}`
            : 'https://i.pravatar.cc/100?img=12'
          }
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        {editMode ? (
          <>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Email"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <button
              onClick={handleSave}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="mt-2 text-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
            <p className="text-gray-600">{userInfo.email}</p>
            <p className="text-sm text-indigo-500 mt-1">{userInfo.role || 'User'}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
