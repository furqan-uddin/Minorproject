// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async ({ email, password }) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    console.log(data); 
  };

  const register = async ({ name, email, password }) => {
    const { data } = await API.post('/auth/register', { name, email, password });
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
