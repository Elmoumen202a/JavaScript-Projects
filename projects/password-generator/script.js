// Function to generate a strong password
function generatePassword() {
    // Set the desired password length
    const length = 12;
    
    // Define the character set to be used for the password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    // Initialize an empty string for the password
    let password = "";
    
    // Loop through the desired length of the password
    for (let i = 0, n = charset.length; i < length; ++i) {
        // Randomly select a character from the charset and append it to the password
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    
    // Set the generated password to the input field with id 'password'
    document.getElementById('password').value = password;
}
