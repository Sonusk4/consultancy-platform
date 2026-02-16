
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Video, 
  Mic, 
  ChevronRight, 
  Filter, 
  MoreVertical,
  Search,
  CheckCircle2,
  XCircle,
  Timer
} from 'lucide-react';
import { mockSessions } from '../data/mockData';
import { SessionStatus } from '../types';

const BookingsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<SessionStatus | 'all'>('all');

  const filteredSessions = filter === 'all' 
    ? mockSessions 
    : mockSessions.filter(s => s.status === filter);

  const getStatusColor = (status: SessionStatus) => {
    switch(status) {
      case 'live': return 'bg-red-100 text-red-600 border-red-200';
      case 'upcoming': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'completed': return 'bg-green-100 text-green-600 border-green-200';
      case 'cancelled': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-slate-50 text-slate-400';
    }
  };

  const getStatusIcon = (status: SessionStatus) => {
    switch(status) {
      case 'live': return <div className="w-2 h-2 bg-red-600 rounded-full animate-ping mr-2"></div>;
      case 'upcoming': return <Timer className="w-4 h-4 mr-2" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4 mr-2" />;
      case 'cancelled': return <XCircle className="w-4 h-4 mr-2" />;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">My Bookings</h1>
          <p className="text-slate-500 text-lg font-medium">Track and manage your consultation schedule</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search experts..." 
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-sm"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {['all', 'live', 'upcoming', 'completed', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2
              ${filter === tab ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filteredSessions.length > 0 ? filteredSessions.map((session) => (
            <div key={session.id} className="p-8 hover:bg-slate-50 transition-all group">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8 w-full lg:w-auto">
                  <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center border transition-colors ${session.status === 'live' ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
                    {session.type === 'Video' ? <Video className={`w-10 h-10 ${session.status === 'live' ? 'text-red-600' : 'text-slate-400'}`} /> : <Mic className="w-10 h-10 text-slate-400" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{session.consultantName}</h4>
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border flex items-center ${getStatusColor(session.status)}`}>
                        {getStatusIcon(session.status)}
                        {session.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px]">{session.domain} • ₹{session.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="flex flex-col lg:items-center gap-1 w-full lg:w-auto">
                  <div className="flex items-center gap-3 text-slate-900 font-black">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    {session.date}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest ml-8">
                    <Clock className="w-4 h-4" />
                    {session.time}
                  </div>
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                  {session.status === 'live' ? (
                    <button 
                      onClick={() => navigate(`/user/live/${session.id}`)}
                      className="flex-1 lg:flex-none px-10 py-4 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-100"
                    >
                      Join Now
                    </button>
                  ) : session.status === 'upcoming' ? (
                    <button className="flex-1 lg:flex-none px-10 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                      Reschedule
                    </button>
                  ) : (
                    <button className="flex-1 lg:flex-none px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                      View Summary
                    </button>
                  )}
                  <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-32 text-center space-y-6">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-slate-200">
                <Calendar className="w-10 h-10 text-slate-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">No sessions found</h3>
                <p className="text-slate-500 font-medium">Try changing the filters or book a new session.</p>
              </div>
              <button 
                onClick={() => navigate('/user/search')}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
              >
                Find Expert
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsListPage;
