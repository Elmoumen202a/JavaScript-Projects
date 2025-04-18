// Get the canvas element and its 2D rendering context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game constants
const BALL_RADIUS = 10; // Radius of the ball
const PADDLE_WIDTH = 75; // Width of the paddle
const PADDLE_HEIGHT = 10; // Height of the paddle
const BRICK_WIDTH = 75; // Width of each brick
const BRICK_HEIGHT = 20; // Height of each brick
const BRICK_PADDING = 10; // Space between bricks
const BRICK_OFFSET_TOP = 30; // Distance from the top of the canvas to the first row of bricks
const BRICK_OFFSET_LEFT = 30; // Distance from the left of the canvas to the first column of bricks
const BRICK_ROW_COUNT = 3; // Number of rows of bricks
const BRICK_COLUMN_COUNT = 5; // Number of columns of bricks

// Game state object to store all game-related data
const gameState = {
    ball: {
        x: canvas.width / 2, // Initial x position of the ball
        y: canvas.height - 30, // Initial y position of the ball
        dx: 2, // Horizontal speed of the ball
        dy: -2, // Vertical speed of the ball
        radius: BALL_RADIUS, // Radius of the ball
    },
    paddle: {
        x: (canvas.width - PADDLE_WIDTH) / 2, // Initial x position of the paddle
        y: canvas.height - PADDLE_HEIGHT, // Initial y position of the paddle
        width: PADDLE_WIDTH, // Width of the paddle
        height: PADDLE_HEIGHT, // Height of the paddle
    },
    bricks: [], // 2D array to store brick data
    score: 0, // Player's score
    lives: 3, // Number of lives remaining
    rightPressed: false, // Whether the right arrow key is pressed
    leftPressed: false, // Whether the left arrow key is pressed
};

// Initialize the bricks array
for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
    gameState.bricks[c] = [];
    for (let r = 0; r < BRICK_ROW_COUNT; r++) {
        gameState.bricks[c][r] = { x: 0, y: 0, status: 1 }; // Each brick has x, y, and status (1 = active, 0 = broken)
    }
}

// Event listeners for paddle movement
document.addEventListener("keydown", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        gameState.rightPressed = true; // Set rightPressed to true when the right arrow key is pressed
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        gameState.leftPressed = true; // Set leftPressed to true when the left arrow key is pressed
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        gameState.rightPressed = false; // Set rightPressed to false when the right arrow key is released
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        gameState.leftPressed = false; // Set leftPressed to false when the left arrow key is released
    }
});

// Draw the ball on the canvas
function drawBall() {
    const { x, y, radius } = gameState.ball;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2); // Draw a circle for the ball
    ctx.fillStyle = "#FF6F61"; // Ball color
    ctx.fill();
    ctx.closePath();
}

// Draw the paddle on the canvas
function drawPaddle() {
    const { x, y, width, height } = gameState.paddle;
    ctx.beginPath();
    ctx.rect(x, y, width, height); // Draw a rectangle for the paddle
    ctx.fillStyle = "#6B5B95"; // Paddle color
    ctx.fill();
    ctx.closePath();
}

// Draw the bricks on the canvas
function drawBricks() {
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
            if (gameState.bricks[c][r].status === 1) {
                const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT; // Calculate brick's x position
                const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP; // Calculate brick's y position
                gameState.bricks[c][r].x = brickX;
                gameState.bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT); // Draw a rectangle for the brick
                ctx.fillStyle = "#88B04B"; // Brick color
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Draw the player's score on the canvas
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF"; // Score text color
    ctx.fillText("Score: " + gameState.score, 8, 20); // Display the score
}

// Draw the player's remaining lives on the canvas
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF"; // Lives text color
    ctx.fillText("Lives: " + gameState.lives, canvas.width - 65, 20); // Display the lives
}

// Check for collisions between the ball and bricks
function collisionDetection() {
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
            const b = gameState.bricks[c][r];
            if (b.status === 1) {
                if (
                    gameState.ball.x > b.x &&
                    gameState.ball.x < b.x + BRICK_WIDTH &&
                    gameState.ball.y > b.y &&
                    gameState.ball.y < b.y + BRICK_HEIGHT
                ) {
                    gameState.ball.dy = -gameState.ball.dy; // Reverse the ball's vertical direction
                    b.status = 0; // Mark the brick as broken
                    gameState.score++; // Increase the score
                    if (gameState.score === BRICK_ROW_COUNT * BRICK_COLUMN_COUNT) {
                        alert("YOU WIN, CONGRATULATIONS!"); // Show win message
                        document.location.reload(); // Restart the game
                    }
                }
            }
        }
    }
}

// Update the game state (ball movement, paddle movement, etc.)
function update() {
    const { ball, paddle } = gameState;

    // Ball movement
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx; // Reverse horizontal direction if the ball hits the side walls
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy; // Reverse vertical direction if the ball hits the top wall
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy; // Reverse vertical direction if the ball hits the paddle
        } else {
            gameState.lives--; // Decrease lives if the ball hits the bottom
            if (!gameState.lives) {
                alert("GAME OVER"); // Show game over message
                document.location.reload(); // Restart the game
            } else {
                // Reset ball and paddle position
                ball.x = canvas.width / 2;
                ball.y = canvas.height - 30;
                ball.dx = 2;
                ball.dy = -2;
                paddle.x = (canvas.width - paddle.width) / 2;
            }
        }
    }

    // Paddle movement
    if (gameState.rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7; // Move paddle right
    } else if (gameState.leftPressed && paddle.x > 0) {
        paddle.x -= 7; // Move paddle left
    }

    ball.x += ball.dx; // Update ball's x position
    ball.y += ball.dy; // Update ball's y position
}

// Draw everything on the canvas and update the game state
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawBricks(); // Draw bricks
    drawBall(); // Draw ball
    drawPaddle(); // Draw paddle
    drawScore(); // Draw score
    drawLives(); // Draw lives
    collisionDetection(); // Check for collisions
    update(); // Update game state
    requestAnimationFrame(draw); // Continuously call the draw function
}

draw(); // Start the game
