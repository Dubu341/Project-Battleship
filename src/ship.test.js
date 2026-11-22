import Ship from "./ship.js";

const ship = new Ship(4);
const ship2 = new Ship(2);

test("ship length", () => {
  expect(ship.length).toBe(4);
});
test("ship is sunk", () => {
  expect((ship.sunk = true)).toBe(true);
});
test("ship2 length", () => {
  expect(ship2.length).toBe(2);
});
test("ship2 is sunk", () => {
  expect(ship2.sunk).toBe(false);
});

ship.hit();
ship.hit();
ship.hit();
ship.hit();
test("How man times ship is hit", () => {
  expect(ship.timesHit).toBe(4);
});

test("ship is sunk", () => {
  expect(ship.sunk).toBe(true);
});

test("ship2 is sunk", () => {
  expect(ship2.sunk).toBe(false);
});
