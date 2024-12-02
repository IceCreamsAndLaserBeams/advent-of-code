import readFile from "../../util/readFile.ts";
import path from "path";

const originalReportStrings = readFile(path.join(__dirname, "input.txt"));
const reports = originalReportStrings.map((rs) =>
  rs.split(" ").map((s) => parseInt(s)),
);

let counts = 0;
reports.forEach((report) => {
  counts += +isSafe(report);
});

console.log(counts);

function isSafe(nums: number[], nErrs = 0): boolean {
  const ascending = nums[1] > nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    const prevNum = nums[i - 1];

    if (
      ascending
        ? num <= prevNum || num - 3 > prevNum
        : num >= prevNum || num + 3 < prevNum
    ) {
      if (nErrs === 1) {
        return false;
      }

      //validate numbers without current to see if they would be valid
      const next1 = nums.toSpliced(i - 1, 1);
      const next2 = nums.toSpliced(i, 1);
      const next3 = nums.toSpliced(0, 1);
      return isSafe(next1, 1) || isSafe(next2, 1) || isSafe(next3, 1);
    }
  }
  return true;
}
