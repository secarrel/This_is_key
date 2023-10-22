/* jshint esversion: 11 */

// ----------------------- Set Variables -------------------------
const topicSelection = document.getElementsByName("topic-select");
const dictionaryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const biologyJson = "assets/js/biology_keywords/";
const errorMessage = document.getElementById("error-message");
const definitionDisplay = document.getElementById("definition-display");
const inputField = document.getElementById("letter-input");
const topicId = document.getElementById("id-topic");
let keywordOptions = [];
let keyword = "";
let keywordUpper = "";
let keywordLetters = [];
let remainingGuesses = 8;
let currentScore = 0;
let wordProgress = "";
let guess = "";
let guessedLetters = [];
let upperGuess = "";
let incorrectLetters = [];
let incorrectLettersCount = [];
let correctLetters = [];
let win = false;
let loss = false;
let topic = "";
let topicDefinitions = [];
let keywordIndexOptions = [];
let keywordIndex = "";
let mainDefinitionFromApi = "";
let excludedWords = [
  "tissue",
  "multicellular",
  "organ system",
  "epithelial cell",
  "pH",
  "cell",
  "passive transport",
  "selectively permeable",
  "electron microscopy",
  "diffusion",
  "concentration gradient",
  "active site",
  "alveoli",
  "denature",
  "differentiation",
  "gas exchange",
  "human thorax",
  "alkaline",
  "Benedicts reagent",
  "biuret solution",
  "calorimetry",
  "egestion",
  "Visking tubing",
  "calorimetry",
  "sedentary",
  "Alien species",
  "Pollution",
  "Ecosystem diversity",
  "Species diversity",
  "Behavioural adaptations",
  "Capture-recapture",
  "Genetic diversity",
  "Morphological adaptations",
  "Non-flowering plants",
  "Prey",
  "Protein synthesis",
  "Punnett square",
  "Complementary base pairing",
  "Triplet code",
  "Dominant",
  "Genetic profiling",
  "Meiosis",
  "Single gene inheritance",
  "Asexual reproduction",
  "Pesticide resistance",
  "Heritable variation",
  "Environmental variation",
  "Genetic variation",
  "Continuous variation",
  "Antibiotic resistance",
  "Discontinuous variation",
];

// ----------------------- Event Listeners -------------------------
// To make the code testable with Jest, I have used the optional chaining operator '?.'
// on event listeners. This allows the rest of the code to be tested in Jest.

// Triggers reset for a new game.
document.getElementById("yes-end")?.addEventListener("click", reset);

// Triggers the letter input submission.
document.getElementById("letter-input")?.addEventListener("input", letterInput);

// Triggers the newWord function.
document.getElementById("next-word")?.addEventListener("click", newWord);

// Triggers the focus function so the input field is focused.
document.getElementById("next-word")?.addEventListener("click", focus);

// Triggers the getPronounciation function.
document.getElementById("speak")?.addEventListener("click", getPronounciation);

// Triggers alternative definition display.
document
  .getElementById("dictionary-definition")
  ?.addEventListener("click", displayAlternativeDefinition);

// Triggers WJEC definition display.
document
  .getElementById("official-definition")
  ?.addEventListener("click", displayOfficialWJECDefinition);

// Triggers display of rules modal at any time using the footer option.
document
  .querySelector("[footer-rules]")
  ?.addEventListener("click", showRulesModal);

// ----------------------- Functions -------------------------

/**
 * Sets the value of the input field to the 'guess' variable and processes guess.
 */
function letterInput() {
  guess = document.getElementById("letter-input").value;
  checkLetter();
  updateWordProgress(upperGuess);
  checkForWin();
  checkForLoss();
  setTimeout(clear, 200);
  focus();
}

/**
 * Empties all temporary arrays.
 */
function reset() {
  currentScore = 0;
  keywordLetters = [];
  keywordOptions = [];
  keywordIndexOptions = [];
  topicDefinitions = [];
  topic = "";
  resetWordArrays();

  document.getElementById("remaining-guesses-count").innerHTML =
    remainingGuesses;

  displayScore();
}

/**
 * Reset all temporary arrays which relate to individual words.
 */
function resetWordArrays() {
  guessedLetters = [];
  correctLetters = [];
  incorrectLetters = [];
  incorrectLettersCount = 0;
  updatedWordProgress = "";
  upperGuess = "";
  remainingGuesses = 8;
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

  topic = clicked.id;
  jsonFile = biologyJson.concat(topic) + ".json";
  getData(jsonFile);

  displayTopic(topic);
}

/**
 * Displays the current topic ID on the game-play display.
 */
function displayTopic(topic) {
  topicId.innerHTML = topic?.toUpperCase();
}

/**
 * Fetch the data from the relevant json file and create seperate word and definition arrays.
 */
async function getData(jsonFile) {
  const response = await fetch(jsonFile);
  const jsonData = await response.json();
  jsonData.forEach(function (item) {
    keywordOptions.push(item.word);
    topicDefinitions.push(item.definition);
  });

  createIndexOptions();

  showGamePlay();
}

/**
 * Uses the dictionary API to fetch a dictionary definition for the keyword.
 */
async function getDictionaryData(keyword) {
  let dictionaryFile = dictionaryURL + keyword;
  let dictionaryDefinition = [];

  try {
    const response = await fetch(dictionaryFile);
    const dictionaryData = await response.json();

    dictionaryDefinition.push(dictionaryData);

    mainDefinitionFromApi =
      dictionaryDefinition[0][0].meanings[0].definitions[0].definition;
  } catch {
    console.log("ERROR: word doesn't exist in dictionary API");
  }
}

/**
 * Creates a new array for keywords indexes.
 */
function createIndexOptions() {
  for (let i = 0; i < keywordOptions.length; i++) {
    keywordIndexOptions.push(i);
  }
}

/**
 * Generates a new random word from the 'keywordOptions' array.
 */
function newWord() {
  checkWordArray();
  resetWordArrays();
  document.getElementById("letter-array").innerHTML = incorrectLetters;
  displayRemainingGuesses();
  changeImage();
  generateWord();
  getDictionaryData(keyword);
  displayScore();
  updateWordProgress(upperGuess);
  displayDefinition();
  displayOfficialWJECDefinition();

  document.getElementById("letter-input").classList.remove("hide");
  document.getElementById("next").classList.add("hide");

  focus();
}

/**
 *  Assigns a random word from the keywordOptions array to be the 'keyword'.
 */
function generateWord() {
  randomiseKeywordOptions();
  keywordIndex = keywordIndexOptions[keywordIndexOptions.length - 1];
  keywordIndexOptions.pop(keywordIndex);
  keyword = keywordOptions[keywordIndex];
  keywordUpper = keyword.toUpperCase();
  keywordLetters = keywordUpper.split("");
}

/**
 * Provides text to speech audio of the keyword value.
 */
function getPronounciation() {
  let pronounciation = new SpeechSynthesisUtterance(keyword);
  speechSynthesis.speak(pronounciation);
}

/**
 * Sorts the keywordOptions array in to a random order.
 */
function randomiseKeywordOptions() {
  keywordIndexOptions.sort(function () {
    return 0.5 - Math.random();
  });
  console.log(keywordIndexOptions);
}

/**
 * Checks if all words in 'keywordOptions' array have been used.
 */
function checkWordArray() {
  if (keywordIndexOptions.length == 0) {
    definitionDisplay.innerHTML =
      "You have used all words in this topic. Start a new game or choose another topic.";
    definitionDisplay.style.color = "#c95e00";
    setTimeout(showTopics, 6000);
    colorReset();
  }
}

function colorReset() {
  definitionDisplay.style.color = "#0e3312";
}

/**
 * Displays the definition linked to the keyword.
 */
function displayDefinition() {
  let hintDefinition = document.getElementById("definition-display");
  hintDefinition.innerHTML = "Hint: <br>" + topicDefinitions[keywordIndex];
  return hintDefinition;
}

/**
 * Displays the official WJEC definition for the keyword and displays the button to show an alternative definition.
 */
function displayOfficialWJECDefinition() {
  document.getElementById("end-definition").innerHTML =
    "<p><em>WJEC definition:</em></p>" + topicDefinitions[keywordIndex];
  document.getElementById("dictionary-definition").classList.remove("hide");
  document.getElementById("official-definition").classList.add("hide");
}

/**
 * Displays the definition from the dictionary API and displays a message if there is no alternative definition avaialble.
 */
function displayAlternativeDefinition() {
  document.getElementById("end-definition").innerHTML =
    "<p><em>Dictionary definition:</em></p>" + mainDefinitionFromApi;
  document.getElementById("dictionary-definition").classList.add("hide");
  document.getElementById("official-definition").classList.remove("hide");

  for (let i = 0; i < excludedWords.length; i++) {
    if (excludedWords[i].includes(keyword)) {
      document.getElementById("end-definition").innerHTML =
        "No other definition available. Sorry!";
    }
  }

  return mainDefinitionFromApi;
}

/**
 * Checks that the key pressed by the user is a letter and converts it to upper case.
 * Pushes this confirmed letter to the array 'guessedLetters'.
 */
function checkLetter() {
  // Convert the letter to upper case.
  upperGuess = guess.toUpperCase();

  // Identify if the letter is in the 'possibleLetters' array and therefore determine if the submitted content is valid.
  let validGuess = possibleLetters.indexOf(upperGuess);

  if (validGuess == -1) {
    errorMessage.innerHTML =
      "You must guess a letter; numbers and special characters are not allowed.";
    upperGuess = "";
  } else if (validGuess >= 0) {
    // Check if letter has already been guessed.
    let duplicateLetter = guessedLetters.indexOf(upperGuess) >= 0;

    if (duplicateLetter === true) {
      // Do not allow duplicate guesses.
      errorMessage.innerHTML =
        "You have already guessed this letter, try another.";
    } else {
      // If the guess is a letter and not a duplicate, add it to the 'guessedLetters' array.
      guessedLetters.push(upperGuess);
      checkGuess();
    }
  }

  remainingGuesses++;

  setTimeout(clear, 200);
  focus();
  setTimeout(clearError, 3000);
}

/**
 * Focus on the input field.
 */
function focus() {
  document.getElementById("letter-input").focus();
}

/**
 * Clear the input field.
 */
function clear() {
  document.getElementById("letter-input").value = "";
}

/**
 * Clears any Error message.
 */
function clearError() {
  errorMessage.innerHTML = "";
}

/**
 * Checks if the guessed letter is anywhere in the keyword.
 */
function checkGuess() {
  let letterPosition = keywordLetters.indexOf(upperGuess);
  if (letterPosition >= 0) {
    // If the letter is in the keyword, add the letter to 'correctLetters' array.
    correctLetters.push(upperGuess);
    inputField.style.backgroundColor = "#1f7c2893";
    setTimeout(resetInputColour, 500);
  } else if (letterPosition == -1) {
    // If the letter is not in the keyword, add the letter to 'incorrectLetters' array.
    incorrectLetters.push(upperGuess);
    inputField.style.backgroundColor = "#c95e0079";
    // Display incorrect letters for user to see.
    let letterDisplay = document.getElementById("letter-array");
    letterDisplay.innerHTML = incorrectLetters.join("");
    // Subtract 1 from remaining guesses count.
    remainingCount();
    changeImage();
    setTimeout(resetInputColour, 500);
    return letterDisplay;
  }
}

/**
 * Changes the background colour of the input field to the colour on page load.
 */
function resetInputColour() {
  inputField.style.backgroundColor = "#b5b9b473";
}

/**
 * Reduces 1 from the value of 'remainingGuesses' and updates the 'Remaining Guesses' display for the user.
 */
function remainingCount() {
  incorrectLettersCount++;
  remainingGuesses = 8 - incorrectLettersCount;
  displayRemainingGuesses();
  return remainingGuesses;
}

/**
 * Displays the current value of remainingGuesses.
 */
function displayRemainingGuesses() {
  let displayGuesses = document.getElementById("remaining-guesses-count");
  displayGuesses.innerHTML = remainingGuesses;
  return displayGuesses;
}

// /**
//  * Changes the image every time an incorrect letter is guessed.
//  */
function changeImage() {
  let changingPicture = document.getElementById("changing-picture");

  if (incorrectLettersCount == 1) {
    changingPicture.setAttribute("src", "assets/images/pinkflower_guess1.png");
  } else if (incorrectLettersCount == 2) {
    changingPicture.setAttribute("src", "assets/images/pinkflower_guess2.png");
  } else if (incorrectLettersCount == 3) {
    changingPicture.setAttribute("src", "assets/images/pinkflower_guess3.png");
  } else if (incorrectLettersCount == 4) {
    changingPicture.setAttribute("src", "assets/images/pinkflower_guess4.png");
  } else if (incorrectLettersCount == 5) {
    changingPicture.setAttribute("src", "assets/images/pinkflower_guess5.png");
  } else if (incorrectLettersCount == 6) {
    changingPicture.setAttribute("src", "assets/images/pinkflower_guess6.png");
  } else if (incorrectLettersCount == 7) {
    changingPicture.setAttribute("src", "assets/images/pinkflower_guess7.png");
  } else if (incorrectLettersCount == 8) {
    changingPicture.setAttribute("src", "assets/images/pinkflower_guess8.png");
  } else if (incorrectLettersCount == 0) {
    changingPicture.setAttribute("src", "assets/images/pinkflower_noguess.png");
  }
  return changingPicture;
}

/**
 * Runs a 'for loop' so the guessed letter is checked against every letter in the keyword. If there is a match,
 * the matching letter is displayed. If there is not a match, the letters are displayed as underscores.
 */
function updateWordProgress(upperGuess) {
  updatedWordProgress = "";

  for (let i = 0; i < keyword.length; i++) {
    if (correctLetters.includes(keyword[i].toUpperCase())) {
      // If the letter has been correctly guessed, use the letter from the keyword.
      updatedWordProgress += keyword[i];
    } else if (upperGuess.toUpperCase() === keyword[i].toUpperCase()) {
      // If the guessed letter matches the letter in the keyword, use the guessed letter.
      updatedWordProgress += upperGuess;
    } else if (keyword[i] === " ") {
      // If the keyword contains a space, replace this with a slash.
      updatedWordProgress += "/";
    } else if (keyword[i] === "-") {
      // If the keyword contains a dash, display this as a dash.
      updatedWordProgress += "-";
    } else {
      // Otherwise, use an underscore.
      updatedWordProgress += "_ ";
    }
  }

  //Display the changes made to wordProgress.
  wordProgress = updatedWordProgress.toUpperCase();
  document.getElementById("word-display").innerHTML = wordProgress;

  return wordProgress;
}

/**
 * Checks if user has correctly guessed all letters in the word.
 */
function checkForWin() {
  if (wordProgress.includes("_")) {
    return win;
  } else {
    ++currentScore;
    displayScore();
    displayNext();
    displayWin();
    displayWordInfo();
    return currentScore;
  }
}

/**
 * Hides the input field for 'letter-input' and displays the 'next' button instead.
 */
function displayNext() {
  document.getElementById("letter-input").classList.add("hide");
  document.getElementById("next").classList.remove("hide");
  document.getElementById("next").focus();
}

/**
 * Displays a message to the user if the keyword is guessed correctly.
 */
function displayWin() {
  document.getElementById("definition-display").innerHTML =
    "<h3>Congratulations!</h3>" +
    "<p>You guessed all letters correctly.</p>" +
    "<p>Click 'next' to continue.</p>";
}

/**
 * Displays a message to the user if the keyword is not guessed correctly.
 */
function displayLoss() {
  document.getElementById("definition-display").innerHTML =
    "<h3>Unlucky</h3>" +
    "<p>You didn't guess all letters correctly this time.</p>" +
    "<p>Click 'next' to continue.</p>";
}

/**
 * Checks if user has made too many incorrect guesses.
 */
function checkForLoss() {
  if (remainingGuesses == 1) {
    displayNext();
    displayWordInfo();
    displayLoss();
    loss = true;
  }
  return loss;
}

/**
 * Displays the keyword and definition in the word end modal.
 */
function displayWordInfo() {
  document.getElementById("end-definition").innerHTML =
    topicDefinitions[keywordIndex];
  document.getElementById("end-word").innerHTML = keyword.toUpperCase();
}

/**
 * Displays the value of the 'currentScore' variable.
 */
function displayScore() {
  document.getElementById("score-count").innerHTML = currentScore;
  return currentScore;
}

try {
  module.exports = {
    displayScore,
    checkForWin,
    checkForLoss,
    remainingCount,
    displayRemainingGuesses,
    changeImage,
    displayDefinition,
    updateWordProgress,
    displayTopic,
    checkGuess,
    checkLetter,
    displayAlternativeDefinition,
    upperGuess,
    keyword,
  };
} catch {
  console.log("Module exports");
}
