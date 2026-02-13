# Setup Instructions for Team

## Backend Setup

### 1. Environment Configuration
Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp backend/.env.example backend/.env
```

### 2. Email OTP Configuration
All team members will use the **same shared Gmail account** to send OTPs:

1. **Gmail Account Owner** (Sonu) - Enable Less Secure App Access:
   - Go to: https://myaccount.google.com/security
   - Scroll down to "Less secure app access"
   - Turn it **ON**
   - This allows Nodemailer to send emails from any machine

2. **All Team Members** - Use the shared credentials in `backend/.env`:
   ```
   EMAIL_USER="sonuayadavsk@gmail.com"
   EMAIL_PASS="aqxclmyigeqheosq"
   ```
   
   Or use App Password (16-char):
   1. Go to: https://myaccount.google.com/apppasswords
   2. Select "Mail" and "Windows Computer"
   3. Copy the password and add to `.env`
   ```
   EMAIL_PASS="xxxx-xxxx-xxxx-xxxx"
   ```

### 3. Database Setup
Update `DATABASE_URL` in `backend/.env`:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/consultancy_db?schema=public"
```

Then initialize database:
```bash
cd backend
npx prisma db push
```

### 4. Firebase Configuration
Get Firebase Admin SDK credentials:
1. Go to Firebase Console → Your Project → Project Settings
2. Service Accounts → Generate New Private Key
3. Copy the JSON and format as:
   ```json
   {
     "type": "service_account",
     "project_id": "...",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "...",
   }
   ```
4. Add to `backend/.env`:
   ```
   FIREBASE_PROJECT_ID="your-project-id"
   FIREBASE_CLIENT_EMAIL="your-email@iam.gserviceaccount.com"
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

### 5. Start Backend
```bash
cd backend
npm install
node index.js
# Server runs on http://localhost:5000
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## Testing OTP Flow

1. Go to Signup page: http://localhost:5173/signup
2. Fill form with test email (use email configured in `.env`)
3. OTP should arrive in inbox within 30 seconds
4. Enter OTP to verify account

## Troubleshooting

**"OTP not arriving?"**
- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`
- Verify Gmail App Password is correct (16 chars with dashes)
- Check backend console for errors

**"Database connection failed?"**
- Ensure PostgreSQL is running
- Update `DATABASE_URL` in `.env`
- Run `npx prisma db push`

**"Firebase errors?"**
- Verify `FIREBASE_PRIVATE_KEY` formatting (keep `\n` newlines)
- Check `FIREBASE_PROJECT_ID` matches your project

## Important Notes

⚠️ **NEVER commit `.env` to git** - It contains sensitive credentials
✅ **All team members need their own `.env`** with their credentials
✅ **`.env` is in `.gitignore`** - Each clone needs fresh setup
