
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Building2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConsultantRole } from '../types/consultant.types';
import { useConsultantRole } from '../hooks/useConsultantRole';

const EnterpriseRegistration: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useConsultantRole();
  const [formData, setFormData] = useState({
    companyName: '',
    regNumber: '',
    website: '',
    services: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(ConsultantRole.ENTERPRISE_ADMIN);
    navigate('/register/enterprise-setup');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/register/type')}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Enterprise Registration</h1>
              <p className="text-slate-400 mt-1">Scale your consultancy business with our enterprise tools.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="e.g. Nexus Consulting Group"
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Registration Number</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="Tax ID / Reg No"
                  value={formData.regNumber}
                  onChange={e => setFormData({...formData, regNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Website</label>
                <input 
                  required
                  type="url" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="https://nexusconsulting.com"
                  value={formData.website}
                  onChange={e => setFormData({...formData, website: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Services Offered</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="e.g. Audit, HR, Tech Implementation"
                  value={formData.services}
                  onChange={e => setFormData({...formData, services: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Description</label>
                <textarea 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]" 
                  placeholder="A brief overview of your organization..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-4">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-400 cursor-pointer transition-colors group">
                  <Upload className="mx-auto text-slate-400 mb-2 group-hover:text-indigo-500" size={24} />
                  <p className="text-sm font-medium text-slate-700">Business KYC upload</p>
                  <p className="text-xs text-slate-500 mt-1">Articles of Incorporation, Tax Certificates</p>
                </div>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg">Continue to Admin Setup</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseRegistration;
