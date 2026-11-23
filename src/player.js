import Gameboard from "./gameboard";

class Player {
  constructor(name) {
    this.player = name;
    this.board = new Gameboard();
  }
}

export default Player;
