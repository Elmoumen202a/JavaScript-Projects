// DOM Elements
const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const gameOverText = document.getElementById('game-over');
const restartButton = document.getElementById('restart');
const winCountDisplay = document.getElementById('win-count');
const loseCountDisplay = document.getElementById('lose-count');

// Variables
let playerPosition = 180; // Starting position of the player
const playerSpeed = 20; // Speed of movement
let blocks = []; // Array to store falling blocks
let isGameOver = false;
let winCount = 0; // Number of wins
let loseCount = 0; // Number of losses

// Set the initial position of the player
player.style.left = `${playerPosition}px`;

// Function to handle player movement
document.addEventListener('keydown', (event) => {
    if (isGameOver) return; // Stop movement if the game is over

    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= playerSpeed;
    } else if (event.key === 'ArrowRight' && playerPosition < gameContainer.offsetWidth - player.offsetWidth) {
        playerPosition += playerSpeed;
    }
    player.style.left = `${playerPosition}px`;
});

// Function to create a new falling block
function createBlock() {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = `${Math.random() * (gameContainer.offsetWidth - 50)}px`;
    block.style.top = `-60px`; // Start above the game container
    gameContainer.appendChild(block);
    blocks.push(block);
}

// Function to update block positions
function updateBlocks() {
    blocks.forEach((block, index) => {
        const blockTop = parseInt(window.getComputedStyle(block).getPropertyValue('top'));
        const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
        const playerLeft = parseInt(player.style.left);
        const playerTop = gameContainer.offsetHeight - player.offsetHeight;

        if (blockTop > gameContainer.offsetHeight) {
            block.remove(); // Remove block when it leaves the game area
            blocks.splice(index, 1); // Remove from array
            winCount++; // Increment win count when a block is avoided
            updateScore();
        } else {
            block.style.top = `${blockTop + 5}px`; // Move block down

            // Check collision with the player
            if (
                blockTop + 50 >= playerTop && // Block reaches player's vertical position
                blockLeft < playerLeft + 40 && // Block overlaps player's left edge
                blockLeft + 50 > playerLeft // Block overlaps player's right edge
            ) {
                endGame();
            }
        }
    });
}

// Function to update the score display
function updateScore() {
    winCountDisplay.textContent = `Wins: ${winCount}`;
    loseCountDisplay.textContent = `Losses: ${loseCount}`;
}

// Function to end the game
function endGame() {
    isGameOver = true;
    loseCount++; // Increment lose count
    updateScore();
    gameOverText.style.display = 'block'; // Show game over message
    clearInterval(blockSpawner); // Stop creating blocks
    clearInterval(blockUpdater); // Stop updating blocks
    restartButton.style.display = 'block'; // Show restart button
}

// Restart the game
function restartGame() {
    // Reset variables
    isGameOver = false;
    playerPosition = 180;
    player.style.left = `${playerPosition}px`;
    gameOverText.style.display = 'none';
    restartButton.style.display = 'none';
    blocks.forEach((block) => block.remove()); // Remove all blocks
    blocks = []; // Clear the blocks array

    // Restart game loop
    blockSpawner = setInterval(() => {
        if (!isGameOver) createBlock();
    }, 1000);

    blockUpdater = setInterval(() => {
        if (!isGameOver) updateBlocks();
    }, 30);
}

// Add event listener to the restart button
restartButton.addEventListener('click', restartGame);

// Game loop
let blockSpawner = setInterval(() => {
    if (!isGameOver) createBlock();
}, 1000); // Create a new block every second

let blockUpdater = setInterval(() => {
    if (!isGameOver) updateBlocks();
}, 30); // Update block positions every 30ms
