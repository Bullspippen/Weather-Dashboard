// Weather API keys
const apiKeyOpenWeather = "431dd6371869dd989989366774b6e8c7";

// DOM Elements to be used
const cityInputEl = document.getElementById("chosenCity");
const searchBtnEl = document.getElementById("search-button");
const searchHistoryEl = document.querySelector(".history");
const currentWeatherEl = document.getElementById("current-weather");
const forecastWeatherEl = document.getElementById("forecast");

// Event listeners
searchBtnEl.addEventListener("click", handleSearch);
searchHistoryEl.addEventListener("click", handleHistoryClick);

// Search history
let searchHistory = [];

// Handle search
function handleSearch(event) {
  event.preventDefault();
  const searchTerm = cityInputEl.value.trim();
  if (searchTerm) {
    getWeather(searchTerm);
    cityInputEl.value = "";
  }
}

// Handle search history click
function handleHistoryClick(event) {
  event.preventDefault();
  const searchTerm = event.target.getAttribute("data-search-term");
  if (searchTerm) {
    getWeather(searchTerm);
  }
}

// Get weather
async function getWeather(city) {
  // Build URL for OpenWeather API
  const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKeyOpenWeather}`;

  try {
    // Get weather data from OpenWeather API
    const openWeatherResponse = await fetch(openWeatherURL);
    const openWeatherData = await openWeatherResponse.json();

    // Create weather object
    const weather = {
      city: openWeatherData.name,
      country: openWeatherData.sys.country,
      temperature: Math.round(openWeatherData.main.temp),
      humidity: openWeatherData.main.humidity,
      windSpeed: Math.round(openWeatherData.wind.speed),
      description: openWeatherData.weather[0].description,
      icon: openWeatherData.weather[0].icon,
    };

    // Display current weather and forecast
    displayCurrentWeather(weather);

    // Add search term to history
    addToHistory(city);
  } catch (error) {
    console.error(error);
    alert("Unable to get weather. Please try again.");
  }
}

// Display current weather
function displayCurrentWeather(weather) {
  // Create HTML elements for current weather
  const html = `
    <h2>${weather.city}, ${weather.country}</h2>
    <p><strong>Temperature:</strong> ${weather.temperature}&deg;F</p>
    <p><strong>Humidity:</strong> ${weather.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${weather.windSpeed} mph</p>
    <p><strong>Description:</strong> ${weather.description}</p>
    <img src="http://openweathermap.org/img/w/${weather.icon}.png" alt="${weather.description}">
  `;
  currentWeatherEl.innerHTML = html;
}

// Add search term to history
function addToHistory(searchTerm) {
  // Add search term to array
  searchHistory.unshift(searchTerm);

  // Limit search history to 5 items
  if (searchHistory.length > 5) {
    searchHistory.pop();
  }

  // Create HTML elements for search history
  const html = searchHistory
    .map((item) => `<li><a href="#" data-search-term="${item}">${item}</a></li>`)
    .join("");
  searchHistoryEl.innerHTML = html;
}
