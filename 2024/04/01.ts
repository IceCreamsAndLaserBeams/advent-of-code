import { readFileLines } from "../../util/readFile.ts";
import path from "path";

const wordsearchRows = readFileLines(path.join(__dirname, "input.txt"));
const wordsearchRowsWithSplit = wordsearchRows.map((r) => r.split(""));

const matches = wordsearchRowsWithSplit
  .flatMap((row, i) =>
    row.flatMap((_, j) =>
      [
        [
          wordsearchRowsWithSplit[i][j],
          wordsearchRowsWithSplit[i][j + 1],
          wordsearchRowsWithSplit[i][j + 2],
          wordsearchRowsWithSplit[i][j + 3],
        ],
        wordsearchRowsWithSplit[i + 3]
          ? [
              wordsearchRowsWithSplit[i][j],
              wordsearchRowsWithSplit[i + 1][j],
              wordsearchRowsWithSplit[i + 2][j],
              wordsearchRowsWithSplit[i + 3][j],
            ]
          : null,
        wordsearchRowsWithSplit[i + 3]
          ? [
              wordsearchRowsWithSplit[i][j],
              wordsearchRowsWithSplit[i + 1][j + 1],
              wordsearchRowsWithSplit[i + 2][j + 2],
              wordsearchRowsWithSplit[i + 3][j + 3],
            ]
          : null,
        wordsearchRowsWithSplit[i + 3]
          ? [
              wordsearchRowsWithSplit[i][j],
              wordsearchRowsWithSplit[i + 1][j - 1],
              wordsearchRowsWithSplit[i + 2][j - 2],
              wordsearchRowsWithSplit[i + 3][j - 3],
            ]
          : null,
      ].filter(Boolean),
    ),
  )
  .filter(
    (word) => word?.join("") === "XMAS" || word?.join("") === "SAMX",
  ).length;

console.log(matches);
