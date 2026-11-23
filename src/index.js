import Player from "./player.js";
import {} from "./DOM.js";
import {} from "./styles.css";
import { buildGrid } from "./DOM.js";

const playerGrid = document.querySelector(".playerBoard");
const computerGrid = document.querySelector(".computerBoard");

const player = new Player("player");
const computer = new Player("computer");

const playerBoard = player.board;
const computerBoard = computer.board;

playerBoard.deployShip([1, 2], 3);
playerBoard.deployShip([2, 4], 2);
computerBoard.deployShip([4, 7], 2);

playerBoard.deployShip([1, 1], 2); //returns false and no ship is deployed
playerBoard.receiveAttack([4, 8]);
playerBoard.receiveAttack([2, 5]);

buildGrid(playerGrid, playerBoard, true);
buildGrid(computerGrid, computerBoard, false);
