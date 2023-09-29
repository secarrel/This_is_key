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
let wordProgress = '';
const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let guess = '';
let guessedLetters = [];
let upperGuess = '';
let correctLetterIndex = [];
let incorrectLetters = [];
let correctLetters = [];
let win = false;

document.getElementById('remaining-guesses-count').innerHTML = remainingGuesses;
document.getElementById('score-count').innerHTML = currentScore;

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
}

// Detect guessed letter and checks if correct on 'enter'.
document.getElementById("letter-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

        checkIfLetter()

        checkGuess()

        // checkForWin()

        // checkForLoss()

        // Clear input box and refocus for the next input on 'enter'
        document.getElementById("letter-input").value = "";
        document.getElementById("letter-input").focus();    

        console.log(upperGuess);
        console.log(correctLetters);
        console.log(incorrectLetters);
    }
})

/**
 * Replaces all letters in the keyword with underscores.
 */
function underscoreWord() {
    wordProgress = keyword.split('').map(letter => (keywordLetters.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('word-display').innerHTML = wordProgress;
}

/**
 * Checks that the key pressed by the user is a letter and converts it to upper case.
 * Pushes this confirmed letter to the array 'guessedLetters'.
 */
function checkIfLetter() {
    guess = document.getElementById('letter-input').value;
    upperGuess = guess.toUpperCase();
    let validGuess = possibleLetters.indexOf(upperGuess) !== -1;
    
    if (validGuess === true) {
        let duplicateLetter = guessedLetters.indexOf(upperGuess) >= 0;
        if (duplicateLetter === true) {
            alert("You have already guessed this letter, try another");
        } else {
            guessedLetters.push(upperGuess);
        }
    }


}

function checkGuess() {
    if ( keywordLetters.indexOf(upperGuess) >= 0) {
        // revealLetter();
        console.log(keywordLetters.indexOf(upperGuess));
        correctLetters.push(upperGuess);
    } else {
        incorrectLetters.push(upperGuess);
    }

}

// function revealLetter() {
//     for (let i = 0; i < keywordLetters.length; i++){
//     }
// }

// function checkForWin() {
//     if (keywordLetters.length == correctLetters.length) {
//         alert("You have won!")
//     }
// };

// function checkForLoss() {
// )