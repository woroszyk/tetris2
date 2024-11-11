import React, { useState, useEffect } from 'react';
import { Stage } from './components/Tetris/Stage';
import { Display } from './components/Tetris/Display';
import { Preview } from './components/Tetris/Preview';
import { StartButton } from './components/Tetris/StartButton';
import { WelcomeScreen } from './components/Tetris/WelcomeScreen';
import { useGameStatus } from './components/Tetris/hooks/useGameStatus';
import { usePlayer } from './components/Tetris/hooks/usePlayer';
import { useStage } from './components/Tetris/hooks/useStage';
import { useInterval } from './components/Tetris/hooks/useInterval';
import { createStage, checkCollision } from './components/Tetris/gameHelpers';

const HIGH_SCORE_KEY = 'tetris-high-score';

export const App: React.FC = () => {
  const [dropTime, setDropTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const { 
    player, 
    updatePlayerPos, 
    resetPlayer, 
    playerRotate,
    holdPiece,
    nextPiece,
    holdCurrentPiece 
  } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel, goalReached } = useGameStatus(rowsCleared);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    }
  }, [score, highScore]);

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        setGameStarted(false);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    if (!gameOver && keyCode === 40) {
      setDropTime(1000 / (level + 1) + 200);
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      if (keyCode === 37) movePlayer(-1);
      else if (keyCode === 39) movePlayer(1);
      else if (keyCode === 40) dropPlayer();
      else if (keyCode === 38) playerRotate(stage, 1);
      else if (keyCode === 67) holdCurrentPiece();
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  if (!gameStarted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?fit=crop&w=2000&q=80')] bg-cover bg-center">
        <WelcomeScreen highScore={highScore} onStart={startGame} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?fit=crop&w=2000&q=80')] bg-cover bg-center"
      role="button"
      tabIndex={0}
      onKeyDown={move}
      onKeyUp={keyUp}
    >
      <div className="flex gap-8 p-8 rounded-xl backdrop-blur-sm bg-black/40">
        <div>
          <Preview piece={holdPiece} label="ZATRZYMANY (C)" />
          <Display label="CEL" value="40" variant="goal" />
        </div>

        <Stage stage={stage} />

        <div>
          <Preview piece={nextPiece} label="NASTĘPNY" />
          <Display label="WYNIK" value={score} />
          <Display label="NAJLEPSZY" value={highScore} />
          <Display label="WIERSZE" value={rows} />
          <Display label="POZIOM" value={level} />
          {gameOver && <StartButton callback={startGame} />}
          {goalReached && (
            <div className="text-green-400 font-bold text-center mt-4">
              Cel osiągnięty!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};