
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  Calendar, 
  BookOpen, 
  DollarSign, 
  Star, 
  MessageSquare, 
  HelpCircle, 
  LogOut,
  Users,
  Settings,
  TrendingUp,
  Building2,
  X,
  CalendarDays,
  ChevronLeft
} from 'lucide-react';
import { useConsultantRole } from '../../hooks/useConsultantRole';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { isIndividual, isEnterpriseAdmin, isEnterpriseMember } = useConsultantRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/register/type');
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
        ${isActive 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
        }
      `}
    >
      <Icon size={20} className="shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );

  return (
    <aside className="w-64 bg-white flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <BookOpen className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">ConsultantHub</span>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors group"
          title="Collapse Sidebar"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">Main</div>
        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />

        {isIndividual && (
          <>
            <NavItem to="/profile" icon={UserCircle} label="Profile" />
            <NavItem to="/availability" icon={Calendar} label="Availability" />
            <NavItem to="/bookings" icon={BookOpen} label="Bookings" />
            <NavItem to="/calendar" icon={CalendarDays} label="Calendar Review" />
            <NavItem to="/earnings" icon={DollarSign} label="Earnings" />
            <NavItem to="/reviews" icon={Star} label="Reviews" />
          </>
        )}

        {isEnterpriseAdmin && (
          <>
            <NavItem to="/profile" icon={Building2} label="Company Profile" />
            <NavItem to="/team" icon={Users} label="Team Management" />
            <NavItem to="/bookings" icon={BookOpen} label="Bookings" />
            <NavItem to="/calendar" icon={CalendarDays} label="Calendar Review" />
            <NavItem to="/earnings" icon={DollarSign} label="Earnings" />
            <NavItem to="/analytics" icon={TrendingUp} label="Analytics" />
            <NavItem to="/settings" icon={Settings} label="Enterprise Settings" />
          </>
        )}

        {isEnterpriseMember && (
          <>
            <NavItem to="/profile" icon={UserCircle} label="My Profile" />
            <NavItem to="/availability" icon={Calendar} label="My Availability" />
            <NavItem to="/bookings" icon={BookOpen} label="My Bookings" />
            <NavItem to="/calendar" icon={CalendarDays} label="Calendar Review" />
            <NavItem to="/earnings" icon={DollarSign} label="My Earnings" />
            <NavItem to="/reviews" icon={Star} label="Reviews" />
          </>
        )}

        <div className="mt-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">Communication</div>
        <NavItem to="/messages" icon={MessageSquare} label="Messages" />
        <NavItem to="/support" icon={HelpCircle} label="Support" />
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
        >
          <LogOut size={20} className="shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
