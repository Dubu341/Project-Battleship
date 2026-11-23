import Player from "./player.js";
import {} from "./DOM.js";
import {} from "./styles.css";
import { buildGrid } from "./DOM.js";
import { gridSize } from "./gameboard.js";
const playerGrid = document.querySelector(".playerBoard");
const computerGrid = document.querySelector(".computerBoard");
const resetBoard = document.querySelector(".reset");
const player = new Player("player");
const computer = new Player("computer");

const playerBoard = player.board;
const computerBoard = computer.board;

playerBoard.randomBoard();
computerBoard.randomBoard();

resetBoard.addEventListener("click", () => {
  playerBoard.randomBoard();
  computerBoard.randomBoard();
  buildGrid(playerGrid, playerBoard, true);
  buildGrid(computerGrid, computerBoard, true);
});

buildGrid(playerGrid, playerBoard, true);
buildGrid(computerGrid, computerBoard, true);

computerGrid.addEventListener("click", (event) => {
  const square = event.target;
  const coords = square.dataset.coords;

  if (computerBoard.receiveAttack(coords) === false) return;
  buildGrid(computerGrid, computerBoard, true);
  winCondition(player, computerBoard);
  computerAttack(); //!!!!
  winCondition(computer, playerBoard);
});

function computerAttack() {
  let coords;
  let key;

  do {
    coords = [
      Math.floor(Math.random() * gridSize),
      Math.floor(Math.random() * gridSize),
    ];
    key = playerBoard.coordsHelper(coords);
  } while (playerBoard.shotHit.has(key) || playerBoard.missedShots.has(key));

  playerBoard.receiveAttack(key);
  buildGrid(playerGrid, playerBoard, true);
}

function winCondition(player, playerBoard) {
  if (playerBoard.hasAllShipsSunk()) {
    console.log(`${player.player} won`);
  }
}
