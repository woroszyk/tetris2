import React from 'react';

type CellProps = {
  type: number | string;
};

const Cell: React.FC<CellProps> = ({ type }) => (
  <div
    className="w-[30px] h-[30px] border border-[#333] relative"
    style={{
      background: `rgba(${type === 0 ? '0,0,0,0.8' : type === 'I' ? '80,227,230' : 
        type === 'J' ? '36,95,223' : type === 'L' ? '223,173,36' : 
        type === 'O' ? '223,217,36' : type === 'S' ? '48,211,56' : 
        type === 'T' ? '132,61,198' : '227,78,78'}, 0.8)`,
    }}
  />
);

export default React.memo(Cell);