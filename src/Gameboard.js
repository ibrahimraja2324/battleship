import { Ship } from "./Ship.js";
export class Gameboard {
  constructor(name) {
    //create a 10x10 array.
    //check if inputed value was a hit or miss by acccessing Ship
    //class.
    //find out the total number of ships without knowing where
    //they are byyy accessing ships.
    //place ships at specific coords by calling Ship limited to
    //
    this.name = name;
    this.board = this.createBoard(10, 10);
    //setting up ships on the board
    this.acceptablePos = [];
    this.shipDimensions = [
      [2, 1],
      [1, 1],
      [3, 1],
      [1, 3],
      [1, 2],
    ];
    this.currentShipIndex = 0;
    this.selectedShipDimensions = this.shipDimensions[this.currentShipIndex];
    this.coordinatesPlaced = [];
    this.occupiedPositions = [];
    this.initializeAcceptablePos(10, 10);
    this.shipClassInstance = new Ship();
    //
  }

  initializeAcceptablePos(a, b) {
    this.acceptablePos = [];
    for (let i = 0; i < a; i++) {
      for (let j = 0; j < b; j++) {
        if (
          !this.occupiedPositions.some((pos) => pos[0] === i && pos[1] === j)
        ) {
          this.acceptablePos.push([i, j]);
        }
      }
    }
  }

  displayShipDimensionButtons() {
    const board = document.getElementById("board");
    const newDiv = document.createElement("div");
    newDiv.id = "button-container";
    board.appendChild(newDiv);
    this.shipDimensions.forEach((val, index) => {
      const button = document.createElement("button");
      button.dataset.coordinates = JSON.stringify(val);
      button.textContent = "button " + JSON.stringify(val);
      button.id = index;
      if (index === 0) {
        button.style.backgroundColor = "red";
      }

      newDiv.appendChild(button);
    });
  }

  updateShipDimensionButtons() {
    const buttons = document.querySelectorAll("#button-container button");
    buttons.forEach((button, index) => {
      if (index === this.currentShipIndex) {
        button.style.backgroundColor = "red";
      } else {
        button.style.backgroundColor = "";
      }
    });
  }

  updateAcceptablePos(coordinate) {
    const [widthCoord, heightCoord] = coordinate;
    let width, height;
    if (this.selectedShipDimensions) {
      [width, height] = this.selectedShipDimensions;
    }
    if (width + widthCoord > 10 || height + heightCoord > 10) {
      return;
    }

    if (this.coordinatesPlaced.length === 0) {
      this.acceptablePos = [];
      for (let i = widthCoord; i < width + widthCoord; i++) {
        for (let j = heightCoord; j < height + heightCoord; j++) {
          this.acceptablePos.push([i, j]);
        }
      }
      this.coordinatesPlaced.push([widthCoord, heightCoord]);
    } else {
      const isValid = this.acceptablePos.some(
        (pos) => pos[0] === widthCoord && pos[1] === heightCoord,
      );
      if (isValid) {
        this.coordinatesPlaced.push([widthCoord, heightCoord]);
      } else {
        return;
      }
    }
    this.acceptablePos = this.acceptablePos.filter(
      (pos) => !(pos[0] === widthCoord && pos[1] === heightCoord),
    );

    if (this.coordinatesPlaced.length === width * height) {
      this.occupiedPositions.push(...this.coordinatesPlaced);
      let tempArray = [];
      tempArray.push(...this.coordinatesPlaced);

      this.currentShipIndex++;
      if (this.currentShipIndex <= this.shipDimensions.length) {
        this.updateShipDimensionButtons();
        this.selectedShipDimensions =
          this.shipDimensions[this.currentShipIndex];

        this.shipClassInstance.setPosition(tempArray);
        this.coordinatesPlaced = [];
        this.initializeAcceptablePos(10, 10);
      } else {
        console.log("hello");
        console.log(this.currentShipIndex);
        this.selectedShipDimensions = null;
        this.acceptablePos = [];
        //game starts initialise opponent gameboard.
      }
    }
  }

  createBoard(a, b) {
    let array = [];
    for (let i = 0; i < a; i++) {
      let row = [];
      for (let j = 0; j < b; j++) {
        row.push(null);
      }
      array.push(row);
    }
    return array;
  }

  randomiseShipPlacement() {
    for (let ship of this.shipDimensions) {
      let placed = false;

      while (!placed) {
        const isVertical = Math.random() < 0.5;
        const startX = Math.floor(
          Math.random() * (10 - (isVertical ? ship[0] : ship[1])),
        );
        const startY = Math.floor(
          Math.random() * (10 - (isVertical ? ship[1] : ship[0])),
        );

        const coordinates = [];

        let validPlacement = true;
        for (let i = 0; i < ship[0]; i++) {
          for (let j = 0; j < ship[1]; j++) {
            const x = startX + (isVertical ? i : j);
            const y = startY + (isVertical ? j : i);

            if (
              this.occupiedPositions.some((pos) => pos[0] === x && pos[1] === y)
            ) {
              validPlacement = false;
              break;
            }

            coordinates.push([x, y]);
          }
          if (!validPlacement) break;
        }

        if (validPlacement) {
          this.occupiedPositions.push(...coordinates);
          this.shipClassInstance.setPosition(coordinates);
          placed = true;
        }
      }
    }
  }

  getRandomCellId() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }

  displayBoard() {
    const boardElem = document.getElementById("board");
    const gameboards = document.createElement("div");
    gameboards.className = "gameboards";
    gameboards.id = this.name;

    this.board.forEach((row, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";
      row.forEach((cell, cellIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.id = `${rowIndex},${cellIndex}`;
        rowDiv.appendChild(cellDiv);
      });
      gameboards.appendChild(rowDiv);
    });
    boardElem.appendChild(gameboards);
  }

  receiveAttack(coord) {
    let [x, y] = coord;
    if (this.shipClassInstance.hit(x, y) === true) {
      return true;
    } else {
      return false;
    }
  }

  areAllShipsSunk() {
    for (let i = 0; i < this.shipDimensions.length; i++) {
      if (!isSunk(this.shipDimensions[i])) {
        return false;
      }
    }
    return true;
  }
}
