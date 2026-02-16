
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, User, Target, Zap, Briefcase } from 'lucide-react';

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-40"></div>

      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl p-10 lg:p-16 border border-slate-100 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-2.5 rounded-full transition-all duration-700 ease-out ${s === step ? 'w-20 bg-indigo-600' : s < step ? 'w-10 bg-indigo-300' : 'w-10 bg-slate-100'}`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-10 animate-in slide-in-from-right duration-500">
            <div className="text-center">
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Your growth journey starts here.</h1>
              <p className="text-slate-500 text-xl font-medium">Help us personalize your experience on ConsultantHub India.</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">What's your full name?</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input type="text" placeholder="e.g. Rahul Sharma" className="w-full pl-16 pr-8 py-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-xl" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Current Ambition</label>
                <div className="relative group">
                  <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none" />
                  <select className="w-full pl-16 pr-8 py-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-xl appearance-none">
                    <option>UPSC Civil Services 2025</option>
                    <option>Product Manager Transition</option>
                    <option>SDE FAANG Placement</option>
                    <option>Tax & Financial Freedom</option>
                    <option>Vedic Astrology Journey</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in slide-in-from-right duration-500">
            <div className="text-center">
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Choose your interests</h1>
              <p className="text-slate-500 text-xl font-medium">Select domains where you need expert mentorship.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['UPSC Prep', 'Tech Careers', 'Financial Goals', 'Business Strategy', 'Spiritual Advice', 'Public Speaking'].map((interest) => (
                <button 
                  key={interest}
                  className="p-8 border-2 border-slate-100 rounded-[2rem] text-sm font-black uppercase tracking-widest hover:border-indigo-600 hover:bg-indigo-50 transition-all text-center flex flex-col items-center gap-4 active:scale-95 group"
                >
                  <Zap className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12 animate-in slide-in-from-right duration-500 text-center">
            <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-100 ring-4 ring-white">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Verification Complete!</h1>
              <p className="text-slate-500 text-xl px-8 font-medium leading-relaxed">
                We've matching you with 48 potential mentors for your chosen path. Let's explore your dashboard.
              </p>
            </div>
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-left space-y-6">
              <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 tracking-[0.25em]">
                <Target className="w-6 h-6 text-indigo-600" /> SMART PROFILE GENERATED
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-700 uppercase tracking-widest shadow-sm">UPSC Focus</span>
                <span className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-700 uppercase tracking-widest shadow-sm">Razorpay Enabled</span>
                <span className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-700 uppercase tracking-widest shadow-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={handleNext}
          className="w-full mt-16 py-6 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-100 transition-all active:scale-95 shadow-xl"
        >
          {step === 3 ? 'Go to Dashboard' : 'Continue'}
          <ArrowRight className="w-7 h-7" />
        </button>
      </div>
      
      <p className="mt-16 text-slate-400 text-xs font-black uppercase tracking-[0.4em]">
        ConsultHub India • Enterprise Suite 2024
      </p>
    </div>
  );
};

export default OnboardingPage;
