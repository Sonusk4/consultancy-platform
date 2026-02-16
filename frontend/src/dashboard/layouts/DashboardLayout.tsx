
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Calendar, 
  Wallet, 
  MessageSquare, 
  LifeBuoy, 
  User, 
  LogOut,
  Menu,
  Bell
} from 'lucide-react';
import { currentUser } from '../data/mockData';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Sidebar items ordered exactly as requested (1-7, Logout is 8)
  const navItems = [
    { name: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
    { name: 'Search Consultants', path: '/user/search', icon: Search },
    { name: 'My Bookings', path: '/user/bookings', icon: Calendar },
    { name: 'Credits', path: '/user/credits', icon: Wallet },
    { name: 'Messages', path: '/user/messages', icon: MessageSquare },
    { name: 'Support', path: '/user/support', icon: LifeBuoy },
    { name: 'Profile', path: '/user/profile', icon: User },
  ];

  const handleLogout = () => {
    setIsSidebarOpen(false);
    navigate('/user/onboarding');
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 uppercase">CH</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">ConsultHub</span>
          </div>

          {/* Navigation Items (1-8) */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 font-semibold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                    <span className="text-sm">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}

            {/* Logout Item (8) */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-4 px-5 py-4 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all duration-200 group mt-1"
            >
              <LogOut className="w-5 h-5 transition-colors group-hover:text-rose-600" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          {/* Footer Profile Glimpse */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" 
                alt="Profile" 
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm"
              />
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase truncate">{currentUser.plan}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center gap-4 bg-slate-100 px-5 py-2.5 rounded-2xl w-full max-w-md border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all group">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-600" />
              <input 
                type="text" 
                placeholder="Search experts or sessions..." 
                className="bg-transparent border-none focus:outline-none w-full text-sm font-medium text-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={() => navigate('/user/notifications')}
              className="relative p-2.5 text-slate-400 hover:bg-slate-50 rounded-full transition-colors group"
            >
              <Bell className="w-5 h-5 group-hover:text-indigo-600 transition-colors" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            <button 
              onClick={() => navigate('/user/profile')}
              className="flex items-center gap-3 group px-2 py-1 rounded-xl hover:bg-slate-50 transition-all"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Credits: ₹{currentUser.creditBalance.toLocaleString('en-IN')}</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" 
                alt="Avatar" 
                className="w-10 h-10 rounded-xl border-2 border-white ring-2 ring-indigo-50 shadow-md object-cover transition-transform group-hover:scale-105"
              />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-6 lg:p-12 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
