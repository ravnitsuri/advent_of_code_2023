const fs = require("fs");

const file = fs.readFileSync("input_prod", { encoding: "utf-8" });
const lines = file.split("\r\n").filter(Boolean);
const lineNumbers = [];

const keyObj = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const findFirstNumber = (line) => {
  let splitline = line.split("");

  for (let i = 0, l = splitline.length; i < l; i++) {
    if (Number.isInteger(Number(line[i]))) {
      return line[i];
    }
    for (const [key, val] of Object.entries(keyObj)) {
      if (i == line.indexOf(val)) {
        return key;
      }
    }
  }
};

const findLastNumber = (line) => {
  let splitline = line.split("");

  for (let i = splitline.length - 1, l = 0; i >= l; i--) {
    if (Number.isInteger(Number(line[i]))) {
      return line[i];
    }
    for (const [key, val] of Object.entries(keyObj)) {
      if (i == line.lastIndexOf(val)) {
        return key;
      }
    }
  }
};

for (const line of lines) {
	// console.log({line})
  const firstNum = findFirstNumber(line);
  const lastNum = findLastNumber(line);
  const finalNum = Number(`${firstNum}${lastNum}`);
  // console.log({ finalNum });
  lineNumbers.push(finalNum);
}

const result = lineNumbers.reduce((a, b) => a + b);
console.log(`Result: ${result}`);
