
import { ConsultantRole } from './consultant.types';

export interface EnterpriseMember {
  id: string;
  name: string;
  role: ConsultantRole;
  email: string;
  joinedDate: string;
  sessionsCount: number;
  revenue: number;
  avatar?: string;
}

export interface EnterpriseStats {
  totalRevenue: number;
  monthlyRevenue: number;
  consultantCount: number;
  activeSessions: number;
}
