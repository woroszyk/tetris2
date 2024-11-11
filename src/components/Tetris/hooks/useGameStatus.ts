import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared: number) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [goal, setGoal] = useState(40);
  const [goalReached, setGoalReached] = useState(false);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      const points = linePoints[rowsCleared - 1] * (level + 1);
      setScore(prev => {
        const newScore = prev + points;
        if (newScore >= goal && !goalReached) {
          setGoalReached(true);
        }
        return newScore;
      });
      setRows(prev => prev + rowsCleared);
    }
  }, [level, rowsCleared, goal, goalReached]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared]);

  return { score, setScore, rows, setRows, level, setLevel, goalReached };
};