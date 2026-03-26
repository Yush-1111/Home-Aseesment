# Full Stack Web Development Assignment

Simple full stack app built with React, Node.js, Express, and MongoDB.

## Features

- Login with validation (email format + required password)
- Backend login API using MongoDB-stored user data
- JWT-based authentication
- Protected dashboard route
- Dashboard shows logged-in user name + dummy lists (Leads, Tasks, Users)
- Logout functionality
- Responsive UI

## Tech Stack

- Frontend: React.js (Vite)
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)

## Folder Structure

- `frontend/`
- `backend/`

## Setup

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend: `http://localhost:5000`

### Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Demo Credentials

- Email: `test@example.com`
- Password: `password123`

## APIs

- `POST /api/auth/login`
- `GET /api/dashboard` (requires `Authorization: Bearer <token>`)
- `GET /api/health`

## Submission

- Push to GitHub and share repository link.
- Optional: deploy frontend on Vercel/Netlify and backend on Render/Railway.
