const startBtn = document.querySelector('[data-start]');
const stoptBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

startBtn.addEventListener('click', handlerStart);
stoptBtn.addEventListener('click', handlerStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function handlerStart(evt) {
  timerId = setInterval(() => {
    const changeColor = getRandomHexColor();
    body.style.backgroundColor = changeColor;
  }, 1000);
  startBtn.disabled = true;
  stoptBtn.disabled = false;
}

function handlerStop(evt) {
  clearInterval(timerId);
  stoptBtn.disabled = true;
  startBtn.disabled = false;
}
