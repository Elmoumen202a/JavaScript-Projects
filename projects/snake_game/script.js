// Get the canvas element and context (to draw on the canvas)
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = 400;
canvas.height = 400;

// Define the snake and game variables
const snake = [{ x: 200, y: 200 }];
let food = getRandomFoodPosition();
let direction = { x: 0, y: 0 }; // Snake starts with no movement
let score = 0;
let wins = 0;
let losses = 0;

// Generate a random position for the food
function getRandomFoodPosition() {
    return {
        // Random x position on a 10x10 grid
        x: Math.floor(Math.random() * 40) * 10, 
        // Random y position on a 10x10 grid
        y: Math.floor(Math.random() * 40) * 10, 
    };
}

// Draw the game elements (snake, food, score)
function draw() {
    // Clear the canvas before drawing the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach(part => {
        ctx.fillStyle = "green";
        // Draw each snake segment
        ctx.fillRect(part.x, part.y, 10, 10); 
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10); // Draw food

    // Display score, wins, and losses
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Wins: ${wins}`, 10, 40);
    ctx.fillText(`Losses: ${losses}`, 10, 60);
}

// Update the snake's position and check game conditions
function update() {
    // Move the snake's head by adding a new head at the current direction
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // Add the new head at the front of the snake

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++; // Increase the score
        food = getRandomFoodPosition(); // Generate a new random food position
    } else {
        snake.pop(); // If no food eaten, remove the snake's tail
    }

    // Check if the snake hits the wall or itself
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || checkCollision()) {
        losses++; // Increase the loss count
        resetGame(); // Reset the game after a loss
    }

    // If the score reaches 10, the player wins
    if (score === 10) {
        wins++; // Increase the win count
        resetGame(); // Reset the game after a win
    }
}

// Check if the snake collides with itself
function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true; // Collision detected
        }
    }
    return false; // No collision
}

// Reset the game to its initial state after a win/loss
function resetGame() {
    snake.length = 1; // Reset the snake to one segment
    snake[0] = { x: 200, y: 200 }; // Reset the snake's starting position
    direction = { x: 0, y: 0 }; // Stop the snake's movement
    score = 0; // Reset the score
}

// Handle keyboard input to change the snake's direction
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -10 }; // Move up
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 10 }; // Move down
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -10, y: 0 }; // Move left
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 10, y: 0 }; // Move right
            break;
    }
});

// Main game loop that runs continuously
function gameLoop() {
    draw(); // Draw the snake, food, and game elements
    update(); // Update the game logic
    setTimeout(gameLoop, 100); // Set the game speed (100ms per frame)
}

// Start the game loop
gameLoop();
