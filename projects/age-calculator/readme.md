# Age Calculator

This is a simple web application that calculates your age based on the birthdate you input.

## Project Structure

- `index.html`: The main HTML file that contains the form and displays the result.
- `style.css`: The CSS file that styles the HTML page.
- `script.js`: The JavaScript file that contains the logic for calculating the age.
- `README.md`: This file, which explains the project and the code.

## How to Use

1. Open `index.html` in a web browser.
2. Enter your birthdate in the input field.
3. Click the "Calculate Age" button.
4. Your age will be displayed below the button.

## Code Explanation

### index.html

This file sets up the structure of the web page. It includes a form with a date input for the user to enter their birthdate and a button to submit the form. It also links to the `style.css` for styling and `script.js` for the JavaScript functionality.

### style.css

This file styles the web page to make it look better. It centers the content on the page, styles the form and button, and gives some basic styling to the result text.

### script.js

This file contains the JavaScript code that calculates the age based on the birthdate input.

- `document.getElementById('age-form').addEventListener('submit', function(event) {...})`: Adds an event listener to the form to handle the submit event.
- `event.preventDefault()`: Prevents the default form submission.
- `const birthdate = document.getElementById('birthdate').value`: Gets the value of the birthdate input.
- `const age = calculateAge(birthdate)`: Calculates the age by calling the `calculateAge` function.
- `document.getElementById('result').innerText = ...`: Displays the calculated age.
- `function calculateAge(birthdate) {...}`: A function that calculates the age given a birthdate.

### calculateAge Function

This function calculates the age based on the birthdate input.

- `const birthDate = new Date(birthdate)`: Creates a Date object from the birthdate string.
- `const today = new Date()`: Gets today's date.
- `let age = today.getFullYear() - birthDate.getFullYear()`: Calculates the difference in years.
- `const monthDifference = today.getMonth() - birthDate.getMonth()`: Calculates the difference in months.
- `if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) { age--; }`: Adjusts the age if the birthday hasn't occurred yet this year.

## Conclusion

This project demonstrates a simple web application that calculates a person's age based on their birthdate using HTML, CSS, and JavaScript.
