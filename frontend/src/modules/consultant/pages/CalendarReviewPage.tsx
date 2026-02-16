import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Video, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';

const CalendarReviewPage: React.FC = () => {
  const { sessions } = useConsultantDashboard();
  const [currentDate, setCurrentDate] = useState(new Date(2023, 10, 1)); // November 2023

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getSessionsForDay = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return sessions.filter(s => s.startTime.startsWith(dateString));
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Calendar Review</h1>
          <p className="text-slate-500">Track and review your past and upcoming sessions.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-bold text-slate-900 min-w-[140px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider border-r border-slate-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {emptyDays.map(i => (
            <div key={`empty-${i}`} className="min-h-[120px] bg-slate-50/30 border-b border-r border-slate-100 last:border-r-0"></div>
          ))}
          {days.map(day => {
            const daySessions = getSessionsForDay(day);
            const isToday = day === 20 && currentDate.getMonth() === 10; // Mock "today" as Nov 20
            
            return (
              <div key={day} className={`min-h-[120px] p-2 border-b border-r border-slate-100 last:border-r-0 hover:bg-slate-50/50 transition-colors ${isToday ? 'bg-indigo-50/20' : ''}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold ${isToday ? 'bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-400'}`}>
                    {day}
                  </span>
                  {daySessions.length > 0 && (
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  )}
                </div>
                <div className="space-y-1">
                  {daySessions.map(session => (
                    <div 
                      key={session.id} 
                      onClick={() => alert(`Viewing details for session with ${session.clientName}`)}
                      className="p-1.5 bg-white border border-slate-200 rounded-md shadow-sm cursor-pointer hover:border-indigo-300 transition-all group overflow-hidden"
                    >
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <div className="w-1 h-3 bg-indigo-500 rounded-full shrink-0"></div>
                        <p className="text-[10px] font-bold text-slate-700 truncate group-hover:text-indigo-600">
                          {session.clientName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[8px] text-slate-400 font-medium">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Monthly Statistics">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total Sessions</span>
              <span className="text-sm font-bold text-slate-900">{sessions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Completed</span>
              <span className="text-sm font-bold text-emerald-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Cancelled</span>
              <span className="text-sm font-bold text-rose-600">1</span>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-1 font-medium">Top Client this month</p>
              <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
            </div>
          </div>
        </Card>

        <Card title="Upcoming Highlights">
          <div className="space-y-3">
            {sessions.filter(s => s.status === 'UPCOMING').slice(0, 3).map(s => (
              <div key={s.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <img src={s.clientAvatar} className="w-8 h-8 rounded-full bg-slate-100" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{s.clientName}</p>
                  <p className="text-[10px] text-slate-500">Nov 21, 2:00 PM</p>
                </div>
                <Badge variant="info">VIDEO</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Calendar Legend">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
              <span className="text-xs font-medium text-slate-600">Consultation Session</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
              <span className="text-xs font-medium text-slate-600">Company Workshop</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              <span className="text-xs font-medium text-slate-600">Review Required</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Click on any day or session entry to view detailed logs and client notes.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CalendarReviewPage;