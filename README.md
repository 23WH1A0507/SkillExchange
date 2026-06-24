# SkillSwap

SkillSwap is a MERN-based platform that connects learners and mentors for peer-to-peer skill sharing, collaboration, and knowledge exchange.

## Features

* User profiles and skill showcase
* Skill-based user discovery
* Real-time chat with Socket.IO
* Mentor/Learner connection requests
* Ratings and feedback system
* Reporting and moderation features

## Tech Stack

* **Frontend:** React, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Real-Time Communication:** Socket.IO

## Local Setup

### Prerequisites

* Node.js (v18+)
* MongoDB (Atlas or Local)

### Clone Repository

```bash
git clone https://github.com/23wh1a0507/SkillSwap.git
cd SkillSwap
```

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8000`

## Environment Variables

### Backend (`Backend/.env`)

```env
PORT=8000
MONGODB_URI=
JWT_SECRET=
```

### Frontend (`Frontend/.env`)

```env
VITE_SERVER_URL=http://localhost:8000
```

## Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway
* Database: MongoDB Atlas
