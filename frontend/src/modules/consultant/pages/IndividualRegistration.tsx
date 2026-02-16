
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { RegistrationStatus } from '../types/consultant.types';
import { useConsultantRole } from '../hooks/useConsultantRole';

const IndividualRegistration: React.FC = () => {
  const navigate = useNavigate();
  const { setStatus } = useConsultantRole();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    expertise: '',
    bio: '',
    pricing: '',
    languages: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulated registration delay
    setTimeout(() => {
      setStatus(RegistrationStatus.PENDING);
      setIsSubmitting(false);
      navigate('/register/status');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/register/type')}
          disabled={isSubmitting}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors disabled:opacity-50"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-indigo-600 p-8 text-white">
            <h1 className="text-2xl font-bold">Individual Consultant Registration</h1>
            <p className="text-indigo-100 mt-2">Let's build your professional presence on ConsultantPro.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input 
                  required
                  type="text" 
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-50" 
                  placeholder="e.g. Alex Sterling"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Domain / Expertise</label>
                <input 
                  required
                  type="text" 
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-50" 
                  placeholder="e.g. Marketing, Business Strategy"
                  value={formData.expertise}
                  onChange={e => setFormData({...formData, expertise: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bio & Experience</label>
                <textarea 
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px] disabled:bg-slate-50" 
                  placeholder="Briefly describe your background..."
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hourly Rate (₹)</label>
                  <input 
                    required
                    type="number" 
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-50" 
                    placeholder="5000"
                    value={formData.pricing}
                    onChange={e => setFormData({...formData, pricing: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Languages</label>
                  <input 
                    type="text" 
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-50" 
                    placeholder="e.g. Hindi, English"
                    value={formData.languages}
                    onChange={e => setFormData({...formData, languages: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-indigo-400 cursor-pointer transition-colors group">
                  <Upload className="mx-auto text-slate-400 mb-2 group-hover:text-indigo-500" size={24} />
                  <p className="text-sm text-slate-500">Upload Personal KYC Documents (ID/Aadhar)</p>
                </div>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} /> Processing...
                </>
              ) : 'Submit Application'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndividualRegistration;
