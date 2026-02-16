import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { Menu } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      {/* Sidebar - fully hideable */}
      <div className={`
        fixed md:sticky top-0 h-full z-30 transition-all duration-300 ease-in-out bg-white shadow-xl md:shadow-none
        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <TopNavbar onMenuClick={toggleSidebar} />
        
        {/* Floating Toggle Button (visible when sidebar is closed) */}
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar}
            className="fixed bottom-6 left-6 z-40 p-3 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all scale-110 md:scale-100"
            title="Open Sidebar"
          >
            <Menu size={24} />
          </button>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;