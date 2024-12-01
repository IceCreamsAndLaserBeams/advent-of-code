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

const similarityScore = leftList.reduce((prev, leftLocId) => {
    return prev + (leftLocId * rightList.filter(rl => rl === leftLocId).length);
}, 0);

console.log(similarityScore);
