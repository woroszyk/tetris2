import React from 'react';
import { Cell } from './Cell';

interface PreviewProps {
  piece: { shape: number[][] } | null;
  label: string;
}

export const Preview: React.FC<PreviewProps> = ({ piece, label }) => {
  const previewGrid = Array(4).fill(Array(4).fill(0));

  return (
    <div className="mb-4">
      <div className="p-3 rounded-lg border border-purple-500/30 bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm">
        <div className="text-purple-200 text-sm mb-2 text-center">{label}</div>
        <div className="grid gap-[1px] bg-black/40 p-2 rounded-md">
          {previewGrid.map((row, y) => (
            <div key={y} className="flex">
              {row.map((_, x) => {
                const cellValue = piece?.shape[y]?.[x] || 0;
                return <Cell key={x} type={cellValue} isPreview />;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};