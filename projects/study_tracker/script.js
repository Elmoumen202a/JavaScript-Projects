// Get references to the grid and reset button
const grid = document.getElementById("study-grid");
const resetBtn = document.getElementById("reset-btn");

// Days of the week
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Initialize the grid
function createGrid() {
  days.forEach(day => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = day; // Add the day name
    cell.addEventListener("click", () => toggleCell(cell));
    grid.appendChild(cell);
  });
}

// Toggle the cell between studied and not studied
function toggleCell(cell) {
  cell.classList.toggle("studied");
}

// Reset all cells to the default state
function resetGrid() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.classList.remove("studied"));
}

// Add event listeners
resetBtn.addEventListener("click", resetGrid);

// Create the grid on page load
createGrid();
