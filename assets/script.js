// Weather API keys
const apiKeyOpenWeather = "431dd6371869dd989989366774b6e8c7";
const apiKeyAccuWeather = "yoW7BrAbE8SKkAaZNkhu6Cd7oAhttmid";

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
  // Build URLs for OpenWeather API and AccuWeather API
  const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKeyOpenWeather}`;
  const accuWeatherURL = `https://dataservice.accuweather.com/locations/v1/cities/search?q=${city}&apikey=${apiKeyAccuWeather}`;

  try {
    // Get location key from AccuWeather API
    const accuWeatherResponse = await fetch(accuWeatherURL);
    const accuWeatherData = await accuWeatherResponse.json();
    const locationKey = accuWeatherData[0].Key;

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
    getForecast(locationKey);

    // Add search term to history
    addToHistory(city);
  } catch (error) {
    console.error(error);
    alert("Unable to get weather. Please try again.");
  }
}

// Get forecast
async function getForecast(locationKey) {
  // Build URL for AccuWeather API
  const accuWeatherURL = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKeyAccuWeather}&metric=true`;

  try {
    // Get forecast data from AccuWeather API
    const accuWeatherResponse = await fetch(accuWeatherURL);
    const accuWeatherData = await accuWeatherResponse.json();
    const forecast = [];

    // Extract forecast data for the next 5 days
    for (let i = 1; i <= 5; i++) {
      const dailyForecast = accuWeatherData.DailyForecasts[i];
      const forecastItem = {
        date: dailyForecast.Date,
        minTemp: dailyForecast.Temperature.Minimum.Value
