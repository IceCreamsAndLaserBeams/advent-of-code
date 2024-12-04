import { readFileLines } from "../../util/readFile.ts";
import path from "path";

const wordsearchRows = readFileLines(path.join(__dirname, "input.txt"));
const wordsearchRowsWithSplit = wordsearchRows.map((r) => r.split(""));

const matches = wordsearchRowsWithSplit.reduce(
  (count, row, i, grid) =>
    count +
    row.reduce(
      (innerCount, cell, j) =>
        cell === "A" && grid[i - 1] && grid[i + 1]
          ? innerCount +
            ((grid[i - 1][j - 1] + grid[i - 1][j + 1] === "MS" &&
              grid[i + 1][j - 1] + grid[i + 1][j + 1] === "MS") ||
            (grid[i - 1][j - 1] + grid[i - 1][j + 1] === "SM" &&
              grid[i + 1][j - 1] + grid[i + 1][j + 1] === "SM") ||
            (grid[i - 1][j - 1] + grid[i - 1][j + 1] === "SS" &&
              grid[i + 1][j - 1] + grid[i + 1][j + 1] === "MM") ||
            (grid[i - 1][j - 1] + grid[i - 1][j + 1] === "MM" &&
              grid[i + 1][j - 1] + grid[i + 1][j + 1] === "SS")
              ? 1
              : 0)
          : innerCount,
      0,
    ),
  0,
);

console.log(matches);
