
export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'booking' | 'payment' | 'system' | 'enterprise';
  read: boolean;
}

export interface MessagePreview {
  id: string;
  senderName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar?: string;
}
