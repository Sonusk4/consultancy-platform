import React, { useState } from 'react';
import { Calendar, Clock, Video, MoreVertical, Check, X, RefreshCw, Loader2 } from 'lucide-react';
import { Session, BookingStatus } from '../../types/session.types';
import { Badge } from '../ui/Badge';

interface SessionCardProps {
  session: Session;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onReschedule?: (id: string) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onAccept, onReject, onReschedule }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAction, setActiveAction] = useState<'accept' | 'reject' | 'reschedule' | null>(null);

  const handleAction = (type: 'accept' | 'reject' | 'reschedule', action: () => void) => {
    setActiveAction(type);
    setIsProcessing(true);
    
    // Simulate a brief processing delay for the animation
    setTimeout(() => {
      action();
      // We don't necessarily need to reset state if the component is removed/updated 
      // but it's good practice for non-removal actions (like completed status)
      setIsProcessing(false);
      setActiveAction(null);
    }, 600);
  };

  const getProcessingStyles = () => {
    if (!isProcessing) return 'bg-white border-slate-200';
    
    switch (activeAction) {
      case 'accept':
        return 'bg-emerald-50 border-emerald-500 scale-[0.98] shadow-inner ring-2 ring-emerald-100';
      case 'reject':
        return 'bg-rose-50 border-rose-500 scale-[0.98] shadow-inner ring-2 ring-rose-100';
      case 'reschedule':
        return 'bg-indigo-50 border-indigo-500 scale-[0.98] shadow-inner ring-2 ring-indigo-100';
      default:
        return 'bg-slate-50 border-slate-300 opacity-70';
    }
  };

  return (
    <div className={`
      relative border rounded-xl p-4 flex items-center justify-between 
      transition-all duration-500 ease-in-out transform
      ${getProcessingStyles()}
      ${!isProcessing ? 'hover:shadow-md hover:-translate-y-0.5' : 'pointer-events-none'}
    `}>
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/10 rounded-xl z-10">
          <Loader2 className={`animate-spin ${
            activeAction === 'accept' ? 'text-emerald-600' : 
            activeAction === 'reject' ? 'text-rose-600' : 
            'text-indigo-600'
          }`} size={24} />
        </div>
      )}

      <div className={`flex items-center gap-4 transition-opacity duration-300 ${isProcessing ? 'opacity-30' : 'opacity-100'}`}>
        <img 
          src={session.clientAvatar} 
          alt={session.clientName} 
          className="w-12 h-12 rounded-full bg-slate-100 object-cover shadow-sm"
        />
        <div>
          <h4 className="font-bold text-slate-900">{session.clientName}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={14} /> Nov 21, 2023
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={14} /> 2:00 PM
            </span>
            <span className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
              <Video size={14} /> Video
            </span>
          </div>
        </div>
      </div>

      <div className={`flex items-center gap-4 transition-all duration-300 ${isProcessing ? 'opacity-30 translate-x-4' : 'opacity-100'}`}>
        <Badge variant={session.status === BookingStatus.UPCOMING ? 'success' : session.status === BookingStatus.PENDING ? 'warning' : 'neutral'}>
          {session.status}
        </Badge>
        
        {(session.status === BookingStatus.UPCOMING || session.status === BookingStatus.PENDING) && (
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onAccept && handleAction('accept', () => onAccept(session.id))}
              title="Accept Booking" 
              className="p-2 text-emerald-600 hover:bg-emerald-100 hover:scale-110 active:scale-95 rounded-lg transition-all"
            >
              <Check size={18} />
            </button>
            <button 
              onClick={() => onReschedule && handleAction('reschedule', () => onReschedule(session.id))}
              title="Reschedule Session" 
              className="p-2 text-indigo-600 hover:bg-indigo-100 hover:scale-110 active:scale-95 rounded-lg transition-all"
            >
              <RefreshCw size={18} />
            </button>
            <button 
              onClick={() => onReject && handleAction('reject', () => onReject(session.id))}
              title="Reject Booking" 
              className="p-2 text-rose-600 hover:bg-rose-100 hover:scale-110 active:scale-95 rounded-lg transition-all"
            >
              <X size={18} />
            </button>
            <button 
              onClick={() => alert('Options: Edit Session, Client Profile, Cancel Session')}
              className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCard;