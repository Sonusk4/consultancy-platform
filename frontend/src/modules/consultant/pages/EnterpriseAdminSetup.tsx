
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { RegistrationStatus } from '../types/consultant.types';
import { useConsultantRole } from '../hooks/useConsultantRole';

const EnterpriseAdminSetup: React.FC = () => {
  const navigate = useNavigate();
  const { setStatus } = useConsultantRole();
  const [members, setMembers] = useState([
    { id: 1, email: '', role: 'Admin' }
  ]);

  const handleAddMember = () => {
    setMembers([...members, { id: Date.now(), email: '', role: 'Consultant' }]);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(RegistrationStatus.PENDING);
    navigate('/register/status');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Enterprise Admin Setup</h1>
              <p className="text-slate-500">Define the core representative and invite your initial team.</p>
            </div>
          </div>

          <form onSubmit={handleFinish} className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Primary Representative</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input 
                      required
                      type="text" 
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                      placeholder="Admin Name" 
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input 
                      required
                      type="email" 
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                      placeholder="admin@company.com" 
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Initial Team Members</h3>
                <button 
                  type="button"
                  onClick={handleAddMember}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  + Add Another
                </button>
              </div>
              <div className="space-y-3">
                {members.map((member, idx) => (
                  <div key={member.id} className="flex gap-3 items-center">
                    <input 
                      type="email" 
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                      placeholder={`Email address ${idx + 1}`}
                    />
                    <select className="px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm outline-none">
                      <option>Consultant</option>
                      <option>Admin</option>
                    </select>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-4 border-t border-slate-100 flex gap-4">
              <Button type="submit" fullWidth size="lg">
                Complete Setup <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseAdminSetup;
