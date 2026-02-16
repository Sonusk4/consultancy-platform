
import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  Info, 
  MoreVertical, 
  Trash2,
  AlertCircle
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'session' | 'payment' | 'system';
  unread: boolean;
}

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Session Starting Soon',
      message: 'Your mentorship session with Arjun Mehta starts in 15 minutes. Get your notes ready!',
      time: 'Just now',
      type: 'session',
      unread: true
    },
    {
      id: '2',
      title: 'Payment Successful',
      message: '₹5,000 has been successfully added to your wallet via UPI.',
      time: '2 hours ago',
      type: 'payment',
      unread: true
    },
    {
      id: '3',
      title: 'Profile Completion Tip',
      message: 'Add your educational credentials to your profile to get better expert recommendations.',
      time: '5 hours ago',
      type: 'system',
      unread: false
    },
    {
      id: '4',
      title: 'New Expert Match',
      message: 'A new CA & Tax Consultant specializing in Startup Compliance has joined the platform.',
      time: 'Yesterday',
      type: 'system',
      unread: false
    },
    {
      id: '5',
      title: 'Booking Confirmed',
      message: 'Priya Iyer has confirmed your session for Nov 12, 2025 at 11:00 AM.',
      time: '2 days ago',
      type: 'session',
      unread: false
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.unread);

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'session': return <Calendar className="w-6 h-6 text-indigo-600" />;
      case 'payment': return <CreditCard className="w-6 h-6 text-green-600" />;
      case 'system': return <Info className="w-6 h-6 text-blue-600" />;
      default: return <Bell className="w-6 h-6 text-slate-400" />;
    }
  };

  const getTypeBg = (type: Notification['type']) => {
    switch (type) {
      case 'session': return 'bg-indigo-50';
      case 'payment': return 'bg-green-50';
      case 'system': return 'bg-blue-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Notifications</h1>
          <p className="text-slate-500 text-lg font-medium">Stay updated with your mentorship progress and account activity</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={markAllRead}
            className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark all read
          </button>
          <button 
            onClick={() => setNotifications([])}
            className="px-6 py-3 bg-white border border-rose-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Clear all
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {['all', 'unread'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t as any)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2
              ${filter === t ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filteredNotifications.length > 0 ? filteredNotifications.map((notif) => (
            <div key={notif.id} className={`p-8 hover:bg-slate-50/80 transition-all group relative ${notif.unread ? 'bg-indigo-50/20' : ''}`}>
              {notif.unread && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600 rounded-r-full shadow-[2px_0_8px_rgba(79,70,229,0.3)]"></div>
              )}
              
              <div className="flex items-start gap-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm ${getTypeBg(notif.type)}`}>
                  {getTypeIcon(notif.type)}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg tracking-tight ${notif.unread ? 'font-black text-slate-900' : 'font-bold text-slate-700'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{notif.time}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${notif.unread ? 'text-slate-600 font-medium' : 'text-slate-500 font-normal'}`}>
                    {notif.message}
                  </p>
                  
                  <div className="pt-4 flex items-center gap-4">
                    {notif.type === 'session' && (
                      <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Session Details</button>
                    )}
                    {notif.type === 'payment' && (
                      <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Transaction</button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notif.id)}
                      className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-32 text-center space-y-6">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-slate-200">
                <Bell className="w-10 h-10 text-slate-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">All caught up!</h3>
                <p className="text-slate-500 font-medium">You don't have any notifications right now.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-8 bg-indigo-900 rounded-[2.5rem] text-white flex items-center gap-6 shadow-2xl">
        <div className="p-4 bg-white/10 rounded-2xl">
          <AlertCircle className="w-8 h-8 text-indigo-300" />
        </div>
        <div>
          <h4 className="font-black uppercase tracking-widest text-xs mb-1">Security Reminder</h4>
          <p className="text-sm text-indigo-100/70 font-medium leading-relaxed">ConsultHub will never ask for your UPI PIN or Bank Passwords via notifications or chat.</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
