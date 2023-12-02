const fs = require("fs");

const file = fs.readFileSync("input_prod", { encoding: "utf-8" });
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

const MaxRed = 12;
const MaxGreen = 13;
const MaxBlue = 14;

const invalidGames = [];
for (const [key, val] of Object.entries(games)) {
  for (const hand of val) {
    const isInvalidHand =
      hand.red > MaxRed || hand.blue > MaxBlue || hand.green > MaxGreen;
    if (isInvalidHand) {
      invalidGames.push(key);
    }
  }
}
// console.log(invalidGames);

const validGames = Object.keys(games).filter(
  (x) => invalidGames.indexOf(x) == -1
);
// console.log(validGames);

const result = validGames.reduce((a, c) => Number(a) + Number(c), 0);
console.log(`Result: ${result}`);
