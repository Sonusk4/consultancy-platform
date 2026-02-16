
import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { MessagePreview } from '../../types/notification.types';

interface MessagesPreviewProps {
  messages: MessagePreview[];
}

const MessagesPreview: React.FC<MessagesPreviewProps> = ({ messages }) => {
  const navigate = useNavigate();

  return (
    <Card 
      title="Recent Messages" 
      action={
        <button 
          onClick={() => navigate('/messages')}
          className="text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowRight size={18} />
        </button>
      }
    >
      <div className="space-y-4">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            onClick={() => navigate('/messages')}
            className="flex gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img src={msg.avatar} alt={msg.senderName} className="w-10 h-10 rounded-full border border-slate-200" />
              {msg.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {msg.unreadCount}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{msg.senderName}</p>
                <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
              </div>
              <p className="text-xs text-slate-500 truncate">{msg.lastMessage}</p>
            </div>
          </div>
        ))}
        <button 
          onClick={() => navigate('/messages')}
          className="w-full text-center py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors border-t border-slate-50 mt-2"
        >
          View all messages
        </button>
      </div>
    </Card>
  );
};

export default MessagesPreview;
