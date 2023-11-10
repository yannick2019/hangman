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
const virtualKeyboard = document.getElementById("virtual-keyboard");


const hangman = document.querySelectorAll(".hangman");
const goodLetterSound = new Audio('./short-success-sound.mp3');
const playerWinSound = new Audio('./win-sound.mp3');
const playerLoseSound = new Audio('./negative_beeps.mp3');
const wrongLetterSound = new Audio('./failure-drum-sound.mp3');

//const words = ["java", "python", "php", "javascript", "vite", "bootstrap", "laravel", "react", "github"];

//let selectedWord = words[Math.floor(Math.random() * words.length)];

const goodLettersArray = [];
const wrongLettersArray = [];

let isWordFetched = false;
let selectedWord;

async function displayWord() {
    // Check if the word has already been fetched for this game session
    if (!isWordFetched) {
        const req = await fetch("https://trouve-mot.fr/api/random");
        const data = await req.json();
        selectedWord = data[0].name;
        isWordFetched = true;
        console.log(selectedWord);
    }

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
    const displayGuessingWord = document.getElementById("display-guessing-word");
    if (guessingWord === selectedWord) {
        playerWinSound.play();
        finalMessage.innerText = "Bravo, tu as gagné! 😃";
        displayGuessingWord.style.display = "none";
        popup.style.display = "flex";
    }
}

function displayNotification() {
    notification.classList.add("display");

    setTimeout(() => {
        notification.classList.remove("display");
    }, 2000);
}

async function updateWrongLetterEl() {
    // display wrong letters
    wrongLetters.innerHTML = `${wrongLettersArray.map(letter => `<span>${letter}</span>`)}`;

    // display hangman
    hangman.forEach((partOfBody, index) => {
        const errors = wrongLettersArray.length;
        if (index < errors) {
            partOfBody.style.display = "block";
            // Add shake animation to wrong guesses
            partOfBody.classList.add("shake");
            wrongLetterSound.play();
            setTimeout(() => {
                partOfBody.classList.remove("shake");
            }, 200);
        } else {
            partOfBody.style.display = "none";
        }
    });

    // check if the player has lost
    if (wrongLettersArray.length === hangman.length) {
        const displayGuessingWord = document.getElementById("display-guessing-word");

        finalMessage.innerText = "Malheureusement, tu as perdu! 😔";
        playerLoseSound.play();
        displayGuessingWord.style.display = "block";
        displayGuessingWord.innerText = `Mot caché : ${ await selectedWord}`;
        popup.style.display = "flex";
    }
}

function toggleDarkMode() {
    const body = document.body;
    const a = document.querySelectorAll("a");
    const figureContent = document.querySelector(".figure-content");
    const img = document.querySelector(".img");

    body.classList.toggle("dark-mode");

    if (body.className === "dark-mode"){        
        a.forEach(link => link.style.color = "#fff");
        figureContent.style.stroke = "#fff";  
        img.style.backgroundColor = "#fff";
    } else {
        a.forEach(link => link.style.color = "black"); 
        figureContent.style.stroke = "black"; 
        img.style.removeProperty("background-color");
    }
}
  
async function resetGame() {
    // clear arrays
    goodLettersArray.splice(0);
    wrongLettersArray.splice(0);

    // Allow fetching a new word for the next game session
    isWordFetched = false;

    await displayWord();

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

    if (/^[a-zàâçéèêëîïôûùüÿœæ]$/.test(letter)) {
        if (selectedWord.includes(letter)) {
            if (!goodLettersArray.includes(letter)) {
                goodLettersArray.push(letter);
                goodLetterSound.play();
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

virtualKeyboard.addEventListener("click", (e) => {
    if (e.target.classList.contains("keyboard-button")) {
        const letter = e.target.textContent.toLowerCase();
        if (selectedWord.includes(letter)) {
            if (!goodLettersArray.includes(letter)) {
                goodLettersArray.push(letter);
                goodLetterSound.play();
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


