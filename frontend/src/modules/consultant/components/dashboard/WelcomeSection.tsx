
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { ConsultantProfile } from '../../types/consultant.types';
import { ProgressBar } from '../ui/ProgressBar';

interface WelcomeSectionProps {
  profile: ConsultantProfile;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ profile }) => {
  const navigate = useNavigate();
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src={profile.profileImage} 
            alt={profile.name} 
            className="w-16 h-16 rounded-2xl object-cover bg-slate-100"
          />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
            <CheckCircle2 className="text-indigo-600 fill-indigo-50" size={18} />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{getGreeting()}, {profile.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 flex items-center gap-1.5 mt-0.5">
            Verified Consultant <CheckCircle2 size={14} className="text-indigo-500" />
          </p>
        </div>
      </div>

      <div className="w-full md:w-64">
        <ProgressBar progress={profile.completionPercentage} label="Profile Completion" size="sm" />
        <button 
          onClick={() => navigate('/profile')}
          className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mt-2 hover:underline transition-all"
        >
          Complete your profile to boost visibility
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;
