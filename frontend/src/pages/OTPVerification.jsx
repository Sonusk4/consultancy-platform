import React, { useState } from 'react';

const OTPVerification = ({ email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [verified, setVerified] = useState(false);

  const sendOTP = async () => {
    setResendLoading(true);
    setError('');
    setResendMessage('');

    try {
      const response = await fetch('http://localhost:5000/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setResendMessage('✓ OTP sent to your email');
      } else {
        setError(data.error || 'Failed to send OTP');
        console.error('Backend error:', data);
      }
    } catch (err) {
      setError('Error sending OTP: ' + err.message);
      console.error('Network error:', err);
    } finally {
      setResendLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();
      if (response.ok) {
        setVerified(true);
        setTimeout(() => {
          onVerificationSuccess();
        }, 1500);
      } else {
        setError(data.error || 'Failed to verify OTP');
        setOtp('');
      }
    } catch (err) {
      setError('Error verifying OTP');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <div style={{ padding: '15px', backgroundColor: '#2d5f2e', borderRadius: '4px', marginTop: '10px', textAlign: 'center' }}>
        <p style={{ color: '#90ee90', margin: 0, fontSize: '1.1em' }}>✓ Email verified successfully!</p>
      </div>
    );
  }

  return (
    <div className="login-container" style={{ marginTop: '20px' }}>
      <h3>📧 Verify Your Email</h3>
      <p style={{ color: '#999', fontSize: '0.9em', marginBottom: '20px' }}>
        A 6-digit OTP has been sent to <strong>{email}</strong>
      </p>

      <form onSubmit={verifyOTP}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
            setOtp(val);
          }}
          maxLength="6"
          style={{
            fontSize: '1.2em',
            letterSpacing: '5px',
            textAlign: 'center',
            marginBottom: '10px'
          }}
          required
          disabled={loading}
        />

        {error && <p style={{ color: '#ff6b6b', fontSize: '0.9em', marginBottom: '10px' }}>❌ {error}</p>}
        {resendMessage && <p style={{ color: '#90ee90', fontSize: '0.9em', marginBottom: '10px' }}>{resendMessage}</p>}

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          style={{
            width: '100%',
            marginTop: '10px',
            opacity: otp.length === 6 ? 1 : 0.5,
            cursor: otp.length === 6 ? 'pointer' : 'not-allowed'
          }}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      <hr style={{ margin: '15px 0', borderColor: '#333' }} />

      <p style={{ color: '#999', fontSize: '0.85em', marginBottom: '10px' }}>
        Didn't receive the OTP?
      </p>
      <button
        onClick={sendOTP}
        disabled={resendLoading}
        style={{
          width: '100%',
          background: '#444',
          marginTop: '5px'
        }}
      >
        {resendLoading ? 'Sending...' : 'Resend OTP'}
      </button>
    </div>
  );
};

export default OTPVerification;
