/* jshint esversion: 8 */

// temporary word array to test other functions
let keywordOptions = [];
let keyword = '';
let keywordUpper = '';
let keywordLetters = [];
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
let topic = '';
const biologyJson = 'assets/js/biology_keywords/'
let topicWords = [];
let topicDefinitions = [];
let wordAndDefinition = [];
let keywordIndexOptions = [];
let keywordIndex = '';
const topicSelection = document.getElementsByName("topic-select")
const dictionaryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

document.getElementById("yes-end").addEventListener("click", reset);
/**
 * Empties all temporary arrays.
 */
function reset(){
    // Reset temporary arrays.
    currentScore = 0;
    keywordLetters = [];
    keywordOptions = [];
    keywordIndexOptions = [];
    topicDefinitions = [];
    resetWordArrays();

    clearTopicSelection();

    document.getElementById('remaining-guesses-count').innerHTML = remainingGuesses;
    displayScore(currentScore);
};

/**
 * Reset all temporary arrays which relate to individual words.
 */
function resetWordArrays() {
    guessedLetters = [];
    correctLetters = [];
    incorrectLetters = [];
    incorrectLettersCount = 0;
    updatedWordProgress = '';
    upperGuess = '';
    remainingGuesses = 8;
}

/**
 * Removes the selection from topic selector radio buttons. 
 */
function clearTopicSelection() {
    document.getElementById("play").disabled = true;
    for ( let i = 0; topicSelection.length; i++) {
        topicSelection[i].checked = false;
    };
}

/**
 * Selects json file corresponding with click event and uses the 
 * key word array from this file for the newWord() function.
 */
function selectTopic(clicked_id) {
    // Reset topic related temp arrays and styling.
    keywordOptions = [];
    keywordIndexOptions = [];
    topicDefinitions = [];

    // Identify the relevant json file and get data from it.
    topic = clicked_id;
    jsonFile = biologyJson.concat(topic) + '.json';
    getData(jsonFile);  

    document.getElementById("play").removeAttribute("disabled");
};

/**
 * Fetch the data from the relevant json file and create seperate word and definition arrays.
 */
function getData(jsonFile) {
    fetch(jsonFile).then(function(response) {
        response.json().then(function(jsonData){          
            jsonData.forEach(function(item){
                keywordOptions.push(item.word);
                topicDefinitions.push(item.definition);
          });
        createIndexOptions();
        });
    });
};

/**
 * Creates a new array for keywords indexes.
 */
function createIndexOptions(){
    for (let i = 0; i < keywordOptions.length; i ++) {
    keywordIndexOptions.push(i);
    }
    console.log(keywordIndexOptions);
    console.log(keywordOptions)
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

//event listeners for running the newWord function.
document.getElementById("new-word").addEventListener("click", newWord);
document.getElementById("next-word").addEventListener("click", newWord);

/**
 * Generates a new random word from the 'keywordOptions' array.
 */
function newWord() {
    checkWordArray();

    resetWordArrays()

    // Display values for updated temporary arrays 
    document.getElementById('letter-array').innerHTML = incorrectLetters;
    displayRemainingGuesses();

    // changeImage();


    // Generate a new word
    randomiseKeywordOptions();
    keywordIndex = keywordIndexOptions[keywordIndexOptions.length - 1];
    keywordIndexOptions.pop(keywordIndex);
    keyword = keywordOptions[keywordIndex];
    keywordUpper = keyword.toUpperCase();
    keywordLetters = keywordUpper.split("");

    console.log(keyword);

    displayScore(currentScore);

    updateWordProgress(upperGuess);

    displayDefinition()

    clearAndFocus();

    $("input").show();
    $("#next").addClass("hide");
};

document.getElementById("speak").addEventListener("click", getPronounciation);

/**
 * Provides text to speech audio of the keyword value.
 */
function getPronounciation() {
    let pronounciation = new SpeechSynthesisUtterance(keyword);
    speechSynthesis.speak(pronounciation);
};


/**
 * Sorts the keywordOptions array in to a random order.
 */
function randomiseKeywordOptions() {
    keywordIndexOptions.sort(function(){
        return 0.5 - Math.random();
    });
    console.log(keywordIndexOptions)
};

/**
 * Checks if all words in 'keywordOptions' array have been used. 
 */
function checkWordArray() {
    if(keywordIndexOptions.length == 0) {
        showTopics();
        alert("You have used all the keywords from this topic, select another.");
    };
};

/**
 * Displays the definition linked to the keyword.
 */
function displayDefinition() {
    $("#definition-display").text(topicDefinitions[keywordIndex]);
}

/**
 * Checks that the key pressed by the user is a letter and converts it to upper case.
 * Pushes this confirmed letter to the array 'guessedLetters'.
 */
function checkLetter() {
    // Set the value of 'guess' to the submitted letter.
    guess = document.getElementById('letter-input').value;
    // Convert the letter to upper case.
    upperGuess = guess.toUpperCase();
    // Check number of letters submitted.

    
    // Identify if the letter is in the 'possibleLetters' array and therefore determine if the submitted content is valid.
    let validGuess = possibleLetters.indexOf(upperGuess);

    
    if (upperGuess.length > 1) {
        alert("Please guess one number at a time.");
    } else if (validGuess == -1) {
        alert("You must guess a letter, numbers and special characters are not allowed.");
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

    remainingGuesses ++;

    clearAndFocus()  
};

/**
 * Clear input box and focus for the next input
 */
function clearAndFocus(){
        document.getElementById("letter-input").value = "";
        document.getElementById("letter-input").focus();    
    
}
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
        // changeImage();

    };
};

/**
 * Reduces 1 from the value of 'remainingGuesses' and updates the 'Remaining Guesses' display for the user.
 */
function remainingCount() {
    incorrectLettersCount ++
    remainingGuesses = 8 - incorrectLettersCount;
    displayRemainingGuesses();
}

/**
 * Displays the current value of remainingGuesses.
 */
function displayRemainingGuesses() {
    document.getElementById('remaining-guesses-count').innerHTML = remainingGuesses;
}

// /**
//  * Changes the image every time an incorrect letter is guessed.
//  */
// function changeImage() {
//     if (incorrectLettersCount == 1) {
//         $("#changing-picture").attr("src", "assets/images/pinkflower_guess1.png");
//     } else if (incorrectLettersCount == 2) {
//         $("#changing-picture").attr("src", "assets/images/pinkflower_guess2.png");
//     } else if (incorrectLettersCount == 3) {
//         $("#changing-picture").attr("src", "assets/images/pinkflower_guess3.png");
//     } else if (incorrectLettersCount == 4) {
//         $("#changing-picture").attr("src", "assets/images/pinkflower_guess4.png");
//     } else if (incorrectLettersCount == 5) {
//         $("#changing-picture").attr("src", "assets/images/pinkflower_guess5.png");
//     } else if (incorrectLettersCount == 6) {
//         $("#changing-picture").attr("src", "assets/images/pinkflower_guess6.png");
//     } else if (incorrectLettersCount == 7) {
//         $("#changing-picture").attr("src", "assets/images/pinkflower_guess7.png");
//     } else if (incorrectLettersCount == 8) {
//         $("#changing-picture").attr("src", "assets/images/pinkflower_guess8.png");
//     } else if (incorrectLettersCount == 0) {
//         $("#changing-picture").attr("src", "assets/images/pinkflower_noguess.png");
//     }
// }

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
        } else if (keyword[i] === ' ') {
            // If the keyword contains a space, replace this with a slash.
            updatedWordProgress += '/';
        } else if (keyword[i] === '-') {
            // If the keyword contains a dash, display this as a dash.
            updatedWordProgress += '-';
        } else {
            // Otherwise, use an underscore.
            updatedWordProgress += '_ ';
        };
    };

    //Display the changes made to wordProgress.
    wordProgress = updatedWordProgress.toUpperCase();
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
        displayScore(currentScore);
        alert("win")
        $("input").hide();
        $("#next").removeClass("hide");
        displayWordInfo();
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
        displayWordInfo();
    };
};

/**
 * reduces the score by one when a word is not correctly guessed.
 */
function removePoint() {
    let oldScore = currentScore;

    // Don't allow the score to drop below '0', but otherwise reduce the value by 1.
    if (oldScore > 0){
        currentScore = oldScore - 1;
    };

    displayScore(currentScore);
};

/**
 * Displays the keyword and definition in the word end modal. 
 */
function displayWordInfo() {
    $("#end-definition").text(topicDefinitions[keywordIndex])
    $("#end-word").text(keyword.toUpperCase())
}

/**
 * Display the value of the 'currentScore' variable.
 */
function displayScore(currentScore) {
    document.getElementById("score-count").innerHTML = currentScore;
}