# SkillSwap

SkillSwap is a MERN web app for peer-to-peer skill sharing. It helps learners connect with mentors, manage profile details, chat in real time, book sessions, rate experiences, and report issues.

## Features

- User registration and login
- Google OAuth sign-in
- Profile creation and profile edit
- Discover users by skill categories
- Real-time chat using Socket.IO
- Send, accept, and reject mentor/learner requests
- Rate users and leave feedback
- Report inappropriate behavior or sessions
- Upload profile pictures via Cloudinary
- Protected routes with JWT authentication
- Backend API routes for users, auth, chat, messages, requests, ratings, and reports

## Local setup

Prerequisites:
- Node.js (>=18)
- npm
- MongoDB database (Atlas or local)

Clone the repository:

```bash
git clone https://github.com/23wh1a0507/SkillSwap.git
cd SkillSwap
```

Setup backend:

```bash
cd Backend
npm install
# create .env with the values shown below
npm run dev
```

Setup frontend:

```bash
cd Frontend
npm install
# create .env if you need to customize the backend URL
npm run dev
```

Frontend dev server: http://localhost:5173
Backend dev server: http://localhost:8000

## Environment variables

Create `Backend/.env` with at minimum:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../dbname
JWT_SECRET=<your_jwt_secret>
CORS_ORIGIN=http://localhost:5173

# Optional Cloudinary settings
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Create `Frontend/.env` if you need to override the backend URL:

```env
VITE_SERVER_URL=http://localhost:8000
```

## Frontend proxy

The frontend uses Vite proxy settings to forward API calls to the backend at `http://localhost:8000` for these paths:

- `/auth`
- `/user`
- `/chat`
- `/message`
- `/request`
- `/report`
- `/rating`

## Production build

Frontend static build:

```bash
cd Frontend
npm run build
```

Backend production start:

```bash
cd Backend
npm start
```

If you want to serve the frontend from the backend, place the built frontend files in `Backend/public` or add a static middleware.

## Deployment suggestions

- Frontend: Vercel, Netlify, or any static host
- Backend: Render, Railway, Heroku, or a VPS
- Database: MongoDB Atlas with proper IP and user access



