// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Array to hold the card values
    const cards = ["A", "B", "C", "D", "E", "F", "G", "H"];
    
    // Array to hold corresponding hidden words for each card
    const hiddenWords = ["Apple", "Banana", "Cat", "Dog", "Elephant", "Fish", "Glorious", "Horse"];
    
    // Arrays to keep track of flipped and matched cards
    let flippedCards = [];
    let matchedCards = [];

    // Reference to the game board element
    const gameBoard = document.getElementById("game-board");

    // Function to shuffle an array using the Fisher-Yates algorithm
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Swap elements at currentIndex and randomIndex
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    // Function to create a card element with a given card value and hidden word
    function createCardElement(cardValue, hiddenWord) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `
            <span>${cardValue}</span>
            <span class="hidden-word">${hiddenWord}</span>
        `;
        cardElement.addEventListener("click", () => flipCard(cardElement, cardValue));
        return cardElement;
    }

    // Function to render the game board
    function renderBoard() {
        // Shuffle the cards array
        const shuffledCards = shuffle(cards);

        // Create card elements and append them to the game board
        shuffledCards.forEach((cardValue, index) => {
            const hiddenWord = hiddenWords[index];
            const cardElement = createCardElement(cardValue, hiddenWord);
            gameBoard.appendChild(cardElement);
        });
    }

    // Function to handle card flipping
    function flipCard(cardElement, cardValue) {
        if (flippedCards.length < 2 && !flippedCards.includes(cardElement) && !matchedCards.includes(cardValue)) {
            // Add the "flip" class to show the card face
            cardElement.classList.add("flip");
            flippedCards.push(cardElement);

            if (flippedCards.length === 2) {
                // Wait for a moment and then check for a match
                setTimeout(checkMatch, 1000);
            }
        }
    }

    // Function to check if the flipped cards match
    function checkMatch() {
        const [firstCard, secondCard] = flippedCards;
        const firstCardValue = firstCard.innerText;
        const secondCardValue = secondCard.innerText;

        if (firstCardValue === secondCardValue) {
            // If cards match, add the card value to the matched cards array
            matchedCards.push(firstCardValue);
            flippedCards = [];

            // If all cards are matched, show a congratulatory message and reset the game
            if (matchedCards.length === cards.length / 2) {
                alert("Congratulations! You've won!");
                resetGame();
            }
        } else {
            // If cards don't match, flip them back after a short delay
            setTimeout(() => {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                flippedCards = [];
            }, 500);
        }
    }

    // Function to reset the game
    function resetGame() {
        // Clear the game board
        gameBoard.innerHTML = "";
        
        // Reset flipped and matched cards arrays
        flippedCards = [];
        matchedCards = [];
        
        // Render a new game board
        renderBoard();
    }

    // Initial rendering of the game board
    renderBoard();
});
