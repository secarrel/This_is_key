const { displayScore, checkForWin, checkForLoss } = require("../game");

beforeAll(() => {
  const fs = require("fs");
  const fileContents = fs.readFileSync("index.html", "utf-8");
  document.open();
  document.write(fileContents);
  document.close();
});

describe("current score is functional and equal to the number of wins", () => {
  test("current score exists", () => {
    expect(displayScore()).toBeDefined();
  });
  test("current score equals 0 at start of game", () => {
    expect(displayScore()).toEqual(0);
  });
  beforeAll(() => {
    win = true;
  });
  test("Current score increases if a win is achieved", () => {
    expect(checkForWin()).toEqual(1);
  });
});

// describe("game display contains correct elements", () => {
//   test("current score exists", () => {
//     expect(displayScore()).toBeGreaterThanOrEqual(0);
//   });
//   test("Current topic display exists", () => {
//     expect()
//   })
// });
