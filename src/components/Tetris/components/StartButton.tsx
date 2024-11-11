import React from 'react';

type StartButtonProps = {
  callback: () => void;
};

const StartButton: React.FC<StartButtonProps> = ({ callback }) => (
  <button
    className="px-5 py-3 min-h-[30px] w-[120px] rounded-lg bg-[#333]/80 text-[#fff] cursor-pointer"
    onClick={callback}
  >
    Start Game
  </button>
);

export default StartButton;