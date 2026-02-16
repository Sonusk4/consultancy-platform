
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import LiveSessionBanner from '../components/dashboard/LiveSessionBanner';
import SessionCard from '../components/dashboard/SessionCard';
import AvailabilityCard from '../components/dashboard/AvailabilityCard';
import EarningsCard from '../components/dashboard/EarningsCard';
import MetricsCard from '../components/dashboard/MetricsCard';
import NotificationItem from '../components/dashboard/NotificationItem';
import MessagesPreview from '../components/dashboard/MessagesPreview';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';
import { useConsultantRole } from '../hooks/useConsultantRole';
import { Card } from '../components/ui/Card';
import { BookingStatus } from '../types/session.types';

const ConsultantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    profile, 
    sessions, 
    notifications, 
    messages, 
    updateSessionStatus, 
    removeSession,
    rescheduleSession
  } = useConsultantDashboard();
  
  const { isEnterpriseAdmin } = useConsultantRole();

  const liveSession = sessions.find(s => s.isLive);
  const upcomingSessions = sessions.filter(s => !s.isLive);

  const handleAccept = (id: string) => {
    updateSessionStatus(id, BookingStatus.COMPLETED);
    alert('Session accepted!');
  };

  const handleReject = (id: string) => {
    if (confirm('Are you sure you want to reject this session?')) {
      removeSession(id);
    }
  };

  const handleReschedule = (id: string) => {
    rescheduleSession(id);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WelcomeSection profile={profile} />
          
          {liveSession && <LiveSessionBanner session={liveSession} />}

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Upcoming Sessions</h2>
              <button 
                onClick={() => navigate('/bookings')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map(session => (
                  <SessionCard 
                    key={session.id} 
                    session={session} 
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onReschedule={() => handleReschedule(session.id)}
                  />
                ))
              ) : (
                <div className="p-12 text-center bg-white border border-dashed border-slate-200 rounded-xl">
                  <p className="text-slate-400">No upcoming sessions found.</p>
                </div>
              )}
            </div>
          </section>

          {isEnterpriseAdmin && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Enterprise Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricsCard title="Team Productivity" value="94%" trend="+2.5%" />
                <MetricsCard title="Client Satisfaction" value="4.8/5" trend="+0.1" />
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <EarningsCard />
          <AvailabilityCard />
          
          <Card title="Recent Notifications">
            <div className="divide-y divide-slate-100 -mx-5 -mb-5 max-h-[400px] overflow-y-auto">
              {notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
              {notifications.length === 0 && (
                <p className="p-8 text-center text-slate-400 text-sm">No new notifications</p>
              )}
            </div>
          </Card>

          <MessagesPreview messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
