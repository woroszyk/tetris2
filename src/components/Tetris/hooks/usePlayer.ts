import { useState, useCallback } from 'react';
import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';
import { checkCollision } from '../gameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });
  const [nextPiece, setNextPiece] = useState(randomTetromino());
  const [holdPiece, setHoldPiece] = useState<null | ReturnType<typeof randomTetromino>>(null);
  const [canHold, setCanHold] = useState(true);

  const rotate = (matrix: number[][], dir: number) => {
    // Make the rows become cols (transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index])
    );
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage: number[][], dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    // This one is so the player can't rotate into the walls or other tetrominos
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    const newPiece = nextPiece;
    setNextPiece(randomTetromino());
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: newPiece.shape,
      collided: false,
    });
    setCanHold(true);
  }, [nextPiece]);

  const holdCurrentPiece = () => {
    if (!canHold) return;

    const currentTetromino = player.tetromino;
    if (holdPiece === null) {
      setHoldPiece({ shape: currentTetromino, color: nextPiece.color });
      setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: nextPiece.shape,
        collided: false,
      });
      setNextPiece(randomTetromino());
    } else {
      setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: holdPiece.shape,
        collided: false,
      });
      setHoldPiece({ shape: currentTetromino, color: nextPiece.color });
    }
    setCanHold(false);
  };

  return {
    player,
    updatePlayerPos,
    resetPlayer,
    playerRotate,
    holdPiece,
    nextPiece,
    holdCurrentPiece,
  };
};