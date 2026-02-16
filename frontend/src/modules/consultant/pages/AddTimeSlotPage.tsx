
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';

const AddTimeSlotPage: React.FC = () => {
  const navigate = useNavigate();
  const { addAvailabilitySlot } = useConsultantDashboard();
  const [formData, setFormData] = useState({
    day: 'Mon',
    startTime: '09:00',
    endTime: '10:00'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAvailabilitySlot(formData);
    navigate('/availability');
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <button 
        onClick={() => navigate('/availability')}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Schedule
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-8 text-white">
          <h1 className="text-2xl font-bold">Add New Time Slot</h1>
          <p className="text-slate-400 mt-1">Define when clients can book sessions with you.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Calendar size={16} /> Select Day
            </label>
            <div className="grid grid-cols-7 gap-2">
              {days.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setFormData({ ...formData, day })}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    formData.day === day 
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Clock size={16} /> Start Time
              </label>
              <input 
                required
                type="time"
                value={formData.startTime}
                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Clock size={16} /> End Time
              </label>
              <input 
                required
                type="time"
                value={formData.endTime}
                onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex gap-3 items-start">
            <Check className="text-indigo-600 mt-0.5" size={18} />
            <p className="text-xs text-indigo-700 leading-relaxed">
              Your profile will show as available on <strong>{formData.day}s</strong> from <strong>{formData.startTime}</strong> to <strong>{formData.endTime}</strong>. Clients can book sessions within this range.
            </p>
          </div>

          <Button type="submit" fullWidth size="lg">Save Time Slot</Button>
        </form>
      </div>
    </div>
  );
};

export default AddTimeSlotPage;
