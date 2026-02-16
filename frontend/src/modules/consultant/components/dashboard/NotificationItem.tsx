
import React from 'react';
import { Calendar, CreditCard, Info, Users } from 'lucide-react';
import { Notification } from '../../types/notification.types';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'booking': return <Calendar className="text-indigo-600" size={16} />;
      case 'payment': return <CreditCard className="text-emerald-600" size={16} />;
      case 'enterprise': return <Users className="text-blue-600" size={16} />;
      default: return <Info className="text-slate-600" size={16} />;
    }
  };

  const getBg = () => {
    switch (notification.type) {
      case 'booking': return 'bg-indigo-50';
      case 'payment': return 'bg-emerald-50';
      case 'enterprise': return 'bg-blue-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className={`p-4 flex gap-3 ${notification.read ? 'opacity-70' : ''} hover:bg-slate-50 transition-colors cursor-pointer`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getBg()}`}>
        {getIcon()}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{notification.description}</p>
        <p className="text-[10px] text-slate-400 mt-1 font-medium">{notification.timestamp}</p>
      </div>
      {!notification.read && (
        <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full mt-1.5"></div>
      )}
    </div>
  );
};

export default NotificationItem;
