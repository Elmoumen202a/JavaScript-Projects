// Array of motivational quotes
const quotes = [
    "Push yourself, because no one else is going to do it for you.",
    "Success starts with self-discipline.",
    "The body achieves what the mind believes.",
    "Train insane or remain the same.",
    "Wake up. Work out. Kick ass. Repeat."
];

// Function to display a random quote in the hero section
function displayRandomQuoteInHero() {
    const quoteElement = document.createElement("p"); // Create a new paragraph element
    const randomIndex = Math.floor(Math.random() * quotes.length); // Get a random index from the quotes array
    quoteElement.textContent = quotes[randomIndex]; // Set the text content to the random quote
    document.querySelector("#quote-container").appendChild(quoteElement); // Append the quote to the hero section
}

// Function to change the motivational quote every 5 seconds
function changeMotivationalQuote() {
    const motivationQuoteElement = document.querySelector("#motivation-quote"); // Get the motivation quote element
    let index = 0; // Start with the first quote
    setInterval(() => {
        motivationQuoteElement.textContent = quotes[index]; // Update the quote text
        index = (index + 1) % quotes.length; // Move to the next quote, loop back to the start if necessary
    }, 5000); // Change every 5 seconds
}

// Initialize functions when the page loads
window.onload = function() {
    displayRandomQuoteInHero(); // Display a random quote in the hero section
    changeMotivationalQuote(); // Start the interval for changing quotes
    updateSummary(); // Update the summary section
};

// Event listeners for button clicks
document.getElementById("add-workout-btn").addEventListener("click", addWorkout); // Add workout button
document.getElementById("add-meal-btn").addEventListener("click", addMeal); // Add meal button
document.getElementById("add-water-btn").addEventListener("click", addWater); // Add water button
document.getElementById("calculate-bmi-btn").addEventListener("click", calculateBMI); // Calculate BMI button

// Array to store meal data
let meals = [];

// Function to add a meal to the calorie tracker
function addMeal() {
    const mealName = document.getElementById("meal-name").value; // Get the meal name from the input field
    const calories = parseInt(document.getElementById("meal-calories").value, 10); // Get the calories as a number

    if (mealName && !isNaN(calories)) { // Ensure valid input
        meals.push({ mealName, calories }); // Add the meal to the meals array
        updateCalorieTracker(); // Update the displayed calorie tracker
        updateSummary(); // Update the summary section
    } else {
        alert("Please enter valid meal details."); // Show an error if input is invalid
    }
}

// Function to update the calorie tracker display
function updateCalorieTracker() {
    let totalCalories = 0; // Initialize total calories
    const calorieList = document.createElement("ul"); // Create a list to display meals
    meals.forEach((meal) => {
        totalCalories += meal.calories; // Add up the calories
        const listItem = document.createElement("li"); // Create a list item for each meal
        listItem.textContent = `${meal.mealName}: ${meal.calories} calories`; // Set the list item text
        calorieList.appendChild(listItem); // Add the list item to the list
    });

    const trackerDiv = document.querySelector("#calorie-tracker"); // Get the calorie tracker div
    trackerDiv.innerHTML = ""; // Clear previous content
    trackerDiv.appendChild(calorieList); // Add the updated list

    const totalCaloriesElement = document.createElement("p"); // Create a paragraph for total calories
    totalCaloriesElement.textContent = `Total Calories: ${totalCalories}`; // Set the paragraph text
    trackerDiv.appendChild(totalCaloriesElement); // Add the total calories paragraph
}

// Array to store workout data
let workouts = [];

// Function to add a workout to the workout planner
function addWorkout() {
    const workoutName = document.getElementById("workout-name").value; // Get the workout name from the input field
    const reps = parseInt(document.getElementById("workout-reps").value, 10); // Get the repetitions as a number

    if (workoutName && !isNaN(reps)) { // Ensure valid input
        workouts.push({ workoutName, reps }); // Add the workout to the workouts array
        updateWorkoutPlanner(); // Update the displayed workout planner
        updateSummary(); // Update the summary section
    } else {
        alert("Please enter valid workout details."); // Show an error if input is invalid
    }
}

// Function to update the workout planner display
function updateWorkoutPlanner() {
    const workoutList = document.createElement("ul"); // Create a list to display workouts
    workouts.forEach((workout) => {
        const listItem = document.createElement("li"); // Create a list item for each workout
        listItem.textContent = `${workout.workoutName}: ${workout.reps} reps`; // Set the list item text
        workoutList.appendChild(listItem); // Add the list item to the list
    });

    const plannerDiv = document.querySelector("#workout-planner"); // Get the workout planner div
    plannerDiv.innerHTML = ""; // Clear previous content
    plannerDiv.appendChild(workoutList); // Add the updated list
}

// Variable to track water intake
let waterIntake = 0;

// Function to add water intake
function addWater() {
    const glasses = parseInt(document.getElementById("water-glasses").value, 10); // Get the number of glasses as a number

    if (!isNaN(glasses) && glasses > 0) { // Ensure valid input
        waterIntake += glasses; // Add the glasses to the total water intake
        updateWaterTracker(); // Update the displayed water tracker
        updateSummary(); // Update the summary section
    } else {
        alert("Please enter a valid number of glasses."); // Show an error if input is invalid
    }
}

// Function to update the water tracker display
function updateWaterTracker() {
    const trackerDiv = document.querySelector("#water-tracker"); // Get the water tracker div
    trackerDiv.innerHTML = `Total Water Intake: ${waterIntake} glasses`; // Display the total water intake
}

// Function to calculate and display BMI
function calculateBMI() {
    const height = parseInt(document.getElementById("height").value, 10); // Get the height as a number
    const weight = parseInt(document.getElementById("weight").value, 10); // Get the weight as a number

    if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) { // Ensure valid input
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2); // Calculate BMI and round to 2 decimals
        document.getElementById("bmi-result").textContent = `Your BMI: ${bmi}`; // Display the BMI result
    } else {
        alert("Please enter valid height and weight."); // Show an error if input is invalid
    }
}

// Function to update the summary section
function updateSummary() {
    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0); // Calculate total calories
    const totalWorkouts = workouts.length; // Get the total number of workouts
    const totalWater = waterIntake; // Get the total water intake

    const summaryElement = document.querySelector("#summary"); // Get the summary element
    summaryElement.textContent = `Calories: ${totalCalories}, Workouts: ${totalWorkouts}, Water: ${totalWater} glasses.`; // Display the summary
}
