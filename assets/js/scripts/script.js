/* jshint esversion: 11 */

// --------- Set const variables for all interactive navigation elements ----------
// Header
const openMenu = document.getElementById("nav-menu");

// Home display
const displayHome = document.getElementsByClassName("display-home");
const getStarted = document.getElementById("get-started");
const openRules = document.getElementById("rules-button");

// Game display
const openWordEnd = document.getElementById("next");

// Word end modal
const wordEndModal = document.getElementById("word-modal");
const nextWord = document.getElementById("next-word");
const endGame = document.getElementById("end-game");
const changeTopic = document.getElementById("change-topic");

// Nav Menu modal
const menuModal = document.getElementById("menu-modal");
const newTopic = document.getElementById("new-topic");
const newGame = document.getElementById("new-game");
const differentWord = document.getElementById("new-word");
const closeMenu = document.getElementById("close-menu");

// Footer
const footerRules = document.getElementById("footer-rules");
const openAbout = document.getElementById("open-about-modal");

// Game End modal
const gameEndModal = document.getElementById("game-end-modal");
const end = document.getElementById("yes-end");
const noEnd = document.getElementById("no-continue");
const closeEndGame = document.getElementById("close-end-game");

// About modal
const closeAbout = document.getElementById("close-about-modal");
const aboutModal = document.getElementById("about-modal");

// Rules modal
const rulesModal = document.getElementById("rules-modal");
const closeRules = document.getElementById("rules-close-modal");

// Sections Display
const homeDisplay = document.getElementById("home-display");
const topicsDisplay = document.getElementById("topics-display");
const gamePlayDisplay = document.getElementById("game-play-display");
const navDisplay = document.getElementById("nav-display");

// ---------- Burger Menu --------------
// Event listeners to open and close the modal
openMenu.addEventListener("click", openMenuModal);
closeMenu.addEventListener("click", closeMenuModal);
newGame.addEventListener("click", closeMenuModal);
differentWord.addEventListener("click", closeMenuModal);
newTopic.addEventListener("click", closeMenuModal);

/**
 * Open the menu modal
 */
function openMenuModal() {
  menuModal.showModal();
}

/**
 * Close the menu modal
 */
function closeMenuModal() {
  menuModal.close();
}

// ---------- How to play modal --------------
openRules.addEventListener("click", showRulesModal);
footerRules.addEventListener("click", showRulesModal);

closeRules.addEventListener("click", closeRulesModal);

/**
 * Close the rules modal.
 */

function closeRulesModal() {
  rulesModal.close();
}

/**
 * Displays the rules modal.
 */
function showRulesModal() {
  rulesModal.showModal();
}

// ---------- About modal --------------
// Event listeners to open and close the modal.
openAbout.addEventListener("click", showAbout);
closeAbout.addEventListener("click", closeAboutModal);

/**
 * Open About modal.
 */
function showAbout() {
  aboutModal.showModal();
}

/**
 * Close About modal.
 */
function closeAboutModal() {
  aboutModal.close();
}

// ---------- Word end modal --------------
// Event listeners to open the modal
openWordEnd.addEventListener("click", openWordEndModal);

changeTopic.addEventListener("click", closeWordEndModal);
nextWord.addEventListener("click", closeWordEndModal);
endGame.addEventListener("click", closeWordEndModal);

/**
 * Closes the word end modal.
 */
function closeWordEndModal() {
  wordEndModal.close();
}

/**
 * Opens the word end modal.
 */
function openWordEndModal() {
  wordEndModal.showModal();
}

// ---------- Game end modal --------------
// Event listeners to open the modal
newGame.addEventListener("click", openGameEndModal);
endGame.addEventListener("click", openGameEndModal);
closeEndGame.addEventListener("click", closeGameEndModal);
end.addEventListener("click", closeGameEndModal);
noEnd.addEventListener("click", closeGameEndModal);

/**
 * Opens the end game modal.
 */
function openGameEndModal() {
  gameEndModal.showModal();
}

/**
 * Closes the end game modal.
 */
function closeGameEndModal() {
  gameEndModal.close();
}

// ---------- Show Topics Function --------------
getStarted.addEventListener("click", showTopics);
newTopic.addEventListener("click", showTopics);
noEnd.addEventListener("click", showTopics);
changeTopic.addEventListener("click", showTopics);

/**
 * Displays all content in the "topics-display" div.
 * Hides all content from "home-display" and "game-play-display" divs.
 */
function showTopics() {
  homeDisplay.style.display = "none";
  topicsDisplay.style.display = "flex";
  gamePlayDisplay.style.display = "none";
  navDisplay.style.display = "flex";
}

// ---------- Return to Home Function --------------
for (let i = 0; i < displayHome.length; i++) {
  displayHome[i].addEventListener("click", returnToHome);
}

/**
 * Displays all content in the "home-display" div.
 * Hides all content from "topics-display" and "game-play-display" divs.
 */
function returnToHome() {
  homeDisplay.style.display = "flex";
  topicsDisplay.style.display = "none";
  gamePlayDisplay.style.display = "none";
  navDisplay.style.display = "none";
}

// ---------- showGamePlay Function --------------
differentWord.addEventListener("click", showGamePlay);

/**
 * Displays all content in the "game-play-display" div.
 * Hides all content from "topics-display" and "home-display" divs.
 */
function showGamePlay() {
  if (topic !== "") {
    homeDisplay.style.display = "none";
    topicsDisplay.style.display = "none";
    gamePlayDisplay.style.display = "flex";
    navDisplay.style.display = "flex";

    newWord();
  } else {
    alert("Select a topic to play.");
  }
}
