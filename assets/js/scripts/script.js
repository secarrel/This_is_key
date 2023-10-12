/* jshint esversion: 8 */

// Set const variables 
const openMenu = document.querySelector("[menu-open-modal]")
const closeMenu = document.getElementById("close-menu")
const menuModal = document.querySelector("[menu-modal]")
const openRules = document.querySelector("[rules-open-modal]")
const closeRules = document.querySelector("[rules-close-modal]")
const rulesModal = document.querySelector("[rules-modal]")
const openWordEnd = document.getElementById("next")
const wordEndModal = document.querySelector("[word-end-modal]")
const closeWordEnd = document.querySelectorAll("[close-word-end-modal]")
const changeTopic = document.querySelectorAll("[change-topic]")
const homeDisplay = document.getElementById("home-display")
const topicsDisplay = document.getElementById("topics-display")
const gamePlayDisplay = document.getElementById("game-play-display")
const navDisplay = document.getElementById("nav-display")




// ---------- Burger Menu --------------

// Get modal and modal buttons

// Event listeners 
openMenu.addEventListener("click", openMenuModal)
function openMenuModal () {
    menuModal.showModal()
}

closeMenu.addEventListener("click", closeMenuModal)
function closeMenuModal () {
    menuModal.close();
}

document.getElementById("change-topic").addEventListener("click", closeMenuModal)
document.getElementById("new-game").addEventListener("click", closeMenuModal)
document.getElementById("new-word").addEventListener("click", closeMenuModal)

// ---------- How to play modal --------------

// Get modal and modal buttons

// Event listeners to open and close the modal 
openRules.addEventListener("click", () => {
    rulesModal.showModal()
})

closeRules.addEventListener("click", () => {
    rulesModal.close()
})

// ---------- Word end modal --------------

// Get modal and modal buttons

// Event listeners to open the modal 
openWordEnd.addEventListener("click", openWordEndModal)

function openWordEndModal () {
    wordEndModal.showModal();
}

for (let i = 0; i < closeWordEnd.length; i++) {
    closeWordEnd[i].addEventListener("click", closeWordEndModal)
}

function closeWordEndModal () {
    wordEndModal.close();
}


// ---------- Game end modal --------------
// Get modal and modal buttons
const gameEndModal = document.querySelector("[game-end-modal]")
document.getElementById("new-game").addEventListener("click", openGameEndModal);
document.getElementById("end-game").addEventListener("click", openGameEndModal)
document.getElementById("close-end-game").addEventListener("click", closeGameEndModal);
document.getElementById("yes-end").addEventListener("click", closeGameEndModal);
document.getElementById("no-continue").addEventListener("click", closeGameEndModal);

function openGameEndModal () {
    gameEndModal.showModal();

}

function closeGameEndModal() {
    gameEndModal.close();
};



// ---------- Show Topics Function --------------

for (let i = 0; i < changeTopic.length; i++) {
    changeTopic[i].addEventListener("click", showTopics)
}

/**
 * Displays all content in the "topics-display" div.
 * Hides all content from "home-display" and "game-play-display" divs.
 */
function showTopics () {
    homeDisplay.style.display = "none";
    topicsDisplay.style.display = "block";
    gamePlayDisplay.style.display = "none";
    navDisplay.style.display = "flex";
}

// ---------- Return to Home Function --------------
const displayHome = document.querySelectorAll("[display-home]")

for (let i = 0; i < displayHome.length; i++) {
    displayHome[i].addEventListener("click", returnToHome)
}

/**
 * Displays all content in the "home-display" div.
 * Hides all content from "topics-display" and "game-play-display" divs.
 */
function returnToHome () {
    homeDisplay.style.display = "block";
    topicsDisplay.style.display = "none";
    gamePlayDisplay.style.display = "none";
    navDisplay.style.display = "none";

}

// ---------- showGamePlay Function --------------
document.getElementById("play").addEventListener("click", showGamePlay)
document.getElementById("new-word").addEventListener("click", showGamePlay)
/**
 * Displays all content in the "game-play-display" div.
 * Hides all content from "topics-display" and "home-display" divs.
 */
function showGamePlay() {
    if (topic !== ''){
        homeDisplay.style.display = "none";
        topicsDisplay.style.display = "none";
        gamePlayDisplay.style.display = "block";
        navDisplay.style.display = "flex";

        newWord();

    } else {
        alert("you must select a topic to continue")
    }
}


