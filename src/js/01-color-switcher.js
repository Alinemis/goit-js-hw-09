const timer = {
  timerId: null,
  startBtn: document.querySelector('[data-start]'),
  stoptBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),

  execute() {
    this.startBtn.addEventListener('click', this.handlerStart.bind(this));
    this.stoptBtn.addEventListener('click', this.handlerStop.bind(this));
  },

  handlerStart() {
    this.timerId = setInterval(
      () => (this.body.style.backgroundColor = this._getRandomHexColor()),
      1000
    );
    this._setBtnEnabled(false);
  },

  handlerStop() {
    clearInterval(this.timerId);
    this._setBtnEnabled(true);
  },

  _setBtnEnabled(state) {
    this.stoptBtn.disabled = state;
    this.startBtn.disabled = !state;
  },

  _getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  },
};
timer.execute();
