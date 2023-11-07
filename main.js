const word = document.getElementById("word");
const wrongLetters = document.getElementById("wrong-letters");
const replayButton = document.getElementById("play-btn");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notifications-container");
const finalMessage = document.getElementById("final-msg");
const reset = document.querySelector(".reset");
const letter = document.querySelector(".letter");
const instructions = document.querySelector(".instructions");
const darkModeToggle = document.getElementById("dark-mode-toggle");


const hangman = document.querySelectorAll(".hangman");

const words = ["java", "python", "php", "javascript"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const goodLettersArray = [];
const wrongLettersArray = [];


function displayWord() {
    word.innerHTML = `
        ${
            selectedWord.split('').map(letter => `
                <span class="letter">${goodLettersArray.includes(letter) ? letter : ''}</span>
                `
            ).join('')
        }
    `;

    displayPopup();
}

function displayPopup() {
    const guessingWord = word.innerText.replace(/\n/g, '');
    if (guessingWord === selectedWord) {
        finalMessage.innerText = "Bravo, tu as gagné! 😃";
        popup.style.display = "flex";
    }
}

function displayNotification() {
    notification.classList.add("display");

    setTimeout(() => {
        notification.classList.remove("display");
    }, 2000);
}

function updateWrongLetterEl() {
    // display wrong letters
    wrongLetters.innerHTML = `${wrongLettersArray.map(letter => `<span>${letter}</span>`)}`;

    // display hangman
    hangman.forEach((partOfBody, index) => {
        const errors = wrongLettersArray.length;
        if (index < errors) {
            partOfBody.style.display = "block";
        } else {
            partOfBody.style.display = "none";
        }
    });

    // check if the player has lost
    if (wrongLettersArray.length === hangman.length) {
        finalMessage.innerText = "Malheureusement, tu as perdu! 😔";
        popup.style.display = "flex";
    }
}

function toggleDarkMode() {
    const body = document.body;
    const a = document.querySelectorAll("a");
    const figureContent = document.querySelector(".figure-content");

    body.classList.toggle("dark-mode");

    if (body.className === "dark-mode"){        
        a.forEach(link => link.style.color = "#fff");
        figureContent.style.stroke = "#fff";      
    } else {
        a.forEach(link => link.style.color = "black"); 
        figureContent.style.stroke = "black"; 
    }
}
  
function resetGame() {
    // clear arrays
    goodLettersArray.splice(0);
    wrongLettersArray.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterEl();
}

function displayRules() {
    const instructionContainer = document.querySelector(".instruction-container");
    instructionContainer.style.display = "flex";
    instructionContainer.addEventListener("click", () => {
        instructionContainer.style.display = "none";
    });
}

window.addEventListener("keydown", e => {

    const letter = e.key.toLowerCase();

    if (letter >= 'a' && letter <= 'z') {
        if (selectedWord.includes(letter)) {
            if (!goodLettersArray.includes(letter)) {
                goodLettersArray.push(letter);
                displayWord();
            } else {
                displayNotification();
            }
        } else {
            if (!wrongLettersArray.includes(letter)) {
                wrongLettersArray.push(letter);
                updateWrongLetterEl();
            } else {
                displayNotification();
            }
        }
    }
});

replayButton.addEventListener("click", () => {
    resetGame();
    popup.style.display = "none";
});

instructions.addEventListener("click", displayRules);

darkModeToggle.addEventListener("change", toggleDarkMode);

reset.addEventListener("click", resetGame);

displayWord();


