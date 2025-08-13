import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
 
const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


let userSelectedDate = null;

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    dateInput.disabled = true;
    
    const timerId = setInterval(() => {
        const ms = userSelectedDate - Date.now();

        if (ms <= 0) {
clearInterval(timerId);
dateInput.disabled = false;
startBtn.disabled = true;
daysEl.textContent = "00";
hoursEl.textContent = "00";
minutesEl.textContent = "00";
secondsEl.textContent = "00";
return;
        }

        const { days, hours, minutes, seconds } = convertMs(ms);
          daysEl.textContent = addLeadingZero(days);
          hoursEl.textContent = addLeadingZero(hours);
          minutesEl.textContent = addLeadingZero(minutes);
          secondsEl.textContent = addLeadingZero(seconds);
       }, 1000);
    });

    const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     startBtn.disabled = true;
     userSelectedDate = selectedDates[0];
     console.log(selectedDates[0]);
     const now = new Date();
        if (userSelectedDate <= now) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
                timeout: 3000,
              });
        } else {
    startBtn.disabled = false;
    }
    },
  };
  
  flatpickr("#datetime-picker", options);


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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}