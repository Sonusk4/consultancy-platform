
import React, { useState } from 'react';
import { HelpCircle, MessageCircle, FileText, Search, ChevronRight, Send, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'faq' | 'tickets'>('faq');

  const faqs = [
    { q: "How do I withdraw my earnings?", a: "Go to the Earnings page and click 'Withdraw Funds'. Payouts are usually processed within 3-5 business days." },
    { q: "Can I reschedule a session?", a: "Yes, click the 'Reschedule' icon on any session in your Bookings or Dashboard. The client will need to confirm the new time." },
    { q: "What are the platform fees?", a: "ConsultantPro takes a flat 10% commission on all successful consultations to cover platform maintenance and processing." },
    { q: "How do I add a new team member?", a: "Enterprise Admins can visit the 'Team Management' page and use the 'Invite Member' button." }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your support ticket has been submitted successfully! Ticket ID: #CP-9921');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Support Center</h1>
          <p className="text-slate-500">How can we help you today?</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'faq' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            FAQs
          </button>
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'tickets' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            My Tickets
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'faq' ? (
            <section className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search frequently asked questions..." 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, i) => (
                    <Card key={i} className="hover:border-indigo-200 transition-colors">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                          <HelpCircle className="text-indigo-600" size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">{faq.q}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="p-12 text-center bg-white border border-dashed border-slate-200 rounded-xl">
                    <p className="text-slate-400 italic">No matching results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section className="space-y-4">
              <Card title="Active Tickets">
                <div className="divide-y divide-slate-100 -mx-5 -my-5">
                  <div className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">#CP-8810: Payment Delay</p>
                        <p className="text-xs text-slate-500">Last updated: 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full border border-amber-100 uppercase">In Progress</span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                  <div className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">#CP-7721: Profile Image Bug</p>
                        <p className="text-xs text-slate-500">Last updated: Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100 uppercase">Resolved</span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <Card title="Create a Ticket" subtitle="We'll get back to you within 24 hours.">
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subject</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Payment Issue</option>
                  <option>Technical Bug</option>
                  <option>Account Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message</label>
                <textarea 
                  required
                  placeholder="Describe your problem in detail..."
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
                ></textarea>
              </div>
              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send size={16} className="mr-2" />}
                Submit Ticket
              </Button>
            </form>
          </Card>

          <Card title="Quick Contact">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <MessageCircle className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Live Chat</p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Agents Online</p>
                </div>
                <button 
                  onClick={() => alert('Starting live chat...')}
                  className="ml-auto text-xs font-bold text-indigo-600 hover:underline"
                >
                  Start
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
