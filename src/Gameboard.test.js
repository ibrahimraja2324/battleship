import { Gameboard } from "./Gameboard.js";

beforeEach(() => {
  document.body.innerHTML = '<div id="board"></div>';
});

test("creates a 10 by 10 board and stores in an array", () => {
  const gameBoard = new Gameboard();
  expect(gameBoard.createBoard(10, 10).length).toBe(10);
  gameBoard.createBoard(10, 10).forEach((row) => {
    expect(row.length).toBe(10);
  });
});

test("checks that all cells within the board are null.", () => {
  const gameBoard = new Gameboard();
  gameBoard.createBoard(10, 10).forEach((row) => {
    row.forEach((cell) => {
      expect(cell).toBe(null);
    });
  });
});

test("creates a 10 by 9 board and stores in an array", () => {
  const gameBoard = new Gameboard();
  expect(gameBoard.createBoard(10, 9).length).toBe(10);
  gameBoard.createBoard(10, 9).forEach((row) => {
    expect(row.length).toBe(9);
  });
});

test("checks that all cells within the board are null.", () => {
  const gameBoard = new Gameboard();
  gameBoard.createBoard(10, 9).forEach((row) => {
    row.forEach((cell) => {
      expect(cell).toBe(null);
    });
  });
});

test("checks that acceptable positions are intialized to 10 by 10", () => {
  const gameBoard = new Gameboard();
  gameBoard.initializeAcceptablePos(10, 10);
  let tempAcceptablePos = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      tempAcceptablePos.push([i, j]);
    }
  }
  expect(gameBoard.acceptablePos).toEqual(tempAcceptablePos);
});

test("creates 10x10 elements in the html", () => {
  const gameBoard = new Gameboard();
  gameBoard.displayBoard();

  const boardElem = document.getElementById("board");
  const rows = boardElem.querySelectorAll(".row");

  expect(rows.length).toBe(gameBoard.board.length);

  rows.forEach((row, rowIndex) => {
    const cell = row.querySelectorAll(".cell");
    expect(cell.length).toBe(gameBoard.board[rowIndex].length);
  });
});

test("diplays button with coordinate value inide.", () => {
  const gameBoard = new Gameboard();
  gameBoard.displayShipDimensionButtons();

  const newDiv = document.getElementById("button-container");

  const buttons = document.querySelectorAll("#button-container button");
  expect(buttons.length).toBe(gameBoard.shipDimensions.length);
  buttons.forEach((button, index) => {
    //create a button with coordinate of dimension.
    expect(button.dataset.coordinates).toBe(
      JSON.stringify(gameBoard.shipDimensions[index]),
    );
    expect(button.textContent).toBe(
      "button " + JSON.stringify(gameBoard.shipDimensions[index]),
    );
  });
});

test("updates acceptablePos board to only have poitions of the shipDimesnions", () => {
  const gameBoard = new Gameboard();
  gameBoard.updateAcceptablePos([0, 0]);

  const [width, height] = gameBoard.selectedShipDimensions;
  let tempAcceptablePos = [];

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      tempAcceptablePos.push([i, j]);
    }
  }

  tempAcceptablePos = tempAcceptablePos.filter(
    (pos) => !(pos[0] === 0 && pos[1] === 0),
  );

  expect(gameBoard.acceptablePos).toEqual(tempAcceptablePos);
  expect(gameBoard.acceptablePos.length).toBe(tempAcceptablePos.length);
});

test("updates acceptablePos board only if shipDimenions don't lead to out of board vals", () => {
  const gameBoard = new Gameboard();
  gameBoard.updateAcceptablePos([9, 9]);

  const [width, height] = gameBoard.selectedShipDimensions;
  let tempAcceptablePos = [];

  if (width + 9 > 10 || height + 9 > 10) {
    console.log("not posible");
  } else if (width + 9 <= 10 || height + 9 <= 10) {
    for (let i = 9; i < width + 9; i++) {
      for (let j = 9; j < height + 9; j++) {
        tempAcceptablePos.push([i, j]);
      }
    }

    tempAcceptablePos = tempAcceptablePos.filter(
      (pos) => !(pos[0] === 9 && pos[1] === 9),
    );
    expect(gameBoard.acceptablePos).toEqual(tempAcceptablePos);
    expect(gameBoard.acceptablePos.length).toBe(tempAcceptablePos.length);
  }
});

test("", () => {
  const gameBoard = new Gameboard();
  gameBoard.receiveAttack([0, 0]);
});
