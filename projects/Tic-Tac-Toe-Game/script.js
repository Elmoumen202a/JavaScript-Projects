document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

    function handleCellClick(event) {
        const index = event.target.getAttribute('data-index');
        
        if (board[index] !== null || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        if (checkWin()) {
            statusText.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== null)) {
            statusText.textContent = 'Draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        return winPatterns.some(pattern => 
            pattern.every(index => board[index] === currentPlayer)
        );
    }

    function restartGame() {
        board.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        statusText.textContent = `${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
});
