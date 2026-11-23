import {Gameboard} from "./gameboard.js";

class Player {
  constructor(name) {
    this.player = name;
    this.board = new Gameboard();
  }
}

export default Player;
