
import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';
import { useConsultantRole } from '../../hooks/useConsultantRole';
import { formatCurrency } from '../../utils/calculations';
import { useConsultantDashboard } from '../../hooks/useConsultantDashboard';

const EarningsCard: React.FC = () => {
  const { isEnterpriseAdmin } = useConsultantRole();
  const { balance, withdrawFunds } = useConsultantDashboard();

  const handleWithdraw = () => {
    const amount = prompt(`Enter amount to withdraw (Available: ${formatCurrency(balance)}):`, "5000");
    if (amount) {
      const num = parseInt(amount);
      if (!isNaN(num)) withdrawFunds(num);
    }
  };

  return (
    <Card title={isEnterpriseAdmin ? "Company Revenue" : "Earnings Summary"}>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Balance</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(balance)}</p>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <TrendingUp size={12} className="mr-0.5" /> +12%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly</p>
            <p className="text-sm font-bold text-slate-900">{formatCurrency(balance * 0.32)}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Pending</p>
            <p className="text-sm font-bold text-slate-900">{formatCurrency(15000)}</p>
          </div>
        </div>

        <button 
          onClick={handleWithdraw}
          className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <DollarSign size={14} /> Withdraw Funds
        </button>
      </div>
    </Card>
  );
};

export default EarningsCard;
