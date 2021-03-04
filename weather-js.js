// time and date
let currentTd = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
let year = currentTd.getFullYear();
let hour = currentTd.getHours();
let min = currentTd.getMinutes();

let todayIs = `${today}, ${month} ${date}, ${year} / ${hour}:${min}`;

let timeDate = document.querySelector("#timeDate");
timeDate.innerHTML = `${todayIs}`;

// function cTof(event) {
//   event.preventDefault();
//   let tempChange = document.querySelector(".bottom");
//   tempChange.innerHTML = "70°";
// }

// function fToc(event) {
//   event.preventDefault();
//   let tempChangeTwo = document.querySelector(".bottom");
//   tempChangeTwo.innerHTML = "50°";
// }

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
  event.preventDefault();
  let searchCity = document.querySelector("#searchCity");
  let headingCity = document.querySelector("#city");
  headingCity.innerHTML = `${searchCity.value}`;
  let apiKey = "e1bbbda7b1f75d2ab5d063a0f170a3e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=imperial&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(result);
}

let search = document.querySelector("#cityForm");
search.addEventListener("submit", currentWeather);

//

function result(response) {
  let currentLocation = response.data.name;
  let temperature = Math.round(response.data.main.temp);

  let selectHeading = document.querySelector("#city");
  let selectTemperature = document.querySelector("#bottomTemp");

  selectHeading.innerHTML = `${currentLocation}`;
  selectTemperature.innerHTML = `${temperature}°F`;
}

// let tempcTof = document.querySelector("#f");
// tempcTof.addEventListener("click", cTof);

// let tempfToc = document.querySelector("#c");
// tempfToc.addEventListener("click", fToc);

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
