// Function to calculate the mean (average) of the input data
function calculateMean(data) {
    // Sum all the numbers in the array and divide by the number of items
    const sum = data.reduce((a, b) => a + b, 0);
    return (sum / data.length).toFixed(2); // Return the mean rounded to 2 decimal places
  }
  
  // Function to calculate the median (middle value) of the input data
  function calculateMedian(data) {
    // Sort the data array in ascending order
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2); // Find the middle index
  
    // If the array length is even, calculate the average of the two middle numbers
    // Otherwise, return the middle number
    return sorted.length % 2 === 0
      ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2)
      : sorted[mid].toFixed(2);
  }
  
  // Function to calculate the mode (most frequent value(s)) of the input data
  function calculateMode(data) {
    const frequency = {}; // Object to store the frequency of each number
  
    // Count how many times each number appears in the data array
    data.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
  
    // Find the highest frequency value
    const maxFreq = Math.max(...Object.values(frequency));
  
    // Find all numbers that have the highest frequency
    const modes = Object.keys(frequency).filter(
      key => frequency[key] === maxFreq
    );
  
    return modes.join(', '); // Return the modes as a comma-separated string
  }
  
  // Event listener for the "Analyze" button
  document.getElementById('analyze-button').addEventListener('click', () => {
    // Get the input data from the textarea
    const input = document.getElementById('data-input').value;
  
    // Convert the input string into an array of numbers
    // Remove whitespace, split by commas, and filter out invalid entries
    const data = input.split(',').map(num => parseFloat(num.trim())).filter(Boolean);
  
    // Check if the user provided valid numeric data
    if (data.length === 0) {
      alert('Please enter valid numeric data.'); // Show an error message if input is invalid
      return;
    }
  
    // Perform calculations for mean, median, and mode
    const mean = calculateMean(data);
    const median = calculateMedian(data);
    const mode = calculateMode(data);
  
    // Display the results in the designated HTML elements
    document.getElementById('mean-result').textContent = `Mean: ${mean}`;
    document.getElementById('median-result').textContent = `Median: ${median}`;
    document.getElementById('mode-result').textContent = `Mode: ${mode}`;
  });
  