
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from './dashboard/pages/UserDashboard';
import OnboardingPage from './dashboard/pages/OnboardingPage';
import SearchPage from './dashboard/pages/SearchPage';
import BookingPage from './dashboard/pages/BookingPage';
import CreditsPage from './dashboard/pages/CreditsPage';
import SupportPage from './dashboard/pages/SupportPage';
import ProfilePage from './dashboard/pages/ProfilePage';
import LiveSessionPage from './dashboard/pages/LiveSessionPage';
import BookingsListPage from './dashboard/pages/BookingsListPage';
import MessagesPage from './dashboard/pages/MessagesPage';
import NotificationsPage from './dashboard/pages/NotificationsPage';
import ConsultantProfilePage from './dashboard/pages/ConsultantProfilePage';
import DashboardLayout from './dashboard/layouts/DashboardLayout';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
        <Route path="/user/onboarding" element={<OnboardingPage />} />
        
        {/* Main Dashboard Layout Wrapper */}
        <Route element={<DashboardLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/search" element={<SearchPage />} />
          <Route path="/user/consultant/:consultantId" element={<ConsultantProfilePage />} />
          <Route path="/user/booking/:consultantId" element={<BookingPage />} />
          <Route path="/user/credits" element={<CreditsPage />} />
          <Route path="/user/support" element={<SupportPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/bookings" element={<BookingsListPage />} />
          <Route path="/user/messages" element={<MessagesPage />} />
          <Route path="/user/notifications" element={<NotificationsPage />} />
        </Route>

        {/* Live Session Page (Immersive Full Screen) */}
        <Route path="/user/live/:sessionId" element={<LiveSessionPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
