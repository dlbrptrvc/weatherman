let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//set default data for lookup
let defaultData = {
  loc: "Test, Test",
  lat: "45.7742",
  lon: "19.1122",
  umd: "&degC",
  ums: "km/h",
};

let weatherInfo = {};

//get lookup data from users IP

fetch(
  "https://ipgeolocation.abstractapi.com/v1/?api_key=a7893744d6ae4d7a9faeeabaff138813"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    defaultData.loc = response.city + ", " + response.country;
    defaultData.lat = response.latitude;
    defaultData.lon = response.longitude;
    setDOM();
    getWeather();
  });

function setDOM() {
  address.textContent = defaultData.loc;
  date.textContent = days[new Date().getDay()];
  let degs = document.querySelectorAll(".deg");
  degs.forEach((item) => {
    item.innerHTML = defaultData.umd;
  });
  let speeds = document.querySelectorAll(".speed");
  speeds.forEach((item) => {
    item.innerHTML = defaultData.ums;
  });
  let hourlies = document.querySelectorAll(".item");
  hourlies.forEach((item, index) => {
    item.firstChild.textContent = index + ":00";
  });
}

function getWeather() {}

far.addEventListener("click", () => {
  if (far.classList.contains("darken")) {
    far.classList.remove("darken");
    cel.classList.add("darken");
    defaultData.umd = "&degF";
    defaultData.ums = "mph";
    setDOM();
    switchUnits();
  }
});

cel.addEventListener("click", () => {
  if (cel.classList.contains("darken")) {
    cel.classList.remove("darken");
    far.classList.add("darken");
    defaultData.umd = "&degC";
    defaultData.ums = "km/h";
    setDOM();
    switchUnits();
  }
});

function switchUnits() {}

// gobtn.addEventListener("click", () => {
//   fetchAddress(cityinput.value);
// });

// cityinput.addEventListener("keyup", function (event) {
//   if (event.keyCode === 13) {
//     gobtn.click();
//   }
// });
