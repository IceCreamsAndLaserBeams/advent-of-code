import { readFileLines } from "../../util/readFile.ts";
import path from "path";

const equationStrings = readFileLines(path.join(__dirname, "input.txt"));
const valueAndInputs = equationStrings.map((es) => {
  const valuesAndInputsArray = es.split(": ");
  return {
    testValue: parseInt(valuesAndInputsArray[0]),
    inputs: valuesAndInputsArray[1].split(" ").map(Number),
  };
});

let total = 0;

valueAndInputs.forEach((vai) => {
  total += possible(vai.inputs[0], 1, vai.inputs, vai.testValue)
    ? vai.testValue
    : 0;
});

function possible(
  subtotal: number,
  i: number,
  numbers: number[],
  value: number,
): number | boolean {
  if (i === numbers.length && subtotal === value) {
    return true;
  } else if (subtotal > value || i === numbers.length) {
    return false;
  } else {
    return (
      possible(subtotal * numbers[i], i + 1, numbers, value) ||
      possible(subtotal + numbers[i], i + 1, numbers, value) ||
      possible(
        parseInt(subtotal.toString() + numbers[i].toString()),
        i + 1,
        numbers,
        value,
      )
    );
  }
}

console.log(total);
