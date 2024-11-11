import React from 'react';
import { Cell } from './Cell';
import type { STAGE } from './gameHelpers';

interface StageProps {
  stage: STAGE;
}

export const Stage: React.FC<StageProps> = ({ stage }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-blue-900/10 rounded-lg" />
    <div 
      className="grid gap-[1px] p-4 bg-black/90 border-4 border-cyan-500/50 rounded-lg backdrop-blur-sm shadow-lg shadow-cyan-500/20"
      style={{
        gridTemplateColumns: `repeat(${stage[0].length}, minmax(0, 1fr))`,
      }}
    >
      {stage.map((row, y) => 
        row.map((cell, x) => (
          <Cell key={`${y}-${x}`} type={cell[0]} />
        ))
      )}
    </div>
  </div>
);