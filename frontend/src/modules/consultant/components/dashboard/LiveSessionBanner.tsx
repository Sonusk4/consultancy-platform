
import React from 'react';
import { Play } from 'lucide-react';
import { Session } from '../../types/session.types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface LiveSessionBannerProps {
  session: Session;
}

const LiveSessionBanner: React.FC<LiveSessionBannerProps> = ({ session }) => {
  const handleJoin = () => {
    alert(`Connecting to video call with ${session.clientName}...`);
  };

  return (
    <div className="bg-rose-600 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-rose-200">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
          <Play className="fill-white" size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="live">LIVE NOW</Badge>
            <span className="text-rose-100 text-sm font-medium">Video Consultation</span>
          </div>
          <h3 className="text-xl font-bold">Session with {session.clientName}</h3>
          <p className="text-rose-100 text-sm mt-0.5 flex items-center gap-1.5">
            Started at 10:00 AM (25m elapsed)
          </p>
        </div>
      </div>
      
      <div className="flex gap-3 w-full md:w-auto">
        <Button 
          variant="secondary" 
          onClick={handleJoin}
          className="bg-white text-rose-600 hover:bg-rose-50 border-none flex-1 md:flex-none"
        >
          Join Session
        </Button>
      </div>
    </div>
  );
};

export default LiveSessionBanner;
