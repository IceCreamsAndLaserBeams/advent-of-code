import * as path from "path";
import readFile from "../../util/readFile";

const originalPairStrings = readFile(path.join(__dirname, 'input.txt'));
const leftList = [];
const rightList = [];

originalPairStrings.forEach(ops => {
    const pair = ops.split('   ');
    leftList.push(pair[0]);
    rightList.push(pair[1]);
});

leftList.sort();
rightList.sort();

const listDifference = leftList.reduce((prev, leftLocId, index) => {
    return prev + Math.abs(leftLocId - rightList[index]);
}, 0);

console.log(listDifference);
