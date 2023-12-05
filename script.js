let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let lat = "45.7742";
let lon = "19.1122";

if (localStorage.getItem("lat")) {
  lat = localStorage.getItem("lat");
  lon = localStorage.getItem("lon");
}

gobtn.addEventListener("click", () => {
  fetchAddress(cityinput.value);
});

cityinput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    gobtn.click();
  }
});

function fetchAddress(cityname) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=e731c7c582414815b54165157232911&q=${cityname}&aqi=no`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      address.textContent =
        response.location.name + ", " + response.location.country;
      lon = response.location.lon;
      lat = response.location.lat;
      fetchWeather();
    })
    .catch(function (response) {
      address.textContent = "Sombor, Serbia";
      lon = "19.1122";
      lat = "45.7742";
      fetchWeather();
    });
}

function fetchWeather() {}

date.textContent = days[new Date().getDay()];
fetchWeather();
