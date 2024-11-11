export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export type TETROMINO = number[][];
export type STAGE = [number, string][][];

export const createStage = (): STAGE =>
  Array.from(Array(STAGE_HEIGHT), () =>
    Array.from(Array(STAGE_WIDTH), () => [0, 'clear'] as [number, string])
  );

export const checkCollision = (
  player: { pos: { x: number; y: number }; tetromino: TETROMINO },
  stage: STAGE,
  { x: moveX, y: moveY }: { x: number; y: number }
): boolean => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        if (
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};