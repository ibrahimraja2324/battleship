import { Gameboard } from "./Gameboard";
export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard(name);
  }
}
