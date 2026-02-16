
import { useState, useEffect, useCallback } from 'react';
import { MOCK_CONSULTANT, MOCK_SESSIONS, MOCK_NOTIFICATIONS, MOCK_MESSAGES, MOCK_TEAM_MEMBERS, MOCK_AVAILABILITY } from '../mock/mockConsultantData';
import { Session, BookingStatus } from '../types/session.types';
import { MessagePreview, Notification } from '../types/notification.types';
import { EnterpriseMember } from '../types/enterprise.types';
import { AvailabilitySlot, ConsultantProfile } from '../types/consultant.types';

// Simple global persistence for the demo session
let persistentProfile = { ...MOCK_CONSULTANT };
let persistentSessions = [...MOCK_SESSIONS];
let persistentNotifications = [...MOCK_NOTIFICATIONS];
let persistentMessages = [...MOCK_MESSAGES];
let persistentTeam = [...MOCK_TEAM_MEMBERS];
let persistentAvailability = [...MOCK_AVAILABILITY];
let persistentBalance = 385000;
let persistentReplies: Record<string, string> = {};

export const useConsultantDashboard = () => {
  const [profile, setProfileState] = useState<ConsultantProfile>(persistentProfile);
  const [sessions, setSessionsState] = useState<Session[]>(persistentSessions);
  const [notifications, setNotificationsState] = useState<Notification[]>(persistentNotifications);
  const [messages, setMessagesState] = useState<MessagePreview[]>(persistentMessages);
  const [teamMembers, setTeamState] = useState<EnterpriseMember[]>(persistentTeam);
  const [availabilitySlots, setAvailabilityState] = useState<AvailabilitySlot[]>(persistentAvailability);
  const [balance, setBalanceState] = useState(persistentBalance);
  const [replies, setRepliesState] = useState<Record<string, string>>(persistentReplies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const updateProfile = useCallback((updates: Partial<ConsultantProfile>) => {
    persistentProfile = { ...persistentProfile, ...updates };
    setProfileState(persistentProfile);
  }, []);

  const updateSessionStatus = useCallback((id: string, status: BookingStatus) => {
    persistentSessions = persistentSessions.map(s => s.id === id ? { ...s, status } : s);
    setSessionsState(persistentSessions);
    
    // Add a notification for status change
    const session = persistentSessions.find(s => s.id === id);
    if (session) {
      const newNotification: Notification = {
        id: `n-${Date.now()}`,
        title: `Session ${status.toLowerCase()}`,
        description: `Session with ${session.clientName} is now ${status.toLowerCase()}.`,
        timestamp: 'Just now',
        type: 'booking',
        read: false
      };
      persistentNotifications = [newNotification, ...persistentNotifications];
      setNotificationsState(persistentNotifications);
    }
  }, []);

  const removeSession = useCallback((id: string) => {
    persistentSessions = persistentSessions.filter(s => s.id !== id);
    setSessionsState(persistentSessions);
  }, []);

  const rescheduleSession = useCallback((id: string) => {
    alert('Reschedule request sent to client!');
    updateSessionStatus(id, BookingStatus.PENDING);
  }, [updateSessionStatus]);

  const addMessage = useCallback((chatId: string, text: string) => {
    persistentMessages = persistentMessages.map(m => 
      m.id === chatId ? { ...m, lastMessage: text, timestamp: 'Just now' } : m
    );
    setMessagesState(persistentMessages);
  }, []);

  const inviteTeamMember = useCallback((name: string, email: string) => {
    const newMember: EnterpriseMember = {
      id: `m-${Date.now()}`,
      name,
      role: persistentProfile.role === 'ENTERPRISE_ADMIN' ? 'ENTERPRISE_MEMBER' as any : 'INDIVIDUAL' as any,
      email,
      joinedDate: new Date().toISOString().split('T')[0],
      sessionsCount: 0,
      revenue: 0,
      avatar: `https://picsum.photos/seed/${email}/100/100`
    };
    persistentTeam = [...persistentTeam, newMember];
    setTeamState(persistentTeam);
    
    const newNotification: Notification = {
      id: `n-${Date.now()}`,
      title: 'Member Invited',
      description: `${name} has been invited to the team.`,
      timestamp: 'Just now',
      type: 'enterprise',
      read: false
    };
    persistentNotifications = [newNotification, ...persistentNotifications];
    setNotificationsState(persistentNotifications);
  }, []);

  const removeTeamMember = useCallback((id: string) => {
    persistentTeam = persistentTeam.filter(m => m.id !== id);
    setTeamState(persistentTeam);
  }, []);

  const addAvailabilitySlot = useCallback((slot: Omit<AvailabilitySlot, 'id'>) => {
    const newSlot = { ...slot, id: Date.now().toString() };
    persistentAvailability = [...persistentAvailability, newSlot];
    setAvailabilityState(persistentAvailability);
  }, []);

  const removeAvailabilitySlot = useCallback((id: string) => {
    persistentAvailability = persistentAvailability.filter(s => s.id !== id);
    setAvailabilityState(persistentAvailability);
  }, []);

  const withdrawFunds = useCallback((amount: number) => {
    if (amount > persistentBalance) {
      alert('Insufficient balance!');
      return;
    }
    persistentBalance -= amount;
    setBalanceState(persistentBalance);
    
    const newNotification: Notification = {
      id: `n-${Date.now()}`,
      title: 'Withdrawal Successful',
      description: `Your withdrawal of ₹${amount.toLocaleString('en-IN')} has been initiated.`,
      timestamp: 'Just now',
      type: 'payment',
      read: false
    };
    persistentNotifications = [newNotification, ...persistentNotifications];
    setNotificationsState(persistentNotifications);
    alert(`Successfully initiated withdrawal of ₹${amount.toLocaleString('en-IN')}`);
  }, []);

  const submitReviewReply = useCallback((reviewId: string, text: string) => {
    persistentReplies = { ...persistentReplies, [reviewId]: text };
    setRepliesState(persistentReplies);
  }, []);

  return {
    profile,
    updateProfile,
    sessions,
    updateSessionStatus,
    removeSession,
    rescheduleSession,
    notifications,
    messages,
    addMessage,
    teamMembers,
    inviteTeamMember,
    removeTeamMember,
    availabilitySlots,
    addAvailabilitySlot,
    removeAvailabilitySlot,
    balance,
    withdrawFunds,
    replies,
    submitReviewReply,
    loading
  };
};
