import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import OTPVerification from './OTPVerification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('login'); // 'login' or 'verify-email'
  const [firebaseUser, setFirebaseUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Get user details from backend
      const response = await fetch('http://localhost:5000/auth/me', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const userData = await response.json();

      // Check if email is verified
      if (!userData.is_verified) {
        // If not verified, show OTP verification screen
        setFirebaseUser(user);
        setStep('verify-email');
      } else {
        // Email is verified, login successful
        console.log("Logged in user:", userData);
        alert(`✓ Welcome back! You are logged in as ${userData.role}`);
        // Reset form
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSuccess = async () => {
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch('http://localhost:5000/auth/me', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const userData = await response.json();
      console.log("User verified and logged in:", userData);
      alert(`✓ Email verified! Welcome ${userData.role}`);
      
      // Reset and go back to login
      setStep('login');
      setEmail('');
      setPassword('');
      setFirebaseUser(null);
    } catch (error) {
      setError('Failed to complete login: ' + error.message);
    }
  };

  if (step === 'verify-email' && firebaseUser) {
    return (
      <div className="login-container">
        <h2>Verify Your Email</h2>
        <p style={{ color: '#999', marginBottom: '20px' }}>
          Your email hasn't been verified yet. Please verify to continue.
        </p>
        <OTPVerification 
          email={firebaseUser.email}
          onVerificationSuccess={handleVerificationSuccess}
        />
        <button
          onClick={() => {
            setStep('login');
            setFirebaseUser(null);
          }}
          style={{ width: '100%', marginTop: '20px', background: '#444' }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default Login;