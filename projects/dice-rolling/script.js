// Add an event listener to the 'Roll Dice' button
document.getElementById('rollButton').addEventListener('click', rollDice);

// Function to roll the dice
function rollDice() {
    // Get the dice element from the DOM
    const dice = document.getElementById('dice');
    
    // Generate a random number between 1 and 6 (inclusive)
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    
    // Get the corresponding dice face character for the generated number
    const diceFace = getDiceFace(randomNumber);
    
    // Set the text content of the dice element to the dice face character
    dice.textContent = diceFace;
}

// Function to get the dice face character based on the number
function getDiceFace(number) {
    // Array of unicode characters representing dice faces from 1 to 6
    const diceFaces = [
        '⚀', // Unicode for dice face 1
        '⚁', // Unicode for dice face 2
        '⚂', // Unicode for dice face 3
        '⚃', // Unicode for dice face 4
        '⚄', // Unicode for dice face 5
        '⚅'  // Unicode for dice face 6
    ];
    
    // Return the corresponding dice face character
    // The array index is number - 1 because arrays are zero-indexed
    return diceFaces[number - 1];
}
