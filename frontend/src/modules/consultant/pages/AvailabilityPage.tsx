
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';

const AvailabilityPage: React.FC = () => {
  const navigate = useNavigate();
  const { availabilitySlots, removeAvailabilitySlot } = useConsultantDashboard();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Availability</h1>
          <p className="text-slate-500">Set your weekly schedule and specific available time slots.</p>
        </div>
        <Button onClick={() => navigate('/availability/add')}>
          <Plus size={18} className="mr-2" /> Add Time Slot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {days.map(day => {
          const slotsForDay = availabilitySlots.filter(s => s.day === day);
          return (
            <Card key={day} className="text-center !p-4 flex flex-col min-h-[200px]">
              <p className="text-xs font-bold text-slate-400 uppercase mb-3 border-b border-slate-100 pb-2">{day}</p>
              <div className="space-y-2 flex-1">
                {slotsForDay.length > 0 ? (
                  slotsForDay.map(slot => (
                    <div key={slot.id} className="group relative p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-[10px] font-bold text-indigo-700">
                      {slot.startTime} - {slot.endTime}
                      <button 
                        onClick={() => removeAvailabilitySlot(slot.id)}
                        className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-300 mt-4 italic">No slots</p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Card title="Calendar View" className="bg-slate-50/50">
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <CalendarIcon size={48} className="mb-4 opacity-20" />
          <p className="text-sm">Interactive calendar view coming soon...</p>
        </div>
      </Card>
    </div>
  );
};

export default AvailabilityPage;
