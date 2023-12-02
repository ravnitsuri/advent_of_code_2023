const fs = require("fs");

const file = fs.readFileSync("input_dev", { encoding: "utf-8" });
const lines = file.split("\r\n");
const games = lines
  .map((x) => {
    let splitline = x.split(":");
    let gameid = splitline[0].replace("Game ", "");
    return {
      [Number(gameid)]: splitline[1]
        .trim()
        .split(";")
        .map((x) =>
          x
            .trim()
            .split(",")
            .map((x) => x.trim().split(" "))
            .reduce((a, c) => {
              return { ...a, [c[1]]: Number(c[0]) };
            }, {})
        ),
    };
  })
  .reduce((a, c) => {
    const currentKey = Object.keys(c)[0];
    const currentVal = c[currentKey];
    return { ...a, [currentKey]: currentVal };
  }, {});
// console.log(games);

const modifiedGames = Object.fromEntries(
  Object.entries(games).map(([key, val]) => {
    const newVal = val.reduce(
      (a, c) => {
        let resultObj = { ...a };
        if (c.green > a.green) {
          resultObj = { ...resultObj, green: c.green };
        }
        if (c.blue > a.blue) {
          resultObj = { ...resultObj, blue: c.blue };
        }
        if (c.red > a.red) {
          resultObj = { ...resultObj, red: c.red };
        }

        return resultObj;
      },
      { blue: 0, red: 0, green: 0 }
    );
    return [key, newVal];
  })
);
// console.log(modifiedGames);

const multiplicationResults = Object.fromEntries(
  Object.entries(modifiedGames).map(([key, val]) => {
    const newVal = val.blue * val.green * val.red;
    return [key, newVal];
  })
);
// console.log(multiplicationResults);

const result = Object.values(multiplicationResults).reduce((a, c) => a + c, 0);
console.log(`Result: ${result}`);
