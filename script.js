let bitSize = 1;
let numberToGuess;
let binaryNumberToGuess;

function newRound() {
    numberToGuess = Math.floor(Math.random() * Math.pow(2, bitSize));
    binaryNumberToGuess = numberToGuess.toString(2).padStart(bitSize, '0');
    document.getElementById("prompt").innerText = `Guess the ${bitSize}-bit number in binary! (0 to ${Math.pow(2, bitSize) - 1})`;
    document.getElementById("guess").value = '';
    document.getElementById("result").innerText = '';
}

function makeGuess() {
    const guess = document.getElementById("guess").value;

    if (!/^[01]+$/.test(guess) || guess.length !== bitSize) {
        document.getElementById("result").innerText = `Invalid input! Please enter a ${bitSize}-bit binary number.`;
        return;
    }

    if (guess < binaryNumberToGuess) {
        document.getElementById("result").innerText = "Higher in binary!";
    } else if (guess > binaryNumberToGuess) {
        document.getElementById("result").innerText = "Lower in binary!";
    } else {
        document.getElementById("result").innerText = "Congratulations! You guessed it right in binary! 🎉";
        bitSize *= 2;
        newRound();
    }
}

// Add event listener for keypress
document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});

// Start the first round
newRound();
