import { gridSize } from "./gameboard.js";

function buildGrid(container, board, revealShips) {
  for (let i = 0; i < gridSize; i++) {
    //row
    for (let j = 0; j < gridSize; j++) {
      //columns
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.coords = `${i},${j}`;

      if (board.coords.has(square.dataset.coords) && revealShips) {
        square.classList.add("ship");
      }

      if (board.missedShots.has(square.dataset.coords)) {
        square.classList.add("miss");
      }

      if (board.shotHit.has(square.dataset.coords)) {
        square.classList.add("hit");
      }
      container.append(square);
    }
  }
}

export { buildGrid };

console.log("hello");
