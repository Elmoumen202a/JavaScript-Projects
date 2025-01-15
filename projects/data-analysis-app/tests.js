// Test data
const testData = [10, 20, 20, 30, 40];

// Test calculateMean function
console.assert(calculateMean(testData) === '24.00', 'Mean test failed');

// Test calculateMedian function
console.assert(calculateMedian(testData) === '20.00', 'Median test failed');

// Test calculateMode function
console.assert(calculateMode(testData) === '20', 'Mode test failed');

console.log('All tests passed!');
