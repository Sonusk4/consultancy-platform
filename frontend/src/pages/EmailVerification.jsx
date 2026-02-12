import React, { useState, useEffect } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const EmailVerification = ({ user }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(user?.emailVerified || false);

  useEffect(() => {
    if (user?.emailVerified) {
      setVerified(true);
    }
  }, [user]);

  const sendVerificationEmail = async () => {
    setError('');
    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError('No user logged in');
        return;
      }

      await sendEmailVerification(currentUser);
      setEmailSent(true);
      console.log('Verification email sent to', currentUser.email);
    } catch (err) {
      setError(err.message);
      console.error('Email verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkEmailVerified = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
        setVerified(currentUser.emailVerified);
        if (currentUser.emailVerified) {
          alert('✓ Email verified successfully!');
        } else {
          alert('Please check your email and click the verification link');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (verified) {
    return (
      <div style={{ padding: '15px', backgroundColor: '#2d5f2e', borderRadius: '4px', marginTop: '10px' }}>
        <p style={{ color: '#90ee90', margin: 0 }}>✓ Email verified</p>
      </div>
    );
  }

  return (
    <div className="login-container" style={{ marginTop: '20px' }}>
      <h3>Email Verification</h3>
      <p style={{ color: '#999', fontSize: '0.9em' }}>
        A verification link has been sent to {user?.email}
      </p>

      {!emailSent && (
        <button
          onClick={sendVerificationEmail}
          disabled={loading}
          style={{ width: '100%', marginTop: '10px' }}
        >
          {loading ? 'Sending...' : 'Send Verification Email'}
        </button>
      )}

      {emailSent && (
        <p style={{ color: '#90ee90', fontSize: '0.9em', marginTop: '10px' }}>
          ✓ Verification email sent. Check your inbox.
        </p>
      )}

      <button
        onClick={checkEmailVerified}
        disabled={loading}
        style={{ width: '100%', marginTop: '10px', background: '#444' }}
      >
        I've verified my email
      </button>

      {error && <p style={{ color: '#ff6b6b', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default EmailVerification;
