let locationData = [];
let index = 0;

gobtn.addEventListener("click", () => {
  updateData();
  getWeather();
});

cityinput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    gobtn.click();
  }
});

cityinput.addEventListener("input", () => {
  let found = false;
  Array.from(citylist.children).forEach((item, i) => {
    if (item.value == cityinput.value) {
      found = true;
      index = i;
    }
  });
  if (found) {
    citylist.replaceChildren();
    updateData();
    address.textContent = defaultData.loc;
    getWeather();
  } else {
    fetchSuggestions();
  }
});

function updateData() {
  Object.assign(defaultData, {
    loc: cityinput.value,
    lat: locationData.features[index].geometry.coordinates[1],
    lon: locationData.features[index].geometry.coordinates[0],
    tmz: locationData.features[index].properties.timezone.name.replace(
      "/",
      "%2F"
    ),
  });
}

function fetchSuggestions() {
  console.log("fetching suggestions");
  fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${cityinput.value}&apiKey=adfa3b3e8fbc4453b356bdd9ae3b341f`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.features.length > 0) {
        locationData = response;
        citylist.replaceChildren();
        response.features.forEach((item) => {
          if (item.properties.city) {
            let opt = document.createElement("option");
            opt.value =
              item.properties.address_line1 + ", " + item.properties.country;
            citylist.append(opt);
          }
        });
      }
    });
}
