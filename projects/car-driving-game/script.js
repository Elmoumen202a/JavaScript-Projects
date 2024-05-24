const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const carWidth = 50;
const carHeight = 100;
let carX = (canvas.width - carWidth) / 2;
let carY = canvas.height - carHeight - 10;

const obstacleWidth = 50;
const obstacleHeight = 100;
let obstacles = [];

let rightPressed = false;
let leftPressed = false;

let score = 0;
let gameOver = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawCar() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

function drawObstacles() {
    for(let i = 0; i < obstacles.length; i++) {
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacleWidth, obstacleHeight);
        obstacles[i].y += 5;
        if(obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
        }
    }
}

function checkCollision() {
    for(let i = 0; i < obstacles.length; i++) {
        if(carX < obstacles[i].x + obstacleWidth &&
           carX + carWidth > obstacles[i].x &&
           carY < obstacles[i].y + obstacleHeight &&
           carY + carHeight > obstacles[i].y) {
            gameOver = true;
        }
    }
}

function draw() {
    if(gameOver) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    drawObstacles();
    checkCollision();

    if(rightPressed && carX < canvas.width - carWidth) {
        carX += 5;
    } else if(leftPressed && carX > 0) {
        carX -= 5;
    }

    requestAnimationFrame(draw);
}

function addObstacle() {
    let x = Math.random() * (canvas.width - obstacleWidth);
    obstacles.push({ x: x, y: 0 });
}

setInterval(addObstacle, 2000);

draw();
