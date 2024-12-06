import { readFileLines } from "../../util/readFile.ts";
import path from "path";

type Coords = {
  x: number;
  y: number;
};

const startingMapRows = readFileLines(path.join(__dirname, "input.txt"));
const startingMap = startingMapRows.map((row) => row.split(""));

const startingPosition: Coords = startingMap.reduce(
  (prev, rows, i) => {
    let markerX = rows.indexOf("^");
    if (markerX >= 0) {
      return { x: markerX, y: i };
    }
    return prev;
  },
  { x: -1, y: -1 },
);

let startingDirection: Coords = {
  x: 0,
  y: 1,
};

console.log("-----FINAL MAP ------\n");
const finalMap = traverse(startingPosition, startingDirection, startingMap);
console.log(finalMap);
console.log("count", finalMap.matchAll(/X/g).toArray().length + 1);

function traverse(position: Coords, direction: Coords, map: string[][]) {
  let mapCopy = [...map];
  if (
    position.x === 0 ||
    position.x === map[0].length - 1 ||
    position.y === 0 ||
    position.y === map.length - 1
  ) {
    //REACHED THE END
    return mapCopy.map((r) => r.join("")).join("\n");
  } else if (
    mapCopy[position.y - direction.y] &&
    mapCopy[position.y - direction.y][position.x + direction.x] &&
    mapCopy[position.y - direction.y][position.x + direction.x] === "#"
  ) {
    //REACHED OBSTACLE
    let newDirection = rotateDirection(direction);
    return traverse(position, newDirection, mapCopy);
  } else {
    //MOVE IN STRAIGHT LINE

    //Replace current position with X
    mapCopy[position.y].splice(position.x, 1, "X");

    //Move in correct direction
    mapCopy[position.y - direction.y].splice(position.x + direction.x, 1, "^");

    let newPosition = {
      x: position.x + direction.x,
      y: position.y - direction.y,
    };

    return traverse(newPosition, direction, mapCopy);
  }
}

function rotateDirection(currentDirection: Coords): Coords {
  if (currentDirection.x === 0 && currentDirection.y === 1) {
    return { x: 1, y: 0 };
  } else if (currentDirection.x === 1 && currentDirection.y === 0) {
    return { x: 0, y: -1 };
  } else if (currentDirection.x === 0 && currentDirection.y === -1) {
    return { x: -1, y: 0 };
  } else if (currentDirection.x === -1 && currentDirection.y === 0) {
    return { x: 0, y: 1 };
  }

  return currentDirection;
}
