# Password Generator

This project is a simple web application to generate strong passwords. It includes an HTML file for the structure, a CSS file for styling, and a JavaScript file for the functionality.

## Files

- **index.html**: The main HTML file that contains the structure of the webpage.
- **script.js**: The JavaScript file that contains the logic to generate a strong password.
- **style.css**: The CSS file that contains the styles for the webpage.
- **README.md**: This file that explains the project.

## How to Use

1. Open the `index.html` file in a web browser.
2. Click the "Generate" button to create a new strong password.
3. The generated password will be displayed in the input box.

## Key Code Explanations

### HTML

- The `index.html` file contains a simple form with a button to generate the password and an input field to display it.

### JavaScript

- The `script.js` file contains the `generatePassword` function which creates a random password using a set of characters.

```javascript
function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById('password').value = password;
}
