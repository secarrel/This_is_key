// ---------- Burger Menu --------------

// Get modal and modal buttons
const openMenu = document.querySelector("[menu-open-modal]")
const closeMenu = document.querySelector("[menu-close-modal")
const menuModal = document.querySelector("[menu-modal")

// Event listeners 
openMenu.addEventListener("click", () => {
    menuModal.showModal()
})

closeMenu.addEventListener("click", () => {
    menuModal.close()
})

// ---------- How to play modal --------------

// Get modal and modal buttons
const openButton = document.querySelector("[rules-open-modal]")
const closeButton = document.querySelector("[rules-close-modal")
const rulesModal = document.querySelector("[rules-modal")

// Event listeners to open and close the modal 
openButton.addEventListener("click", () => {
    rulesModal.showModal()
})

closeButton.addEventListener("click", () => {
    rulesModal.close()
})

// ---------- Show Topics Function --------------
/**
 * Displays all content in the "topics-display" div.
 * Hides all content from "home-display" and "game-play-display" divs.
 */
function showTopics () {
    const homeDisplay = document.getElementById("home-display").style.display = "none";
    const topicsDisplay = document.getElementById("topics-display").style.display = "block";
    const gamePlayDisplay = document.getElementById("game-play-display").style.display = "none";
    const navDisplay = document.getElementById("nav-display").style.display = "flex";
}

// ---------- Return to Home Function --------------
/**
 * Displays all content in the "home-display" div.
 * Hides all content from "topics-display" and "game-play-display" divs.
 */
function returnToHome () {
    const homeDisplay = document.getElementById("home-display").style.display = "block";
    const topicsDisplay = document.getElementById("topics-display").style.display = "none";
    const gamePlayDisplay = document.getElementById("game-play-display").style.display = "none";
    const navDisplay = document.getElementById("nav-display").style.display = "none";

}

// ---------- showGamePlay Function --------------
/**
 * Displays all content in the "game-play-display" div.
 * Hides all content from "topics-display" and "home-display" divs.
 */
function showGamePlay() {
    const homeDisplay = document.getElementById("home-display").style.display = "none";
    const topicsDisplay = document.getElementById("topics-display").style.display = "none";
    const gamePlayDisplay = document.getElementById("game-play-display").style.display = "block";
    const navDisplay = document.getElementById("nav-display").style.display = "flex";
}


// ---------- Select Topic Function --------------
/**
 * Selects json file corresponding with click event and uses the 
 * key word array from this file for the newWord() function.
 */
function selectTopic() {
}


// ---------- New Game Function --------------
/**
 * Sets 'current score' to '0', clears temp word array.
 */
function newGame() {

}

// ---------- New Word Function --------------
/**
 * A new word which doesn't appear in the temp word array is 
 * selected by its index using Math.random() and Math.floor() methods.
 * The index is added to a temp word array.
 */
function newWord() {
}