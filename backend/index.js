const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const verifyFirebaseToken = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

/**
 * Nodemailer configuration for Email OTP
 * Using Gmail or your preferred email service
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

/**
 * Prisma 7 Initialization with PostgreSQL Adapter
 * The adapter handles the database connection through pg (node-postgres)
 */
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
  errorFormat: 'pretty',
});

app.use(cors());
app.use(express.json());

/**
 * Firebase is disabled for now - private key appears corrupted
 * TODO: Update FIREBASE_PRIVATE_KEY in .env with valid credentials
 * and remove the is_firebase_enabled check
 */
global.is_firebase_enabled = false;

/**
 * POST /auth/me
 * Workflow:
 * 1. Verify Firebase token [cite: 9]
 * 2. Check if user exists in PostgreSQL [cite: 9]
 * 3. If not, create new record with the chosen role [cite: 10]
 */
app.post('/auth/me', verifyFirebaseToken, async (req, res) => {
  const { role, phone } = req.body; 

  try {
    // Check if user exists [cite: 9]
    let user = await prisma.user.findUnique({
      where: { firebase_uid: req.user.firebase_uid }
    });

    // If not, create new record with default role USER [cite: 10]
    if (!user) {
      user = await prisma.user.create({
        data: {
          firebase_uid: req.user.firebase_uid,
          email: req.user.email,
          phone: phone || null,
          role: role || 'USER' // Roles are stored only in DB [cite: 11]
        }
      });
      console.log('Successfully synced new user to PostgreSQL:', user.email);
    } else {
      // Update phone if provided
      if (phone) {
        user = await prisma.user.update({
          where: { firebase_uid: req.user.firebase_uid },
          data: { phone }
        });
      }
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Database Sync Error:", error);
    res.status(500).json({ error: 'Failed to sync with PostgreSQL' });
  }
});

/**
 * Helper function to generate 6-digit OTP
 */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * POST /auth/send-otp
 * Generate and send OTP email to user
 */
app.post('/auth/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const otp = generateOTP();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Find or create user with OTP
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firebase_uid: `temp_${Date.now()}`, // Temp UID until Firebase signup
          otp_code: otp,
          otp_expiry: expiryTime
        }
      });
    } else {
      user = await prisma.user.update({
        where: { email },
        data: {
          otp_code: otp,
          otp_expiry: expiryTime
        }
      });
    }

    // Send OTP via email
    try {
      console.log(`📧 Attempting to send OTP to ${email} using ${process.env.EMAIL_USER}`);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: '🔐 Your Email Verification OTP - Consultation Platform',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <h2>Email Verification</h2>
            <p>Your One-Time Password (OTP) is:</p>
            <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
            <p style="color: #999;">This OTP will expire in 10 minutes.</p>
            <p style="color: #999;">Do not share this code with anyone.</p>
          </div>
        `
      });
      console.log(`✓ OTP email sent to ${email}. OTP: ${otp}`);
    } catch (emailError) {
      console.error(`❌ Email send failed:`, emailError.message);
      console.log(`📝 For testing - OTP is: ${otp}`);
    }

    res.status(200).json({ 
      message: 'OTP sent successfully',
      email: email 
    });
  } catch (error) {
    console.error('❌ OTP Send Error:', error.message);
    res.status(500).json({ error: 'Failed to send OTP: ' + error.message });
  }
});

/**
 * POST /auth/verify-otp
 * Verify OTP code entered by user
 */
app.post('/auth/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check OTP validity
    if (user.otp_code !== otp) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    // Check OTP expiry
    if (new Date() > user.otp_expiry) {
      return res.status(401).json({ error: 'OTP expired' });
    }

    // Mark email as verified and clear OTP
    const verifiedUser = await prisma.user.update({
      where: { email },
      data: {
        is_verified: true,
        otp_code: null,
        otp_expiry: null
      }
    });

    res.status(200).json({ 
      message: 'Email verified successfully',
      user: verifiedUser 
    });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});