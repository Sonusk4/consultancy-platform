
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, ArrowRight } from 'lucide-react';
import { useConsultantRole } from '../hooks/useConsultantRole';
import { ConsultantRole } from '../types/consultant.types';

const ConsultantTypeSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useConsultantRole();

  const handleSelect = (role: ConsultantRole) => {
    setRole(role);
    if (role === ConsultantRole.INDIVIDUAL) {
      navigate('/register/individual');
    } else {
      navigate('/register/enterprise');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Choose your journey</h1>
        <p className="text-slate-600">Select the type of account that fits your professional needs.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div 
          onClick={() => handleSelect(ConsultantRole.INDIVIDUAL)}
          className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-indigo-600 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <User size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Individual Consultant</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            For independent professionals looking to manage their own schedule, bookings, and personal brand.
          </p>
          <div className="flex items-center text-indigo-600 font-semibold gap-2">
            Get Started <ArrowRight size={18} />
          </div>
        </div>

        <div 
          onClick={() => handleSelect(ConsultantRole.ENTERPRISE_ADMIN)}
          className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-indigo-600 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Building2 size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Enterprise Consultant</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            For organizations and consulting firms to manage multiple consultants, teams, and unified billing.
          </p>
          <div className="flex items-center text-indigo-600 font-semibold gap-2">
            Register Company <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantTypeSelection;
