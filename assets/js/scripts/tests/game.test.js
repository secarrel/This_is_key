const { before, beforeEach } = require("node:test");
const {
  displayScore,
  checkForWin,
  remainingCount,
  changeImage,
  displayDefinition,
  updateWordProgress,
  displayTopic,
  checkGuess,
  displayRemainingGuesses,
  checkForLoss,
  checkLetter,
  displayAlternativeDefinition,
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
    expect(displayRemainingGuesses()).toBeDefined();
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
  test("Current score increases if a win is achieved and checkForWin in called", () => {
    expect(checkForWin()).toEqual(1);
  });
  test("Current score continues to increase if a win is achieved and check for win is called", () => {
    expect(checkForWin()).toEqual(2);
  });
});

// Check that the remaining guesses decreases with each incorrect guess.
describe("remaining guesses counts down from 8 as letters are guessed incorrectly and when 1 is reached, a loss is detected", () => {
  test("loss is initially detected as false as remaining guesses is greater than 1", () => {
    expect(checkForLoss()).toBe(false);
  });
  test("remaining guesses decreases by one if called to equal 7", () => {
    expect(remainingCount()).toEqual(7);
  });
  test("remaining guesses decreases by one if called to equal 6", () => {
    expect(remainingCount()).toEqual(6);
  });
  test("remaining guesses decreases by one if called to equal 5", () => {
    expect(remainingCount()).toEqual(5);
  });
  test("remaining guesses decreases by one if called to equal 4", () => {
    expect(remainingCount()).toEqual(4);
  });
  test("remaining guesses decreases by one if called to equal 3", () => {
    expect(remainingCount()).toEqual(3);
  });
  test("remaining guesses decreases by one if called to equal 2", () => {
    expect(remainingCount()).toEqual(2);
  });
  test("loss is detected as false until remaining guesses equals 0", () => {
    expect(checkForLoss()).toBe(false);
  });
  test("remaining guesses decreases by one if called to equal 1, which marks a loss", () => {
    expect(remainingCount()).toEqual(1);
  });
  test("loss is detected as true when remaining guesses equals 1", () => {
    expect(checkForLoss()).toBe(true);
  });
  test("remaining guesses continues to decreases by one if a wrong letter is guessed", () => {
    expect(remainingCount()).toEqual(0);
  });
  test("loss is detected if remaining guess equals less than 1", () => {
    expect(checkForLoss()).toBe(true);
  });
});

// Check that updateWordProgress function works correctly, replacing letters for underscores and vice versa.
describe("updateWordProgress displays the keyword as a string of letters or underscores", () => {
  test("updateWordProgress should return an empty string as the keyword is yet not defined", () => {
    expect(updateWordProgress()).toBe("");
  });
});
