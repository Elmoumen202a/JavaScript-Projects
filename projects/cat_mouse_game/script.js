const cat = document.getElementById('cat');
const mouse = document.getElementById('mouse');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
const gameContainer = document.getElementById('game-container');

let wins = 0;
let losses = 0;
let gameRunning = true; // Tracks if the game is running
let catSpeed = 2;
let escapeTime = 30; // Time in seconds for a successful escape
let escapeTimer = null; // Timer for checking if the player escapes
let timeLeft = escapeTime; // Time left to escape

// Position variables
let mouseX = 300;
let mouseY = 300;
let mousePos = { x: 300, y: 300 }; // Track actual mouse position

// Mouse movement logic
gameContainer.addEventListener('mousemove', (e) => {
    if (!gameRunning) return;

    const gameRect = gameContainer.getBoundingClientRect();
    mousePos.x = e.clientX - gameRect.left;
    mousePos.y = e.clientY - gameRect.top;

    // Update the visual mouse's position
    mouse.style.left = `${mousePos.x - mouse.clientWidth / 2}px`;
    mouse.style.top = `${mousePos.y - mouse.clientHeight / 2}px`;
});

// Cat chasing mouse logic
function moveCatTowardsMouse() {
    let catX = cat.offsetLeft;
    let catY = cat.offsetTop;

    if (catX < mousePos.x) catX += catSpeed;
    if (catX > mousePos.x) catX -= catSpeed;
    if (catY < mousePos.y) catY += catSpeed;
    if (catY > mousePos.y) catY -= catSpeed;

    cat.style.left = `${catX}px`;
    cat.style.top = `${catY}px`;
}

// Check if the cat catches the mouse
function checkCollision() {
    const catRect = cat.getBoundingClientRect();
    const mouseRect = mouse.getBoundingClientRect();

    if (
        catRect.left < mouseRect.left + mouseRect.width &&
        catRect.left + catRect.width > mouseRect.left &&
        catRect.top < mouseRect.top + mouseRect.height &&
        catRect.top + catRect.height > mouseRect.top
    ) {
        losses++;
        endGame('Game Over! The Cat Caught the Mouse!');
    }
}

// Timer to check for successful escape
function startEscapeTimer() {
    escapeTimer = setInterval(() => {
        timeLeft--;
        statusText.textContent = `Time left to escape: ${timeLeft}s`;

        if (timeLeft <= 0) {
            wins++;
            endGame('You Win! You Escaped the Cat!');
        }
    }, 1000);
}

// End game logic
function endGame(message) {
    clearInterval(gameLoop);
    clearInterval(escapeTimer);
    gameRunning = false;
    statusText.textContent = `${message} Wins: ${wins}, Losses: ${losses}`;
    restartButton.style.display = 'block';
}

// Restart game logic
function restartGame() {
    // Reset positions of cat and mouse
    cat.style.left = '0px';
    cat.style.top = '0px';
    mouse.style.left = '300px';
    mouse.style.top = '300px';

    // Reset game variables
    gameRunning = true;
    timeLeft = escapeTime;
    statusText.textContent = 'Move your mouse to control the mouse!';
    restartButton.style.display = 'none';

    // Restart game loop and timer
    gameLoop = setInterval(gameTick, 50);
    startEscapeTimer();
}

// Main game tick (move the cat, check for collisions)
function gameTick() {
    moveCatTowardsMouse();
    checkCollision();
}

// Start the game loop and timer on page load
let gameLoop = setInterval(gameTick, 50);
startEscapeTimer();

// Add event listener for restart button
restartButton.addEventListener('click', restartGame);
