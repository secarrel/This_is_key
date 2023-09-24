// temporary word array to test other functions
let keywordOptions = [
    "cat",
    "dog",
    "badger",
    "rabbit",
]




// let chosenTopicData = [];
let keyword = '';
let tempWordArray = [];
// let maxIncorrect = 8;
// let incorrectGuesses = 0;
let lettersInWord = [];
let wordStatus = null;

/**
 * Generates a new random word from the 'keywordOptions' array.
 */
function newWord() {
    keyword = keywordOptions[Math.floor(Math.random() * keywordOptions.length)];
    tempWordArray.push(keyword);
    console.log(tempWordArray);
}

function underscoreWord() {
    wordStatus = keyword.split('').map(letter => (lettersInWord.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('word-display').innerHTML = wordStatus;
}

newWord()
underscoreWord()