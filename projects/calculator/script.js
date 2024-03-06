// Initialize variables to track user input and calculation history
let currentInput = '';
let history = [];

// Function to update the display with the current input
function updateDisplay() {
  document.getElementById('display').value = currentInput;
}

// Function to append a number to the current input
function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

// Function to append a symbol (operator or decimal point) to the current input
function appendSymbol(symbol) {
  currentInput += symbol;
  updateDisplay();
}

// Function to remove the last character from the current input (backspace)
function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

// Function to clear the entire display and reset the input
function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

// Function to perform the calculation based on the current input
function calculate() {
  try {
    // Use eval to evaluate the expression and calculate the result
    const result = eval(currentInput);

    // Save the calculation history
    history.push(`${currentInput} = ${result}`);

    // Update the current input with the result
    currentInput = String(result);
    updateDisplay();
  } catch (error) {
    // Handle errors (e.g., division by zero)
    currentInput = 'Error';
    updateDisplay();
  }
}
