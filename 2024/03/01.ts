import { readFile } from "../../util/readFile.ts";
import path from "path";

const corruptedMemory = readFile(path.join(__dirname, "input.txt"));

const matches = corruptedMemory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

const total = matches.reduce(
  (prev, match) => prev + parseInt(match[1]) * parseInt(match[2]),
  0,
);

console.log(total);
