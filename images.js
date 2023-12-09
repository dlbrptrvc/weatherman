function setImage(element, name) {
  element.style.backgroundImage = "url(./images/" + name + ".svg)";
}

function setImages() {
  let imgs = document.querySelectorAll("[data-image]");
  imgs.forEach((item) => {
    let code = item.dataset.image.split("%")[0];
    let day = item.dataset.image.split("%")[1];
    if (code == 0 && day == "day") {
      setImage(item, "sun");
    }
    if (code == 0 && day == "night") {
      setImage(item, "moon");
    }
    if (code < 10 && code > 0 && day == "day") {
      setImage(item, "cloudy-day");
    }
    if (code < 10 && code > 0 && day == "night") {
      setImage(item, "cloudy-night");
    }
    if (code < 50 && code > 40) {
      setImage(item, "mist");
    }
    if ((code < 70 && code > 50) || (code < 85 && code > 79)) {
      setImage(item, "rainy");
    }
    if ((code < 80 && code > 70) || (code < 90 && code > 84)) {
      setImage(item, "snow");
    }
    if (code < 100 && code > 90) {
      setImage(item, "lightning");
    }
  });
}
