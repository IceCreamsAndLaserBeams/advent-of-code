import * as path from "path";
import { readFileLines } from "../../util/readFile.ts";

const originalPairStrings = readFileLines(path.join(__dirname, "input.txt"));
const leftList: number[] = [];
const rightList: number[] = [];

originalPairStrings.forEach((ops) => {
  const pair = ops.split("   ");
  leftList.push(parseInt(pair[0]));
  rightList.push(parseInt(pair[1]));
});

leftList.sort();
rightList.sort();

const listDifference = leftList.reduce((prev, leftLocId, index) => {
  return prev + Math.abs(leftLocId - rightList[index]);
}, 0);

console.log(listDifference);
