// Main script for AI functionality
document.addEventListener("DOMContentLoaded", () => {
    // Get references to HTML elements
    const lessonSection = document.getElementById("lesson"); // Area to display lessons
    const startLessonBtn = document.getElementById("start-lesson-btn"); // Button to start lessons
    const quizSection = document.getElementById("quiz"); // Area to display quiz questions
    const submitQuizBtn = document.getElementById("submit-quiz-btn"); // Button to submit quiz answers
    const resultsSection = document.getElementById("results-section"); // Area to show results
    const resultsDisplay = document.getElementById("results"); // Text to display the quiz score

    // A list of lessons (German word and its English meaning)
    const lessons = [
        { german: "Hallo", english: "Hello" },
        { german: "Tschüss", english: "Goodbye" },
        { german: "Danke", english: "Thank you" },
        { german: "Bitte", english: "Please" },
    ];

    // Quiz data with questions, options, and the correct answer
    const quiz = [
        { question: "What does 'Hallo' mean?", options: ["Hello", "Goodbye", "Thank you"], answer: "Hello" },
        { question: "What does 'Bitte' mean?", options: ["Goodbye", "Please", "Thank you"], answer: "Please" },
    ];

    let currentLesson = 0; // Track the current lesson being displayed

    // Function to display the next lesson
    startLessonBtn.addEventListener("click", () => {
        if (currentLesson < lessons.length) {
            // Show the current lesson (German word and English meaning)
            const { german, english } = lessons[currentLesson];
            lessonSection.textContent = `German: ${german} - English: ${english}`;
            currentLesson++; // Move to the next lesson
        } else {
            // If all lessons are completed, inform the user
            lessonSection.textContent = "You've completed all lessons!";
            startLessonBtn.disabled = true; // Disable the lesson button
            loadQuiz(); // Load the quiz section
        }
    });

    // Function to load the quiz
    function loadQuiz() {
        // Loop through each question in the quiz
        quiz.forEach((q, index) => {
            // Create a container for the question
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `<p>${q.question}</p>`; // Display the question text

            // Create radio buttons for each option
            q.options.forEach(option => {
                const input = document.createElement("input");
                input.type = "radio"; // Radio button for single selection
                input.name = `q${index}`; // Group options for the same question
                input.value = option; // Set the value to the option text
                questionDiv.appendChild(input);
                questionDiv.innerHTML += `${option}<br>`; // Add the option text
            });

            // Add the question to the quiz section
            quizSection.appendChild(questionDiv);
        });

        // Show the "Submit Quiz" button
        submitQuizBtn.hidden = false;
    }

    // Function to handle quiz submission and calculate the score
    submitQuizBtn.addEventListener("click", () => {
        let score = 0; // Initialize the score

        // Check each question and count correct answers
        quiz.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`); // Get the selected option
            if (selected && selected.value === q.answer) {
                score++; // Increase score for correct answers
            }
        });

        // Show the results section with the user's score
        resultsSection.hidden = false;
        resultsDisplay.textContent = `You scored ${score} out of ${quiz.length}!`;
    });
});
