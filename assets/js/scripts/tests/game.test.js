/**
 * @jest-environment jsdom
 */

const {currentScore} = require("./game.test.js");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game display contains correct keys", () => {
    test("score key exists", () => {
        expect(currentScore).toEqual(0);
    });
});