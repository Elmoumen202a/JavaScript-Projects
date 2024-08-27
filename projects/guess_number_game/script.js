// Generate a random number between 1 and 100 for the user to guess
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Initialize a counter to keep track of the number of attempts
let attempts = 0;

/**
 - This function is triggered when the user submits a guess.
 - It checks if the guess is correct, too high, or too low, and displays a message accordingly.
 */
function makeGuess() {
    // Get the user's guess from the input field and convert it to an integer
    const userGuess = parseInt(document.getElementById('guessInput').value);

    // Get the message element to display feedback to the user
    const message = document.getElementById('message');

    // Increment the number of attempts each time a guess is made
    attempts++;

    // Check if the user's guess matches the randomly generated number
    if (userGuess === randomNumber) {
        // If the guess is correct, display a success message with the number of attempts
        message.textContent = `Correct! You guessed the number in ${attempts} attempts.`;
        message.style.color = 'green';
    } else if (userGuess > randomNumber) {
        // If the guess is too high, display a "too high" message
        message.textContent = 'Too high! Try again.';
        message.style.color = 'red';
    } else {
        // If the guess is too low, display a "too low" message
        message.textContent = 'Too low! Try again.';
        message.style.color = 'red';
    }
}
