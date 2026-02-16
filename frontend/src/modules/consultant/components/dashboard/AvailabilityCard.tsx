
import React from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';

const AvailabilityCard: React.FC = () => {
  const navigate = useNavigate();
  const slots = [
    { day: 'Mon', count: 4 },
    { day: 'Tue', count: 6 },
    { day: 'Wed', count: 2 },
    { day: 'Thu', count: 0 },
    { day: 'Fri', count: 8 },
  ];

  return (
    <Card 
      title="Availability Overview" 
      action={
        <button 
          onClick={() => navigate('/availability/add')}
          className="text-indigo-600 hover:text-indigo-700 p-1"
        >
          <Plus size={18} />
        </button>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-900">20h</p>
            <p className="text-xs text-slate-500">Available this week</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">Next Slot</p>
            <p className="text-xs text-indigo-600 font-bold uppercase">Tomorrow, 9:00 AM</p>
          </div>
        </div>

        <div className="flex justify-between gap-1 h-12 items-end">
          {slots.map(slot => (
            <div key={slot.day} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className={`w-full rounded-t-sm transition-all ${slot.count > 0 ? 'bg-indigo-100' : 'bg-slate-50'}`}
                style={{ height: `${(slot.count / 8) * 100}%` }}
              ></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{slot.day}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/availability')}
          className="w-full py-2 px-4 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <CalendarIcon size={14} /> Manage Schedule
        </button>
      </div>
    </Card>
  );
};

export default AvailabilityCard;
