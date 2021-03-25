// time

function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  return `Last updated : ${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours < 10) {
    hours = `${hours}`;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

// hourly forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    fahrenheitForecast = forecast.main.temp;
    forecastElement.innerHTML += `
          <div class="col-2">
            <h3 class="hour">
              ${formatHours(forecast.dt * 1000)}
            </h3>
            <img src="images/${
              forecast.weather[0].icon
            }.png" id = "forecast-icon">
            <div id="forecast-temp">
              ${Math.round(fahrenheitForecast)}°         
            </div>
  `;
  }
}

// innerHTML
function result(response) {
  let currentLocation = response.data.name;
  let selectCondition = response.data.weather[0].description;
  let selectHumidity = response.data.main.humidity;
  windSpeedMph = Math.round(response.data.wind.speed);

  fahrenheitTemperature = response.data.main.temp;
  fahrenheitHighTemperature = Math.round(response.data.main.temp_max);
  fahrenheitLowTemperature = Math.round(response.data.main.temp_min);
  fahrenheitFeelsLikeTemp = Math.round(response.data.main.feels_like);

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
  elementFeelslike.innerHTML = `${fahrenheitFeelsLikeTemp}°`;
  elementWind.innerHTML = `${windSpeedMph} mph`;
  elementHigh.innerHTML = `${fahrenheitHighTemperature}°`;
  elementLow.innerHTML = `${fahrenheitLowTemperature}°`;
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
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

// converting fahrenheit to celsius
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let ftocConvert = (fahrenheitTemperature - 32) * (5 / 9);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElement = document.querySelector("#bottomTemp");
  tempElement.innerHTML = Math.round(ftocConvert);

  let ftocConvertHigh = (fahrenheitHighTemperature - 32) * (5 / 9);
  let highTempElement = document.querySelector("#high-b");
  highTempElement.innerHTML = `${Math.round(ftocConvertHigh)}°`;

  let ftocConvertLow = (fahrenheitLowTemperature - 32) * (5 / 9);
  let lowTempElement = document.querySelector("#low-b");
  lowTempElement.innerHTML = `${Math.round(ftocConvertLow)}°`;

  let ftocConvertFeelsLike = (fahrenheitFeelsLikeTemp - 32) * (5 / 9);
  let feelsLikeTempElement = document.querySelector("#feelslike-b");
  feelsLikeTempElement.innerHTML = `${Math.round(ftocConvertFeelsLike)}°`;

  let convertWindSpeedKph = windSpeedMph * 1.609;
  let windSpeedElement = document.querySelector("#wind-b");
  windSpeedElement.innerHTML = `${Math.round(convertWindSpeedKph)} kph`;

  let convertForecast = (fahrenheitForecast - 32) * (5 / 9);
  let forecastElement = document.querySelector("#forecast-temp");
  forecastElement.innerHTML = `${Math.round(convertForecast)}`;
}

// converting back to fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let tempElement = document.querySelector("#bottomTemp");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);

  let highTempElement = document.querySelector("#high-b");
  highTempElement.innerHTML = `${Math.round(fahrenheitHighTemperature)}°`;

  let lowTempElement = document.querySelector("#low-b");
  lowTempElement.innerHTML = `${Math.round(fahrenheitLowTemperature)}°`;

  let feelsLikeElement = document.querySelector("#feelslike-b");
  feelsLikeElement.innerHTML = `${Math.round(fahrenheitFeelsLikeTemp)}°`;

  let windSpeedElement = document.querySelector("#wind-b");
  windSpeedElement.innerHTML = `${Math.round(windSpeedMph)} mph`;

  let forecastElement = document.querySelector("#forecast-temp");
  forecastElement.innerHTML = `${Math.round(fahrenheitForecast)}`;
}

let fahrenheitTemperature = null;

let currentPositionButton = document.querySelector("#currentButton");
currentPositionButton.addEventListener("click", currentPosition);

let form = document.querySelector("#cityForm");
form.addEventListener("submit", citySearch);

// celcius and fahrenheit

let celsiusLink = document.querySelector("#c");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#f");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

currentWeather("houston");
