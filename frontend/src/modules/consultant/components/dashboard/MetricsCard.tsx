
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  trend: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, trend }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full flex items-center">
          <TrendingUp size={12} className="mr-1" /> {trend}
        </span>
      </div>
    </div>
  );
};

export default MetricsCard;
