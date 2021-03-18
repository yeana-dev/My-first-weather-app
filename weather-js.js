// time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours < 10) {
    hours = `${hours}`;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated : ${day} ${hours}:${minutes}`;
}

// innerHTML
function result(response) {
  let currentLocation = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let selectCondition = response.data.weather[0].description;
  let selectHumidity = response.data.main.humidity;
  let selectFeelslike = Math.round(response.data.main.feels_like);
  let selectWind = Math.round(response.data.wind.speed);
  let selectHigh = Math.round(response.data.main.temp_max);
  let selectLow = Math.round(response.data.main.temp_min);

  fahrenheitTemperature = response.data.main.temp;

  let selectHeading = document.querySelector("#city");
  let selectTemperature = document.querySelector("#bottomTemp");
  let elementCondition = document.querySelector("#condition");
  let elementHumidity = document.querySelector("#hum-b");
  let elementFeelslike = document.querySelector("#feelslike-b");
  let elementWind = document.querySelector("#wind-b");
  let elementHigh = document.querySelector("#high-b");
  let elementLow = document.querySelector("#low-b");
  let elementTimedate = document.querySelector("#timeDate");
  let elementWeatherImage = document.querySelector("#weather-image");

  selectHeading.innerHTML = `${currentLocation}`;
  selectTemperature.innerHTML = Math.round(fahrenheitTemperature);
  elementCondition.innerHTML = `${selectCondition}`;
  elementHumidity.innerHTML = `${selectHumidity}%`;
  elementFeelslike.innerHTML = `${selectFeelslike}°`;
  elementWind.innerHTML = `${selectWind} mph`;
  elementHigh.innerHTML = `${selectHigh}°`;
  elementLow.innerHTML = `${selectLow}°`;
  elementTimedate.innerHTML = formatDate(response.data.dt * 1000);
  elementWeatherImage.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  elementWeatherImage.setAttribute("alt", response.data.weather[0].description);
}

// search engine
function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity");
  currentWeather(cityInput.value);
}

// api
function currentWeather(city) {
  let apiKey = "e1bbbda7b1f75d2ab5d063a0f170a3e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(result);
}

// Geolocation
function position(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "e1bbbda7b1f75d2ab5d063a0f170a3e6";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  axios.get(apiGeoUrl).then(result);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(position);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let ftocConvert = (fahrenheitTemperature - 32) * (5 / 9);
  let tempElement = document.querySelector("#bottomTemp");
  tempElement.innerHTML = Math.round(ftocConvert);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#bottomTemp");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let currentPositionButton = document.querySelector("#currentButton");
currentPositionButton.addEventListener("click", currentPosition);

currentWeather("houston");

let form = document.querySelector("#cityForm");
form.addEventListener("submit", citySearch);

// celcius and fahrenheit

let celsiusLink = document.querySelector("#c");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#f");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
