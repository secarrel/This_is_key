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

    //Reset temporary arrays from previous word
    guessedLetters = [];
    correctLetters = [];
    correctLetterIndex = [];
    incorrectLetters = [];
    updatedWordProgress = '';
    upperGuess = '';
    
    
    updateWordProgress(upperGuess);

}

// Detect guessed letter and checks if correct on 'enter'.
document.getElementById("letter-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

        checkIfLetter()

        checkGuess()

        updateWordProgress(upperGuess);

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
        correctLetters.push(upperGuess);
    } else {
        incorrectLetters.push(upperGuess);
    }

}

function updateWordProgress(upperGuess) {
    updatedWordProgress = '';
  
    for (let i = 0; i < keyword.length; i++) {
      if (correctLetters.includes(keyword[i].toUpperCase())) {
        // If the letter has been correctly guessed, use the letter from the keyword.
        updatedWordProgress += keyword[i];
      } else if (upperGuess.toUpperCase() === keyword[i].toUpperCase()) {
        // If the guessed letter matches the letter in the keyword, use the guessed letter.
        updatedWordProgress += upperGuess;
      } else {
        // Otherwise, use an underscore.
        updatedWordProgress += '_ ';
      }
    }
  
    wordProgress = updatedWordProgress.toUpperCase();
  
    console.log('wordProgress', wordProgress);
    document.getElementById('word-display').innerHTML = wordProgress;
  }

// function checkForWin() {
//     if (keywordLetters.length == correctLetters.length) {
//         alert("You have won!")
//     }
// };

// function checkForLoss() {
// )