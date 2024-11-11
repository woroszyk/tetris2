import React from 'react';

interface StartButtonProps {
  callback: () => void;
}

export const StartButton: React.FC<StartButtonProps> = ({ callback }) => (
  <button
    onClick={callback}
    className="
      px-8 py-3 
      bg-gradient-to-r from-purple-600 to-blue-600
      hover:from-purple-700 hover:to-blue-700
      text-white font-bold rounded-lg
      border border-purple-500/30
      shadow-lg shadow-purple-500/20
      transition-all duration-200
      hover:shadow-purple-500/30
      hover:scale-105
    "
  >
    Rozpocznij Grę
  </button>
);