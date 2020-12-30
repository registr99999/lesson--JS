function countTimer(dedline) { // dedline это время до которого наш таймер будет расчитаывть
    let timerHourse = document.querySelector('#timer-hours'), // получаем часы
      timerMinutes = document.querySelector('#timer-minutes'),// получаем минуты
      timerSeconds = document.querySelector('#timer-seconds');// получаем секунды

    const addZero = (item) => {
      if (item < 10) {
        item = '0' + item;
      }
      return item;
    }

    const getTimeRemaining = () => {
      let dateStop = new Date(dedline), // получаем дату окончания
        dateNow = new Date(),// получаем текущую дату
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60 - 3) % 24;
      return { timeRemaining, hours, minutes, seconds };
    }
    let taimetIntervel;
    const timeAnimations = () => {
      taimetIntervel = requestAnimationFrame(timeAnimations);
      let timer = getTimeRemaining();
      if (timer.timeRemaining > 0) {
        timerHourse.textContent = addZero(timer.hours * 1);
        timerMinutes.textContent = addZero(timer.minutes * 1);
        timerSeconds.textContent = addZero(timer.seconds * 1);
      } else {
        timerHourse.textContent = addZero(0);
        timerMinutes.textContent = addZero(0);
        timerSeconds.textContent = addZero(0);
        cancelAnimationFrame(taimetIntervel);
      }
    };
    taimetIntervel = requestAnimationFrame(timeAnimations);
  }

  export default countTimer;
