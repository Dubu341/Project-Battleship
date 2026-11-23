import Player from "./player.js";

test("2 players", () => {
  expect(new Player("player").board === new Player("computer").board).toBe(
    false,
  );
});


const player = new Player();
const playerBoard = player.board;

playerBoard.deployShip([1, "j"], 1);
playerBoard.deployShip([2, "a"], 1);
// playerBoard.deployShip([4, "a"], 1);

test("player first ship hit", () => {
  expect(playerBoard.recieveAttack([1, "j"])).toBe(true);
});
test("player second ship hit", () => {
  expect(playerBoard.recieveAttack([2, "a"])).toBe(true);
});

test("attack miss", () => {
  expect(playerBoard.recieveAttack([4, "k"])).toBe(false);
});

test("all ships sunk", () => {
  expect(playerBoard.hasAllShipsSunk()).toBe(true);
});

// test("Not all ships sunk", () => {
//   expect(playerBoard.hasAllShipsSunk()).toBe(false);
// });
