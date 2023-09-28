// temporary word array to test other functions
const keywordOptions = [
    "cat",
    "dog",
    "badger",
    "rabbit",
]

// let chosenTopicData = [];
let keyword = '';
let keywordUpper = '';
let keywordLetters = [];
let tempWordArray = [];
let remainingGuesses = 8;
let currentScore = 0;
let lettersInWord = [];
let wordProgress = null;
const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let guess = '';
let guessedLetters = [];
let upperGuess = '';

/**
 * Generates a new random word from the 'keywordOptions' array.
 */
function newWord() {
    keyword = keywordOptions[Math.floor(Math.random() * keywordOptions.length)];
    keywordUpper = keyword.toUpperCase();
    keywordLetters = keywordUpper.split("");
    underscoreWord();
    console.log(keywordLetters);
    console.log(keywordUpper);
    console.log(keywordOptions);
}

/**
 * Replaces all letters in the keyword with underscores.
 */
function underscoreWord() {
    wordProgress = keyword.split('').map(letter => (lettersInWord.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('word-display').innerHTML = wordProgress;
}

// Detect guessed letter and submit on 'enter'.
document.getElementById("letter-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

        checkIfLetter()

        // checkGuess()

        // checkForWin()

        // checkForLoss()

        // Clear input box and refocus for the next input on 'enter'
        document.getElementById("letter-input").value = "";
        document.getElementById("letter-input").focus();    
        
    }
})

/**
 * Checks that the key pressed by the user is a letter and converts it to upper case.
 * Pushes this confirmed letter to the array 'guessedLetters'.
 */
function checkIfLetter() {
    guess = document.getElementById('letter-input').value;
    upperGuess = guess.toUpperCase();
    let validGuess = possibleLetters.indexOf(upperGuess) !== -1;
    
    if (validGuess == true) {
        let duplicateLetter = guessedLetters.indexOf(upperGuess) >= 0;
        if (duplicateLetter == true) {
            alert("You have already guessed this letter, try another")
        } else {
            guessedLetters.push(upperGuess);
        }
    }

    console.log(validGuess);
    console.log(upperGuess);
    console.log(guessedLetters);

}

// function checkGuess(upperGuess) {
//     for (let i = 0; i < keyword.length; i++){
//         if ()
//     }
// }

// function checkForWin()

// function checkForLoss()

function checkForDuplicateLetter() {
    console.log(duplicateLetter);
}

document.getElementById('remaining-guesses-count').innerHTML = remainingGuesses;


// let replaceWordCaseInsensitive = text.replace(/NOT Case sensitiVE/i, "for this")

// replace all matches: let newText = text.replace(/Case sensitive but all matches/g, "for this")