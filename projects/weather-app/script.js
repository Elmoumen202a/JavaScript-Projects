// Replace 'YOUR_ACTUAL_API_KEY' with your valid OpenWeatherMap API key
const apiKey = 'YOUR_ACTUAL_API_KEY';
const weatherInfoElement = document.getElementById('weatherInfo');

// Function to get weather data based on user input
async function getWeather() {
    const searchInput = document.getElementById('searchInput').value;

    if (searchInput) {
        try {
            // Fetch weather data from the OpenWeatherMap API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`);
            const data = await response.json();

            // Check if the city is found in the API response
            if (data.cod === '404') {
                displayError('City not found');
            } else {
                // Display the weather information
                displayWeather(data);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayError('An error occurred while fetching weather data');
        }
    } else {
        // Display an error if no city name is entered
        displayError('Please enter a city name');
    }
}

// Function to display weather information on the webpage
function displayWeather(data) {
    // Process and display the weather data as needed
    console.log(data);

    // Example: Display the temperature, description, city name, and country
    const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
    const description = data.weather[0].description;
    const cityName = data.name;
    const country = data.sys.country;

    const weatherHTML = `
        <p>${cityName}, ${country}</p>
        <p>${temperature}°C, ${description}</p>
    `;

    // Update the HTML content of the weatherInfoElement
    weatherInfoElement.innerHTML = weatherHTML;
}

// Function to display an error message on the webpage
function displayError(message) {
    // Update the HTML content with an error message
    weatherInfoElement.innerHTML = `<p class="error">${message}</p>`;
}
