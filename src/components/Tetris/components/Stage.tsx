import React from 'react';
import Cell from './Cell';
import type { STAGE } from '../gameHelpers';

type StageProps = {
  stage: STAGE;
};

const Stage: React.FC<StageProps> = ({ stage }) => (
  <div className="grid grid-cols-12 gap-0 border border-[#333] w-fit bg-[#111]/80 p-4">
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </div>
);

export default Stage;