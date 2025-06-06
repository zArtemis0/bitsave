let bitSize = parseInt(localStorage.getItem("bitSize")) || 1;
let numberToGuess;
let binaryNumberToGuess;
let startTime;
let guessCount = 0;

function newRound() {
    numberToGuess = Math.floor(Math.random() * Math.pow(2, bitSize));
    binaryNumberToGuess = numberToGuess.toString(2).padStart(bitSize, '0');
    document.getElementById("prompt").innerText = `Guess the ${bitSize}-bit number in binary! (0 to ${Math.pow(2, bitSize) - 1})`;
    document.getElementById("guess").value = '';
    document.getElementById("result").innerText = '';
    document.getElementById("timer").innerText = '';
    document.getElementById("guesses").innerText = `Guesses: 0`;
    startTime = Date.now();
    guessCount = 0;
}

function makeGuess() {
    const guess = document.getElementById("guess").value;

    if (!/^[01]+$/.test(guess) || guess.length !== bitSize) {
        document.getElementById("result").innerText = `Invalid input! Please enter a ${bitSize}-bit binary number.`;
        return;
    }

    guessCount++;
    document.getElementById("guesses").innerText = `Guesses: ${guessCount}`;

    if (guess === binaryNumberToGuess) {
        let elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(2);
        document.getElementById("result").innerText = `🎉 Correct! You took ${elapsedSeconds} seconds and ${guessCount} guesses.`;
        bitSize *= 2;
        localStorage.setItem("bitSize", bitSize);
        setTimeout(newRound, 2000);
    } else {
        document.getElementById("result").innerText = "Incorrect. Try again.";
    }
}

document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});

function resetProgress() {
    localStorage.removeItem("bitSize");
    bitSize = 1;
    newRound();
}

newRound();
