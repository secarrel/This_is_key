const {
  displayScore,
  checkForWin,
  remainingCount,
  changeImage,
  displayDefinition,
  updateWordProgress,
  displayTopic,
  checkGuess,
} = require("../game");

beforeAll(() => {
  const fs = require("fs");
  const fileContents = fs.readFileSync("index.html", "utf-8");
  document.open();
  document.write(fileContents);
  document.close();
});

// Check that all elements that should be displayed on the game-play display exist.
describe("game display contains correct elements", () => {
  test("current score exists", () => {
    expect(displayScore()).toBeDefined();
  });
  test("remaining guesses count exists", () => {
    expect(remainingCount()).toBeGreaterThanOrEqual(0);
  });
  test("changing picture exists", () => {
    expect(changeImage()).toBeDefined();
  });
  test("keyword definition exists", () => {
    expect(displayDefinition()).toBeDefined();
  });
  test("Keyword exists", () => {
    expect(updateWordProgress()).toBeDefined();
  });
  test("current topic exists", () => {
    expect(displayTopic()).toBeDefined();
  });
  test("guessed letters display exists", () => {
    expect(checkGuess).toBeDefined();
  });
});

// Check that the current score changes with each win.
describe("current score is functional and equal to the number of wins", () => {
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
