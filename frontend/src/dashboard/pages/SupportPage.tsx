
import React from 'react';
import { 
  LifeBuoy, 
  Search, 
  HelpCircle, 
  ChevronRight, 
  Send,
  PlusCircle,
  FileText,
  Clock,
  MessageCircle,
  Zap
} from 'lucide-react';
import { mockTickets } from '../data/mockData';

const SupportPage: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="bg-indigo-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
            24/7 Support Active
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-tight">How can we help?</h1>
          <p className="text-indigo-200 text-xl font-medium">Search our knowledge base or open a ticket with an expert.</p>
          <div className="relative max-w-lg mx-auto group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Topic, keyword, or problem..." 
              className="w-full pl-16 pr-8 py-6 bg-white rounded-[2rem] text-slate-900 outline-none shadow-2xl font-bold text-lg"
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Billing & Wallet', icon: Zap, count: 42 },
          { title: 'Session Quality', icon: HelpCircle, count: 18 },
          { title: 'Technical Help', icon: MessageCircle, count: 12 },
        ].map(cat => (
          <button key={cat.title} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-indigo-600 hover:shadow-xl hover:-translate-y-1 transition-all text-center group">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-50 transition-colors border border-slate-100 shadow-sm">
              <cat.icon className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{cat.title}</h3>
            <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{cat.count} Helpful Articles</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* New Ticket */}
        <div className="bg-white rounded-[3rem] p-10 lg:p-14 border border-slate-200 shadow-sm space-y-10">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 tracking-tight">
            <PlusCircle className="w-10 h-10 text-indigo-600" /> Raise Ticket
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-sm">
                  <option>Payment Dispute</option>
                  <option>Refund Request</option>
                  <option>Consultant Feedback</option>
                  <option>Account Access</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-sm">
                  <option>Standard</option>
                  <option>High</option>
                  <option>Critical (Urgent)</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
              <input type="text" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-sm" placeholder="Summarize the issue" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Message</label>
              <textarea rows={5} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-sm" placeholder="Provide as much context as possible..." />
            </div>
            <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95">
              Submit Ticket <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Existing Tickets */}
        <div className="bg-white rounded-[3rem] p-10 lg:p-14 border border-slate-200 shadow-sm space-y-10">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 tracking-tight">
            <Clock className="w-10 h-10 text-indigo-600" /> Active Tickets
          </h2>
          <div className="space-y-6">
            {mockTickets.map(ticket => (
              <div key={ticket.id} className="p-8 border-2 border-slate-100 rounded-[2.5rem] hover:border-indigo-100 hover:shadow-xl transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ticket.id}</span>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight mt-1">{ticket.subject}</h4>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                    ticket.status === 'Open' ? 'bg-indigo-100 text-indigo-600' :
                    ticket.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">{ticket.category} • {ticket.date}</span>
                  <button className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest group-hover:underline">
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
