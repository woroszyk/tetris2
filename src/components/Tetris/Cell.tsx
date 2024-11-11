import React from 'react';

interface CellProps {
  type: number | string;
  isPreview?: boolean;
}

const COLORS = {
  0: 'transparent',
  1: '#00f0f0', // Cyan (I)
  2: '#0000f0', // Blue (J)
  3: '#f0a000', // Orange (L)
  4: '#f0f000', // Yellow (O)
  5: '#00f000', // Green (S)
  6: '#a000f0', // Purple (T)
  7: '#f00000', // Red (Z)
};

export const Cell: React.FC<CellProps> = ({ type, isPreview = false }) => {
  const color = COLORS[type as keyof typeof COLORS] || COLORS[0];
  const isEmpty = type === 0;
  
  return (
    <div
      className={`
        w-7 h-7 
        ${isEmpty ? 'bg-black/40' : ''}
        border
        transition-colors
        duration-150
      `}
      style={{
        backgroundColor: isEmpty ? 'rgba(0,0,0,0.4)' : color,
        borderColor: isEmpty ? '#222' : color,
        boxShadow: isEmpty ? 'none' : `inset 0 0 5px ${color}, 0 0 8px ${color}40`,
      }}
    />
  );
};