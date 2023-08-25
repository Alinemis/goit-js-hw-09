import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const elements = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  container: document.querySelector('.timer'),
  field: document.querySelector('.field'),
};

elements.container.style.display = 'flex';
elements.container.style.width = '300px';
elements.container.style.columnGap = '15px';

elements.startBtn.disabled = true;

const fp = flatpickr(elements.inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Report.warning(
        'WARNING',
        'Please choose a date in the future',
        'Ok'
      );
      elements.startBtn.disabled = true;
    } else {
      elements.startBtn.disabled = false;
      elements.startBtn.addEventListener('click', () => {
        const timerId = setInterval(() => {
          const ms = selectedDates[0].getTime() - Date.now();
          if (ms < 0) {
            return clearInterval(timerId);
          }
          const converted = convertMs(ms);
          elements.days.textContent = addLeadingZero(converted.days);
          elements.hours.textContent = addLeadingZero(converted.hours);
          elements.minutes.textContent = addLeadingZero(converted.minutes);
          elements.seconds.textContent = addLeadingZero(converted.seconds);
        }, 1000);
      });
    }
  },
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
