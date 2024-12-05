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

const fixedPages = pages
  .map((page) => {
    const applicableRules = instructions.filter(
      (x) => page.includes(x[0]) && page.includes(x[1]),
    );

    let hasValidPlacement = validatePlacements(page, applicableRules);
    if (hasValidPlacement) {
      return null;
    }

    return fixInvalidPlacements(page, applicableRules);
  })
  .filter(Boolean);

console.log(
  fixedPages.reduce(
    (prev, page) => prev + page![Math.round((page!.length - 1) / 2)],
    0,
  ),
);

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

function fixInvalidPlacements(page: number[], applicableRules: number[][]) {
  let pageCopy = [...page];
  applicableRules.forEach((rule) => {
    const firstNum = pageCopy.indexOf(rule[0]);
    const secondNum = pageCopy.indexOf(rule[1]);

    if (firstNum > secondNum) {
      pageCopy.splice(secondNum, 0, pageCopy.splice(firstNum, 1)[0]);
      pageCopy = fixInvalidPlacements(pageCopy, applicableRules);
    }
  });

  return pageCopy;
}
