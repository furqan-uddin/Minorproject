// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <h1 className="text-3xl font-bold underline bg-green-900">
//       Hello world!
//     </h1>
//   )
// }

// export default App
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import QuizPage from './pages/Quizpage';
import Leaderboard from './pages/Leaderboard';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<h2 className="text-center mt-10 text-xl">Welcome to Quiz Certification System</h2>} /> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<h2 className="text-center mt-10">Login Page</h2>} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<h2 className="text-center mt-10">Register Page</h2>} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizzes" element={<Categories />} />
        <Route path="/quizzes/:categoryId" element={<QuizPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

      </Routes>
    </>
  );
};

export default App;

