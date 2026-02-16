import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ConsultantProfile from './pages/ConsultantProfile';
import ConsultantList from './pages/ConsultantList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/consultants" element={<ConsultantList />} />
        <Route path="/consultant-profile" element={<ConsultantProfile />} />
      </Routes>
    </Router>
  );
}

export default App;