
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  Users, 
  Settings,
  X,
  Send,
  MoreVertical,
  Hand,
  Clock,
  ShieldCheck,
  Maximize,
  Star,
  CheckCircle2
} from 'lucide-react';
import { mockSessions } from '../data/mockData';

const LiveSessionPage: React.FC = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  
  const session = mockSessions.find(s => s.id === sessionId) || mockSessions[0];

  const handleEndCall = () => {
    setShowFeedback(true);
  };

  const submitFeedback = () => {
    // Logic to move session to completed would go here
    navigate('/user/dashboard');
  };

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col overflow-hidden font-sans">
      {/* Immersive Header */}
      <header className="h-20 px-10 border-b border-white/5 flex items-center justify-between bg-slate-900/60 backdrop-blur-3xl relative z-20">
        <div className="flex items-center gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 animate-pulse rounded-full opacity-50 blur-md"></div>
            <div className="relative px-4 py-1.5 bg-red-600 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">Live Session</div>
          </div>
          <div>
            <h1 className="font-black text-2xl tracking-tighter leading-none mb-1">{session.consultantName}</h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" /> End-to-End Encrypted Room
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl text-[10px] font-black text-slate-300 border border-white/5 tracking-widest">
            <Clock className="w-5 h-5 text-indigo-400" />
            00:24:12 / 45:00
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5">
              <Maximize className="w-6 h-6" />
            </button>
            <button className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Experience Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Stage Container */}
        <div className="flex-1 p-10 flex flex-col relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
          <div className="flex-1 flex gap-10">
            {/* Consultant Stage */}
            <div className="flex-1 bg-slate-900 rounded-[4rem] relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&h=1200&fit=crop" 
                alt="Consultant" 
                className="w-full h-full object-cover transition-all duration-[20s] scale-105 group-hover:scale-110"
              />
              <div className="absolute bottom-10 left-10 flex items-center gap-4 bg-black/70 backdrop-blur-2xl px-8 py-4 rounded-[2rem] border border-white/10 shadow-3xl">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                <span className="text-sm font-black tracking-[0.2em] uppercase">{session.consultantName} (Moderator)</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50"></div>
            </div>

            {/* Participation Stack */}
            <div className="w-1/4 max-w-[340px] flex flex-col gap-8">
              {/* My View */}
              <div className="aspect-[4/3] bg-slate-800 rounded-[3rem] relative overflow-hidden shadow-2xl border border-white/10 group">
                {isVideoOff ? (
                  <div className="w-full h-full flex items-center justify-center flex-col gap-6 bg-slate-900">
                    <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-4xl font-black shadow-2xl ring-8 ring-white/5">R</div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Camera Off</span>
                  </div>
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&h=450&fit=crop" 
                    alt="Self" 
                    className="w-full h-full object-cover grayscale opacity-40 hover:opacity-80 transition-opacity"
                  />
                )}
                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5">Me</div>
              </div>

              {/* Attendance Tracker */}
              <div className="bg-white/5 rounded-[3rem] p-10 border border-white/5 flex-1 flex flex-col gap-8 overflow-y-auto backdrop-blur-2xl shadow-2xl">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center justify-between border-b border-white/5 pb-6">
                  In Room <Users className="w-5 h-5" />
                </h4>
                <div className="space-y-8">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-sm font-black shadow-xl ring-2 ring-white/10">A</div>
                      <span className="text-sm font-bold tracking-tight">Sneha Reddy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center text-sm font-black border border-white/10">R</div>
                      <span className="text-sm font-bold tracking-tight text-slate-400">Rahul Sharma</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Chat Sidebar */}
        {isChatOpen && (
          <aside className="w-[480px] bg-slate-900 border-l border-white/5 flex flex-col animate-in slide-in-from-right duration-700 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative z-30">
            <div className="h-20 px-10 border-b border-white/5 flex items-center justify-between bg-slate-900/60 backdrop-blur-2xl">
              <h3 className="font-black text-[11px] uppercase tracking-[0.3em] text-slate-400">Call Chat</h3>
              <button onClick={() => setIsChatOpen(false)} className="text-slate-500 hover:text-white p-3 hover:bg-white/10 rounded-2xl transition-all">
                <X className="w-7 h-7" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <div className="bg-indigo-900/20 p-6 rounded-3xl text-[10px] text-indigo-200 border border-indigo-500/10 font-black uppercase tracking-widest leading-loose text-center shadow-inner">
                Chat content is private to participants.
              </div>
              <div className="space-y-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Sneha Reddy</span>
                    <span className="text-[10px] text-slate-600 font-bold uppercase">4:10 PM</span>
                  </div>
                  <p className="text-sm text-slate-300 bg-white/5 px-8 py-5 rounded-[2.5rem] rounded-tl-none inline-block border border-white/5 shadow-xl leading-relaxed max-w-[90%]">
                    Hi Rahul! We're starting with the FAANG prep roadmap. Ready?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-10 border-t border-white/5 bg-slate-900/80">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Type message..." 
                  className="w-full bg-slate-950 border border-white/5 rounded-[2rem] px-8 py-6 text-sm outline-none focus:ring-4 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all font-medium placeholder:text-slate-600 shadow-2xl"
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 p-3 hover:bg-indigo-600/10 rounded-2xl transition-all">
                  <Send className="w-7 h-7" />
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Control Dashboard */}
      <footer className="h-32 bg-slate-900/90 backdrop-blur-3xl border-t border-white/5 flex items-center justify-center gap-16 relative z-20">
        <div className="absolute left-12 flex items-center gap-6 hidden xl:flex">
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`p-5 rounded-[2rem] transition-all shadow-2xl ${isChatOpen ? 'bg-indigo-600 text-white shadow-indigo-900/40' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'}`}
          >
            <MessageSquare className="w-8 h-8" />
          </button>
          <button className="p-5 bg-white/5 text-slate-400 hover:bg-white/10 rounded-[2rem] transition-all border border-white/5 shadow-2xl group">
            <Hand className="w-8 h-8 group-hover:scale-125 transition-transform" />
          </button>
        </div>

        <div className="flex items-center gap-10">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-7 rounded-[2.5rem] transition-all border-2 shadow-3xl active:scale-90 ${isMuted ? 'bg-rose-600 border-rose-500 text-white shadow-rose-900/40' : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'}`}
          >
            {isMuted ? <MicOff className="w-9 h-9" /> : <Mic className="w-9 h-9" />}
          </button>
          
          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-7 rounded-[2.5rem] transition-all border-2 shadow-3xl active:scale-90 ${isVideoOff ? 'bg-rose-600 border-rose-500 text-white shadow-rose-900/40' : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'}`}
          >
            {isVideoOff ? <VideoOff className="w-9 h-9" /> : <Video className="w-9 h-9" />}
          </button>

          <button 
            onClick={handleEndCall}
            className="px-14 py-7 bg-rose-600 rounded-[2.5rem] text-white font-black hover:bg-rose-700 transition-all flex items-center gap-5 shadow-[0_20px_60px_rgba(225,29,72,0.4)] active:scale-95 group"
          >
            <PhoneOff className="w-9 h-9 group-hover:rotate-[135deg] transition-transform duration-700" />
            <span className="hidden sm:inline uppercase tracking-[0.25em] text-[11px] font-black">End Call</span>
          </button>
        </div>

        <div className="absolute right-12 hidden xl:block">
          <button className="p-5 bg-white/5 text-slate-400 hover:bg-white/10 rounded-[2rem] transition-all border border-white/5 shadow-2xl">
            <MoreVertical className="w-8 h-8" />
          </button>
        </div>
      </footer>

      {/* Post-Session Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[4rem] p-12 max-w-xl w-full text-center space-y-10 shadow-3xl">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-100 ring-4 ring-white">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Session Ended</h2>
              <p className="text-slate-500 font-medium mt-2">How was your mentorship experience with {session.consultantName}?</p>
            </div>
            
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map(star => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className={`p-4 rounded-2xl transition-all transform active:scale-90 ${rating >= star ? 'bg-amber-100 text-amber-500 shadow-lg' : 'bg-slate-50 text-slate-300'}`}
                >
                  <Star className={`w-8 h-8 ${rating >= star ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>

            <textarea 
              rows={4} 
              placeholder="Leave a short review (optional)..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-slate-900 outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-sm"
            />

            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/user/dashboard')}
                className="flex-1 py-5 text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-slate-50 rounded-2xl"
              >
                Skip
              </button>
              <button 
                onClick={submitFeedback}
                className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSessionPage;
