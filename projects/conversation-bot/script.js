// Add event listeners to the "Send" button and the input field for the 'Enter' key
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function to handle sending a message
function sendMessage() {
    // Get user input and trim whitespace
    const userInput = document.getElementById('user-input').value.trim();
    // Do nothing if the input is empty
    if (userInput === '') return; 

    // Display user message
    appendMessage('user-message', userInput); 
    // Clear the input field
    document.getElementById('user-input').value = ''; 

    // Simulate a delay for bot response
    setTimeout(() => {
        // Get bot response based on user input
        const botResponse = getBotResponse(userInput);
        // Display bot response
        appendMessage('bot-message', botResponse); 
    }, 500); 
}

// Function to append a message to the chat box
function appendMessage(className, text) {
    // Get the chat box element
    const chatBox = document.getElementById('chat-box'); 
    // Create a new div element for the message
    const message = document.createElement('div');
    // Add appropriate class for styling
    message.className = 'message ' + className;
    // Set the text content of the message 
    message.textContent = text; 
    // Append the message to the chat box
    chatBox.appendChild(message); 
    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight; 
}

// Function to generate a bot response based on user input
function getBotResponse(input) {
    // Simple bot logic with basic keyword matching
    if (input.toLowerCase().includes('hello')) {
        return 'Hello! How are you?';
    } else if (input.toLowerCase().includes('how are you')) {
        return 'I am just a bot, but I am functioning as expected!';
    } else {
        return 'I am not sure how to respond to that.';
    }
}
