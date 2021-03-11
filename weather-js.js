// time and date
let currentTd = new Date();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];

let today = days[currentTd.getDay()];
let date = currentTd.getDate();
let month = months[currentTd.getMonth()];
let hour = currentTd.getHours();
let min = currentTd.getMinutes();

let todayIs = `Last updated : ${today}, ${month} ${date} ${hour}:${min}`;

let timeDate = document.querySelector("#timeDate");
timeDate.innerHTML = `${todayIs}`;

// search engine

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity");
  let heading = document.querySelector("#city");
  heading.innerHTML = cityInput.value;
}

let citysearchInput = document.querySelector("#cityForm");
citysearchInput.addEventListener("submit", citySearch);

// api
function currentWeather(event) {
  let searchCity = document.querySelector("#searchCity");
  let headingCity = document.querySelector("#city");

  headingCity.innerHTML = `${searchCity.value}`;

  let apiKey = "e1bbbda7b1f75d2ab5d063a0f170a3e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(result);
}

let search = document.querySelector("#cityForm");
search.addEventListener("click", currentWeather);

function result(response) {
  let currentLocation = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let selectCondition = response.data.weather[0].description;
  let selectHumidity = response.data.main.humidity;
  let selectFeelslike = Math.round(response.data.main.feels_like);
  let selectWind = Math.round(response.data.wind.speed);
  let selectHigh = Math.round(response.data.main.temp_max);
  let selectLow = Math.round(response.data.main.temp_min);

  let selectHeading = document.querySelector("#city");
  let selectTemperature = document.querySelector("#bottomTemp");
  let elementCondition = document.querySelector("#condition");
  let elementHumidity = document.querySelector("#hum-b");
  let elementFeelslike = document.querySelector("#feelslike-b");
  let elementWind = document.querySelector("#wind-b");
  let elementHigh = document.querySelector("#high-b");
  let elementLow = document.querySelector("#low-b");

  selectHeading.innerHTML = `${currentLocation}`;
  selectTemperature.innerHTML = `${temperature}°`;
  elementCondition.innerHTML = `${selectCondition}`;
  elementHumidity.innerHTML = `${selectHumidity}%`;
  elementFeelslike.innerHTML = `${selectFeelslike}°`;
  elementWind.innerHTML = `${selectWind} mph`;
  elementHigh.innerHTML = `${selectHigh}°`;
  elementLow.innerHTML = `${selectLow}°`;
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

let currentPositionButton = document.querySelector("#currentButton");
currentPositionButton.addEventListener("click", currentPosition);

let apiKey = "e1bbbda7b1f75d2ab5d063a0f170a3e6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=houston&units=imperial&appid=${apiKey}`;
axios.get(apiUrl).then(result);
