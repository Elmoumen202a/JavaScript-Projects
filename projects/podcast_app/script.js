document.addEventListener("DOMContentLoaded", () => {
    // Selecting login, logout buttons, and all podcast like buttons
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const likeButtons = document.querySelectorAll(".like-btn");

    // Variable to track if the user is logged in or not
    let isLoggedIn = false;

    // Login functionality
    loginBtn.addEventListener("click", () => {
        isLoggedIn = true; // User is now logged in
        loginBtn.style.display = "none"; // Hide login button
        logoutBtn.style.display = "inline-block"; // Show logout button
        alert("Logged in successfully!"); // Inform the user
    });

    // Logout functionality
    logoutBtn.addEventListener("click", () => {
        isLoggedIn = false; // User is now logged out
        loginBtn.style.display = "inline-block"; // Show login button
        logoutBtn.style.display = "none"; // Hide logout button
        alert("Logged out successfully!"); // Inform the user
    });

    // Like/Unlike functionality for each podcast
    likeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Check if the user is logged in before allowing likes
            if (!isLoggedIn) {
                alert("Please login to like podcasts!"); // Prompt login if not logged in
                return; // Exit if not logged in
            }

            // Get the like count span (the next sibling element of the button)
            const likeCountSpan = button.nextElementSibling;
            let currentCount = parseInt(likeCountSpan.textContent); // Convert the text content to a number
            
            // Check if the podcast is already liked
            if (button.classList.contains("liked")) {
                // If liked, unlike it
                button.classList.remove("liked"); // Remove the liked class
                button.textContent = "Like"; // Change button text back to "Like"
                currentCount--; // Decrease the like count
            } else {
                // If not liked, like it
                button.classList.add("liked"); // Add the liked class
                button.textContent = "Unlike"; // Change button text to "Unlike"
                currentCount++; // Increase the like count
            }
            
            // Update the like count displayed in the span
            likeCountSpan.textContent = currentCount;
        });
    });
});
