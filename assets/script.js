let apiKeyAccuWeather = "yoW7BrAbE8SKkAaZNkhu6Cd7oAhttmid";
const apiKeyOpenWeather = "431dd6371869dd989989366774b6e8c7";

// DOM Elements to be used
const cityInputEl = document.getElementById("city-input");
const searchBtnEl = document.getElementById("search-btn");
const searchHistoryEl = document.getElementById("search-history");
const currentWeatherEl = document.getElementById("current-weather");
const forecastWeatherEl = document.getElementById("forecast-weather");

// Event listeners
searchBtnEl.addEventListener("click", handleSearch);

// Search history
let searchHistory = [];

// Display current weather
const displayCurrentWeather = (weather) => {
  // Create card
  const card = document.createElement("div");
  card.classList.add("card", "bg-primary", "text-white");

  // Create card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Create card title
  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = `${weather.city}, ${weather.country}`;

  // Create weather icon
  const icon = document.createElement("img");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather.icon}.png`
  );
  icon.setAttribute("alt", weather.description);



const weatherSearch = () => {
  const city = document.getElementById("chosenCity").value.trim();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKeyOpenWeather}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("data line 152", data);
      fetchKey(data);
    });
};

const fetchKey = async (location) => {
  const response = await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/search?q=${location.name}&apikey=${apiKeyAccuWeather}`
  );

  if (response.status === 200) {
    const data = await response.json();
    const key = data[0].Key;

    const currentConditionSearch = `https://dataservice.accuweather.com/currentconditions/v1/${key}?&apikey=${apiKeyAccuWeather}`;
    const forecastConditionSearch = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?&apikey=${apiKeyAccuWeather}`;

    fetchCurrent(currentConditionSearch);
    fetchForecast(forecastConditionSearch);
  }
};

const fetchCurrent = async (currentUrl) => {
  const response = await fetch(currentUrl);
  const data = await response.json();

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = data[0].LocalObservationDateTime;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.innerHTML = `<p>Temperature: ${data[0].Temperature.Imperial.Value} &#8457;</p><p>Weather Text: ${data[0].WeatherText}</p>`;

  document.getElementById("current-weather").append(cardTitle, cardBody);
};

const fetchForecast = async (forecastUrl) => {
  const response = await fetch(forecastUrl);

  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    console.log(data.DailyForecasts[0].Date);
  }
};
