import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";
test("add's ship arrays into shipPos Array", () => {
  const ship = new Ship();
  ship.setPosition([
    [0, 0],
    [1, 0],
  ]);
  ship.setPosition([[0, 3]]);
  ship.setPosition([
    [2, 0],
    [3, 0],
    [4, 0],
  ]);
  expect(ship.shipsPos).toEqual([
    [
      [0, 0],
      [1, 0],
    ],
    [[0, 3]],
    [
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  ]);
});

test("hit should remove a coordinate from the ship", () => {
  const ship = new Ship();
  ship.shipsPos = [
    [
      [0, 0],
      [1, 0],
    ],
    [[0, 3]],
    [
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  ];
  ship.hit(0, 0);
  expect(ship.shipsPos).toEqual([
    [[1, 0]],
    [[0, 3]],
    [
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  ]);

  ship.hit(0, 3);
  expect(ship.shipsPos).toEqual([
    [[1, 0]],
    [
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  ]);
});

test("removeCoordinate should remove empty ships from the array", () => {
  const ship = new Ship();
  ship.shipsPos = [
    [
      [0, 0],
      [1, 0],
    ],
    [[0, 3]],
    [
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  ];
  ship.hit(0, 0);
  ship.hit(1, 0);
  expect(ship.shipsPos).toEqual([
    [[0, 3]],
    [
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  ]);

  ship.hit(0, 3);
  expect(ship.shipsPos).toEqual([
    [
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  ]);
});

test("isSunk should return false if any part of the ship is still present", () => {
  const ship = new Ship();
  ship.shipsPos = [
    [
      [0, 0],
      [1, 0],
    ],
    [[0, 3]],
    [
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  ];
  ship.hit(0, 0);
  expect(ship.isSunk(2, 1)).toBe(false);
  expect(ship.isSunk(1, 1)).toBe(false);
  expect(ship.isSunk(3, 1)).toBe(false);
});

test("isSunk should return true if the entire ship is removed", () => {
  const ship = new Ship();
  ship.shipsPos = [
    [
      [0, 0],
      [1, 0],
    ],
    [[0, 3]],
    [
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  ];
  ship.hit(0, 0);
  ship.hit(1, 0);
  expect(ship.isSunk(2, 1)).toBe(true);
  expect(ship.isSunk(1, 1)).toBe(false);
  expect(ship.isSunk(3, 1)).toBe(false);
});
