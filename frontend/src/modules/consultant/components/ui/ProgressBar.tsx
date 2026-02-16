
import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
  size?: 'sm' | 'md';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label, size = 'md' }) => {
  const heightClass = size === 'sm' ? 'h-1.5' : 'h-2.5';
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          <span className="text-sm font-semibold text-indigo-600">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClass}`}>
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
