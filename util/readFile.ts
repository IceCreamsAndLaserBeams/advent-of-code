import fs from "fs";

const readFileLines = (filePath: string) => {
  const data = fs
    .readFileSync(filePath, { encoding: "utf8", flag: "r" })
    .trimEnd();
  return data.split("\n");
};

const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, { encoding: "utf8", flag: "r" }).trimEnd();
};

export { readFileLines, readFile };
