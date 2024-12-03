import { readFileLines } from "../../util/readFile.ts";

import path from "path";

const originalReportStrings = readFileLines(path.join(__dirname, "input.txt"));
const reports = originalReportStrings.map((rs) =>
  rs.split(" ").map((s) => parseInt(s)),
);

const validReports = reports.filter((report) => {
  const isAcceptableRange = report.every((x, i) => {
    let diff = Math.abs(x - report[i - 1]);
    return i === 0 || (diff >= 1 && diff <= 3);
  });

  const isAscending = report.every((x, i) => i === 0 || x > report[i - 1]);
  const isDescending = report.every((x, i) => i === 0 || x < report[i - 1]);

  return isAcceptableRange && (isAscending || isDescending);
});

console.log(validReports.length);
