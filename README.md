# 🔐 Full Stack Authentication App (React + Node.js + JWT + SQLite)

This project is a full-stack authentication system built with:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** SQLite
- **Authentication:** JWT stored in httpOnly cookies
- **Security:** Protected Routes

---

## 🚀 Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication via secure httpOnly cookies
- Protected routes (frontend and backend)
- Cookie-based session management
- Logout functionality

---

## 🛠️ Tech Stack

| Layer     | Tech                                    |
|-----------|-----------------------------------------|
| Frontend  | React, React Router, Vite               |
| Backend   | Node.js, Express, bcrypt, JWT, sqlite3  |
| Database  | SQLite (via `sqlite3` and `sqlite` lib) |
| Auth      | JWT in httpOnly cookies                 |

---

## 📁 Project Structure

project-root/
│
├── backend/
│ ├── server.js # Express and db backend
│ |
│ └── .env # Environment variables
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ ├── components/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Home.jsx
│ │ │ └── ProtectedRoute.jsx
│ └── ...
│
├── README.md
└── package.json

1. Backend Setup
cd backend
npm install

Create .env file
PORT=5000
JWT_SECRET_KEY=your_jwt_secret

Start the backend
node index.js

2. Frontend Setup
cd frontend
npm install
npm run dev

🔑 Authentication Flow

Register: /register sends email and password to backend → stores hashed password in SQLite.

Login: /login issues JWT stored in an httpOnly cookie.

Protected Route: /home is only accessible if the cookie is valid (verified via /welcome endpoint).

Logout: /logout clears the token cookie.