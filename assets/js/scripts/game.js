// temporary word array to test other functions
let keywordOptions = [
    "cat",
    "dog",
    "badger",
    "rabbit",
    "hamster",
    "bird",
    "fish"
];

let keyword = '';
let keywordUpper = '';
let keywordLetters = [];
let usedWords = false;
let remainingGuesses = 8;
let currentScore = 0;
let wordProgress = '';
const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let guess = '';
let guessedLetters = [];
let upperGuess = '';
let incorrectLetters = [];
let incorrectLettersCount = [];
let correctLetters = [];
let win = false;
let loss = false;


document.getElementById('remaining-guesses-count').innerHTML = remainingGuesses;
document.getElementById('score-count').innerHTML = currentScore;


/**
 * Empties all temporary arrays.
 */
function reset(){
    keywordOptions = [];
    currentScore = 0;
    keywordLetters = [];
    guessedLetters = [];
    incorrectLetters = [];
    incorrectLettersCount = [];
    correctLetters = [];    
    remainingGuesses = 8;

};



// Detect guessed letter and checks if correct on 'enter'.
document.getElementById("letter-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkLetter();
        updateWordProgress(upperGuess);
        checkForWin()
        checkForLoss();

    }
});

/**
 * Generates a new random word from the 'keywordOptions' array.
 */
function newWord() {
    //Reset temporary arrays from previous word
    guessedLetters = [];
    correctLetters = [];
    incorrectLetters = [];
    incorrectLettersCount = 0;
    updatedWordProgress = '';
    upperGuess = '';
    remainingGuesses = 8;

    document.getElementById('letter-array').innerHTML = incorrectLetters;
    document.getElementById('remaining-guesses-count').innerHTML = remainingGuesses;

    checkWordArray();

    // Generate a new word
    randomiseKeywordOptions();
    keyword = keywordOptions[keywordOptions.length - 1];
    keywordOptions.pop(keyword)
    keywordUpper = keyword.toUpperCase();
    keywordLetters = keywordUpper.split("");

    updateWordProgress(upperGuess);

    $("input").show();
    $("#next").addClass("hide");
}

/**
 * Sorts the keywordOptions array in to a random order.
 */
function randomiseKeywordOptions() {
    keywordOptions.sort(function(){
        return 0.5 - Math.random();
    });
    console.log(keywordOptions);
};

/**
 * Checks if all words in 'keywordOptions' array have been used. 
 */
function checkWordArray() {
    if(keywordOptions.length == 0) {
        alert("all words have been used");
    };
};

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
    } else if (validGuess >= 0) {
        // Check if letter has already been guessed.
        let duplicateLetter = guessedLetters.indexOf(upperGuess) >= 0;

        if (duplicateLetter === true) {
            // Do not allow duplicate guesses.
            alert("You have already guessed this letter, try another");
        } else {
            // If the guess is a letter and not a duplicate, add it to the 'guessedLetters' array.
            guessedLetters.push(upperGuess);
            checkGuess();
        };
    };

    ++ remainingGuesses;

    // Clear input box and refocus for the next input on 'enter'
    document.getElementById("letter-input").value = "";
    document.getElementById("letter-input").focus();    
    
    
};

/**
 * Checks if the guessed letter is anywhere in the keyword.
 */
function checkGuess() {
    if ( keywordLetters.indexOf(upperGuess) >= 0) {
        // If the letter is in the keyword, add the letter to 'correctLetters' array.
        correctLetters.push(upperGuess);
    } else if (keywordLetters.indexOf(upperGuess) == -1){
        // If the letter is not in the keyword, add the letter to 'incorrectLetters' array.
        incorrectLetters.push(upperGuess)
        // Display incorrect letters for user to see.
        document.getElementById("letter-array").innerHTML = incorrectLetters.join("");
        // Subtract 1 from remaining guesses count.
        remainingCount();
    };
};

/**
 * Reduces 1 from the value of 'remainingGuesses' and updates the 'Remaining Guesses' display for the user.
 */
function remainingCount() {
    incorrectLettersCount ++
    remainingGuesses = 8 - incorrectLettersCount;

    document.getElementById('remaining-guesses-count').innerHTML = remainingGuesses;
}

/**
 * Runs a 'for loop' so the guessed letter is checked against every letter in the keyword. If there is a match, 
 * the matching letter is displayed. If there is not a match, the letters are displayed as underscores. 
 */
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
      };
    };
  
    wordProgress = updatedWordProgress.toUpperCase();
  
    console.log('wordProgress', wordProgress);
    document.getElementById('word-display').innerHTML = wordProgress;
};

/**
 * Checks if user has correctly guessed all letters in the word.
 */
function checkForWin() {
    if (wordProgress.includes('_')) {
        win = false;
    } else {
        ++ currentScore;
        document.getElementById('score-count').innerHTML = currentScore;
        alert("win")
        $("input").hide();
        $("#next").removeClass("hide");
    };
};

/**
 * Checks if user has made too many incorrect guesses.
 */
function checkForLoss() {
    if (remainingGuesses == 1) {
        alert("Unlucky, you didn't guess the word correctly this time.");
        removePoint();
        $("input").hide();
        $("#next").removeClass("hide");

    };
};


function removePoint() {
    let oldScore = currentScore;
    currentScore = oldScore - 1;

        document.getElementById("score-count").innerHTML = currentScore;
}