# Frontend Setup Guide

## Firebase Configuration

The frontend is configured to use Firebase Authentication. Follow these steps:

### 1. Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `consultancy-platform-2d615`
3. Go to **Project Settings** (gear icon)
4. Under **General** tab, scroll to **Your apps** section
5. Click on your web app to get the configuration

### 2. Update `.env` File

Open `frontend/.env` and replace the placeholder values with your Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_from_firebase
REACT_APP_FIREBASE_AUTH_DOMAIN=consultancy-platform-2d615.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=consultancy-platform-2d615
REACT_APP_FIREBASE_STORAGE_BUCKET=consultancy-platform-2d615.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_from_firebase
REACT_APP_FIREBASE_APP_ID=your_app_id_from_firebase
```

### 3. Import Firebase Config

The Firebase configuration is in `src/firebaseConfig.js`:

```javascript
import { auth } from "../firebaseConfig";  // In pages/Login.jsx or Signup.jsx
import { auth } from "./firebaseConfig";   // In other src files
```

## Running the Frontend

```bash
cd frontend
npm install  # Already done
npm run dev  # Start development server on http://localhost:5173
```

## How It Works

1. **User Signup/Login**: User enters email/password
2. **Firebase Authentication**: Firebase creates/authenticates the user
3. **Get ID Token**: Frontend gets a token from Firebase
4. **Backend Verification**: Token is sent to `POST http://localhost:5000/auth/me`
5. **Database Sync**: Backend verifies token and syncs user to PostgreSQL
6. **User Role**: Role is stored in the database (USER or CONSULTANT)

## Backend Integration

The frontend already connects to your running backend at `http://localhost:5000`:
- **Login Route**: `POST /auth/me` with Bearer token
- **Signup Route**: `POST /auth/me` with Bearer token + role

Make sure your backend is running before testing the frontend:
```bash
cd backend
node index.js
```

## Environment Variables

Vite loads `.env` files automatically. Variables must start with `REACT_APP_` to be exposed to the frontend.
