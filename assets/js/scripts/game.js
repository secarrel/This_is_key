// temporary word array to test other functions
var keywordOptions = [
    "cat",
    "dog",
    "badger",
    "rabbit",
]




// let chosenTopicData = [];
let keywordOptions = [];
let keyword = '';
// let maxIncorrect = 8;
// let incorrectGuesses = 0;
// let guessedLetters = [];

/**
 * Generates a new random word from the 'keywordOptions' array.
 */
function newWord() {
    keyword = keywordOptions[Math.floor(Math.random() * keywordOptions.length)];
}

newWord()