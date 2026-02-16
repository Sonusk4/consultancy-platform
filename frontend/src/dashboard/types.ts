
export type SessionStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';
export type SessionType = 'Video' | 'Voice';

export interface Consultant {
  id: string;
  name: string;
  image: string;
  domain: string;
  rating: number;
  reviewsCount: number;
  pricePerSession: number;
  expertise: string[];
  languages: string[];
  bio: string;
  credentials: string[];
  availability: string[];
}

export interface Session {
  id: string;
  consultantId: string;
  consultantName: string;
  domain: string;
  date: string;
  time: string;
  type: SessionType;
  status: SessionStatus;
  price: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  occupation: string;
  creditBalance: number;
  plan: string;
  expiryDate: string;
  completionPercentage: number;
  interests: string[];
}

export interface SupportTicket {
  id: string;
  category: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Closed';
  date: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'Credit' | 'Debit';
  description: string;
}
