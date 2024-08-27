// Tests for the Guess the Number game
function testGame() {
    let testPassed = true;

    function assertEqual(actual, expected, description) {
        if (actual !== expected) {
            console.error(`Test failed: ${description}. Expected ${expected}, but got ${actual}`);
            testPassed = false;
        }
    }

    // Simulate a game with known outcomes
    randomNumber = 50; // Override the random number for testing

    assertEqual(randomNumber, 50, "Random number should be 50");

    let resultMessage;
    
    // Test higher guess
    resultMessage = makeGuess(75);
    assertEqual(resultMessage, 'Too high! Try again.', "Guess 75 should be too high");

    // Test lower guess
    resultMessage = makeGuess(25);
    assertEqual(resultMessage, 'Too low! Try again.', "Guess 25 should be too low");

    // Test correct guess
    resultMessage = makeGuess(50);
    assertEqual(resultMessage, `Correct! You guessed the number in 3 attempts.`, "Guess 50 should be correct");

    if (testPassed) {
        console.log("All tests passed!");
    }
}

// Run the tests
testGame();
