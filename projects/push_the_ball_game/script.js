// Get the ball and target elements from the DOM by their IDs
const ball = document.getElementById('ball');
const target = document.getElementById('target');
const message = document.getElementById('message');

// Initialize ball's starting position (x and y coordinates)
let ballPosition = { x: 175, y: 175 };

// Event listener for keydown events (keyboard input)
// This listens for when a player presses an arrow key and moves the ball
document.addEventListener('keydown', (e) => {
    const step = 10; // Defines how much the ball moves with each key press

    // Check which arrow key was pressed and move the ball accordingly
    switch (e.key) {
        case 'ArrowUp':
            // Move the ball up by decreasing the y-coordinate
            ballPosition.y -= step;
            break;
        case 'ArrowDown':
            // Move the ball down by increasing the y-coordinate
            ballPosition.y += step;
            break;
        case 'ArrowLeft':
            // Move the ball left by decreasing the x-coordinate
            ballPosition.x -= step;
            break;
        case 'ArrowRight':
            // Move the ball right by increasing the x-coordinate
            ballPosition.x += step;
            break;
    }

    // Update the ball's position on the screen using the updated coordinates
    ball.style.top = `${ballPosition.y}px`;
    ball.style.left = `${ballPosition.x}px`;

    // Check if the ball has reached the target area
    checkWin();
});

// Function to check if the ball is inside the target area
function checkWin() {
    // Get the bounding rectangles (position and size) of the ball and target
    const ballRect = ball.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Check if the ball's rectangle overlaps with the target's rectangle
    if (ballRect.right < targetRect.left || ballRect.left > targetRect.right ||
        ballRect.bottom < targetRect.top || ballRect.top > targetRect.bottom) {
        // If the ball is not in the target area, show a message to keep pushing
        message.textContent = "Keep pushing!";
    } else {
        // If the ball is in the target area, show the winning message
        message.textContent = "You Win!";
        // Remove the event listener to stop the game (ball can't move after winning)
        document.removeEventListener('keydown', moveBall);
    }
}
