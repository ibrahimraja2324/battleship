import "./styles/main.css";
import { Player } from "./Player.js";

const player1 = new Player("Human");
const playerC = new Player("Computer");

let currentArray = [];
let currentButton = [];
let isPlayerTurn = true;

function initialiseGame() {
  player1.gameboard.displayBoard();
  player1.gameboard.displayShipDimensionButtons();
  playerC.gameboard.displayBoard();
  playerC.gameboard.randomiseShipPlacement();
  playerC.gameboard.shipClassInstance.display();

  document.querySelectorAll("#Human .cell").forEach((cell) => {
    cell.addEventListener("click", (event) => {
      mapToArray(event.target.id);
      player1.gameboard.updateAcceptablePos(currentArray);
    });
  });

  document.querySelectorAll("#Computer .cell").forEach((cell) => {
    cell.addEventListener("click", (event) => {
      if (isPlayerTurn) {
        handlePlayerMove(event);
      } else if (!isPlayerTurn) {
        handleComputerMove();
      }
    });
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) =>
      returnDC(event.target.getAttribute("data-coordinates")),
    );
  });
}

function handlePlayerMove(event) {
  const attackResult = playerC.gameboard.receiveAttack(
    mapToArray(event.target.id),
  );
  if (attackResult === true) {
    console.log("Hit!");
    event.target.style.backgroundColor = "red";
  } else {
    event.target.style.backgroundColor = "yellow";
  }

  if (playerC.gameboard.areAllShipsSunk()) {
    alert("Human wins!");
    return;
  }

  isPlayerTurn = false;
  handleComputerMove();
}

function handleComputerMove() {
  const randomCellId = playerC.gameboard.getRandomCellId();
  const attackResult = player1.gameboard.receiveAttack(randomCellId);
  const cellElement = document.getElementById(randomCellId);

  if (attackResult === true) {
    console.log("Computer hits!");
    cellElement.style.backgroundColor = "red";
  } else {
    cellElement.style.backgroundColor = "yellow";
  }

  if (player1.gameboard.areAllShipsSunk()) {
    alert("Computer wins!");
    return;
  }

  isPlayerTurn = true;
}

function showShips() {
  const shipsPos = player1.gameboard.shipClassInstance.shipsPos;
  document.querySelectorAll("#Human .cell").forEach((cell) => {
    const cellParts = changeToArray(cell.id);
    shipsPos.forEach((shipPositions) => {
      if (Array.isArray(shipPositions)) {
        shipPositions.forEach((shipPosition) => {
          const shipParts = shipPosition.toString().split(",").map(Number);
          if (compareArrays(shipParts, cellParts)) {
            cell.style.backgroundColor = "green";
          }
        });
      }
    });
  });
}

function compareArrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

function changeToArray(id) {
  const parts = id.split(",");
  return parts.map(Number);
}

function mapToArray(id) {
  const parts = id.split(",");
  currentArray = parts.map(Number);
  return currentArray;
}

function returnDC(dc) {
  return console.log((currentButton = dc));
}

initialiseGame();

document.getElementById("Human").addEventListener("click", () => {
  console.log(player1.gameboard.shipClassInstance.display());
  showShips();
});
