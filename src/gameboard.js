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

  isAdjacentShip(square) {
    for (let deltaRow = -1; deltaRow <= 1; deltaRow++) {
      for (let deltaCol = -1; deltaCol <= 1; deltaCol++) {
        const neighbor = [square[0] + deltaRow, square[1] + deltaCol];
        if (this.coords.has(this.coordsHelper(neighbor))) return true;
      }
    }
    return false;
  }
  deployShip(coordinates, length) {
    const squares = [];

    for (let i = 0; i < length; i++) {
      squares.push([coordinates[0], coordinates[1] + i]);
    }

    for (const square of squares) {
      if (this.isAdjacentShip(square) || !guardRails(square)) return false;
    }
    const ship = new Ship(length);
    for (const square of squares) {
      this.coords.set(this.coordsHelper(square), ship);
    }
    return true;
  }

  receiveAttack(coordinates) {
    if (
      coordinates === undefined ||
      this.shotHit.has(coordinates) ||
      this.missedShots.has(coordinates) ||
      this.hasAllShipsSunk()
    )
      return false;

    const ship = this.coords.get(coordinates);
    if (ship) {
      ship.hit();
      ship.isSunk();
      this.shotHit.add(coordinates);
      return true;
    } else {
      this.missedShots.add(coordinates);
    }
  }

  hasAllShipsSunk() {
    const ships = this.coords.values();
    for (const ship of ships) {
      if (ship.sunk === false) return false;
    }
    return true;
  }

  reset() {
    this.coords = new Map();
    this.missedShots = new Set();
    this.shotHit = new Set();
  }
  randomBoard() {
    const shipSizes = [4, 4, 3, 3, 2, 2, 1, 1];
    const maxAttempts = 1000;
    let allPlaced = false;
    while (!allPlaced) {
      this.reset();
      allPlaced = true;
      for (const size of shipSizes) {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < maxAttempts) {
          const coordinates = [
            Math.floor(Math.random() * gridSize),
            Math.floor(Math.random() * gridSize),
          ];
          placed = this.deployShip(coordinates, size);
          attempts++;
        }
        if (!placed) {
          allPlaced = false;
          break;
        }
      }
    }
  }
}

export { Gameboard, gridSize, guardRails };
