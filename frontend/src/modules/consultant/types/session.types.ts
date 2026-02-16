
export enum BookingStatus {
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING'
}

export enum SessionType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  CHAT = 'CHAT'
}

export interface Session {
  id: string;
  clientName: string;
  clientAvatar?: string;
  startTime: string;
  endTime: string;
  duration: number;
  type: SessionType;
  status: BookingStatus;
  isLive?: boolean;
}
