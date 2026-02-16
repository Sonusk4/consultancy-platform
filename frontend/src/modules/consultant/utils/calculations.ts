
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateSuccessRate = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export const getStatusColor = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'PENDING': return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'APPROVED':
    case 'UPCOMING':
    case 'COMPLETED': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'REJECTED':
    case 'CANCELLED': return 'text-rose-600 bg-rose-50 border-rose-200';
    default: return 'text-slate-600 bg-slate-50 border-slate-200';
  }
};
