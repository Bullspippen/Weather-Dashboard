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
  const forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKeyOpenWeather}`;

  try {
    // Get weather data from OpenWeather API
    const openWeatherResponse = await fetch(openWeatherURL);
    const openWeatherData = await openWeatherResponse.json();

    // Get 5-day forecast data from OpenWeather API
    const forecastWeatherResponse = await fetch(forecastWeatherURL);
    const forecastWeatherData = await forecastWeatherResponse.json();

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

    // Create forecast array
    const forecastArray = forecastWeatherData.list.map((item) => {
      return {
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: Math.round(item.main.temp),
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      };
    });

    // Display current weather and forecast
    displayCurrentWeather(weather);
    displayForecastWeather(forecastArray);

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
    <img src="http://openweathermap.org/img/w/${weather.icon}.png">
  `;
  
// Update current weather element
currentWeatherEl.innerHTML = html;
}

// Display forecast weather
function displayForecastWeather(forecastArray) {
  // Create HTML elements for forecast weather
  let html = "<h3>5-Day Forecast:</h3>";
  forecastArray.forEach((item, index) => {
    if (index % 8 === 0) {
      html += `
        <div class="day">
          <h4>${item.date}</h4>
          <img src="http://openweathermap.org/img/w/${item.icon}.png">
          <p><strong>Temperature:</strong> ${item.temperature}&deg;F</p>
          <p><strong>Humidity:</strong> ${item.humidity}%</p>
          <p><strong>Description:</strong> ${item.description}</p>
        </div>
      `;
    }
  });

  // Update forecast weather element
  forecastWeatherEl.innerHTML = html;
}

// Add search term to history
function addToHistory(searchTerm) {
  // Add search term to array
  searchHistory.unshift(searchTerm);

  // Truncate array if too long
  if (searchHistory.length > 5) {
    searchHistory.pop();
  }

  // Update search history element
  let html = "";
  searchHistory.forEach((item) => {
    html += `<li><button class="history-item" data-search-term="${item}">${item}</button></li>`;
  });
  searchHistoryEl.innerHTML = html;
}

