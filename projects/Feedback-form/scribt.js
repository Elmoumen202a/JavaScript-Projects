document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    // Create feedback item
    const feedbackItem = document.createElement('li');
    feedbackItem.textContent = `Name: ${name}, Email: ${email}, Feedback: ${feedback}`;

    // Append feedback item to the list
    document.getElementById('feedback-items').appendChild(feedbackItem);

    // Clear form
    document.getElementById('feedback-form').reset();
});
