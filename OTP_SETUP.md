# OTP & Email Verification Setup Guide

## ✅ What's Been Implemented

### Frontend Features
- ✅ **Email Verification** - Send verification emails via Firebase
- ✅ **Phone OTP Authentication** - Firebase Phone OTP with reCAPTCHA
- ✅ **Updated Signup** - Phone number field added to user registration
- ✅ **Verification Flow** - Multi-step verification after signup

### Backend Updates
- ✅ **Phone Field Added** - User model updated with `phone` field
- ✅ **Phone Storage** - Backend saves phone numbers during registration
- ✅ **Auth Endpoint Updated** - Accepts and stores phone numbers

## 🔧 Database Migration Required

Add the `phone` column to your `users` table:

```sql
ALTER TABLE "User" ADD COLUMN "phone" TEXT;
```

**Or if using PostgreSQL with proper syntax:**

```sql
ALTER TABLE "User"
ADD COLUMN phone VARCHAR(20) DEFAULT NULL;
```

Run this in your PostgreSQL client to complete the setup.

## 📱 How to Use Phone OTP

### Flow:
1. User visits `/phone-otp` route
2. Enters 10-digit phone number
3. Firebase sends OTP via SMS
4. User enters OTP
5. Phone number is verified

### Code Location:
- Component: `frontend/src/pages/PhoneOTP.jsx`
- Route: `/phone-otp`

## ✉️ How to Use Email Verification

### Flow:
1. User signs up with email
2. After signup, email verification page shows
3. Click "Send Verification Email"
4. Firebase sends verification link to email
5. User clicks link in email
6. Account is verified

### Code Location:
- Component: `frontend/src/pages/EmailVerification.jsx`
- Integrated in: `frontend/src/pages/Signup.jsx`

## 🔑 Firebase Configuration Checklist

Make sure these are enabled in your Firebase project:

- ✅ **Email/Password Authentication**
- ✅ **Phone Authentication** (Enable in Firebase Console → Authentication → Sign-in method)
- ✅ **Email Verification** (Configured by default)

### Enable Phone Authentication:
1. Firebase Console → Authentication → Sign-in method
2. Enable "Phone"
3. Add reCAPTCHA site key (required for phone auth)

## 🚀 Testing the Features

### Test Email Verification:
1. Go to http://localhost:5173/signup
2. Enter email, password, phone number, select role
3. Click "Register"
4. After signup, you'll see "Email Verification" section
5. Click "Send Verification Email"
6. Check your email inbox for verification link

### Test Phone OTP:
1. Go to http://localhost:5173/phone-otp
2. Enter 10-digit phone number
3. Click "Send OTP"
4. Firebase will send OTP to your phone
5. Enter OTP and verify

## 📋 Updated Files

### Frontend:
- `src/pages/PhoneOTP.jsx` - New phone OTP component
- `src/pages/EmailVerification.jsx` - New email verification component
- `src/pages/Signup.jsx` - Updated with phone field and email verification
- `src/App.jsx` - Added `/phone-otp` route
- `index.html` - Added reCAPTCHA container

### Backend:
- `prisma/schema.prisma` - Added `phone` field to User model
- `index.js` - Updated auth endpoint to accept and save phone numbers

## ⚠️ Important Notes

1. **Phone Authentication requires reCAPTCHA** - Make sure reCAPTCHA is enabled in Firebase
2. **Phone is optional** - Phone field is nullable in database
3. **Email is required** - Email verification is mandatory during signup
4. **Country Code** - Phone numbers are saved with +91 prefix (India)
5. **OTP Timeout** - Firebase OTP expires after 15 minutes

## 🔐 Security Features

- Phone OTP prevents unauthorized access
- Email verification ensures valid email addresses
- Firebase handles all security and encryption
- Phone numbers are stored securely in PostgreSQL
- All authentication flows are Firebase-verified

## ✅ Next Steps

1. Run the SQL migration to add phone column to database
2. Enable Phone Authentication in Firebase Console
3. Test signup with email verification
4. Test phone OTP functionality
5. Users can now register with verified email and optional phone

## 📞 Support

If OTP is not being sent:
- Check Firebase Phone Authentication is enabled
- Verify reCAPTCHA site key is configured
- Check phone number format (10 digits without +91)
- Check Firebase project limits (free tier may have restrictions)
