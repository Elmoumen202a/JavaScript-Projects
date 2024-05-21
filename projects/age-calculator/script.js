document.getElementById('age-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    
    const birthdate = document.getElementById('birthdate').value; // Get the value of the birthdate input
    const age = calculateAge(birthdate); // Calculate the age
    document.getElementById('result').innerText = `You are ${age} years old.`; // Display the age
});

/**
 * Function to calculate age given a birthdate
 * @param {string} birthdate - The birthdate in YYYY-MM-DD format
 * @returns {number} - The calculated age
 */
function calculateAge(birthdate) {
    const birthDate = new Date(birthdate); // Create a Date object from the birthdate string
    const today = new Date(); // Get today's date
    
    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the difference in years
    
    // Check if the birthday has occurred yet this year
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--; // If the birthday hasn't occurred yet, subtract one year from the age
    }
    
    return age; // Return the calculated age
}
