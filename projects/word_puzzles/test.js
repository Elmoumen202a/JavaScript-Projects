// test.js

// Mock the HTML elements used in the game
document.body.innerHTML = `
    <div id="word-container"></div>
    <input type="text" id="letter-input" />
    <button id="guess-button">Guess</button>
    <div id="message"></div>
    <div id="attempts-left">Attempts Left: <span id="attempts-left"></span></div>
    <button id="restart-button" style="display: none;">Restart Game</button>
`;

// Import the functions from script.js
// Assuming you have a way to access the functions directly or modify the script for testing purposes

// Mock the words array to control the random selection
const words = ["test", "game", "code"];

// Function to reset the game for testing
function resetGame() {
    selectedWord = "test"; // Set a predictable word
    guessedLetters = [];
    attemptsLeft = 6;
}

// Test the startGame function
function testStartGame() {
    startGame();
    console.assert(selectedWord === "test", "Failed: The selected word should be 'test'");
    console.assert(attemptsLeft === 6, "Failed: The attempts left should be 6");
    console.assert(guessedLetters.length === 0, "Failed: Guessed letters should be empty");
    console.log("Passed: startGame() tests");
}

// Test the updateWordDisplay function
function testUpdateWordDisplay() {
    resetGame();
    updateWordDisplay();
    console.assert(document.getElementById("word-container").innerHTML === "_ _ _ _", "Failed: Display should show underscores for each letter");
    
    guessedLetters.push('t');
    updateWordDisplay();
    console.assert(document.getElementById("word-container").innerHTML === "t _ _ _", "Failed: Should reveal the letter 't'");
    
    guessedLetters.push('e');
    updateWordDisplay();
    console.assert(document.getElementById("word-container").innerHTML === "t e _ _", "Failed: Should reveal the letter 'e'");
    
    console.log("Passed: updateWordDisplay() tests");
}

// Test the guessLetter function
function testGuessLetter() {
    resetGame();
    guessLetter(); // Guess a letter (you should simulate user input)
    console.assert(attemptsLeft === 5, "Failed: Attempts left should decrease on wrong guess");
    
    guessedLetters.push('a'); // Simulate correct guess
    guessLetter();
    console.assert(attemptsLeft === 5, "Failed: Attempts should not decrease on correct guess");
    
    console.log("Passed: guessLetter() tests");
}

// Test the checkGameStatus function
function testCheckGameStatus() {
    resetGame();
    checkGameStatus(); // Check game status after reset
    console.assert(attemptsLeft === 6, "Failed: Should have 6 attempts left");

    // Simulate guessing the word correctly
    guessedLetters.push('t', 'e', 's');
    checkGameStatus();
    console.assert(attemptsLeft === 6, "Failed: Should not end the game yet");

    guessedLetters.push('t', 'a'); // Incorrect guess
    attemptsLeft--; // Manually simulate a wrong guess
    checkGameStatus();
    console.assert(attemptsLeft === 5, "Failed: Should have 5 attempts left");

    console.log("Passed: checkGameStatus() tests");
}

// Run all tests
testStartGame();
testUpdateWordDisplay();
testGuessLetter();
testCheckGameStatus();
