import React from 'react';

interface DisplayProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'goal' | 'next' | 'hold';
}

export const Display: React.FC<DisplayProps> = ({ label, value, variant = 'default' }) => {
  const getBgColor = () => {
    switch (variant) {
      case 'goal':
        return 'from-purple-900/80 to-purple-800/80';
      case 'next':
      case 'hold':
        return 'from-blue-900/80 to-blue-800/80';
      default:
        return 'from-indigo-900/80 to-indigo-800/80';
    }
  };

  return (
    <div className="mb-4">
      <div className={`
        p-3 rounded-lg border border-purple-500/30
        bg-gradient-to-br ${getBgColor()}
        backdrop-blur-sm
        min-w-[120px]
      `}>
        <div className="text-purple-200 text-sm mb-1 text-center">{label}</div>
        <div className="text-white text-xl font-bold text-center">{value}</div>
      </div>
    </div>
  );
};