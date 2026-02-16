
import React from 'react';
import { Card } from '../components/ui/Card';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

const EarningsPage: React.FC = () => {
  const transactions = [
    { id: 1, type: 'Payout', amount: -75000, date: 'Nov 18, 2023', status: 'Completed' },
    { id: 2, type: 'Session - Sarah Jenkins', amount: 5000, date: 'Nov 17, 2023', status: 'Completed' },
    { id: 3, type: 'Session - TechFlow Corp', amount: 15000, date: 'Nov 16, 2023', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Earnings & Financials</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 text-white">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Available for Withdrawal</p>
          <h2 className="text-3xl font-bold mb-6">{formatCurrency(385000)}</h2>
          <button className="w-full bg-white text-slate-900 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
            Withdraw Funds
          </button>
        </Card>
        
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card title="Revenue Distribution">
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Video Calls</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(280000)}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[75%]"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Chat Sessions</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(105000)}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[25%]"></div>
              </div>
            </div>
          </Card>
          <Card title="Monthly Snapshot">
            <div className="space-y-4 pt-2">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">This Month</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(124000)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Vs Last Month</p>
                <p className="text-sm font-bold text-emerald-600">+22.5% increase</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Recent Transactions">
        <div className="divide-y divide-slate-100 -mx-5 -my-5">
          {transactions.map(tx => (
            <div key={tx.id} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount < 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {tx.amount < 0 ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{tx.type}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Calendar size={12} /> {tx.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${tx.amount < 0 ? 'text-slate-900' : 'text-emerald-600'}`}>
                  {tx.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(tx.amount))}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EarningsPage;
