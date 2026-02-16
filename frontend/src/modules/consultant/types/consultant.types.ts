
export enum ConsultantRole {
  INDIVIDUAL = 'INDIVIDUAL',
  ENTERPRISE_ADMIN = 'ENTERPRISE_ADMIN',
  ENTERPRISE_MEMBER = 'ENTERPRISE_MEMBER'
}

export enum RegistrationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface AvailabilitySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface ConsultantProfile {
  id: string;
  name: string;
  role: ConsultantRole;
  expertise: string[];
  bio: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  profileImage?: string;
  languages: string[];
  status: RegistrationStatus;
  completionPercentage: number;
}
