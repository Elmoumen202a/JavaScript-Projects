const vocabulary = [
    { german: "das Haus", english: " House" },
    { german: "das Auto", english: "Car" },
    { german: "die Schule", english: "School" },
    // Add more words as needed
];

let currentIndex = 0;

function displayWord() {
    document.getElementById("germanWord").textContent = vocabulary[currentIndex].german;
    document.getElementById("englishTranslation").textContent = vocabulary[currentIndex].english;
}

function nextWord() {
    currentIndex = (currentIndex + 1) % vocabulary.length;
    displayWord();
}

document.getElementById("nextBtn").addEventListener("click", nextWord);

// Display the first word when the page loads
displayWord();
