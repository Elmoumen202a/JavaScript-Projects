// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 10;

function checkGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    const message = document.getElementById('message');
    const attemptsSpan = document.getElementById('attempts');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100.';
    } else {
        attempts--;
        attemptsSpan.textContent = attempts;

        if (guess === randomNumber) {
            message.textContent = `Congratulations! You guessed the number ${randomNumber} correctly!`;
            document.getElementById('guess').disabled = true;
        } else if (attempts === 0) {
            message.textContent = `Game over! The number was ${randomNumber}.`;
            document.getElementById('guess').disabled = true;
        } else if (guess < randomNumber) {
            message.textContent = 'Too low! Try again.';
        } else if (guess > randomNumber) {
            message.textContent = 'Too high! Try again.';
        }
    }
}
