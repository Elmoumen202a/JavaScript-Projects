// List of words for the game
const words = ["javascript", "html", "css", "react", "node", "python", "java"];

// Variables to hold the selected word, guessed letters, and attempts left
let selectedWord;
let guessedLetters;
let attemptsLeft;

// Function to start or restart the game
function startGame() {
    // Randomly select a word from the words array
    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    // Initialize guessed letters as an empty array
    guessedLetters = [];
    
    // Set the number of attempts to 6 (you can change this number)
    attemptsLeft = 6;
    
    // Update the displayed word and attempts left
    updateWordDisplay();
    updateAttemptsDisplay();
    
    // Clear any messages and input field
    document.getElementById("message").innerText = "";
    document.getElementById("letter-input").value = "";
    
    // Hide the restart button at the beginning
    document.getElementById("restart-button").style.display = "none";
}

// Function to update the displayed word based on guessed letters
function updateWordDisplay() {
    const wordContainer = document.getElementById("word-container");
    
    // Create a string that shows the letters and underscores for unguessed letters
    wordContainer.innerHTML = selectedWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
}

// Function to update the display of attempts left
function updateAttemptsDisplay() {
    document.getElementById("attempts-left").innerText = attemptsLeft;
}

// Function to handle the letter guessing logic
function guessLetter() {
    // Get the letter input from the text box
    const letterInput = document.getElementById("letter-input");
    const letter = letterInput.value.toLowerCase(); // Convert to lowercase
    letterInput.value = ""; // Clear the input field

    // Check if the input is empty or if the letter has already been guessed
    if (!letter || guessedLetters.includes(letter)) {
        return; // Exit the function if invalid
    }

    // Add the guessed letter to the guessed letters array
    guessedLetters.push(letter);

    // If the letter is not in the selected word, decrease attempts left
    if (!selectedWord.includes(letter)) {
        attemptsLeft--;
    }

    // Update the display of the word and attempts left
    updateWordDisplay();
    updateAttemptsDisplay();
    
    // Check if the game is over (either win or lose)
    checkGameStatus();
}

// Function to check the current game status
function checkGameStatus() {
    // If attempts are less than or equal to 0, the player loses
    if (attemptsLeft <= 0) {
        document.getElementById("message").innerText = `Game Over! The word was "${selectedWord}".`;
        document.getElementById("restart-button").style.display = "block"; // Show restart button
    } 
    // If all letters have been guessed, the player wins
    else if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        document.getElementById("message").innerText = "Congratulations! You've guessed the word!";
        document.getElementById("restart-button").style.display = "block"; // Show restart button
    }
}

// Add event listeners for button clicks
document.getElementById("guess-button").addEventListener("click", guessLetter);
document.getElementById("restart-button").addEventListener("click", startGame);

// Start the game when the page loads
startGame();
