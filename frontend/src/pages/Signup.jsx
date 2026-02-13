import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import OTPVerification from './OTPVerification';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('signup'); // 'signup' or 'otp-verification'
  const [firebaseUser, setFirebaseUser] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      setFirebaseUser(user);

      // 2. Send OTP to email
      const otpResponse = await fetch('http://localhost:5000/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!otpResponse.ok) {
        throw new Error('Failed to send OTP');
      }

      // 3. Move to OTP verification step
      setStep('otp-verification');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSuccess = async () => {
    try {
      // After OTP verification, get Firebase token and sync with backend
      const token = await firebaseUser.getIdToken();

      const response = await fetch('http://localhost:5000/auth/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          role,
          phone: phone || null
        })
      });

      const data = await response.json();
      console.log("User created:", data);
      alert('✓ Signup successful! Email verified.');
      
      // Redirect based on role
      if (role === 'CONSULTANT') {
        // Consultant - go to profile creation page
        navigate('/consultant-profile');
      } else {
        // Regular user - go to home or consultant listing
        navigate('/consultants');
      }
      
      // Reset form
      setStep('signup');
      setEmail('');
      setPassword('');
      setPhone('');
      setRole('USER');
      setFirebaseUser(null);
    } catch (error) {
      setError('Failed to complete signup: ' + error.message);
    }
  };

  if (step === 'otp-verification' && firebaseUser) {
    return (
      <div className="signup-container">
        <h2>Verify Your Account</h2>
        <OTPVerification 
          email={firebaseUser.email}
          onVerificationSuccess={handleVerificationSuccess}
        />
        
        {phone && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#333', borderRadius: '4px' }}>
            <h4>Your Information</h4>
            <p style={{ color: '#999', fontSize: '0.9em', margin: '5px 0' }}>
              📧 Email: {firebaseUser?.email}
            </p>
            <p style={{ color: '#999', fontSize: '0.9em', margin: '5px 0' }}>
              📱 Phone: {phone}
            </p>
            <p style={{ color: '#999', fontSize: '0.9em', margin: '5px 0' }}>
              👤 Role: {role}
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setStep('signup');
            setFirebaseUser(null);
            setEmail('');
            setPassword('');
            setPhone('');
          }}
          style={{ width: '100%', marginTop: '20px', background: '#444' }}
        >
          Back to Signup
        </button>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="tel" 
          placeholder="Phone Number (Optional)" 
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          maxLength="10"
        />
        <small style={{ color: '#999', display: 'block', marginTop: '-8px', marginBottom: '10px' }}>
          Enter 10-digit phone number (optional)
        </small>

        <label style={{ display: 'block', marginTop: '10px' }}>I am a:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">Client</option>
          <option value="CONSULTANT">Consultant</option>
        </select>
        <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default Signup;