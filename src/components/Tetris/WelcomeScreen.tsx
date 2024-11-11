import React from 'react';
import { StartButton } from './StartButton';

interface WelcomeScreenProps {
  highScore: number;
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ highScore, onStart }) => (
  <div className="flex flex-col items-center justify-center gap-8 p-8 rounded-xl backdrop-blur-sm bg-black/40 text-center">
    <img 
      src="/logo.png" 
      alt="Tetris Logo" 
      className="w-64 h-auto mb-4 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]"
    />
    
    <div className="space-y-4">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Witaj w Tetris!
      </h1>
      
      <p className="text-gray-300">
        Użyj strzałek do sterowania, <kbd className="px-2 py-1 bg-gray-800 rounded">C</kbd> aby zatrzymać klocek
      </p>
      
      {highScore > 0 && (
        <div className="mt-4 p-4 rounded-lg bg-purple-900/30 border border-purple-500/30">
          <p className="text-purple-200">Najlepszy wynik</p>
          <p className="text-2xl font-bold text-white">{highScore}</p>
        </div>
      )}
    </div>

    <StartButton callback={onStart} />
  </div>
);