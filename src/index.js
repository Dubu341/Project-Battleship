import Player from "./player.js";
import {} from "./DOM.js";
import {} from "./styles.css";
import { buildGrid } from "./DOM.js";
import { computerAttack, clearTargets } from "./computer-attack.js";

const playerGrid = document.querySelector(".playerBoard");
const computerGrid = document.querySelector(".computerBoard");
const boards = document.querySelector(".boards");
const randomBoard = document.querySelector(".random");
const resetBoard = document.querySelector(".reset");

const player = new Player("Player");
const computer = new Player("Computer");
const winText = document.createElement("p");

const playerBoard = player.board;
const computerBoard = computer.board;

playerBoard.randomBoard();
computerBoard.randomBoard();

randomBoard.addEventListener("click", () => {
  computerGrid.classList.remove("game-over");
  playerBoard.randomBoard();
  computerBoard.randomBoard();
  clearTargets();
  buildGrid(playerGrid, playerBoard, true);
  buildGrid(computerGrid, computerBoard, false);
  winText.textContent = "";
});

resetBoard.addEventListener("click", () => {
  computerGrid.classList.remove("game-over");
  playerBoard.reset();
  computerBoard.randomBoard();
  clearTargets();
  buildGrid(playerGrid, playerBoard, true);
  buildGrid(computerGrid, computerBoard, false);
  winText.textContent = "";
});

buildGrid(playerGrid, playerBoard, true);
buildGrid(computerGrid, computerBoard, false);

computerGrid.addEventListener("click", (event) => {
  const square = event.target;
  const coords = square.dataset.coords;

  if (playerBoard.hasAllShipsSunk() || computerBoard.hasAllShipsSunk()) return;

  if (computerBoard.receiveAttack(coords) === false) return;

  buildGrid(computerGrid, computerBoard, false);
  winCondition(player, computerBoard);
  computerAttack(); //!!!!
  winCondition(computer, playerBoard);
});

function winCondition(player, playerBoard) {
  if (playerBoard.hasAllShipsSunk()) {
    winText.textContent = `${player.player} Won!`;
    winText.classList.add("win");
    boards.appendChild(winText);
    buildGrid(computerGrid, computerBoard, true);
    computerGrid.classList.add("game-over");
  }
}

boards.appendChild(winText);
export { playerBoard };
