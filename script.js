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
  loc: "Sombor, Serbia",
  lat: "45.7742",
  lon: "19.1122",
  tmz: "Europe%2FBelgrade",
  umd: "&degC",
  ums: "km/h",
};

let dailyInfo = [];
let hourlyInfo = [[], [], [], [], [], [], []];
let defaultOffset = new Date().getTimezoneOffset() * 60000;
let offset = 0;
setDOM();
getWeather();

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
    defaultData.tmz = response.timezone.name.replace("/", "%2F");
    setDOM();
    getWeather();
  })
  .catch(function () {
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
  carousel.scrollIntoView({ block: "center" });
}

function getWeather() {
  let url = "";
  if (defaultData.umd == "&degC") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${defaultData.lat}&longitude=${defaultData.lon}&current=weather_code,temperature_2m,precipitation&hourly=weather_code,temperature_2m,precipitation_probability,wind_speed_10m&daily=weather_code,sunrise,sunset,temperature_2m_max,precipitation_probability_max&timeformat=unixtime&timezone=${defaultData.tmz}`;
  } else {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${defaultData.lat}&longitude=${defaultData.lon}&current=weather_code,temperature_2m,precipitation&hourly=weather_code,temperature_2m,precipitation_probability,wind_speed_10m&daily=weather_code,sunrise,sunset,temperature_2m_max,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timeformat=unixtime&timezone=${defaultData.tmz}`;
  }
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      parseDailyInfo(response);
      parseHourlyInfo(response);
      setWeather(0);
      centerCarousel();
    });
}

function setWeather(day) {
  //for the day
  document.querySelector(".daydata").dataset.day = day;
  if (day == 0) {
    leftarrow.style.visibility = "hidden";
  } else {
    leftarrow.style.visibility = "visible";
  }
  if (day == 6) {
    rightarrow.style.visibility = "hidden";
  } else {
    rightarrow.style.visibility = "visible";
  }
  date.textContent =
    days[
      new Date(dailyInfo[day].time + offset * 1000 + defaultOffset).getDay()
    ];
  icon.dataset.image = dailyInfo[day].icon;
  temp.textContent = dailyInfo[day].temp;
  rain.textContent = dailyInfo[day].prec;
  //for hours
  let hours = document.querySelectorAll(".item");
  hours.forEach((item, index) => {
    item.querySelector(".hours").textContent =
      new Date(hourlyInfo[day][index].time).getHours() + ":00h";
    item.querySelector(".image").dataset.image = hourlyInfo[day][index].icon;
    item.querySelector(".temp").textContent = hourlyInfo[day][index].temp;
    item.querySelector(".wind").textContent = hourlyInfo[day][index].wind;
    item.querySelector(".rain").textContent = hourlyInfo[day][index].prec;
  });
  setImages();
}

function parseDailyInfo(data) {
  offset = data.utc_offset_seconds;
  let timeOfDay = "day";
  if (
    data.daily.sunrise[0] < data.current.time &&
    data.current.time < data.daily.sunset[0]
  ) {
    timeOfDay = "day";
  } else {
    timeOfDay = "night";
  }
  dailyInfo[0] = {
    time: data.current.time * 1000,
    temp: Math.round(data.current.temperature_2m),
    prec: data.current.precipitation,
    icon: data.current.weather_code + "%" + timeOfDay,
  };
  for (let i = 1; i <= 6; i++) {
    dailyInfo[i] = {
      time: data.daily.time[i] * 1000,
      temp: Math.round(data.daily.temperature_2m_max[i]),
      prec: data.daily.precipitation_probability_max[i],
      icon: data.daily.weather_code[i] + "%day",
    };
  }
}

function parseHourlyInfo(data) {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 24; j++) {
      let timeOfDay = "day";
      if (
        (data.daily.sunrise[i] + offset) * 1000 + defaultOffset <
          (data.hourly.time[i * 24 + j] + offset) * 1000 + defaultOffset &&
        (data.hourly.time[i * 24 + j] + offset) * 1000 + defaultOffset <
          (data.daily.sunset[i] + offset) * 1000 + defaultOffset
      ) {
        timeOfDay = "day";
      } else {
        timeOfDay = "night";
      }

      hourlyInfo[i][j] = {
        time: (data.hourly.time[i * 24 + j] + offset) * 1000 + defaultOffset,
        temp: Math.round(data.hourly.temperature_2m[i * 24 + j]),
        prec: data.hourly.precipitation_probability[i * 24 + j],
        wind: data.hourly.wind_speed_10m[i * 24 + j],
        icon: data.hourly.weather_code[i * 24 + j] + "%" + timeOfDay,
      };
    }
  }
}

// switch units of measure
far.addEventListener("click", () => {
  if (far.classList.contains("darken")) {
    far.classList.remove("darken");
    cel.classList.add("darken");
    defaultData.umd = "&degF";
    defaultData.ums = "mph";
    setDOM();
    getWeather();
  }
});

cel.addEventListener("click", () => {
  if (cel.classList.contains("darken")) {
    cel.classList.remove("darken");
    far.classList.add("darken");
    defaultData.umd = "&degC";
    defaultData.ums = "km/h";
    setDOM();
    getWeather();
  }
});

rightarrow.addEventListener("click", () => {
  setWeather(+daydata.dataset.day + 1);
});

leftarrow.addEventListener("click", () => {
  setWeather(+daydata.dataset.day - 1);
});
