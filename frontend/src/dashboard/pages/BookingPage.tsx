
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Video, 
  Mic, 
  CreditCard, 
  Smartphone, 
  ChevronLeft,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { consultants, currentUser } from '../data/mockData';

const BookingPage: React.FC = () => {
  const { consultantId } = useParams();
  const navigate = useNavigate();
  const consultant = consultants.find(c => c.id === consultantId) || consultants[0];
  
  // Dynamically generate the next 3 days for booking
  const upcomingDates = useMemo(() => {
    const dates = [];
    for (let i = 1; i <= 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        full: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
        month: d.toLocaleDateString('en-IN', { month: 'short' })
      });
    }
    return dates;
  }, []);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(upcomingDates[0].full);
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState<'Video' | 'Voice'>('Video');
  const [paymentMethod, setPaymentMethod] = useState<'Credits' | 'Razorpay'>('Credits');

  const timeSlots = ['10:00 AM', '11:00 AM', '2:00 PM', '4:30 PM', '6:00 PM'];

  const handleBooking = () => {
    setStep(3);
    setTimeout(() => {
      navigate('/user/dashboard');
    }, 3500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in slide-in-from-bottom-8 duration-700">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 font-bold uppercase text-xs tracking-widest transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Expert List
      </button>

      {step < 3 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Selection Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step Header */}
            <div className="flex items-center gap-8 mb-4">
              <div className={`flex items-center gap-3 ${step >= 1 ? 'text-indigo-600' : 'text-slate-300'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${step >= 1 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>1</div>
                <span className="font-black text-sm uppercase tracking-widest">Schedule</span>
              </div>
              <div className="h-px bg-slate-100 flex-1"></div>
              <div className={`flex items-center gap-3 ${step >= 2 ? 'text-indigo-600' : 'text-slate-300'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${step >= 2 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>2</div>
                <span className="font-black text-sm uppercase tracking-widest">Checkout</span>
              </div>
            </div>

            {step === 1 ? (
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-10">
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-900">Select Date</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {upcomingDates.map(dateObj => (
                      <button 
                        key={dateObj.full}
                        onClick={() => setSelectedDate(dateObj.full)}
                        className={`p-6 border-2 rounded-3xl text-center transition-all ${selectedDate === dateObj.full ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xl shadow-indigo-100' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'}`}
                      >
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{dateObj.month}</p>
                        <p className="text-2xl font-black">{dateObj.day}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-900">Choose Time Slot (IST)</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {timeSlots.map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-6 py-5 border-2 rounded-2xl text-sm font-black transition-all ${selectedTime === time ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xl' : 'border-slate-100 hover:border-slate-200 bg-white text-slate-600'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-900">Interaction Type</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <button 
                      onClick={() => setSessionType('Video')}
                      className={`flex items-center gap-4 p-6 border-2 rounded-3xl transition-all ${sessionType === 'Video' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <div className={`p-4 rounded-2xl ${sessionType === 'Video' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        <Video className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-slate-900">Video Call</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Recommended</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => setSessionType('Voice')}
                      className={`flex items-center gap-4 p-6 border-2 rounded-3xl transition-all ${sessionType === 'Voice' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <div className={`p-4 rounded-2xl ${sessionType === 'Voice' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        <Mic className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-slate-900">Voice Call</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Audio Only</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-10 animate-in slide-in-from-right duration-500">
                <h2 className="text-3xl font-black text-slate-900">Secure Payment</h2>
                
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Select Payment Source</label>
                  <div className="space-y-4">
                    <button 
                      onClick={() => setPaymentMethod('Credits')}
                      className={`w-full flex items-center justify-between p-6 border-2 rounded-3xl transition-all ${paymentMethod === 'Credits' ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-5">
                        <CreditCard className="w-6 h-6 text-indigo-600" />
                        <div className="text-left">
                          <p className="font-black text-slate-900 text-lg tracking-tight">Wallet Credits</p>
                          <p className="text-xs text-slate-500 font-bold">Balance: ₹{currentUser.creditBalance.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'Credits' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('Razorpay')}
                      className={`w-full flex items-center justify-between p-6 border-2 rounded-3xl transition-all ${paymentMethod === 'Razorpay' ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-5">
                        <Smartphone className="w-6 h-6 text-indigo-600" />
                        <div className="text-left">
                          <p className="font-black text-slate-900 text-lg tracking-tight">Razorpay (UPI / Card)</p>
                          <p className="text-xs text-slate-500 font-bold">Direct secure gateway</p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'Razorpay' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-200 flex gap-4">
                  <ShieldCheck className="w-8 h-8 text-indigo-600 shrink-0" />
                  <div className="text-sm font-medium text-slate-600 leading-relaxed">
                    Payments are handled securely. You will be charged only after the consultant confirms the slot within 15 minutes.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Summary Sidebar */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-28 border border-white/5">
              <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4 tracking-tight uppercase tracking-widest text-slate-400">Order Summary</h3>
              
              <div className="flex items-center gap-5 mb-10">
                <img src={consultant.image} alt={consultant.name} className="w-20 h-20 rounded-[1.5rem] object-cover border-2 border-white/20 shadow-2xl" />
                <div>
                  <h4 className="font-black text-xl tracking-tight leading-tight">{consultant.name}</h4>
                  <p className="text-xs text-indigo-400 font-black uppercase tracking-[0.2em] mt-1">{consultant.domain}</p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-slate-400 font-bold">
                    <Calendar className="w-5 h-5" /> Date
                  </div>
                  <span className="font-black">{selectedDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-slate-400 font-bold">
                    <Clock className="w-5 h-5" /> Time
                  </div>
                  <span className="font-black">{selectedTime || '--:--'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-slate-400 font-bold">
                    <Video className="w-5 h-5" /> Type
                  </div>
                  <span className="font-black">{sessionType}</span>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-[2rem] space-y-4 mb-10 border border-white/5">
                <div className="flex justify-between text-sm font-bold text-slate-400">
                  <span>Session Fee</span>
                  <span>₹{consultant.pricePerSession}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-400">
                  <span>Booking Fee</span>
                  <span>₹99</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Total Pay</span>
                  <span className="font-black text-white text-3xl tabular-nums tracking-tighter">₹{consultant.pricePerSession + 99}</span>
                </div>
              </div>

              {step === 1 ? (
                <button 
                  onClick={() => setStep(2)}
                  disabled={!selectedTime}
                  className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-lg uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
                >
                  Checkout <ArrowRight className="inline ml-2 w-6 h-6" />
                </button>
              ) : (
                <button 
                  onClick={handleBooking}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-2xl active:scale-95"
                >
                  Pay Now
                </button>
              )}
              
              <div className="mt-8 flex items-center justify-center gap-2 opacity-40">
                <HelpCircle className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">24h Cancellation applies</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Success State */
        <div className="bg-white rounded-[3.5rem] p-16 border border-slate-200 shadow-2xl text-center space-y-8 max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
          <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-50 ring-4 ring-white">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h2>
          <p className="text-slate-500 text-lg font-medium px-8">
            Great choice! Your session with <span className="font-black text-slate-900">{consultant.name}</span> is booked for <span className="font-black text-slate-900">{selectedDate} at {selectedTime}</span>.
          </p>
          <div className="bg-slate-50 p-8 rounded-[2.5rem] text-left border border-slate-100 space-y-6">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-indigo-600" /> Next Steps
            </h4>
            <ul className="space-y-4">
              {[
                'Meeting link sent to your WhatsApp and Email',
                'Download pre-session material from Dashboard',
                'Join 5 minutes early for technical check'
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-sm font-bold text-slate-700">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-[10px]">{i+1}</div>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] animate-pulse">Redirecting to Dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
