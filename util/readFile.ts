import fs from "fs";

const readFile = (filePath: string) => {
  const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
  let dataArr = data.split("\n");
  dataArr.pop();

  return dataArr;
};

export default readFile;
