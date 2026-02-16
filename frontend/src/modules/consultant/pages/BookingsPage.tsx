
import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import SessionCard from '../components/dashboard/SessionCard';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';
import { BookingStatus } from '../types/session.types';

const BookingsPage: React.FC = () => {
  const { sessions, updateSessionStatus, removeSession, rescheduleSession } = useConsultantDashboard();
  const [filter, setFilter] = useState('All');

  const filteredSessions = sessions.filter(s => {
    if (filter === 'All') return true;
    return s.status === filter;
  });

  const handleAccept = (id: string) => {
    updateSessionStatus(id, BookingStatus.COMPLETED);
    alert('Session marked as Completed/Accepted!');
  };

  const handleReject = (id: string) => {
    if (confirm('Are you sure you want to decline this booking?')) {
      removeSession(id);
    }
  };

  const handleReschedule = (id: string) => {
    rescheduleSession(id);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
        <div className="flex gap-2">
          <select 
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value={BookingStatus.UPCOMING}>Upcoming</option>
            <option value={BookingStatus.COMPLETED}>Completed</option>
            <option value={BookingStatus.PENDING}>Rescheduling</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSessions.length > 0 ? (
          filteredSessions.map(session => (
            <SessionCard 
              key={session.id} 
              session={session} 
              onAccept={handleAccept}
              onReject={handleReject}
              onReschedule={handleReschedule}
            />
          ))
        ) : (
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-12 text-center">
            <p className="text-slate-400">No bookings found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
