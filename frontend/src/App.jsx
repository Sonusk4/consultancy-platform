import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
        <Link to="/signup">Sign Up</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h1>Welcome to Consultation Platform</h1>
              <p>Please Login or Sign Up to continue</p>
              <div style={{ marginTop: '30px' }}>
                <h3>🔐 Security Features Enabled:</h3>
                <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                  <li>✓ Email Verification (FREE)</li>
                  <li>✓ Firebase Authentication</li>
                  <li>✓ PostgreSQL Database Integration</li>
                  <li>✓ Phone Number Collection & Storage</li>
                  <li>✓ Role-based Access Control</li>
                </ul>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;