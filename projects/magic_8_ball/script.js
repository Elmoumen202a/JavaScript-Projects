function shakeMagic8Ball() {
    const numbers = Array.from({ length: 8 }, (_, index) => index + 1);
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const answerElement = document.getElementById('answer');
    answerElement.textContent = numbers[randomIndex];

    // Add animation class
    const ballElement = document.getElementById('magic-8-ball');
    ballElement.classList.add('shake-animation');

    // Remove animation class after the animation ends
    setTimeout(() => {
        ballElement.classList.remove('shake-animation');
    }, 500);
}
