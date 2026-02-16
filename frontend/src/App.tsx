
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ConsultantTypeSelection from './modules/consultant/pages/ConsultantTypeSelection';
import IndividualRegistration from './modules/consultant/pages/IndividualRegistration';
import EnterpriseRegistration from './modules/consultant/pages/EnterpriseRegistration';
import EnterpriseAdminSetup from './modules/consultant/pages/EnterpriseAdminSetup';
import ApprovalStatus from './modules/consultant/pages/ApprovalStatus';
import ConsultantDashboard from './modules/consultant/pages/ConsultantDashboard';
import ProfilePage from './modules/consultant/pages/ProfilePage';
import AvailabilityPage from './modules/consultant/pages/AvailabilityPage';
import AddTimeSlotPage from './modules/consultant/pages/AddTimeSlotPage';
import BookingsPage from './modules/consultant/pages/BookingsPage';
import EarningsPage from './modules/consultant/pages/EarningsPage';
import ReviewsPage from './modules/consultant/pages/ReviewsPage';
import TeamManagementPage from './modules/consultant/pages/TeamManagementPage';
import ChatPage from './modules/consultant/pages/ChatPage';
import SupportPage from './modules/consultant/pages/SupportPage';
import DashboardLayout from './modules/consultant/components/layout/DashboardLayout';
import { ConsultantRole, RegistrationStatus } from './modules/consultant/types/consultant.types';

export const AppStateContext = React.createContext<{
  role: ConsultantRole;
  setRole: (role: ConsultantRole) => void;
  status: RegistrationStatus;
  setStatus: (status: RegistrationStatus) => void;
}>({
  role: ConsultantRole.INDIVIDUAL,
  setRole: () => {},
  status: RegistrationStatus.PENDING,
  setStatus: () => {},
});

const App: React.FC = () => {
  const [role, setRole] = useState<ConsultantRole>(ConsultantRole.INDIVIDUAL);
  const [status, setStatus] = useState<RegistrationStatus>(RegistrationStatus.PENDING);

  return (
    <AppStateContext.Provider value={{ role, setRole, status, setStatus }}>
      <Router>
        <Routes>
          {/* Registration Flow */}
          <Route path="/" element={<Navigate to="/register/type" />} />
          <Route path="/register/type" element={<ConsultantTypeSelection />} />
          <Route path="/register/individual" element={<IndividualRegistration />} />
          <Route path="/register/enterprise" element={<EnterpriseRegistration />} />
          <Route path="/register/enterprise-setup" element={<EnterpriseAdminSetup />} />
          <Route path="/register/status" element={<ApprovalStatus />} />

          {/* Dashboard Flow */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<ConsultantDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/availability" element={<AvailabilityPage />} />
            <Route path="/availability/add" element={<AddTimeSlotPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/earnings" element={<EarningsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/team" element={<TeamManagementPage />} />
            <Route path="/messages" element={<ChatPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Route>
        </Routes>
      </Router>
    </AppStateContext.Provider>
  );
};

export default App;
