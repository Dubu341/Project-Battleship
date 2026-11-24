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
const controls = document.querySelector(".controls");
const winText = document.createElement("p");
winText.classList.add("win");
controls.after(winText);

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

  if (!coords) return;

  if (playerBoard.hasAllShipsSunk() || computerBoard.hasAllShipsSunk()) return;

  if (computerBoard.receiveAttack(coords) === false) return;

  buildGrid(computerGrid, computerBoard, false);
  if (winCondition(player, computerBoard)) return;

  computerAttack(); //!!!!
  winCondition(computer, playerBoard);
});

function winCondition(winner, loserBoard) {
  if (loserBoard.hasAllShipsSunk()) {
    winText.textContent = `${winner.player} Won!`;
    winText.classList.add("win");
    buildGrid(computerGrid, computerBoard, true);
    computerGrid.classList.add("game-over");
    return true;
  }
  return false;
}

export { playerBoard };
