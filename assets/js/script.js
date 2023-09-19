// ---------- How to play modal --------------

// Get modal and modal buttons
const openButton = document.querySelector("[rules-open-modal]")
const closeButton = document.querySelector("[rules-close-modal")
const rulesModal = document.querySelector("[rules-modal")

// Event listeners 
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
}

// ---------- Select Topic Function --------------
function selectTopic() {
}

// ---------- startGame Function --------------
/**
 * Displays all content in the "game-play-display" div.
 * Hides all content from "topics-display" and "home-display" divs.
 */
function startGame() {
    const homeDisplay = document.getElementById("home-display").style.display = "none";
    const topicsDisplay = document.getElementById("topics-display").style.display = "none";
    const gamePlayDisplay = document.getElementById("game-play-display").style.display = "block";
}