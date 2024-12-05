import { readFile } from "../../util/readFile.ts";
import path from "path";

const instructionsAndPages = readFile(path.join(__dirname, "input.txt"));
const [instructionsString, pagesString] = instructionsAndPages.split(/\n\n/);
const instructions = instructionsString
  .split("\n")
  .map((i) => i.split("|").map((j) => parseInt(j)));

const pages = pagesString
  .split("\n")
  .map((p) => p.split(",").map((p) => parseInt(p)));

let validPages = pages
  .map((page, i) => {
    const applicableRules = instructions.filter(
      (x) => page.includes(x[0]) && page.includes(x[1]),
    );

    let hasValidPlacement = validatePlacements(page, applicableRules);
    return hasValidPlacement ? page : null;
  })
  .filter(Boolean);

const sumOfMiddleValues = validPages.reduce(
  (prev, page) => prev + page![Math.round((page!.length - 1) / 2)],
  0,
);

console.log(sumOfMiddleValues);

function validatePlacements(page: number[], applicableRules: number[][]) {
  let isValid = true;
  applicableRules.forEach((rule) => {
    const firstNum = page.indexOf(rule[0]);
    const secondNum = page.indexOf(rule[1]);

    if (firstNum > secondNum) {
      isValid = false;
    }
  });

  return isValid;
}
