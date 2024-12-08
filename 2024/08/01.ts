import { readFileLines } from "../../util/readFile.ts";
import path from "path";

type Node = [number, number];
type Antenna = {
  [key: string]: [Node?];
};
type AntiNodes = {
  [key: string]: boolean;
};

const matrix = readFileLines(path.join(__dirname, "input.txt")).map((r) =>
  r.split(""),
);

const antennas: Antenna = {},
  antiNodes: AntiNodes = {};

const withinMatrix = ([x, y]: Node) => matrix[x] && matrix[x][y];

const registerAntiNode = (
  node: Node,
  nextNodeDistance: number[],
  level: number,
) => {
  if (!withinMatrix(node)) return;

  let [x, y] = node,
    [dx, dy] = nextNodeDistance;
  if (level === 1) antiNodes[`${x},${y}`] = true;
  registerAntiNode([x + dx, y + dy], [dx, dy], ++level);
};

const registerAntiNodes = (current: Node, next: Node) => {
  let [cx, cy] = current,
    [nx, ny] = next;
  const [dx, dy] = [nx - cx, ny - cy];

  registerAntiNode([cx, cy], [-dx, -dy], 0);
  registerAntiNode([nx, ny], [dx, dy], 0);
};

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] !== ".") (antennas[matrix[i][j]] ??= []).push([i, j]);
  }
}

Object.keys(antennas)
  .filter((key) => antennas[key]?.length > 1)
  .forEach((key) => {
    for (let i = 0; i < antennas[key].length - 1; i++) {
      for (let j = i + 1; j < antennas[key].length; j++) {
        registerAntiNodes(antennas[key][i]!, antennas[key][j]!);
      }
    }
  });

console.log(Object.keys(antiNodes).length);
