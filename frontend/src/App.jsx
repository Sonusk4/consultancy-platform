import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ConsultantProfile from './pages/ConsultantProfile';
import ConsultantList from './pages/ConsultantList';

function App() {
  return (
    <Router>
      <nav style={{ 
        padding: '15px 20px', 
        backgroundColor: '#1a1a1a', 
        borderBottom: '1px solid #444',
        marginBottom: '20px'
      }}>
        <Link to="/" style={{ marginRight: '20px', fontSize: '1.2em' }}>🏠 Home</Link>
        <Link to="/login" style={{ marginRight: '20px' }}>Login</Link>
        <Link to="/signup" style={{ marginRight: '20px' }}>Sign Up</Link>
        <Link to="/consultants" style={{ marginRight: '20px' }}>👨‍💼 Find Consultants</Link>
        <Link to="/consultant-profile">📝 My Profile</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/consultants" element={<ConsultantList />} />
          <Route path="/consultant-profile" element={<ConsultantProfile />} />
          <Route path="/" element={
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h1>Welcome to Consultation Platform</h1>
              <p>Connect with expert consultants and grow your business</p>
              <div style={{ marginTop: '30px' }}>
                <h3>✨ Features:</h3>
                <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                  <li>✓ Email Verification (OTP-based)</li>
                  <li>✓ Firebase Authentication</li>
                  <li>✓ Find Expert Consultants</li>
                  <li>✓ Complete Consultant Profiles</li>
                  <li>✓ Booking System</li>
                  <li>✓ Role-based Access Control</li>
                </ul>
              </div>
              <div style={{ marginTop: '30px', color: '#999' }}>
                <p>👨‍💼 <strong>Are you a consultant?</strong> <Link to="/consultant-profile" style={{ color: '#4CAF50' }}>Complete your profile</Link></p>
                <p>👤 <strong>Looking for consultants?</strong> <Link to="/consultants" style={{ color: '#4CAF50' }}>Browse our directory</Link></p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;