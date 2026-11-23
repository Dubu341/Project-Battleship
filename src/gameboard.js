import Ship from "./ship.js";

class Gameboard {
  constructor() {
    this.coords = new Map();
    this.missedShots = new Set();
  }

  coordsHelper(cordinates) {
    return cordinates.join(",");
  }

  deployShip(cordinates, length) {
    const ship = new Ship(length);
    this.coords.set(this.coordsHelper(cordinates), ship);
  }

  recieveAttack(cordinates) {
    const key = this.coordsHelper(cordinates);
    const ship = this.coords.get(key);
    if (ship) {
      ship.hit();
      ship.isSunk();
      return true;
    } else {
      this.missedShots.add(key);
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
}

export default Gameboard;
