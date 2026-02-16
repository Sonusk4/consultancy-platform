
import { Consultant, Session, UserProfile, SupportTicket, Transaction } from '../types';

export const currentUser: UserProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.in',
  phone: '+91 98765 43210',
  location: 'Bengaluru, Karnataka',
  occupation: 'Aspiring Civil Servant',
  creditBalance: 4250,
  plan: 'Gold Annual Plan',
  expiryDate: '15 Nov 2025',
  completionPercentage: 85,
  interests: ['UPSC Prep', 'IT Career', 'Startup Growth'],
};

export const consultants: Consultant[] = [
  {
    id: 'c1',
    name: 'Arjun Mehta',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    domain: 'UPSC Mentor',
    rating: 4.9,
    reviewsCount: 1240,
    pricePerSession: 1499,
    expertise: ['General Studies', 'Ethics', 'Interview Prep'],
    languages: ['Hindi', 'English'],
    bio: 'Ex-IAS Officer with 15 years of experience in administration. Helped 500+ aspirants crack the mains.',
    credentials: ['IAS Batch 2008', 'M.A. Public Admin'],
    availability: ['Mon', 'Tue', 'Fri'],
  },
  {
    id: 'c2',
    name: 'Priya Iyer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    domain: 'IT Career Coach',
    rating: 4.8,
    reviewsCount: 850,
    pricePerSession: 1999,
    expertise: ['FAANG Prep', 'System Design', 'React/TS'],
    languages: ['English', 'Tamil'],
    bio: 'Senior Software Architect at a global tech giant. Specialized in career transition and high-level coding.',
    credentials: ['B.Tech IIT Madras', 'Ex-Google SDE-III'],
    availability: ['Sat', 'Sun'],
  },
  {
    id: 'c3',
    name: 'Vikram Singh',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    domain: 'Vedic Astrology Expert',
    rating: 4.9,
    reviewsCount: 2100,
    pricePerSession: 999,
    expertise: ['Career Guidance', 'Relationship Analysis', 'Vastu'],
    languages: ['Hindi', 'English', 'Punjabi'],
    bio: 'Certified Vedic Astrologer with lineage-based knowledge. Combining ancient wisdom with modern logic.',
    credentials: ['Jyotish Visharad', 'PhD in Vedic Science'],
    availability: ['Daily'],
  },
  {
    id: 'c4',
    name: 'Ananya Deshmukh',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    domain: 'CA & Tax Consultant',
    rating: 4.7,
    reviewsCount: 680,
    pricePerSession: 2499,
    expertise: ['Tax Planning', 'Audit', 'Startup Compliance'],
    languages: ['English', 'Marathi'],
    bio: 'Chartered Accountant with a decade of experience in corporate taxation and startup accounting.',
    credentials: ['ICAI Member', 'B.Com Gold Medalist'],
    availability: ['Mon', 'Wed', 'Sat'],
  }
];

export const mockSessions: Session[] = [
  {
    id: 's1',
    consultantId: 'c1',
    consultantName: 'Arjun Mehta',
    domain: 'UPSC Mentor',
    date: 'Today',
    time: '4:00 PM - 4:45 PM',
    type: 'Video',
    status: 'live',
    price: 1499,
  },
  {
    id: 's2',
    consultantId: 'c2',
    consultantName: 'Priya Iyer',
    domain: 'IT Career Coach',
    date: '12 Nov 2025',
    time: '11:00 AM - 11:30 AM',
    type: 'Voice',
    status: 'upcoming',
    price: 1999,
  },
];

export const mockTickets: SupportTicket[] = [
  { id: 'T-1024', category: 'Payment', subject: 'UPI Amount debited but booking failed', status: 'In Progress', date: '05 Nov 2025' }
];

export const mockTransactions: Transaction[] = [
  { id: 'TX-901', date: '04 Nov 2025', amount: 1499, type: 'Debit', description: 'Session with Arjun Mehta' },
  { id: 'TX-882', date: '01 Nov 2025', amount: 5000, type: 'Credit', description: 'Razorpay Add: UPI' },
];
