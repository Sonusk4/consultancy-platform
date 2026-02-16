
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  ArrowRight, 
  Plus, 
  Star, 
  TrendingUp, 
  Award, 
  Calendar,
  CheckCircle,
  Clock,
  Wallet
} from 'lucide-react';
import { currentUser, mockSessions, consultants } from './data/mockData';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const liveSession = mockSessions.find(s => s.status === 'live');
  const upcomingSessions = mockSessions.filter(s => s.status === 'upcoming');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Live Notification Bar */}
      {liveSession && (
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-6 text-white shadow-2xl shadow-rose-200 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="flex items-center gap-6 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-white animate-ping rounded-full opacity-30"></div>
              <div className="relative bg-white p-4 rounded-2xl text-red-600">
                <Play className="w-8 h-8 fill-current" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-red-800/40 rounded text-[10px] font-black uppercase tracking-widest border border-white/20">Active Session</span>
                <h2 className="text-xl font-black">{liveSession.consultantName}</h2>
              </div>
              <p className="text-white/80 text-sm font-medium">Session: {liveSession.domain} • Joined 12 mins ago</p>
            </div>
          </div>
          <button 
            onClick={() => navigate(`/user/live/${liveSession.id}`)}
            className="px-8 py-4 bg-white text-red-600 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl relative z-10"
          >
            Join Meeting
            <ArrowRight className="w-5 h-5" />
          </button>
          {/* Background Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
      )}

      {/* 2. Welcome & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-3xl p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Welcome back, {currentUser.name}!</h1>
            <p className="text-slate-500 text-lg mb-8 max-w-md font-medium">You have {upcomingSessions.length} sessions scheduled this week. Ready to grow?</p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/user/search')}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-100 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Book New Session
              </button>
              <button 
                onClick={() => navigate('/user/credits')}
                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Check Credits
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-50 rounded-full group-hover:scale-110 transition-transform duration-700 ease-out opacity-60"></div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-lg">Profile Status</h3>
            <CheckCircle className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Completion</span>
                <span className="text-sm font-bold text-indigo-600">{currentUser.completionPercentage}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${currentUser.completionPercentage}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <p className="text-xs font-bold text-amber-800 mb-1">Pending KYC</p>
              <p className="text-[10px] text-amber-600 leading-normal">Verify identity to unlock premium domains.</p>
            </div>
            <button className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl text-xs font-bold uppercase tracking-widest border border-slate-200 hover:bg-slate-100 transition-all">
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bookings & Wallet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-indigo-600" /> My Upcoming Sessions
            </h2>
            <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:border-indigo-200 transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors border border-slate-100">
                    <Clock className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{session.consultantName}</h4>
                    <p className="text-sm text-slate-500 font-medium">{session.domain} • {session.type} Call</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-1">
                  <span className="text-sm font-bold text-slate-900">{session.date}</span>
                  <span className="text-xs font-semibold text-slate-400">{session.time}</span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors">
                    Reschedule
                  </button>
                  <button className="flex-1 sm:flex-none px-6 py-3 text-slate-400 hover:text-red-500 rounded-xl text-sm font-bold transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet & Credits Card */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-indigo-600" /> Credits
          </h2>
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Wallet Balance</p>
                  <p className="text-4xl font-black tabular-nums tracking-tight">₹{currentUser.creditBalance.toLocaleString('en-IN')}</p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                  <Award className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/5 mb-8">
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">{currentUser.plan}</p>
                <p className="text-sm font-bold text-white/90">Renew on {currentUser.expiryDate}</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/user/credits')}
                  className="flex-1 py-4 bg-white text-slate-900 rounded-2xl text-sm font-black hover:bg-indigo-50 transition-all active:scale-95"
                >
                  Top Up
                </button>
                <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black border border-indigo-500 hover:bg-indigo-500 transition-all active:scale-95">
                  Plans
                </button>
              </div>
            </div>
            {/* Glossy Overlay */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" /> Activity Highlights
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Referral Credits', val: '+ ₹500', color: 'text-green-600' },
                { label: 'Platform Savings', val: '₹1,240', color: 'text-indigo-600' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
                  <span className={`text-sm font-black ${stat.color}`}>{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recommendation Carousel */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900">Recommended Experts</h2>
          <button 
            onClick={() => navigate('/user/search')}
            className="text-indigo-600 font-bold hover:underline flex items-center gap-2"
          >
            Explore More <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {consultants.map((con) => (
            <div key={con.id} className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full border-b-4 border-b-slate-100 hover:border-b-indigo-500">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={con.image} 
                  alt={con.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-black text-slate-900 shadow-xl border border-white">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  {con.rating}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">{con.name}</h4>
                  <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mt-1">{con.domain}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {con.expertise.slice(0, 2).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{skill}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="font-black text-xl text-slate-900">₹{con.pricePerSession.toLocaleString('en-IN')}</span>
                  <button 
                    onClick={() => navigate(`/user/booking/${con.id}`)}
                    className="px-5 py-3 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-indigo-600 transition-colors uppercase tracking-widest shadow-lg shadow-slate-100"
                  >
                    View
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
