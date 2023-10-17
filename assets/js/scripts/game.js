/* jshint esversion: 8 */

// ----------------------- Set Variables -------------------------
const topicSelection = document.getElementsByName("topic-select")
const dictionaryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const biologyJson = 'assets/js/biology_keywords/'
let keywordOptions = [];
let keyword = '';
let keywordUpper = '';
let keywordLetters = [];
let remainingGuesses = 8;
let currentScore = 0;
let wordProgress = '';
let guess = '';
let guessedLetters = [];
let upperGuess = '';
let incorrectLetters = [];
let incorrectLettersCount = [];
let correctLetters = [];
let win = false;
let topic = '';
let topicWords = [];
let topicDefinitions = [];
let wordAndDefinition = [];
let keywordIndexOptions = [];
let keywordIndex = '';
let mainDefinitionFromApi = '';
let excludedWords = ["tissue", "multicellular", "organ system", "epithelial cell", "pH", "cell", "passive transport", "selectively permeable", "electron microscopy", "diffusion", "concentration gradient", "active site", "alveoli", "denature", "differentiation", "gas exchange", "human thorax", "alkaline", "Benedicts reagent", "biuret solution",  "calorimetry", "egestion", "Visking tubing", "calorimetry", "sedentary"]

// ----------------------- Event Listeners -------------------------
// Triggers reset for a new game.
document.getElementById("yes-end").addEventListener("click", reset);

// Detect guessed letter and checks if correct on 'enter'.
document.getElementById("letter-input").addEventListener("keydown", function(event) {
    // Set the value of 'guess' to the submitted letter.
    guess = event.key;
    checkLetter();
    updateWordProgress(upperGuess);
    checkForWin()
    checkForLoss();
    clearAndFocus();
});

// Triggers the newWord function.
document.getElementById("next-word").addEventListener("click", newWord);
document.getElementById("next-word").addEventListener("click", clearAndFocus);


// Triggers the getPronounciation function. 
document.getElementById("speak").addEventListener("click", getPronounciation);

// Triggers alternative definition display.
document.getElementById("dictionary-definition").addEventListener("click", displayAlternativeDefinition);

// Triggers WJEC definition display.
document.getElementById("official-definition").addEventListener("click", displayOfficialWJECDefinition);

// ----------------------- Functions -------------------------

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
function selectTopic(clicked) {
    // Reset topic related temp arrays and styling.
    keywordOptions = [];
    keywordIndexOptions = [];
    topicDefinitions = [];

    // Identify the relevant json file and get data from it.
    topic = clicked.id;
    jsonFile = biologyJson.concat(topic) + '.json';
    getData(jsonFile);  

    setTimeout(showGamePlay, 250);

    document.getElementById("id-topic").innerHTML = clicked.id.toUpperCase();
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


async function getDictionaryData(keyword) {
  let dictionaryFile = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + keyword;
  console.log('keyword', keyword);
  let dictionaryDefinition = [];


  const response = await fetch(dictionaryFile);
  const dictionaryData = await response.json();

  dictionaryDefinition.push(dictionaryData);

  console.log(dictionaryDefinition[0][0]);

  console.log(dictionaryDefinition[0][0].meanings[0].definitions[0].definition);
  mainDefinitionFromApi = dictionaryDefinition[0][0].meanings[0].definitions[0].definition;

}


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


/**
 * Generates a new random word from the 'keywordOptions' array.
 */
function newWord() {
    checkWordArray();

    resetWordArrays()

    // Display values for updated temporary arrays 
    document.getElementById('letter-array').innerHTML = incorrectLetters;
    displayRemainingGuesses();

    changeImage();


    // Generate a new word
    randomiseKeywordOptions();
    keywordIndex = keywordIndexOptions[keywordIndexOptions.length - 1];
    keywordIndexOptions.pop(keywordIndex);
    keyword = keywordOptions[keywordIndex];
    keywordUpper = keyword.toUpperCase();
    keywordLetters = keywordUpper.split("");

    console.log(keyword);
    getDictionaryData(keyword);

    displayScore(currentScore);

    updateWordProgress(upperGuess);

    displayDefinition()

    displayOfficialWJECDefinition()

    document.getElementById("letter-input").classList.remove("hide");
    document.getElementById("next").classList.add("hide");

    clearAndFocus();

};

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
        alert("There are no words available. Select a new topic.");
    };
};

/**
 * Displays the definition linked to the keyword.
 */
function displayDefinition() {
    document.getElementById("definition-display").innerHTML = "Hint: <br>" + topicDefinitions[keywordIndex];

};

function displayOfficialWJECDefinition() {
    document.getElementById("end-definition").innerHTML = topicDefinitions[keywordIndex];
    document.getElementById("dictionary-definition").classList.remove("hide");
    document.getElementById("official-definition").classList.add("hide");

};

/**
 * Displays the definition from the dictionary API
 */
function displayAlternativeDefinition() {
    document.getElementById("end-definition").innerHTML = mainDefinitionFromApi;
    document.getElementById("dictionary-definition").classList.add("hide");
    document.getElementById("official-definition").classList.remove("hide");

    for (let i = 0; i < excludedWords.length; i++) {
        if (excludedWords[i].includes(keyword)) {
            document.getElementById("end-definition").innerHTML = "No other definition available. Sorry!"

        }
    }

};


/**
 * Checks that the key pressed by the user is a letter and converts it to upper case.
 * Pushes this confirmed letter to the array 'guessedLetters'.
 */
function checkLetter() {
    // Convert the letter to upper case.
    upperGuess = guess.toUpperCase();
    
    // Identify if the letter is in the 'possibleLetters' array and therefore determine if the submitted content is valid.
    let validGuess = possibleLetters.indexOf(upperGuess);

    if (upperGuess.length > 1) {
        alert("Enter a letter in the input field.")
    } else if (validGuess == -1) {
        alert("You must guess a letter; numbers and special characters are not allowed.");
        upperGuess = '';
    } else if (validGuess >= 0) {
        // Check if letter has already been guessed.
        let duplicateLetter = guessedLetters.indexOf(upperGuess) >= 0;

        if (duplicateLetter === true) {
            // Do not allow duplicate guesses.
            alert("You have already guessed this letter, try another.");
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
        changeImage();

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
function changeImage() {
    if (incorrectLettersCount == 1) {
        $("#changing-picture").attr("src", "assets/images/pinkflower_guess1.png");
    } else if (incorrectLettersCount == 2) {
        $("#changing-picture").attr("src", "assets/images/pinkflower_guess2.png");
    } else if (incorrectLettersCount == 3) {
        $("#changing-picture").attr("src", "assets/images/pinkflower_guess3.png");
    } else if (incorrectLettersCount == 4) {
        $("#changing-picture").attr("src", "assets/images/pinkflower_guess4.png");
    } else if (incorrectLettersCount == 5) {
        $("#changing-picture").attr("src", "assets/images/pinkflower_guess5.png");
    } else if (incorrectLettersCount == 6) {
        $("#changing-picture").attr("src", "assets/images/pinkflower_guess6.png");
    } else if (incorrectLettersCount == 7) {
        $("#changing-picture").attr("src", "assets/images/pinkflower_guess7.png");
    } else if (incorrectLettersCount == 8) {
        $("#changing-picture").attr("src", "assets/images/pinkflower_guess8.png");
    } else if (incorrectLettersCount == 0) {
        $("#changing-picture").attr("src", "assets/images/pinkflower_noguess.png");
    }
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
        displayNext();
        displayWin();
        displayWordInfo();
    };
};

/**
 * Hides the input field for 'letter-input' and displays the 'next' button instead.
 */
function displayNext() {
    document.getElementById("letter-input").classList.add("hide");
    document.getElementById("next").classList.remove("hide");
    document.getElementById("next").focus();

}

function displayWin() {
    document.getElementById("definition-display").innerHTML = " \
    <h3>Congratulations!</h3> \
    <p>You guessed all letters correctly.</p> \
    <p>Click 'next' to continue.</p> "
}

function displayLoss() {
    document.getElementById("definition-display").innerHTML = " \
    <h3>Unlucky</h3> \
    <p>You didn't guess all letters correctly this time.</p> \
    <p>Click 'next' to continue.</p> "
}

/**
 * Checks if user has made too many incorrect guesses.
 */
function checkForLoss() {
    if (remainingGuesses == 1) {
        removePoint();
        displayNext();
        displayWordInfo();
        displayLoss()
    };
};

/**
 * Reduces the score by one when a word is not correctly guessed.
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
    document.getElementById("end-definition").innerHTML = topicDefinitions[keywordIndex];
    document.getElementById("end-word").innerHTML = keyword.toUpperCase();
};

/**
 * Displays the value of the 'currentScore' variable.
 */
function displayScore(currentScore) {
    document.getElementById("score-count").innerHTML = currentScore;
};

