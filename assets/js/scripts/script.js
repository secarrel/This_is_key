// ---------- Burger Menu --------------

// Get modal and modal buttons
const openMenu = document.querySelector("[menu-open-modal]")
const closeMenu = document.querySelector("[menu-close-modal]")
const menuModal = document.querySelector("[menu-modal]")

// Event listeners 
openMenu.addEventListener("click", () => {
    menuModal.showModal()
})

closeMenu.addEventListener("click", () => {
    menuModal.close()
})

// ---------- How to play modal --------------

// Get modal and modal buttons
const openRules = document.querySelector("[rules-open-modal]")
const closeRules = document.querySelector("[rules-close-modal]")
const rulesModal = document.querySelector("[rules-modal]")

// Event listeners to open and close the modal 
openRules.addEventListener("click", () => {
    rulesModal.showModal()
})

closeRules.addEventListener("click", () => {
    rulesModal.close()
})

// ---------- Word end modal --------------

// Get modal and modal buttons
const openWordEndModal = document.getElementById("next")
const wordEndModal = document.querySelector("[word-end-modal]")

// Event listeners to open the modal 
openWordEndModal.addEventListener("click", () => {
    wordEndModal.showModal()
})


// ---------- Game end modal --------------

// Get modal and modal buttons
// const openGameEnd = document.querySelector("[-open-modal]")
// const closeGameEnd = document.querySelector("[-close-modal]")
// const gameEndModal = document.querySelector("[-modal]")

// // Event listeners to open and close the modal 
// openWordInfo.addEventListener("click", () => {
//     wordInfoModal.showModal()
// })

// closeWordInfo.addEventListener("click", () => {
//     wordInfoModal.close()
// })

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


