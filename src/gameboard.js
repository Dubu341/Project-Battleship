import Ship from "./ship.js";

const gridSize = 10;

function guardRails(position) {
  return (
    position[0] >= 0 &&
    position[0] < gridSize &&
    position[1] >= 0 &&
    position[1] < gridSize
  );
}

class Gameboard {
  constructor() {
    this.coords = new Map();
    this.missedShots = new Set();
    this.shotHit = new Set();
  }

  coordsHelper(coordinates) {
    return coordinates.join(",");
  }

  deployShip(coordinates, length) {
    const squares = [];

    for (let i = 0; i < length; i++) {
      squares.push([coordinates[0], coordinates[1] + i]);
    }

    for (const square of squares) {
      if (this.coords.has(this.coordsHelper(square)) || !guardRails(square))
        return false; //space is taken/ false instead of throwing an error to use the value for later *hopefully*
    }

    const ship = new Ship(length);
    for (const square of squares) {
      this.coords.set(this.coordsHelper(square), ship);
    }
    return true;
  }

  receiveAttack(coordinates) {
    //reminder to block repeated attacks on the same square
    const ship = this.coords.get(coordinates);
    if (ship) {
      ship.hit();
      ship.isSunk();
      this.shotHit.add(coordinates);
      return true;
    } else {
      this.missedShots.add(coordinates);
      return false;
    }
  }

  hasAllShipsSunk() {
    const ships = this.coords.values();
    for (const ship of ships) {
      if (ship.sunk === false) return false;
    }
    return true;
  }

  randomBoard() {
    const shipSizes = [4, 4, 3, 3, 2, 2, 1, 1];
    shipSizes.forEach((size) => {
      let placed = false;
      while (!placed) {
        const coordinates = [
          Math.floor(Math.random() * gridSize),
          Math.floor(Math.random() * gridSize),
        ];
        placed = this.deployShip(coordinates, size);
      }
    });
  }
}

export { Gameboard, gridSize };
