import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeStyle = (st: string) => {
    switch (st.toLowerCase()) {
      case 'confirmed':
      case 'active':
      case 'completed':
      case 'paid':
      case 'credit confirmed':
      case 'passed':
        return 'bg-green-100 text-green-900 border-green-300 font-semibold';
      case 'now serving':
      case 'under inspection':
      case 'weighed':
      case 'initiated':
      case 'processing':
      case 'under qc':
      case 'at weighbridge':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-semibold';
      case 'in queue':
      case 'scheduled':
      case 'gate entry':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-medium';
      case 'congested':
      case 'pending':
      case 'waiting arrival':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'cancelled':
      case 'failed':
      case 'closed':
        return 'bg-red-100 text-red-900 border-red-300 font-semibold';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-bold',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded border ${sizeClasses[size]} ${getBadgeStyle(status)} shadow-2xs`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {status}
    </span>
  );
};
