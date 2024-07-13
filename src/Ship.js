export class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.shipsPos = [];
    this.shipDimensions = [
      [2, 1],
      [1, 1],
      [3, 1],
      [1, 3],
      [1, 2],
    ];
    this.sunkShips = [];
  }
  setPosition(array) {
    console.log("Setting position for ship:", array);
    this.shipsPos.push(array);
  }
  hit(x, y) {
    for (let i = 0; i < this.shipsPos.length; i++) {
      const subArray = this.shipsPos[i];
      const index = subArray.findIndex(
        (coord) => coord[0] === x && coord[1] === y,
      );
      if (index !== -1) {
        subArray.splice(index, 1);

        if (subArray.length === 0) {
          const shipDimension = this.shipDimensions[i];
          this.sunkShips.push(shipDimension);
          this.shipsPos.splice(i, 1);
        }

        return true;
      }
    }
    return false;
  }
  isSunk(x, y) {
    for (let i = 0; i < this.sunkShips.length; i++) {
      const [sx, sy] = this.sunkShips[i];
      console.log(sx, sy);
      if (sx === x && sy === y) {
        return true;
      }
    }
    return false;
  }
  display() {
    console.log(this.shipsPos);
  }
}
