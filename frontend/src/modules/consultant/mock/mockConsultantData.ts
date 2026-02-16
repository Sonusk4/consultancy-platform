
import { ConsultantRole, RegistrationStatus, ConsultantProfile, AvailabilitySlot } from '../types/consultant.types';
import { Session, BookingStatus, SessionType } from '../types/session.types';
import { Notification, MessagePreview } from '../types/notification.types';
import { EnterpriseMember } from '../types/enterprise.types';

export const MOCK_CONSULTANT: ConsultantProfile = {
  id: 'c-1',
  name: 'Alex Sterling',
  role: ConsultantRole.INDIVIDUAL,
  expertise: ['Strategy', 'Marketing', 'Scale-up'],
  bio: 'Experienced business strategist with over 15 years in Silicon Valley...',
  hourlyRate: 5000,
  rating: 4.9,
  totalReviews: 124,
  profileImage: 'https://picsum.photos/seed/alex/200/200',
  languages: ['English', 'Hindi', 'Kannada'],
  status: RegistrationStatus.APPROVED,
  completionPercentage: 85
};

export const MOCK_AVAILABILITY: AvailabilitySlot[] = [
  { id: '1', day: 'Mon', startTime: '09:00', endTime: '12:00' },
  { id: '2', day: 'Tue', startTime: '14:00', endTime: '17:00' },
  { id: '3', day: 'Wed', startTime: '10:00', endTime: '13:00' },
];

export const MOCK_SESSIONS: Session[] = [
  {
    id: 's-1',
    clientName: 'Sarah Jenkins',
    clientAvatar: 'https://picsum.photos/seed/sarah/100/100',
    startTime: '2023-11-20T10:00:00Z',
    endTime: '2023-11-20T11:00:00Z',
    duration: 60,
    type: SessionType.VIDEO,
    status: BookingStatus.UPCOMING,
    isLive: true
  },
  {
    id: 's-2',
    clientName: 'TechFlow Corp',
    clientAvatar: 'https://picsum.photos/seed/tech/100/100',
    startTime: '2023-11-21T14:00:00Z',
    endTime: '2023-11-21T15:00:00Z',
    duration: 60,
    type: SessionType.VIDEO,
    status: BookingStatus.UPCOMING
  }
];

export const MOCK_TEAM_MEMBERS: EnterpriseMember[] = [
  {
    id: 'm-1',
    name: 'David Miller',
    role: ConsultantRole.ENTERPRISE_MEMBER,
    email: 'david@company.com',
    joinedDate: '2023-01-15',
    sessionsCount: 45,
    revenue: 225000,
    avatar: 'https://picsum.photos/seed/david/100/100'
  },
  {
    id: 'm-2',
    name: 'Elena Rodriguez',
    role: ConsultantRole.ENTERPRISE_MEMBER,
    email: 'elena@company.com',
    joinedDate: '2023-03-22',
    sessionsCount: 32,
    revenue: 160000,
    avatar: 'https://picsum.photos/seed/elena/100/100'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n-1',
    title: 'New Booking Request',
    description: 'Sarah Jenkins requested a session for tomorrow.',
    timestamp: '2 mins ago',
    type: 'booking',
    read: false
  },
  {
    id: 'n-2',
    title: 'Payment Received',
    description: 'A payment of ₹5,000 has been processed.',
    timestamp: '1 hour ago',
    type: 'payment',
    read: true
  }
];

export const MOCK_MESSAGES: MessagePreview[] = [
  {
    id: 'msg-1',
    senderName: 'Sarah Jenkins',
    lastMessage: 'Thanks for the insights, looking forward to our next call!',
    timestamp: '10:15 AM',
    unreadCount: 2,
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  }
];
