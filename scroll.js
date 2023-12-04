let scroll = {};

rightbtn.addEventListener("mousedown", () => {
  scroll = setInterval(() => {
    carousel.scrollLeft++;
  }, 1);
});

leftbtn.addEventListener("mousedown", () => {
  scroll = setInterval(() => {
    carousel.scrollLeft--;
  }, 1);
});

document.body.addEventListener("mouseup", () => {
  clearTimeout(scroll);
});

document.body.addEventListener("mouseover", (event) => {
  if (event.target !== (leftbtn || rightbtn)) {
    clearTimeout(scroll);
  }
});

rightbtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  scroll = setInterval(() => {
    carousel.scrollLeft++;
  }, 1);
});

document.body.addEventListener("touchend", () => {
  clearTimeout(scroll);
});

document.body.addEventListener("touchmove", (event) => {
  if (event.target !== (leftbtn || rightbtn)) {
    clearTimeout(scroll);
  }
});

leftbtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  scroll = setInterval(() => {
    carousel.scrollLeft--;
  }, 1);
});
