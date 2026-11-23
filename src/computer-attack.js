import { playerBoard } from "./index.js";
import { gridSize, guardRails } from "./gameboard.js";
import { buildGrid } from "./DOM.js";

const playerGrid = document.querySelector(".playerBoard");

const directions = [
  [0, -1], // left
  [0, 1], // right
];
const targets = [];

function isAttacked(key) {
  return playerBoard.shotHit.has(key) || playerBoard.missedShots.has(key);
}

function clearTargets() {
  targets.length = 0;
}

function computerAttack() {
  let coords = null;

  while (targets.length > 0 && coords === null) {
    const candidate = targets.pop();
    if (!isAttacked(playerBoard.coordsHelper(candidate))) {
      coords = candidate;
    }
  }

  if (coords === null) {
    do {
      coords = [
        Math.floor(Math.random() * gridSize),
        Math.floor(Math.random() * gridSize),
      ];
    } while (isAttacked(playerBoard.coordsHelper(coords)));
  }

  const wasHit = playerBoard.receiveAttack(playerBoard.coordsHelper(coords));

  if (wasHit) {
    for (const direction of directions) {
      const candidate = [coords[0] + direction[0], coords[1] + direction[1]];

      if (!guardRails(candidate)) continue;
      if (isAttacked(playerBoard.coordsHelper(candidate))) continue;

      targets.push(candidate);
    }
  }

  buildGrid(playerGrid, playerBoard, true);
}

export { computerAttack, clearTargets };
