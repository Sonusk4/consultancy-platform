
import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import SessionCard from '../components/dashboard/SessionCard';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';
import { BookingStatus } from '../types/session.types';
import { LayoutList, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const BookingsPage: React.FC = () => {
  const { sessions, updateSessionStatus, removeSession, rescheduleSession } = useConsultantDashboard();
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'LIST' | 'CALENDAR'>('LIST');
  const [currentDate, setCurrentDate] = useState(new Date(2023, 10, 1)); // November 2023

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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

  // Calendar Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getSessionsForDay = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return sessions.filter(s => s.startTime.startsWith(dateString));
  };
  
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
          <p className="text-sm text-slate-500">Manage your consultation schedule and history.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setViewMode('LIST')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'LIST' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              title="List View"
            >
              <LayoutList size={18} />
            </button>
            <button 
              onClick={() => setViewMode('CALENDAR')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'CALENDAR' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              title="Calendar View"
            >
              <CalendarIcon size={18} />
            </button>
          </div>

          <select 
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none shadow-sm focus:ring-2 focus:ring-indigo-500"
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

      {viewMode === 'LIST' ? (
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
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors border border-slate-200">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-100 uppercase">
                Today
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors border border-slate-200">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <Card className="p-0 overflow-hidden shadow-md">
            <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {emptyDays.map(i => (
                <div key={`empty-${i}`} className="min-h-[100px] md:min-h-[140px] bg-slate-50/30 border-b border-r border-slate-100 last:border-r-0"></div>
              ))}
              {days.map(day => {
                const daySessions = getSessionsForDay(day);
                const isToday = day === 20 && currentDate.getMonth() === 10; 
                
                return (
                  <div key={day} className={`min-h-[100px] md:min-h-[140px] p-1.5 md:p-2 border-b border-r border-slate-100 last:border-r-0 hover:bg-slate-50/50 transition-colors ${isToday ? 'bg-indigo-50/20' : ''}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] md:text-xs font-bold ${isToday ? 'bg-indigo-600 text-white w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center' : 'text-slate-400'}`}>
                        {day}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {daySessions.map(session => (
                        <div 
                          key={session.id} 
                          onClick={() => alert(`Viewing details for session with ${session.clientName}`)}
                          className="p-1 md:p-1.5 bg-white border border-slate-200 rounded-md shadow-sm cursor-pointer hover:border-indigo-300 transition-all group overflow-hidden"
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <div className="w-0.5 h-2 md:w-1 md:h-3 bg-indigo-500 rounded-full shrink-0"></div>
                            <p className="text-[9px] md:text-[10px] font-bold text-slate-700 truncate group-hover:text-indigo-600">
                              {session.clientName}
                            </p>
                          </div>
                          <div className="hidden md:flex items-center gap-1 mt-1 text-[8px] text-slate-400 font-medium">
                            <Clock size={8} /> 
                            {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
