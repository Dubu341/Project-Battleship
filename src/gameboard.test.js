import {Gameboard} from "./gameboard.js";

const playerBoard = new Gameboard();

playerBoard.deployShip([1, 2], 3);
playerBoard.deployShip([2, 4], 2);
// playerBoard.deployShip([4, "a"], 1);

// test("deploy first ship",()=>{
//     expect(playerBoard.deployShip([1, 2], 2)).toBe()
// })

test("player first ship hit", () => {
  expect(playerBoard.receiveAttack([1, 2])).toBe(true);
});
test("duplicate square", () => {
  expect(playerBoard.deployShip([1, 1], 2)).toBe(false);
});
test("player first ship hit", () => {
  expect(playerBoard.receiveAttack([1, 3])).toBe(true);
});
test("player first ship hit", () => {
  expect(playerBoard.receiveAttack([1, 4])).toBe(true);
});
test("player second ship hit", () => {
  expect(playerBoard.receiveAttack([2, 4])).toBe(true);
});

test("player second ship hit", () => {
  expect(playerBoard.receiveAttack([2, 5])).toBe(true);
});

test("attack miss", () => {
  expect(playerBoard.receiveAttack([4, "k"])).toBe(false);
});

test("all ships sunk", () => {
  expect(playerBoard.hasAllShipsSunk()).toBe(true);
});

// test("Not all ships sunk", () => {
//   expect(playerBoard.hasAllShipsSunk()).toBe(false);
// });
