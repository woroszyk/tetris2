import React from 'react';

type DisplayProps = {
  gameOver?: boolean;
  text: string;
};

const Display: React.FC<DisplayProps> = ({ gameOver, text }) => (
  <div
    className={`p-5 rounded-lg min-h-[30px] w-[120px] ${
      gameOver ? 'bg-red-500/80' : 'bg-[#000]/80'
    } text-[#999] text-center mb-4`}
  >
    {text}
  </div>
);

export default Display;