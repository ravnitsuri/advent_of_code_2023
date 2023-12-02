const fs = require('fs')

const file = fs.readFileSync("input_prod", {encoding:'utf-8'});
const lines = file.split('\r\n')
const lineNumbers = []
for (const line of lines) {
    const match = line.match(/\d+/g).reduce((a, c) => {
      if (c.length > 1) {
        return [...a, ...c.split("")];
      } else {
        return [...a, c];
      }
    }, []);
    const firstNum = match[0];
    const lastNum = match[match.length -1];
    const finalNum = Number(`${firstNum}${lastNum}`);
    lineNumbers.push(finalNum)
}

const result = lineNumbers.reduce((a, b) => a+b);
console.log(`Result: ${result}`);