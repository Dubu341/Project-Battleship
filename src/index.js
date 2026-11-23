import Player from "./player.js";
import {} from "./DOM.js";
import {} from "./styles.css";
import { buildGrid } from "./DOM.js";
import { computerAttack, clearTargets } from "./computer-attack.js";

const playerGrid = document.querySelector(".playerBoard");
const computerGrid = document.querySelector(".computerBoard");
const boards = document.querySelector(".boards");
const resetBoard = document.querySelector(".reset");
const player = new Player("player");
const computer = new Player("computer");
const winText = document.createElement("p");

const playerBoard = player.board;
const computerBoard = computer.board;

playerBoard.randomBoard();
computerBoard.randomBoard();

resetBoard.addEventListener("click", () => {
  playerBoard.randomBoard();
  computerBoard.randomBoard();
  clearTargets();
  buildGrid(playerGrid, playerBoard, true);
  buildGrid(computerGrid, computerBoard, true);
  winText.textContent = "";
});

buildGrid(playerGrid, playerBoard, true);
buildGrid(computerGrid, computerBoard, true);

computerGrid.addEventListener("click", (event) => {
  const square = event.target;
  const coords = square.dataset.coords;

  if (playerBoard.hasAllShipsSunk() || computerBoard.hasAllShipsSunk()) return;

  if (computerBoard.receiveAttack(coords) === false) return;

  buildGrid(computerGrid, computerBoard, true);
  winCondition(player, computerBoard);
  computerAttack(); //!!!!
  winCondition(computer, playerBoard);
});

function winCondition(player, playerBoard) {
  if (playerBoard.hasAllShipsSunk()) {
    winText.textContent = `${player.player} won`;
    boards.appendChild(winText);
  }
}

export { playerBoard };
