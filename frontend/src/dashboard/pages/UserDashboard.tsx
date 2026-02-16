
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  ArrowRight, 
  TrendingUp, 
  Wallet, 
  Award, 
  Calendar,
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Plus,
  Clock,
  Bell,
  History,
  CheckCircle,
  CreditCard,
  Search
} from 'lucide-react';
import { currentUser, mockSessions, consultants, mockTransactions } from '../data/mockData';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const liveSession = mockSessions.find(s => s.status === 'live');
  const upcomingSessions = mockSessions.filter(s => s.status === 'upcoming');

  const recentActivities = [
    { id: 1, type: 'Booking', title: 'Booked UPSC Strategy Session', time: '2 hours ago', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 2, type: 'Payment', title: 'Credits added via Razorpay', time: 'Yesterday', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 3, type: 'Review', title: 'Left a 5-star review for Priya Iyer', time: '2 days ago', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 4, type: 'Chat', title: 'New message from Arjun Mehta', time: '3 days ago', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const notifications = [
    { id: 1, text: 'Your session with Arjun Mehta starts in 15 minutes.', time: 'Just now', unread: true },
    { id: 2, text: 'Payment successful for "Career Pro" package.', time: '1 hour ago', unread: false },
    { id: 3, text: 'New expert match found based on your interest: "Startup Advisor".', time: '5 hours ago', unread: false },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* 1. LIVE Session Highlight */}
      {liveSession && (
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-[2rem] p-8 text-white shadow-2xl shadow-rose-200/50 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="flex items-center gap-6 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-white animate-ping rounded-full opacity-30"></div>
              <div className="relative bg-white p-4 rounded-2xl text-red-600 shadow-xl">
                <Play className="w-8 h-8 fill-current" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 bg-red-800/40 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">LIVE NOW</span>
                <h3 className="text-2xl font-black">{liveSession.consultantName}</h3>
              </div>
              <p className="text-white/80 font-medium">{liveSession.domain} • Session in progress</p>
            </div>
          </div>
          <button 
            onClick={() => navigate(`/user/live/${liveSession.id}`)}
            className="px-10 py-4 bg-white text-red-600 font-black rounded-2xl hover:scale-105 transition-all shadow-xl flex items-center gap-3 relative z-10"
          >
            Join Now
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </div>
      )}

      {/* 2. Welcome & Profile Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Welcome back, {currentUser.name}!</h1>
            <p className="text-slate-500 text-lg mb-10 max-w-lg font-medium">Ready for your next mentorship? You have {upcomingSessions.length} sessions booked for the coming week.</p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/user/search')}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-3"
              >
                <Plus className="w-5 h-5" /> Book Session
              </button>
              <button 
                onClick={() => navigate('/user/credits')}
                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all"
              >
                Buy Credits
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-50 rounded-full group-hover:scale-110 transition-transform duration-700 opacity-60"></div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-600" />
              Profile Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Completion</span>
                <span className="text-sm font-black text-indigo-600">{currentUser.completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 shadow-sm shadow-indigo-200" style={{ width: `${currentUser.completionPercentage}%` }}></div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-600 leading-relaxed uppercase tracking-tight text-center">Your basic profile information is successfully verified.</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/user/profile')}
            className="w-full py-3 mt-6 bg-slate-50 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-100 transition-all"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* 3. Upcoming Sessions & Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-indigo-600" /> Upcoming Sessions
            </h2>
            <button onClick={() => navigate('/user/bookings')} className="text-sm font-black text-indigo-600 hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:border-indigo-200 transition-all group flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors border border-slate-100">
                    <Clock className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900">{session.consultantName}</h4>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px]">{session.domain} • {session.type}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-1">
                  <span className="text-sm font-black text-slate-900">{session.date}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{session.time}</span>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => navigate(`/user/live/${session.id}`)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                  >
                    Join Call
                  </button>
                  <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-colors border border-slate-200">
                    Details
                  </button>
                </div>
              </div>
            ))}
            {upcomingSessions.length === 0 && (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center">
                <p className="text-slate-500 font-medium mb-4">No sessions found for this week</p>
                <button onClick={() => navigate('/user/search')} className="text-indigo-600 font-black uppercase tracking-widest text-sm hover:underline">Find a mentor</button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-indigo-600" /> Credits & Plan
          </h2>
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mb-2">Wallet Balance</p>
                  <p className="text-4xl font-black tabular-nums tracking-tight">₹{currentUser.creditBalance.toLocaleString('en-IN')}</p>
                </div>
                <Award className="w-10 h-10 text-indigo-400" />
              </div>
              
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/5 mb-8">
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">{currentUser.plan}</p>
                <p className="text-sm font-bold text-white/90">Expires {currentUser.expiryDate}</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/user/credits')}
                  className="flex-1 py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95"
                >
                  Top Up
                </button>
                <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-indigo-500 hover:bg-indigo-500 transition-all active:scale-95">
                  Upgrade
                </button>
              </div>
            </div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </div>

      {/* 4. Recent Activity & Notifications Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <History className="w-6 h-6 text-indigo-600" /> Recent Activity
            </h2>
          </div>
          <div className="space-y-6">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-center gap-5 group cursor-pointer">
                <div className={`w-12 h-12 rounded-2xl ${act.bg} ${act.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <act.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate tracking-tight">{act.title}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{act.type} • {act.time}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Bell className="w-6 h-6 text-indigo-600" /> Notifications
            </h2>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Mark all as read</button>
          </div>
          <div className="space-y-6">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors relative group">
                {notif.unread && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-600 rounded-r-full"></div>}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm tracking-tight ${notif.unread ? 'font-black text-slate-900' : 'font-medium text-slate-500'}`}>{notif.text}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/user/notifications')}
            className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors border border-slate-100"
          >
            View All Notifications
          </button>
        </div>
      </div>

      {/* 5. Quick Actions */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Find Expert', icon: Search, path: '/user/search' },
            { label: 'Continue Chat', icon: MessageSquare, path: '/user/messages' },
            { label: 'Buy Credits', icon: Wallet, path: '/user/credits' },
            { label: 'View Bookings', icon: Calendar, path: '/user/bookings' },
          ].map((action, idx) => (
            <button 
              key={idx} 
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center justify-center p-8 rounded-[2rem] border border-slate-200 bg-white hover:border-indigo-600 hover:shadow-xl hover:-translate-y-1 transition-all gap-4 group"
            >
              <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <action.icon className="w-7 h-7" />
              </div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 6. Recommended Consultants */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recommended Experts</h2>
          <button 
            onClick={() => navigate('/user/search')}
            className="text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline flex items-center gap-2"
          >
            Explore All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {consultants.map((con) => (
            <div key={con.id} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full border-b-4 border-b-slate-100 hover:border-b-indigo-500">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={con.image} 
                  alt={con.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] font-black text-slate-900 shadow-xl border border-white">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  {con.rating}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4">
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">{con.name}</h4>
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1">{con.domain}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {con.expertise.slice(0, 2).map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-tighter">{skill}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="font-black text-2xl text-slate-900 tabular-nums tracking-tighter">₹{con.pricePerSession.toLocaleString('en-IN')}</span>
                  <button 
                    onClick={() => navigate(`/user/booking/${con.id}`)}
                    className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-indigo-600 transition-colors uppercase tracking-widest shadow-lg shadow-slate-100 active:scale-95"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
