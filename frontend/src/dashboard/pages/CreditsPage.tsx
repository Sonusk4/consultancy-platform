
import React from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, History, Zap, Award } from 'lucide-react';
import { currentUser, mockTransactions } from '../data/mockData';

const CreditsPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Wallet & Plans</h1>
          <p className="text-slate-500 text-lg font-medium">Manage your balance and active subscriptions</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center gap-3 shadow-xl">
          <Zap className="w-5 h-5 fill-current" /> Buy Credit Package
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          {/* Main Balance Card */}
          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative group">
            <div className="space-y-6 text-center md:text-left relative z-10">
              <div className="flex items-center justify-center md:justify-start gap-3 text-slate-400 font-black uppercase tracking-widest text-xs">
                <Wallet className="w-5 h-5" /> Active Balance
              </div>
              <h2 className="text-6xl font-black text-slate-900 tabular-nums tracking-tighter">₹{currentUser.creditBalance.toLocaleString('en-IN')}</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-2xl w-fit mx-auto md:mx-0 font-black text-[10px] uppercase tracking-widest border border-green-100">
                <Plus className="w-3.5 h-3.5" /> 15% Bonus on next load
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto relative z-10">
              {[
                { amt: 1000, label: 'Starter' },
                { amt: 2500, label: 'Value' },
                { amt: 5000, label: 'Power' },
                { amt: 10000, label: 'Pro' },
              ].map(pkg => (
                <button key={pkg.amt} className="p-6 border-2 border-slate-100 rounded-[2rem] bg-slate-50 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-center group active:scale-95 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-black mb-1 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{pkg.label}</p>
                  <p className="text-xl font-black text-slate-900">₹{pkg.amt.toLocaleString('en-IN')}</p>
                </button>
              ))}
            </div>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[60px] opacity-40 group-hover:scale-125 transition-transform duration-1000"></div>
          </div>

          {/* Transaction History */}
          <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <History className="w-6 h-6 text-indigo-600" /> Recent Transactions
              </h3>
              <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Download Statements</button>
            </div>
            <div className="divide-y divide-slate-50">
              {mockTransactions.map(txn => (
                <div key={txn.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${txn.type === 'Credit' ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {txn.type === 'Credit' ? <ArrowDownLeft className="w-7 h-7" /> : <ArrowUpRight className="w-7 h-7" />}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg tracking-tight">{txn.description}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{txn.date} • ID: {txn.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-black tabular-nums tracking-tighter ${txn.type === 'Credit' ? 'text-green-600' : 'text-slate-900'}`}>
                      {txn.type === 'Credit' ? '+' : '-'} ₹{txn.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan Details Sidebar */}
        <div className="space-y-10">
          <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3 px-4 py-1.5 bg-white/20 rounded-xl w-fit text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
                Tier: Premium
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight">{currentUser.plan}</h3>
                <p className="text-indigo-200 text-sm font-bold mt-2 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Next billing: {currentUser.expiryDate}
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  'Unlimited 1:1 Messaging',
                  '20% Discount on all Sessions',
                  'Exclusive Masterclass Access',
                  'Priority Customer Success'
                ].map(perk => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-indigo-50 font-bold">
                    <ShieldCheck className="w-5 h-5 text-white/40" />
                    {perk}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-2xl active:scale-95">
                Manage Plan
              </button>
            </div>
            {/* Background Effect */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-[40px]"></div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8 space-y-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
              <Plus className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h4 className="text-rose-900 font-black text-lg">Refer & Earn Credits</h4>
              <p className="text-rose-700/70 text-sm font-medium leading-relaxed mt-2">Get ₹500 instantly for every friend who books their first session.</p>
            </div>
            <div className="bg-white border-2 border-dashed border-rose-200 rounded-2xl p-4 flex items-center justify-between">
              <span className="font-mono text-rose-900 font-black tracking-widest uppercase">RAHUL500</span>
              <button className="text-xs font-black text-indigo-600 uppercase tracking-widest">Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
