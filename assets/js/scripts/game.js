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
let incorrectGuesses = 0;
let lettersInWord = [];
let wordProgress = '';
let possibleLetters = '[ABCDEFGHIJKLMNOPQRSTUVWXYZ]';
let guessedLetters = [];

/**
 * Generates a new random word from the 'keywordOptions' array.
 */
function newWord() {
    keyword = keywordOptions[Math.floor(Math.random() * keywordOptions.length)];
    tempWordArray.push(keyword);
    underscoreWord();
    console.log(tempWordArray);
    console.log(keywordOptions);
}

/**
 * Replaces all letters in the keyword with underscores.
 */
function underscoreWord() {
    wordProgress = keyword.split('').map(letter => (lettersInWord.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('word-display').innerHTML = wordProgress;
}

underscoreWord()

document.getElementById("letter-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("letter-input").value = "";
        document.getElementById("letter-input").focus();    
    }
})

function checkIfLetter(event) {
    let guess = event.key;
    let upperGuess = guess.toUpperCase();
    let validGuess = possibleLetters.indexOf(upperGuess) !== -1;
    
    if (validGuess == true) {
        guessedLetters.push(upperGuess);
    }
    
    console.log(upperGuess);
    console.log(validGuess);
    console.log(guessedLetters)

    // checkIfDuplicate();
}

// function checkIfDuplicate(upperGuess, guessedLetters){
//     for (let i = 0; i < guessedLetters.length; i++) {
//         if (guessedLetters[i] === upperGuess) {
//             guessedLetters.pop(upperGuess);
//             alert("You have already guessed this letter")
//         } 
//     }
// }

// function submitLetter(event) {
//     checkIfDuplicate()
// }

function check() {
    
}