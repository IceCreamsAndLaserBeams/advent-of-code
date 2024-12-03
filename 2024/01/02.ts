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

const similarityScore = leftList.reduce((prev, leftLocId) => {
  return prev + leftLocId * rightList.filter((rl) => rl === leftLocId).length;
}, 0);

console.log(similarityScore);
