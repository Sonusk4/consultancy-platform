
import React from 'react';
import { Bell, Search, ChevronDown, Menu } from 'lucide-react';
import { useConsultantDashboard } from '../../hooks/useConsultantDashboard';

interface TopNavbarProps {
  onMenuClick?: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const { profile, notifications } = useConsultantDashboard();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Searching for relevant data...');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
        >
          <Menu size={20} />
        </button>
        
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search sessions, clients, or team..." 
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={() => alert('Opening notifications panel...')}
          className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1 md:mx-2"></div>

        <button 
          onClick={() => alert('User Settings Menu')}
          className="flex items-center gap-2 md:gap-3 p-1 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <img 
            src={profile.profileImage} 
            alt={profile.name} 
            className="w-8 h-8 rounded-full bg-slate-100 object-cover border border-slate-200"
          />
          <div className="text-left hidden lg:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">{profile.name}</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tight font-medium">{profile.role.replace('_', ' ')}</p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
