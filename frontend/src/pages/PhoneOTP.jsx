import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const PhoneOTP = ({ onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA verified');
        },
      });
    }
  };

  // Send OTP to phone
  const sendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      setupRecaptcha();
      
      // Phone number must be in international format: +countrycode phonenumber
      const phoneNumber = phone.startsWith('+') ? phone : `+91${phone}`;
      
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      
      setVerificationId(confirmationResult.verificationId);
      setStep('otp');
      console.log('OTP sent to', phoneNumber);
    } catch (err) {
      setError(err.message);
      console.error('Phone OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credential = window.firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        otp
      );
      
      const userCredential = await auth.signInWithCredential(credential);
      console.log('Phone verified:', userCredential.user);
      
      if (onSuccess) {
        onSuccess(userCredential.user);
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Phone OTP Verification</h2>
      
      {step === 'phone' ? (
        <form onSubmit={sendOTP}>
          <input
            type="tel"
            placeholder="Enter phone number (10 digits)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength="10"
            required
            disabled={loading}
          />
          <small style={{ color: '#999', display: 'block', marginTop: '5px' }}>
            Format: 10-digit number (e.g., 9876543210)
          </small>
          <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={verifyOTP}>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'Verifying OTP...' : 'Verify OTP'}
          </button>
          <button 
            type="button" 
            onClick={() => {
              setStep('phone');
              setOtp('');
              setVerificationId(null);
            }}
            style={{ width: '100%', marginTop: '10px', background: '#555' }}
          >
            Back
          </button>
        </form>
      )}

      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}
      
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneOTP;
