
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ChevronLeft, 
  Award, 
  Globe, 
  Clock, 
  ShieldCheck, 
  CheckCircle,
  MessageSquare,
  Calendar,
  IndianRupee,
  Briefcase
} from 'lucide-react';
import { consultants } from '../data/mockData';

const ConsultantProfilePage: React.FC = () => {
  const { consultantId } = useParams();
  const navigate = useNavigate();
  const consultant = consultants.find(c => c.id === consultantId) || consultants[0];

  const reviews = [
    { id: 1, user: 'Vikas R.', rating: 5, comment: 'Exceptional guidance for UPSC Mains. The strategy sessions are extremely structured.', date: '2 days ago' },
    { id: 2, user: 'Meera S.', rating: 4, comment: 'Very helpful career advice. Helped me transition to a Product role smoothly.', date: '1 week ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest transition-all"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-10 items-start">
            <img 
              src={consultant.image} 
              alt={consultant.name} 
              className="w-48 h-48 rounded-[2.5rem] object-cover border-4 border-white shadow-2xl ring-4 ring-indigo-50" 
            />
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">{consultant.name}</h1>
                  <p className="text-indigo-600 font-black uppercase text-xs tracking-widest mt-1">{consultant.domain}</p>
                </div>
                <div className="bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100 flex items-center gap-2 text-amber-700 font-black">
                  <Star className="w-5 h-5 fill-current" />
                  {consultant.rating}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6 text-slate-400 text-xs font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-400" /> {consultant.languages.join(', ')}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-400" /> {consultant.reviewsCount} Sessions</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {consultant.expertise.map(exp => (
                  <span key={exp} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-500 tracking-tight">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 lg:p-12 border border-slate-200 shadow-sm space-y-10">
            <section className="space-y-4">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-indigo-600" /> About Expert
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed text-lg italic">"{consultant.bio}"</p>
            </section>

            <section className="space-y-4 border-t border-slate-50 pt-10">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <Award className="w-6 h-6 text-indigo-600" /> Professional Credentials
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultant.credentials.map((cred, i) => (
                  <li key={i} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {cred}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-8 border-t border-slate-50 pt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-indigo-600" /> Client Reviews
                </h3>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">View All</span>
              </div>
              <div className="space-y-6">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center font-black text-indigo-600">{rev.user[0]}</div>
                        <div>
                          <p className="font-black text-slate-900 text-sm">{rev.user}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Sticky Booking Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl sticky top-28 border border-white/5">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-b border-white/10 pb-4">Session Details</h3>
            
            <div className="space-y-8 mb-10">
              <div className="flex justify-between items-end">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Consultation Fee</p>
                <p className="text-4xl font-black tabular-nums tracking-tighter">₹{consultant.pricePerSession.toLocaleString('en-IN')}</p>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Weekly Availability
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span 
                      key={day} 
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border tracking-tight
                        ${consultant.availability.includes(day) || consultant.availability.includes('Daily')
                          ? 'bg-indigo-600 border-indigo-500 text-white' 
                          : 'bg-white/5 border-white/10 text-slate-500'}`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-3">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  Verified Professional
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  Instant Confirmation
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/user/booking/${consultant.id}`)}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
            >
              Book Session Now
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-6 font-bold uppercase tracking-widest">Powered by ConsultHub India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfilePage;
