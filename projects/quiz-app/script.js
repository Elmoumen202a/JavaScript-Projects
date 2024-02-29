// Select the HTML element with the ID 'quiz-container'
const quizContainer = document.getElementById('quiz-container');

// Define an array of questions with options and correct answers
const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 'Paris'
    },
    {
        question: 'Which is the largest planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correctAnswer: 'Jupiter'
    },
    // Add more questions as needed
];

// Function to build the quiz dynamically
function buildQuiz() {
    // Iterate through each question in the array
    questions.forEach((question, index) => {
        // Create a div element for each question
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        // Set the inner HTML of the question div with the question text
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

        // Create a list element for options
        const optionsList = document.createElement('ul');
        optionsList.classList.add('options');

        // Iterate through each option for the current question
        question.options.forEach((option) => {
            // Create a list item for each option
            const optionElement = document.createElement('li');
            optionElement.classList.add('option');
            // Set the inner HTML of the option list item with the option text and a radio button
            optionElement.innerHTML = `<input type="radio" name="q${index}" value="${option}"> ${option}`;
            // Append the option list item to the options list
            optionsList.appendChild(optionElement);
        });

        // Append the options list to the question div
        questionElement.appendChild(optionsList);
        // Append the question div to the quiz container
        quizContainer.appendChild(questionElement);
    });

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('btn');
    submitButton.innerHTML = 'Submit';
    // Add an event listener to the submit button to show results when clicked
    submitButton.addEventListener('click', showResults);
    // Append the submit button to the quiz container
    quizContainer.appendChild(submitButton);
}

// Function to show quiz results
function showResults() {
    // Select all elements with the class 'options' inside the quiz container
    const answerContainers = quizContainer.querySelectorAll('.options');
    let score = 0;

    // Iterate through each question in the array
    questions.forEach((question, index) => {
        // Select the radio button that is checked for the current question
        const selectedOption = answerContainers[index].querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            // Get the value (selected answer) of the checked radio button
            const userAnswer = selectedOption.value;
            // Check if the user's answer is correct and increment the score
            if (userAnswer === question.correctAnswer) {
                score++;
            }
        }
    });

    // Create a result message with the user's score
    const resultMessage = `You scored ${score} out of ${questions.length} questions.`;
    // Create a div element for the result message
    const resultElement = document.createElement('div');
    resultElement.classList.add('feedback');
    // Set the inner HTML of the result div with the result message
    resultElement.innerHTML = resultMessage;
    // Append the result div to the quiz container
    quizContainer.appendChild(resultElement);
}

// Call the buildQuiz function to initialize the quiz
buildQuiz();
