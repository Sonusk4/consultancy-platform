# 🎯 Consultation Platform

A full-stack web application for connecting users with consultants. Built with React, Node.js, Express, and PostgreSQL.

## 📋 Features

- **User Authentication** - Email/Password signup and login with Firebase
- **Email OTP Verification** - 6-digit OTP sent to user email for verification
- **User Roles** - Support for USER and CONSULTANT roles
- **Phone Number** - Users can optionally add their phone number
- **Database** - PostgreSQL with Prisma ORM
- **Real-time Updates** - Backend API for user synchronization

## 🚀 Tech Stack

### Frontend
- **React 19** with Vite
- **Firebase Authentication** (Email/Password)
- **React Router** for navigation
- **CSS** for styling

### Backend
- **Node.js** with Express
- **Prisma 7** ORM with PostgreSQL adapter
- **Firebase Admin SDK** for token verification
- **Nodemailer** for email OTP delivery
- **CORS** enabled for frontend communication

## 📦 Project Structure

```
consultancy-platform/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   └── OTPVerification.jsx
│   │   ├── App.jsx
│   │   ├── firebaseConfig.js
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── index.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## 🔧 Installation

### Prerequisites
- Node.js (v16+)
- PostgreSQL database
- Gmail account with app-specific password

### Backend Setup

```bash
cd backend
npm install

# Create .env file (use .env.example as template)
cp .env.example .env
# Edit .env with your credentials

# Apply database schema
npx prisma generate
npx prisma db push

# Start backend
node index.js
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local file
echo "VITE_FIREBASE_API_KEY=your_api_key" > .env.local
echo "VITE_FIREBASE_PROJECT_ID=your_project_id" >> .env.local

# Start frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🔐 Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_CLIENT_EMAIL` - Firebase service account email
- `FIREBASE_PRIVATE_KEY` - Firebase private key
- `EMAIL_USER` - Gmail address for OTP
- `EMAIL_PASS` - Gmail app-specific password

### Frontend (.env.local)
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID

## 📧 Email OTP Setup

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character app password
4. Add to backend `.env`:
   ```
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="xxxx xxxx xxxx xxxx"
   ```

## 🔄 API Endpoints

### Authentication
- `POST /auth/me` - Get/create user (requires Firebase token)
- `POST /auth/send-otp` - Send OTP to email
- `POST /auth/verify-otp` - Verify OTP code

## 📝 Authentication Flow

1. User signs up with email and password
2. Firebase creates account
3. Backend sends OTP to user email
4. User enters OTP to verify email
5. User can now login

## 🗄️ Database Schema

### User Model
- `id` - Primary key
- `firebase_uid` - Firebase unique ID
- `email` - User email (unique)
- `phone` - Optional phone number
- `role` - USER or CONSULTANT (default: USER)
- `is_verified` - Email verification status
- `otp_code` - Current OTP code
- `otp_expiry` - OTP expiration time
- `created_at` - Account creation timestamp

## 🛠️ Development

### Running both servers
```bash
# Terminal 1 - Backend
cd backend
node index.js

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Database migrations
```bash
cd backend
npx prisma db push
```

## 📚 Documentation Files
- [FRONTEND_SETUP.md](./FRONTEND_SETUP.md) - Frontend setup details
- [OTP_SETUP.md](./OTP_SETUP.md) - OTP configuration guide

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements.

## 📄 License

MIT License - feel free to use this project

## 👨‍💻 Author

Created as a consultation platform template.

---

**Questions or Issues?** Check the documentation files or create an issue on GitHub.
