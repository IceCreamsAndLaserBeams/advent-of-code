import { readFile } from "../../util/readFile.ts";
import path from "path";

const corruptedMemory = readFile(path.join(__dirname, "input.txt"));

const matches = corruptedMemory.matchAll(
  /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g,
);

let total = 0;
let enabled = true;

matches.forEach((x, i) => {
  if (enabled && x[0] !== "do()" && x[0] !== "don't()") {
    return (total += parseInt(x[1]) * parseInt(x[2]));
  }

  enabled = x[0] === "do()";
});

console.log(total);
