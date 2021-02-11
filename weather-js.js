let currentTd = new Date ();

let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

let months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"
]

let today = days[currentTd.getDay()];
let date = currentTd.getDate();
let month = months[currentTd.getMonth()];
let year = currentTd.getFullYear();
let hour = currentTd.getHours();
let min = currentTd.getMinutes();

let todayIs = `${today} / ${month} ${date}, ${year} / ${hour}:${min}`;

let timeDate = document.querySelector("#timeDate");
timeDate.innerHTML = `${todayIs}`;
