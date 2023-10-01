// temporary word array to test other functions
const keywordOptions = [
    "cat",
    "dog",
    "badger",
    "rabbit",
]

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
let incorrectLetters = [];
let correctLetters = [];
let win = false;
let loss = false;


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
    incorrectLetters = [];
    updatedWordProgress = '';
    upperGuess = '';
    
    updateWordProgress(upperGuess);

}

// Detect guessed letter and checks if correct on 'enter'.
document.getElementById("letter-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

        checkLetter()

        checkGuess()

        updateWordProgress(upperGuess);

        checkForWin()

        checkForLoss()

        // Clear input box and refocus for the next input on 'enter'
        document.getElementById("letter-input").value = "";
        document.getElementById("letter-input").focus();    

        console.log(upperGuess);
        console.log(correctLetters);
        console.log(incorrectLetters);
    }
});


/**
 * Checks that the key pressed by the user is a letter and converts it to upper case.
 * Pushes this confirmed letter to the array 'guessedLetters'.
 */
function checkLetter() {
    // Set the value of 'guess' to the submitted letter.
    guess = document.getElementById('letter-input').value;
    // Convert the letter to upper case.
    upperGuess = guess.toUpperCase();
    
    // Identify if the letter is in the 'possibleLetters' array and therefore determine if the submitted content is valid.
    let validGuess = possibleLetters.indexOf(upperGuess);

    if (validGuess == -1) {
        alert("Guess one letter");
        upperGuess = '';
    } else {
        // Check if letter has already been guessed.
        let duplicateLetter = guessedLetters.indexOf(upperGuess) >= 0;

        // Identify the number of letters in the input field.
        let numberOfCharacters = guess.length;

        if (duplicateLetter === true) {
            // Do not allow duplicate guesses.
            alert("You have already guessed this letter, try another");
        } else {
            // If the guess is a letter and not a duplicate, add it to the 'guessedLetters' array.
            guessedLetters.push(upperGuess);
        };
    };
};

function checkGuess() {
    if ( keywordLetters.indexOf(upperGuess) >= 0) {
        // If the letter is in the keyword, add the letter to 'correctLetters' array.
        correctLetters.push(upperGuess);
    } else {
        // If the letter is not in the keyword, add the letter to 'incorrectLetters' array.
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

function checkForWin() {
    if (wordProgress.includes('_')) {
        win = false;
    } else {
        alert('You have won!');
        ++ currentScore;
        document.getElementById('score-count').innerHTML = currentScore;

    }
};


function checkForLoss() {
    if (remainingGuesses = 0) {
        alert("Unlucky, you didn't guess the word correctly this time.")
    }
}
