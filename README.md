# 🧠 Quizify – Online Quiz & Certification System (Frontend)

Quizify is a MERN-based online quiz platform where users can attempt quizzes, track progress, download certificates, and compete on a leaderboard.  
This repository contains the **frontend**, built using **React + Vite + Tailwind CSS**.

🔗 **Live Website:** https://quizify-phi.vercel.app/  
🔗 **Backend API:** https://quiziify-backend.onrender.com  
🔗 **Frontend Repo:** https://github.com/furqan-uddin/Minorproject  
🔗 **Backend Repo:** https://github.com/furqan-uddin/MinorprojectBackend  

---

## 🚀 Features (Frontend)

### 🎯 User Features
- User Registration & Login (JWT-based)
- Forgot & Reset Password
- Dashboard with quiz history
- Certificate generation + PDF download
- Profile page with timeline events (password changed, profile updated, quiz attempts)
- Leaderboard with rankings

### 🧩 Quiz Features
- Quiz Categories with descriptions
- Difficulty selector (Easy / Medium / Hard)
- Dynamic quiz questions based on category & difficulty
- 10-second timer per question
- Auto-submit on timeout
- Detailed result screen

### 🛠 Admin Features
- Admin dashboard  
- Manage Users (Edit / Delete)  
- Manage Questions  
- Manage Results  
- Admin routing protected via `ProtectedRoute`

### 🎨 UI / UX
- Tailwind CSS clean UI  
- Toast notifications  
- Spinner loading state  
- Mobile responsive  
- Modern animations  

---

## 🛠 Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- React Toastify
- Axios
- html2pdf.js (certificate download)

### **Auth**
- Context API (`AuthContext`)
- LocalStorage token handling
- Protected routes

---

## 📂 Folder Structure (Exact, from your source)

```
src/
│── api.js
│── App.jsx
│── main.jsx
│── App.css
│── index.css
│
│── assets/
│   ├── img.png
│
│── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── Spinner.jsx
│   └── ui/
│       └── button.jsx
│
│── context/
│   └── AuthContext.jsx
│
│── layouts/
│   └── AdminLayout.jsx
│
│── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ForgotPassword.jsx
│   ├── Dashboard.jsx
│   ├── Categories.jsx
│   ├── QuizPage.jsx
│   ├── QuizResult.jsx
│   ├── Leaderboard.jsx
│   ├── CertificatePreview.jsx
│   ├── Profile.jsx
│
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── AdminUsers.jsx
│       ├── AdminQuizzes.jsx
│       ├── AdminResults.jsx
```

---

## 🌐 Connecting to Backend

All requests go through Axios instance (`api.js`):

const API = axios.create({
baseURL: 'https://quiziify-backend.onrender.com/api
',
});

Token is automatically added via interceptor.

---

## ⚙️ Environment Variables (Optional for local)

Create `.env`:

VITE_API_URL=http://localhost:5000/api


---

## 🔧 Installation & Setup

```
git clone https://github.com/furqan-uddin/Minorproject

cd Minorproject
npm install
npm run dev
```

---

## 🙌 Author

**Mohammad Furqanuddin**  
🔗 LinkedIn: https://www.linkedin.com/in/mohammadfurqanuddin  
📧 Email: mohammedfurqan2108@gmail.com
